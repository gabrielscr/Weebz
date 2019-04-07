import { Component, Prop, Method } from '@stencil/core';

@Component({
    tag: 'loader-customizavel'
})
export class LoaderCustomizavel {
    @Prop() message: string;

    @Prop() spinner: string;

    spinnerElement: any;

    loadingController: any;

    @Method()
    async show() {
        await this.loadingController.componentOnReady();

        this.spinnerElement = await this.loadingController.create({
            message: this.message,
            spinner: this.spinner
        });

        await this.spinnerElement.present();
    }

    @Method()
    async dismiss() {
         await this.spinnerElement.dismiss();
    }

    render() {
        return (
            <ion-loading-controller ref={e => this.loadingController = e}></ion-loading-controller>
        )
    }
}
