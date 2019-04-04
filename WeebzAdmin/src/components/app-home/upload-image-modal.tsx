import { Component, Listen } from '@stencil/core';

@Component({
  tag: 'upload-image-modal'
})
export class UploadImageModal {

  modalController: HTMLIonModalControllerElement;

  @Listen('ionViewWillEnter')
  async ionViewWillEnter() {

  }

  async fechar() {
    await this.modalController.componentOnReady();
    await this.modalController.dismiss();
  }

  renderizarInfiniteScroll() {
      return (
        <ion-infinite-scroll>
          <ion-infinite-scroll-content
            loadingSpinner="bubbles"
            loadingText="Carregando...">
          </ion-infinite-scroll-content>
        </ion-infinite-scroll>
      );
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color='primary'>
          <ion-title>Editar Imagem</ion-title>
          <ion-buttons slot="start">
            <ion-button onClick={() => this.fechar()}>
              <ion-icon name="arrow-back"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <ion-list>
          {this.renderizarInfiniteScroll()}
        </ion-list>
      </ion-content>,
      <ion-modal-controller ref={e => this.modalController = e as any}></ion-modal-controller>,

    ]
  }
}
