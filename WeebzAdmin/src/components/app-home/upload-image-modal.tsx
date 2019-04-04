import { Component } from '@stencil/core';
import Croppie from 'croppie';

@Component({
  tag: 'upload-image-modal'
})
export class UploadImageModal {

  modalController: HTMLIonModalControllerElement;

  urlImagem: any;

  crop: Croppie;

  resultadoFinal: any;

  cropElement: HTMLElement;

  componentDidLoad() {
    this.crop = new Croppie(this.cropElement, {
      enableExif: true,
      enableOrientation: true,
      viewport: {
        width: 400,
        height: 400,
        type: 'circle',
      },
      boundary: {
        width: 400,
        height: 400,

      }
    });

  }

  componentDidUnload() {
    this.crop.destroy();
  }

  async voltar() {
    await this.modalController.componentOnReady();
    await this.modalController.dismiss();
  }

  async confirmar() {

    let base64promise = this.crop.result({ type: "base64", format: "jpeg", size: 'original' });

    let base64 = await base64promise;

    await this.modalController.componentOnReady();
    await this.modalController.dismiss(base64);
  }

  async handleUploadImage(event) {

    let input = event.target;

    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = async () => {
        this.cropElement.classList.add('ready');

        await this.crop.bind({
          url: reader.result as string
        });
      }

      reader.readAsDataURL(input.files[0]);
    }
  }

  handleLeftRotationButton() {
    this.crop.rotate(+90);
  }

  handleRightRotationButton() {
    this.crop.rotate(-90);
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color='danger'>
          <ion-title>Editar Imagem</ion-title>
          <ion-buttons slot="start">
            <ion-button onClick={() => this.voltar()}>
              <ion-icon name="arrow-back"></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-buttons slot="end" >
            <ion-button onClick={() => this.confirmar()} >
              Confirmar
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <ion-grid>
          <ion-row>
            <ion-col text-center>
              <ion-button onClick={() => this.handleLeftRotationButton()} class="vanilla-rotate" data-deg="-90" color="danger">
                Girar -90º
              </ion-button>
              <ion-button onClick={() => this.handleRightRotationButton()} class="vanilla-rotate" data-deg="90" color="danger">
                Girar 90º
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
        <div ref={e => this.cropElement = e}>
        </div>
        <input type="file" onChange={(event) => this.handleUploadImage(event)} />
      </ion-content>,
      <ion-modal-controller ref={e => this.modalController = e as any}></ion-modal-controller>,
    ]
  }
}
