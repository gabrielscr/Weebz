var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Method, Prop } from '@stencil/core';
let ToastComponent = class ToastComponent {
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
        return (h("ion-toast-controller", { ref: e => this.toastController = e }));
    }
};
__decorate([
    Prop()
], ToastComponent.prototype, "message", void 0);
__decorate([
    Prop()
], ToastComponent.prototype, "color", void 0);
__decorate([
    Prop()
], ToastComponent.prototype, "duration", void 0);
__decorate([
    Method()
], ToastComponent.prototype, "show", null);
ToastComponent = __decorate([
    Component({
        tag: 'toast-component'
    })
], ToastComponent);
export { ToastComponent };
