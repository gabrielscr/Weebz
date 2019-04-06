import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: "app-root.scss"
})
export class AppRoot {

  @Prop({ connect: "ion-toast-controller" }) toastCtrl: HTMLIonToastControllerElement;

  render() {
    return (
      <ion-app>
        <ion-router useHash={true}>

          <ion-route url="/produto/inserir" component="produto-inserir-editar"></ion-route>,
          <ion-route url="/produto/editar/:produtoId" component="produto-inserir-editar"></ion-route>,
          <ion-route url="/produto/listar" component="produto-listar"></ion-route>

        </ion-router>

        <menu-page></menu-page>
        <ion-loading-controller></ion-loading-controller>
        {
          // Fix bundle of modal components on Stencil 1.0.0-beta.17
          (window['Force bundle']) ?
            <div>
              <ion-searchbar></ion-searchbar>
              <ion-buttons></ion-buttons>
              <ion-button></ion-button>
              <ion-toolbar></ion-toolbar>
              <ion-header></ion-header>
              <ion-content></ion-content>
              <ion-list></ion-list>
              <ion-virtual-scroll></ion-virtual-scroll>
              <ion-item></ion-item>
              <ion-label></ion-label>
              <ion-radio></ion-radio>
              <ion-checkbox></ion-checkbox>
              <ion-radio-group></ion-radio-group>
              <ion-icon></ion-icon>
            </div> : null
        }
      </ion-app>
    );
  }
}
