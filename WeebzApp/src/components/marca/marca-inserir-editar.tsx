import { Component, State, Prop, Element } from '@stencil/core';
import { handleChange } from '../../common/base/handle-change';
import Api from '../../common/base/api.typings';
import marcaService from './marca-service';
import routerService from '../../common/base/router-service';

@Component({
  tag: 'marca-inserir-editar',
  styleUrl: 'marca-inserir-editar.scss' 
})

export class MarcaInserirEditar {

  @Prop() marcaId: number;

  @State() state: Api.Marca.InserirEditar.Command;

  @Element() host: HTMLElement;

  form: HTMLFormElement;

  formController: HTMLTFormControllerElement;

  handleChange(e: Event) {
    handleChange(e, this, 'state');
  }

  componentWillLoad() {
    this.load();
  }

  async load() {
    if (this.marcaId)
      this.state = await marcaService.obterParaEditar({ id: this.marcaId })
    else
      this.state = {
        id: await marcaService.getNextId(),
        descricao: ''
      };
  }

  async confirmar(e: Event) {
    e.preventDefault();

    await this.formController.componentOnReady();
    await this.formController.processSubmit(
      this.form,
      async () => {
        if (this.state.id)
          await marcaService.editar(this.state);
        else
          await marcaService.inserir(this.state);

        let modal = this.host.closest('ion-modal');
        if (modal) {
          await modal.dismiss();
          return;
        }

        await routerService.goBack('marca-listar');
      });
  }

  renderForm() {
    return (
      <form ref={form => this.form = form as any} onSubmit={e => this.confirmar(e)} novalidate>

        <t-message-summary></t-message-summary>

        <ion-list>

          <ion-item>
            <ion-label position="floating">Id</ion-label>
            <ion-input name="id" type="number" disabled={!!this.marcaId} step="1" min="1" required value={this.state.id as any} onIonChange={e => this.handleChange(e)}></ion-input>
            <t-message name="id"></t-message>
          </ion-item>

          <ion-item>
            <ion-label position="floating">Descrição</ion-label>
            <ion-input name="descricao" required maxlength={2000} value={this.state.descricao} onIonChange={e => this.handleChange(e)} autofocus></ion-input>
            <t-message name="descricao"></t-message>
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
            <ion-back-button defaultHref='/marca/listar'></ion-back-button>
          </ion-buttons>

          <ion-title>{this.marcaId ? 'Editar' : 'Inserir'} Marca</ion-title>

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
