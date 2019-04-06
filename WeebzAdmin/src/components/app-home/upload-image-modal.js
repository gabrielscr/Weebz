var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop } from '@stencil/core';
import Croppie from 'croppie';
let UploadImageModal = class UploadImageModal {
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
                    url: reader.result
                });
            };
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
            h("ion-header", null,
                h("ion-toolbar", { color: this.headerColor },
                    h("ion-title", null, "Editar Imagem"),
                    h("ion-buttons", { slot: "start" },
                        h("ion-button", { onClick: () => this.voltar() },
                            h("ion-icon", { name: "arrow-back" }))),
                    h("ion-buttons", { slot: "end" },
                        h("ion-button", { onClick: () => this.confirmar() }, "Confirmar")))),
            h("ion-content", null,
                h("div", { class: "container", ref: e => this.cropElement = e }),
                h("ion-grid", null,
                    h("ion-row", null,
                        h("ion-col", { "text-center": true },
                            h("ion-item", null,
                                h("label", { htmlFor: "selecao-arquivo" }, "UPLOAD"),
                                h("input", { id: "selecao-arquivo", type: "file", onChange: (event) => this.handleUploadImage(event) }))),
                        h("ion-col", { "text-center": true },
                            h("ion-button", { onClick: () => this.handleLeftRotationButton(), color: this.buttonColor, fill: "clear" },
                                h("ion-icon", { name: "return-left" }))),
                        h("ion-col", { "text-center": true },
                            h("ion-button", { onClick: () => this.handleRightRotationButton(), color: this.buttonColor, fill: "clear" },
                                h("ion-icon", { name: "return-right" }))),
                        h("ion-col", { "text-center": true },
                            h("ion-button", { onClick: () => this.handleInverterButton(), color: this.buttonColor, fill: "clear" },
                                h("ion-icon", { name: "redo" })))))),
            h("ion-modal-controller", { ref: e => this.modalController = e })
        ];
    }
};
__decorate([
    Prop()
], UploadImageModal.prototype, "headerColor", void 0);
__decorate([
    Prop()
], UploadImageModal.prototype, "buttonColor", void 0);
UploadImageModal = __decorate([
    Component({
        tag: 'upload-image-modal',
        styleUrl: 'upload-image-modal.css'
    })
], UploadImageModal);
export { UploadImageModal };
