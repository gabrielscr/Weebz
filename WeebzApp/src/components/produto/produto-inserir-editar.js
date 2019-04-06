var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, State, Prop, Element } from '@stencil/core';
import { handleChange } from '../../common/base/handle-change';
import produtoService from './produto-service';
import routerService from '../../common/base/router-service';
let ProdutoInserirEditar = class ProdutoInserirEditar {
    handleChange(e) {
        handleChange(e, this, 'state');
    }
    componentWillLoad() {
        this.load();
    }
    async load() {
        if (this.produtoId)
            this.state = await produtoService.obterParaEditar({ id: this.produtoId });
        else
            this.state = {
                id: await produtoService.getNextId(),
                descricao: '',
                valor: 0
            };
    }
    async confirmar(e) {
        e.preventDefault();
        await this.formController.componentOnReady();
        await this.formController.processSubmit(this.form, async () => {
            if (this.state.id)
                await produtoService.editar(this.state);
            else
                await produtoService.inserir(this.state);
            let modal = this.host.closest('ion-modal');
            if (modal) {
                await modal.dismiss();
                return;
            }
            await routerService.goBack('product-list');
        });
    }
    renderForm() {
        return (h("form", { ref: form => this.form = form, onSubmit: e => this.confirmar(e), novalidate: true },
            h("t-message-summary", null),
            h("ion-list", null,
                h("ion-item", null,
                    h("ion-label", { position: "floating" }, "Id"),
                    h("ion-input", { name: "id", type: "number", disabled: !!this.produtoId, step: "1", min: "1", required: true, value: this.state.id, onIonChange: e => this.handleChange(e) }),
                    h("t-message", { name: "id" })),
                h("ion-item", null,
                    h("ion-label", { position: "floating" }, "Descricao"),
                    h("ion-input", { name: "descricao", required: true, maxlength: 150, value: this.state.descricao, onIonChange: e => this.handleChange(e), autofocus: true }),
                    h("t-message", { name: "descricao" })),
                h("ion-item", null,
                    h("ion-label", { position: "floating" }, "Valor"),
                    h("ion-input", { name: "valor", type: "number", step: "1", min: "0", required: true, value: this.state.valor, onIonChange: e => this.handleChange(e) }),
                    h("t-message", { name: "valor" })))));
    }
    render() {
        return [
            h("ion-header", null,
                h("ion-toolbar", { color: "primary" },
                    h("ion-buttons", { slot: "start" },
                        h("ion-back-button", { defaultHref: '/product/list' })),
                    h("ion-title", null,
                        this.produtoId ? 'Editar' : 'Inserir',
                        " Produto"),
                    h("ion-buttons", { slot: "end" },
                        h("ion-button", { onClick: e => this.confirmar(e), disabled: !this.state }, "Confirm")))),
            h("ion-content", null,
                h("t-container", null, this.state
                    ? this.renderForm()
                    : h("center", null,
                        h("ion-spinner", { name: "dots" })))),
            h("t-form-controller", { ref: p => this.formController = p })
        ];
    }
};
__decorate([
    Prop()
], ProdutoInserirEditar.prototype, "produtoId", void 0);
__decorate([
    State()
], ProdutoInserirEditar.prototype, "state", void 0);
__decorate([
    Element()
], ProdutoInserirEditar.prototype, "host", void 0);
ProdutoInserirEditar = __decorate([
    Component({
        tag: 'produto-inserir-editar',
        styles: `
  ion-modal produto-inserir-editar ion-back-button {
    display: none !important;
  }
  `
    })
], ProdutoInserirEditar);
export { ProdutoInserirEditar };
