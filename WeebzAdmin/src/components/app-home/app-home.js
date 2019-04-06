var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, State } from '@stencil/core';
let AppHome = class AppHome {
    async handleEditarImagem() {
        await this.modalController.componentOnReady();
        let modal = await this.modalController.create({
            component: 'upload-image-modal',
            cssClass: 'upload-image-modal',
            componentProps: { headerColor: 'dark', buttonColor: 'dark' }
        });
        await modal.present();
        let result = await modal.onDidDismiss();
        this.urlImagem = result.data;
        console.log(this.urlImagem);
    }
    render() {
        return [
            h("ion-header", null,
                h("ion-toolbar", { color: "dark" },
                    h("ion-title", null, "Teste"))),
            h("ion-content", null,
                h("ion-menu", { side: "start", menuId: "first" },
                    h("ion-header", null,
                        h("ion-toolbar", { color: "primary" },
                            h("ion-title", null, "Start Menu"))),
                    h("ion-content", null,
                        h("ion-list", null,
                            h("ion-item", null, "Menu Item"),
                            h("ion-item", null, "Menu Item"),
                            h("ion-item", null, "Menu Item"),
                            h("ion-item", null, "Menu Item"),
                            h("ion-item", null, "Menu Item"))))),
            h("ion-content", { padding: true },
                h("ion-list", null,
                    h("img", { id: "cropped-image", src: this.urlImagem }),
                    h("ion-button", { onClick: () => this.handleEditarImagem(), color: "dark", fill: "outline" }, "Editar"))),
            h("ion-modal-controller", { class: "teste", ref: e => this.modalController = e })
        ];
    }
};
__decorate([
    State()
], AppHome.prototype, "urlImagem", void 0);
AppHome = __decorate([
    Component({
        tag: 'app-home',
        styleUrl: 'app-home.css'
    })
], AppHome);
export { AppHome };
