import { Component, State } from '@stencil/core';
import Croppie from 'croppie';

@Component({
  tag: 'upload-image-modal'
})
export class UploadImageModal {

  modalController: HTMLIonModalControllerElement;

  urlImagem: any;

  @State() crop: any;

  resultadoFinal: any;

  async voltar() {
    await this.modalController.componentOnReady();
    await this.modalController.dismiss();
  }

  async confirmar() {

    this.crop.result({ type: "base64", format: "jpeg", size: 'original' }).then(function (base64) {
      document.getElementById("imgbase64").setAttribute("src", base64);
    });    
  }

  readImage(file): Promise<{ croppie: any, imagem: any }> {
    return new Promise<{ croppie: any, imagem: any }>((resolve) => {
      var reader = new FileReader();

      reader.onload = function () {
        var output = document.getElementById('upload-image') as any;
        output.src = reader.result;

        var croppie = new Croppie(output, {
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

        croppie.bind({
          orientation: 4,
          url: output
        });

        resolve({ croppie: croppie, imagem: reader.result });
      }
      reader.readAsDataURL(file);
    });
  }

  async handleUploadImage(event) {
    let file = event.target.files[0];

    if (file) {
      let urlImagem = await this.readImage(file);
      this.crop = urlImagem.croppie;
      this.urlImagem = urlImagem.imagem;
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
        <div>
          <img id="upload-image" style={{ "display": "none" }} />
        </div>
        <div class="croppie-result">
          <img id="imgbase64" />
        </div>
        <input type="file" onChange={(event) => this.handleUploadImage(event)} />
      </ion-content>,
      <ion-modal-controller ref={e => this.modalController = e as any}></ion-modal-controller>,
    ]
  }
}
