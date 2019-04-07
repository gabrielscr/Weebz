var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop } from '@stencil/core';
let AppRoot = class AppRoot {
    render() {
        return (h("ion-app", null,
            h("ion-router", { useHash: true },
                h("ion-route", { url: "/produto/inserir", component: "produto-inserir-editar" }),
                ",",
                h("ion-route", { url: "/produto/editar/:produtoId", component: "produto-inserir-editar" }),
                ",",
                h("ion-route", { url: "/produto/listar", component: "produto-listar" }),
                h("ion-route", { url: "/marca/inserir", component: "marca-inserir-editar" }),
                ",",
                h("ion-route", { url: "/marca/editar/:marcaId", component: "marca-inserir-editar" }),
                ",",
                h("ion-route", { url: "/marca/listar", component: "marca-listar" })),
            h("menu-page", null),
            h("ion-loading-controller", null),
            // Fix bundle of modal components on Stencil 1.0.0-beta.17
            (window['Force bundle']) ?
                h("div", null,
                    h("ion-searchbar", null),
                    h("ion-buttons", null),
                    h("ion-button", null),
                    h("ion-toolbar", null),
                    h("ion-header", null),
                    h("ion-content", null),
                    h("ion-list", null),
                    h("ion-virtual-scroll", null),
                    h("ion-item", null),
                    h("ion-label", null),
                    h("ion-radio", null),
                    h("ion-checkbox", null),
                    h("ion-radio-group", null),
                    h("ion-icon", null)) : null));
    }
};
__decorate([
    Prop({ connect: "ion-toast-controller" })
], AppRoot.prototype, "toastCtrl", void 0);
AppRoot = __decorate([
    Component({
        tag: 'app-root',
        styleUrl: "app-root.scss"
    })
], AppRoot);
export { AppRoot };
