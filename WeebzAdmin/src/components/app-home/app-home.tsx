import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  modalController: HTMLIonModalControllerElement;

  @Prop() urlImagem

  async handleEditarImagem() {

    await this.modalController.componentOnReady();

    let modal = await this.modalController.create({
      component: 'upload-image-modal'
    });

    await modal.present();
    let result = await modal.onDidDismiss();
    console.log(result);
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="dark">
          <ion-title>Teste</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content padding>
        <ion-button onClick={() => this.handleEditarImagem()} color="dark" fill="outline">Editar</ion-button>
      </ion-content>,
      <ion-modal-controller class="teste" ref={e => this.modalController = e as any}></ion-modal-controller>
    ];
  }
}
