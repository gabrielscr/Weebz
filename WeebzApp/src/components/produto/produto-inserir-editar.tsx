import { Component, State, Prop, Element } from '@stencil/core';
import { handleChange } from '../../common/base/handle-change';
import Api from '../../common/base/api.typings';
import produtoService from './produto-service';
import routerService from '../../common/base/router-service';
import imageService from '../../common/base/image-service';
import { IComboboxOption } from '@tempusdigital/ionic';

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

  @State() marcaOptions: IComboboxOption[];

  loader: HTMLLoaderCustomizavelElement;

  modalController: HTMLIonModalControllerElement;

  @State() marcaDescricao: string;


  handleChange(e: Event) {
    handleChange(e, this, 'state');
  }

  componentWillLoad() {
    this.load();
  }

  async load() {

    if (this.produtoId) {
      this.state = await produtoService.obterParaEditar({ id: this.produtoId })

      if (this.state.marcas)
        this.marcaDescricao = this.state.marcas.descricao;
    }
    else
      this.state = {
        id: await produtoService.getNextId(),
        descricao: '',
        valor: 0,
        ativo: false,
        especificacoesTecnicas: '',
        titulo: '',
        marcas: null
      };

  }

  async confirmar(e: Event) {
    e.preventDefault();

    this.state.caminhoImagem = this.caminhoImagem;
    this.state.nomeImagem = this.nomeImagem;

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

        await routerService.goBack('produto-listar');
      });
  }

  async exibirMarcas() {
    await this.loader.show();

    await this.modalController.componentOnReady();

    let modal = await this.modalController.create({
      component: 'marca-selecionar',
      componentProps: { marcaSelecionada: this.state.marcas }
    });

    await this.loader.dismiss();

    await modal.present();

    await modal.onDidDismiss().then(detail => {
      let data = detail.data;

      if (data && data.data) {
        this.state.marcas = data.data;
        this.marcaDescricao = data.data.descricao;
      }
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
            <ion-label position="floating">Título</ion-label>
            <ion-input name="titulo" required maxlength={100} value={this.state.titulo} onIonChange={e => this.handleChange(e)} autofocus></ion-input>
            <t-message name="titulo"></t-message>
          </ion-item>

          <ion-item>
            <ion-label position="floating">Descrição</ion-label>
            <ion-textarea name="descricao" required maxlength={2000} value={this.state.descricao} onIonChange={e => this.handleChange(e)} autofocus></ion-textarea>
            <t-message name="descricao"></t-message>
          </ion-item>

          <ion-item>
            <ion-label position="floating">Especificações Técnicas</ion-label>
            <ion-textarea name="especificacoesTecnicas" required maxlength={5000} value={this.state.especificacoesTecnicas} onIonChange={e => this.handleChange(e)} autofocus></ion-textarea>
            <t-message name="especificacoesTecnicas"></t-message>
          </ion-item>

          <ion-item>
            <ion-label position="floating">Valor</ion-label>
            <ion-input name="valor" type="number" step="1" min="1" required value={this.state.valor as any} onIonChange={e => this.handleChange(e)}></ion-input>
            <t-message name="valor"></t-message>
          </ion-item>

          <ion-item id="inputMarcaId" button onClick={() => this.exibirMarcas()}>
            <ion-label position="floating">Marca</ion-label>
            <ion-input value={this.marcaDescricao} readonly onIonChange={e => this.handleChange(e)}></ion-input>
            <t-message name="marcas"></t-message>
          </ion-item>

          <ion-item>
            <ion-label>Ativo</ion-label>
            <ion-toggle value={this.state.ativo as any} onIonChange={e => this.handleChange(e)}></ion-toggle>
           </ion-item>

          <ion-item>
            <ion-label>Upload image</ion-label>
            <input type="file" accept="image/jpeg, image/jpg, image/png" onChange={e => this.handleImageChange(e)} />
          </ion-item>

          <ion-item lines="none">
            <ion-label>Foto do produto</ion-label>
            {this.state && this.state.caminhoImagem ?
              <img class="t-image" src={imageService.getImageUrl(this.state.caminhoImagem)} >
              </img>
              : null}
          </ion-item>
          <br />

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
              Confirmar
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
