import { Component, State, Listen } from '@stencil/core';
import marcaService from './marca-service';
import Api from '../../common/base/api.typings';

@Component({
  tag: 'marca-listar'
})
export class MarcaListar {
  @State() state: Api.Marca.Listar.Dto;

  toastController: HTMLToastComponentElement;

  @Listen('ionViewWillEnter')
  ionViewWillEnter() {
    this.load();
  }

  async load() {
    this.state = await marcaService.listar();
  }

  async delete(e: UIEvent, id: number, name: string) {
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();

    if (confirm('Você deseja mesmo deletar?')) {
      try {
        await marcaService.excluir({ id });
      } catch (e) {
        this.toastController.message = `${name} em uso. Não é possível deletar.`;
        await this.toastController.show();
        throw e;
      }

      await this.load();
    }
  }

  insert() {
    const nav = document.querySelector('ion-nav');
    nav.push('marca-inserir-editar');
  }

  renderMarca(a: Api.Marca.Listar.MarcaDto) {
    return (
      <ion-item href={`/marca/editar/${a.id}`}>
        <ion-label>
          {a.descricao}
        </ion-label>
        <ion-button slot="end" fill="clear" onClick={e => this.delete(e, a.id, a.descricao)}>
          <ion-icon color="danger" name="trash"></ion-icon>
        </ion-button>
      </ion-item>
    );
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-menu-toggle>
              <ion-button><ion-icon slot="icon-only" name="menu"></ion-icon></ion-button>
            </ion-menu-toggle>
          </ion-buttons>

          <ion-title>Marcas</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <t-container>
          <ion-list lines="full" data-list data-list-hover>
            {
              this.state
                ? this.state.marcas && this.state.marcas.length
                  ? this.state.marcas.map(a => this.renderMarca(a))
                  : <p><center>Nenhum item encontrado</center></p>
                : <p><center><ion-spinner name="dots"></ion-spinner></center></p>
            }
          </ion-list>
        </t-container>
        <ion-fab horizontal="end" vertical="bottom" slot="fixed">
          <ion-fab-button onClick={this.insert.bind(this)}>
            <ion-icon name="add"></ion-icon>
          </ion-fab-button>
        </ion-fab>
      </ion-content>,
      <toast-component ref={e => this.toastController = e as any}></toast-component>
    ];
  }
}
