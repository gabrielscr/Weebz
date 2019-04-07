var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@stencil/core';
import { getEnvironment } from '../../common/base/env-factory';
let MenuPage = class MenuPage {
    constructor() {
        this.env = getEnvironment();
    }
    render() {
        return [
            h("ion-split-pane", null,
                h("ion-menu", null,
                    h("ion-header", null,
                        h("ion-toolbar", { color: "primary" },
                            h("ion-title", { class: "title-logo", "text-center": true },
                                h("img", { class: "logo", src: "/assets/img/logo.png" })))),
                    h("ion-content", null,
                        h("ion-list", { lines: "none" },
                            h("ion-item-divider", null, "Menu"),
                            h("ion-menu-toggle", { autoHide: false },
                                h("ion-item", { href: "#/produto/listar", class: "menu-item", routerDirection: "root" },
                                    h("ion-icon", { name: "cube", slot: "start" }),
                                    " Produtos"),
                                h("ion-item", { href: "#/marca/listar", class: "menu-item", routerDirection: "root" },
                                    h("ion-icon", { name: "pricetag", slot: "start" }),
                                    " Marcas"),
                                h("ion-item", { href: "#/quote/list", class: "menu-item", routerDirection: "root" },
                                    h("ion-icon", { name: "filing", slot: "start" }),
                                    " Estoque"),
                                h("ion-item", { href: "#/quote/list", class: "menu-item", routerDirection: "root" },
                                    h("ion-icon", { name: "card", slot: "start" }),
                                    " Cart\u00F5es"),
                                h("ion-item", { href: "#/quote/list", class: "menu-item", routerDirection: "root" },
                                    h("ion-icon", { name: "barcode", slot: "start" }),
                                    " Boletos")),
                            h("ion-item-divider", null, "Configurations"),
                            h("ion-menu-toggle", { autoHide: false },
                                h("ion-item", { href: "#/system-variation/list", class: "menu-item", routerDirection: "root" },
                                    h("ion-icon", { name: "cog", slot: "start" }),
                                    " Sistema"))))),
                h("ion-nav", { main: true }))
        ];
    }
};
MenuPage = __decorate([
    Component({
        tag: 'menu-page',
        styleUrl: 'menu-page.scss'
    })
], MenuPage);
export { MenuPage };
