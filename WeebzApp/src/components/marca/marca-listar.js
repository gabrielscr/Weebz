var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, State, Listen } from '@stencil/core';
import marcaService from './marca-service';
let MarcaListar = class MarcaListar {
    ionViewWillEnter() {
        this.load();
    }
    async load() {
        this.state = await marcaService.listar();
    }
    async delete(e, id, name) {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
        if (confirm('Você deseja mesmo deletar?')) {
            try {
                await marcaService.excluir({ id });
            }
            catch (e) {
                this.toastController.message = `${name} em uso. Não é possível deletar.`;
                await this.toastController.show();
                throw e;
            }
            await this.load();
        }
    }
    insert() {
        const nav = document.querySelector('ion-nav');
        nav.push('marca-inserir-editar');
    }
    renderMarca(a) {
        return (h("ion-item", { href: `/marca/editar/${a.id}` },
            h("ion-label", null, a.descricao),
            h("ion-button", { slot: "end", fill: "clear", onClick: e => this.delete(e, a.id, a.descricao) },
                h("ion-icon", { color: "danger", name: "trash" }))));
    }
    render() {
        return [
            h("ion-header", null,
                h("ion-toolbar", { color: "primary" },
                    h("ion-buttons", { slot: "start" },
                        h("ion-menu-toggle", null,
                            h("ion-button", null,
                                h("ion-icon", { slot: "icon-only", name: "menu" })))),
                    h("ion-title", null, "Marcas"))),
            h("ion-content", null,
                h("t-container", null,
                    h("ion-list", { lines: "full", "data-list": true, "data-list-hover": true }, this.state
                        ? this.state.marcas && this.state.marcas.length
                            ? this.state.marcas.map(a => this.renderMarca(a))
                            : h("p", null,
                                h("center", null, "Nenhum item encontrado"))
                        : h("p", null,
                            h("center", null,
                                h("ion-spinner", { name: "dots" }))))),
                h("ion-fab", { horizontal: "end", vertical: "bottom", slot: "fixed" },
                    h("ion-fab-button", { onClick: this.insert.bind(this) },
                        h("ion-icon", { name: "add" })))),
            h("toast-component", { ref: e => this.toastController = e })
        ];
    }
};
__decorate([
    State()
], MarcaListar.prototype, "state", void 0);
__decorate([
    Listen('ionViewWillEnter')
], MarcaListar.prototype, "ionViewWillEnter", null);
MarcaListar = __decorate([
    Component({
        tag: 'marca-listar'
    })
], MarcaListar);
export { MarcaListar };
