var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop, Method } from '@stencil/core';
let LoaderCustomizavel = class LoaderCustomizavel {
    async show() {
        await this.loadingController.componentOnReady();
        this.spinnerElement = await this.loadingController.create({
            message: this.message,
            spinner: this.spinner
        });
        await this.spinnerElement.present();
    }
    async dismiss() {
        await this.spinnerElement.dismiss();
    }
    render() {
        return (h("ion-loading-controller", { ref: e => this.loadingController = e }));
    }
};
__decorate([
    Prop()
], LoaderCustomizavel.prototype, "message", void 0);
__decorate([
    Prop()
], LoaderCustomizavel.prototype, "spinner", void 0);
__decorate([
    Method()
], LoaderCustomizavel.prototype, "show", null);
__decorate([
    Method()
], LoaderCustomizavel.prototype, "dismiss", null);
LoaderCustomizavel = __decorate([
    Component({
        tag: 'loader-customizavel'
    })
], LoaderCustomizavel);
export { LoaderCustomizavel };
