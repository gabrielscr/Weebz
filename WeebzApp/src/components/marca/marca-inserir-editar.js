var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, State, Prop, Element } from '@stencil/core';
import { handleChange } from '../../common/base/handle-change';
import marcaService from './marca-service';
import routerService from '../../common/base/router-service';
let MarcaInserirEditar = class MarcaInserirEditar {
    handleChange(e) {
        handleChange(e, this, 'state');
    }
    componentWillLoad() {
        this.load();
    }
    async load() {
        if (this.marcaId)
            this.state = await marcaService.obterParaEditar({ id: this.marcaId });
        else
            this.state = {
                id: await marcaService.getNextId(),
                descricao: ''
            };
    }
    async confirmar(e) {
        e.preventDefault();
        await this.formController.componentOnReady();
        await this.formController.processSubmit(this.form, async () => {
            if (this.state.id)
                await marcaService.editar(this.state);
            else
                await marcaService.inserir(this.state);
            let modal = this.host.closest('ion-modal');
            if (modal) {
                await modal.dismiss();
                return;
            }
            await routerService.goBack('marca-listar');
        });
    }
    renderForm() {
        return (h("form", { ref: form => this.form = form, onSubmit: e => this.confirmar(e), novalidate: true },
            h("t-message-summary", null),
            h("ion-list", null,
                h("ion-item", null,
                    h("ion-label", { position: "floating" }, "Id"),
                    h("ion-input", { name: "id", type: "number", disabled: !!this.marcaId, step: "1", min: "1", required: true, value: this.state.id, onIonChange: e => this.handleChange(e) }),
                    h("t-message", { name: "id" })),
                h("ion-item", null,
                    h("ion-label", { position: "floating" }, "Descri\u00E7\u00E3o"),
                    h("ion-input", { name: "descricao", required: true, maxlength: 2000, value: this.state.descricao, onIonChange: e => this.handleChange(e), autofocus: true }),
                    h("t-message", { name: "descricao" })))));
    }
    render() {
        return [
            h("ion-header", null,
                h("ion-toolbar", { color: "primary" },
                    h("ion-buttons", { slot: "start" },
                        h("ion-back-button", { defaultHref: '/marca/listar' })),
                    h("ion-title", null,
                        this.marcaId ? 'Editar' : 'Inserir',
                        " Marca"),
                    h("ion-buttons", { slot: "end" },
                        h("ion-button", { onClick: e => this.confirmar(e), disabled: !this.state }, "Confirmar")))),
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
], MarcaInserirEditar.prototype, "marcaId", void 0);
__decorate([
    State()
], MarcaInserirEditar.prototype, "state", void 0);
__decorate([
    Element()
], MarcaInserirEditar.prototype, "host", void 0);
MarcaInserirEditar = __decorate([
    Component({
        tag: 'marca-inserir-editar',
        styleUrl: 'marca-inserir-editar.scss'
    })
], MarcaInserirEditar);
export { MarcaInserirEditar };
