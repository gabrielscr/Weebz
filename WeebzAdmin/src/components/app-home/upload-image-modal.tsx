import { Component, Prop } from '@stencil/core';
import Croppie from 'croppie';

@Component({
  tag: 'upload-image-modal',
  styleUrl: 'upload-image-modal.css'
})
export class UploadImageModal {

  modalController: HTMLIonModalControllerElement;

  crop: Croppie;

  resultadoFinal: any;

  cropElement: HTMLElement;

  @Prop() headerColor: string;

  @Prop() buttonColor: string;

  @Prop() buttonRotateLeftTitle: string;

  @Prop() buttonRotateRightTitle: string;

  @Prop() buttonInverseTitle: string;

  @Prop() modalTitle: string;

  @Prop() buttonConfirmTitle: string;

  componentDidLoad() {
    this.crop = new Croppie(this.cropElement, {
      enableExif: true,
      enableOrientation: true,
      viewport: {
        width: 250,
        height: 250,
        type: 'circle',
      },
      boundary: {
        width: 250,
        height: 250,
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

  handleInverterButton() {
    this.crop.rotate(-180);
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color={this.headerColor}>
          <ion-title>{this.modalTitle}</ion-title>
          <ion-buttons slot="start">
            <ion-button onClick={() => this.voltar()}>
              <ion-icon name="arrow-back"></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-buttons slot="end" >
            <ion-button onClick={() => this.confirmar()} >
              {this.buttonConfirmTitle}
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <br/>
        <div class="container" ref={e => this.cropElement = e}>
        </div>
        <ion-grid>
          <ion-row>
            <ion-col text-center>
              <ion-item>
                <label htmlFor="selecao-arquivo">UPLOAD</label>
                <input id="selecao-arquivo" type="file" onChange={(event) => this.handleUploadImage(event)} />
              </ion-item>
            </ion-col>
            <ion-col text-center>
              <ion-button title={this.buttonRotateLeftTitle} onClick={() => this.handleLeftRotationButton()} color={this.buttonColor} fill="clear">
                <ion-icon name="return-left"></ion-icon>
              </ion-button>
            </ion-col>
              <ion-col text-center>
              <ion-button title={this.buttonRotateRightTitle} onClick={() => this.handleRightRotationButton()} color={this.buttonColor} fill="clear">
                <ion-icon name="return-right"></ion-icon>
                </ion-button>
            </ion-col>
            <ion-col text-center>
              <ion-button title={this.buttonInverseTitle} onClick={() => this.handleInverterButton()} color={this.buttonColor} fill="clear">
                <ion-icon name="redo"></ion-icon>
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>,
      <ion-modal-controller ref={e => this.modalController = e as any}></ion-modal-controller>
    ]
  }
}
