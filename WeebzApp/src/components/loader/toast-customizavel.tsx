import { Component, Prop, Method } from '@stencil/core';

@Component({
    tag: 'toast-customizavel'
})
export class ToastCustomizavel {
    toastController: any;

    @Prop() message: string;

    @Method()
    async showToast() {
        const toast = await this.toastController.create({
            message: this.message,
            duration: 2500
          });
          
          await toast.present();
    }

    render() {
        return (<ion-toast-controller ref={e => this.toastController = e as any}></ion-toast-controller>)
    }
}