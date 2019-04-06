import { Component, State, Prop, Element } from '@stencil/core';
import { handleChange } from '../../common/base/handle-change';
import Api from '../../common/base/api.typings';
import produtoService from './produto-service';
import routerService from '../../common/base/router-service';
import imageService from '../../common/base/image-service';

@Component({
  tag: 'produto-inserir-editar',
  styleUrl: 'produto-inserir-editar.scss' 
})

export class ProdutoInserirEditar {

  @Prop() produtoId: number;

  @State() state: Api.Produto.InserirEditar.Command;

  @Element() host: HTMLElement;

  form: HTMLFormElement;

  formController: HTMLTFormControllerElement;

  caminhoImagem: string;

  nomeImagem: string;


  handleChange(e: Event) {
    handleChange(e, this, 'state');
  }

  componentWillLoad() {
    this.load();
  }

  async load() {
    if (this.produtoId)
      this.state = await produtoService.obterParaEditar({ id: this.produtoId })
    else
      this.state = {
        id: await produtoService.getNextId(),
        descricao: '',
        valor: 0
      };
  }

  async confirmar(e: Event) {

    this.state.caminhoImagem = this.caminhoImagem;
    this.state.nomeImagem = this.nomeImagem;

    e.preventDefault();

    await this.formController.componentOnReady();
    await this.formController.processSubmit(
      this.form,
      async () => {
        if (this.state.id)
          await produtoService.editar(this.state);
        else
          await produtoService.inserir(this.state);

        let modal = this.host.closest('ion-modal');
        if (modal) {
          await modal.dismiss();
          return;
        }

        await routerService.goBack('product-list');
      });
  }

  handleImageChange(e) {
    let file = e.target.files[0];

    let reader = new FileReader();

    reader.onloadend = () => {
      let image = reader.result.toString().replace(/^data:image\/[a-z]+;base64,/, "")
      this.nomeImagem = file.name;
      this.caminhoImagem = image;
    };

    reader.readAsDataURL(file);
  }

  renderForm() {
    return (
      <form ref={form => this.form = form as any} onSubmit={e => this.confirmar(e)} novalidate>

        <t-message-summary></t-message-summary>

        <ion-list>

          <ion-item>
            <ion-label position="floating">Id</ion-label>
            <ion-input name="id" type="number" disabled={!!this.produtoId} step="1" min="1" required value={this.state.id as any} onIonChange={e => this.handleChange(e)}></ion-input>
            <t-message name="id"></t-message>
          </ion-item>

          <ion-item>
            <ion-label position="floating">Descrição</ion-label>
            <ion-input name="descricao" required maxlength={150} value={this.state.descricao} onIonChange={e => this.handleChange(e)} autofocus></ion-input>
            <t-message name="descricao"></t-message>
          </ion-item>

          <ion-item>
            <ion-label position="floating">Valor</ion-label>
            <ion-input name="valor" type="number" step="1" min="0" required value={this.state.valor as any} onIonChange={e => this.handleChange(e)}></ion-input>
            <t-message name="valor"></t-message>
          </ion-item>

          {this.state && this.state.caminhoImagem ?
            <img class="t-image" src={imageService.getImageUrl(this.state.caminhoImagem)} >
            </img>
            : null}

          <ion-item>
            <ion-label>Upload image</ion-label>
            <input type="file" accept="image/jpeg, image/jpg, image/png" onChange={e => this.handleImageChange(e)} />
          </ion-item>

        </ion-list>

      </form>
    );
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref='/produto/listar'></ion-back-button>
          </ion-buttons>

          <ion-title>{this.produtoId ? 'Editar' : 'Inserir'} Produto</ion-title>

          <ion-buttons slot="end">
            <ion-button onClick={e => this.confirmar(e)} disabled={!this.state}>
              Confirm
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,

      <ion-content>
        <t-container>
          {this.state
            ? this.renderForm()
            : <center><ion-spinner name="dots"></ion-spinner></center>}
        </t-container>
      </ion-content>,

      <t-form-controller ref={p => this.formController = p as any}></t-form-controller>
    ];
  }
}
