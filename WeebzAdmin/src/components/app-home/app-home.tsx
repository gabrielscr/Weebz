import { Component } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  modalController: HTMLIonModalControllerElement;

  urlImagem: any;

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
        <ion-toolbar color="danger">
          <ion-title>Teste</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content padding>
        <ion-button onClick={() => this.handleEditarImagem()} color="danger">Editar</ion-button>
      </ion-content>,
      <ion-modal-controller ref={e => this.modalController = e as any}></ion-modal-controller>
    ];
  }
}
