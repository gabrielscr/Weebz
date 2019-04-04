import { Component } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  modalController: HTMLIonModalControllerElement;


  async handleEditarImagem() {

    await this.modalController.componentOnReady();

    let modal = await this.modalController.create({
      component: 'upload-image-modal'
    });

    await modal.present();

  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Teste</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-split-pane contentId="menu-content">

        <ion-menu side="start" menuId="first">
          <ion-header>
            <ion-toolbar color="primary">
              <ion-title>Start Menu</ion-title>
            </ion-toolbar>
          </ion-header>
          <ion-content>
            <ion-list>
              <ion-item>Menu Item</ion-item>
              <ion-item>Menu Item</ion-item>
              <ion-item>Menu Item</ion-item>
              <ion-item>Menu Item</ion-item>
              <ion-item>Menu Item</ion-item>
            </ion-list>
          </ion-content>
        </ion-menu>

        <ion-router-outlet id="menu-content">teste</ion-router-outlet>
      </ion-split-pane>,
      <ion-content padding>
        <ion-button onClick={() => this.handleEditarImagem()}>Editar</ion-button>
      </ion-content>,
      <ion-modal-controller ref={e => this.modalController = e as any}></ion-modal-controller>
    ];
  }
}
