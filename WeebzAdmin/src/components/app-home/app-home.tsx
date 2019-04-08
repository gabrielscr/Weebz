import { Component, State } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  modalController: HTMLIonModalControllerElement;

  @State() urlImagem: any;

  async handleEditarImagem() {

    await this.modalController.componentOnReady();

    let modal = await this.modalController.create({
      component: 'upload-image-modal',
      cssClass: 'upload-image-modal',
      componentProps: {
        headerColor: 'dark',
        buttonColor: 'dark',
        buttonInverseTitle: 'Inverter',
        buttonRotateLeftTitle: 'Girar para esquerda',
        buttonRotateRightTitle: 'Girar para direita',
        modalTitle: 'Editar imagem',
        buttonConfirmTitle : 'Confirmar'
      }
    });

    await modal.present();
    let result = await modal.onDidDismiss();
    this.urlImagem = result.data;
    console.log(this.urlImagem);
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="dark">
          <ion-title>Teste</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content padding>
        <ion-list>
          <img id="cropped-image" src={this.urlImagem} />
          <ion-button onClick={() => this.handleEditarImagem()} color="dark" fill="outline">Editar</ion-button>
        </ion-list>
      </ion-content>,
      <ion-modal-controller class="teste" ref={e => this.modalController = e as any}></ion-modal-controller>
    ];
  }
}
