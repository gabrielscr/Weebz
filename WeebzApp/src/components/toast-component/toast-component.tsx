import { Component, Method, Prop } from '@stencil/core';

@Component({
  tag: 'toast-component'
})
export class ToastComponent {

  @Prop() message: string;

  @Prop() color: string;

  @Prop() duration: number;

  toastController: HTMLIonToastControllerElement;

  @Method()
  async show() {
    await this.toastController.componentOnReady();

    const toast = await this.toastController.create({
      message: this.message,
      duration: this.duration || 2000,
      showCloseButton: true,
      color: this.color || 'danger'
    });

    await toast.present();
  }

  render() {
    return (
      <ion-toast-controller ref={e => this.toastController = e as any}></ion-toast-controller>
    );
  }
}
