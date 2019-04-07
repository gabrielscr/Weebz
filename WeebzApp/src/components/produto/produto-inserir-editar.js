var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, State, Prop, Element } from '@stencil/core';
import { handleChange } from '../../common/base/handle-change';
import produtoService from './produto-service';
import marcaService from '../marca/marca-service';
import routerService from '../../common/base/router-service';
import imageService from '../../common/base/image-service';
let ProdutoInserirEditar = class ProdutoInserirEditar {
    constructor() {
        this.marcaDescricaoId = 0;
    }
    handleChange(e) {
        handleChange(e, this, 'state');
    }
    componentWillLoad() {
        this.load();
    }
    async load() {
        let marcaTask = marcaService.listar();
        if (this.produtoId)
            this.state = await produtoService.obterParaEditar({ id: this.produtoId });
        else
            this.state = {
                id: await produtoService.getNextId(),
                descricao: '',
                valor: 0,
                ativo: false,
                especificacoesTecnicas: '',
                titulo: ''
            };
        this.marcaOptions = (await marcaTask).marcas.map(r => ({ value: r.id.toString(), text: r.descricao }));
    }
    async confirmar(e) {
        e.preventDefault();
        this.state.caminhoImagem = this.caminhoImagem;
        this.state.nomeImagem = this.nomeImagem;
        let data = Object.assign({}, this.state, { marcas: this.state.marcas.filter(r => !!r.marcaId) });
        await this.formController.componentOnReady();
        await this.formController.processSubmit(this.form, async () => {
            if (this.state.id)
                await produtoService.editar(data);
            else
                await produtoService.inserir(data);
            let modal = this.host.closest('ion-modal');
            if (modal) {
                await modal.dismiss();
                return;
            }
            await routerService.goBack('produto-listar');
        });
    }
    handleImageChange(e) {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            let image = reader.result.toString().replace(/^data:image\/[a-z]+;base64,/, "");
            this.nomeImagem = file.name;
            this.caminhoImagem = image;
        };
        reader.readAsDataURL(file);
    }
    ensureHasEmptyMarca() {
        let someEmpty = this.state.marcas.some(r => !r.marcaId);
        if (!someEmpty) {
            this.state = Object.assign({}, this.state, { marcas: [
                    ...this.state.marcas,
                    {
                        id: --this.marcaDescricaoId,
                        descricao: null,
                        marcaId: null
                    }
                ] });
        }
    }
    handleMarcaIdChange(option, e) {
        option.marcaId = e.target.value;
        this.ensureHasEmptyMarca();
    }
    handleMarcaDescricaoChange(option, e) {
        option.descricao = e.target.value;
    }
    excluirMarca(option) {
        this.state = Object.assign({}, this.state, { marcas: this.state.marcas.filter(p => p != option) });
        this.ensureHasEmptyMarca();
    }
    renderMarcas() {
        return [
            h("t-message", { name: "marcas" }),
            h("ion-list-header", null,
                h("h5", null, "Marcas")),
            h("ion-grid", null, this.state.marcas.map(option => h("ion-row", null,
                h("ion-col", null,
                    h("ion-item", null,
                        h("t-combobox", { placeholder: "Adicione uma marca", value: option.marcaId, options: this.marcaOptions, onChange: e => this.handleMarcaIdChange(option, e), readonly: option.id > 0 }))),
                h("ion-col", null, option.marcaId
                    ?
                        h("ion-item", { lines: "none" },
                            h("ion-input", { name: 'descricao' + option.id, placeholder: "Descri\u00E7\u00E3o", value: option.descricao, maxlength: 60, onIonChange: e => this.handleMarcaDescricaoChange(option, e), required: true }),
                            h("t-message", { name: 'descricao' + option.id }))
                    : null),
                h("ion-col", { size: "1" },
                    h("ion-button", { fill: "clear", hidden: !option.descricao, onClick: () => this.excluirMarca(option) },
                        h("ion-icon", { name: "close" }))))))
        ];
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
                    h("ion-label", { position: "floating" }, "T\u00EDtulo"),
                    h("ion-input", { name: "titulo", required: true, maxlength: 100, value: this.state.titulo, onIonChange: e => this.handleChange(e), autofocus: true }),
                    h("t-message", { name: "titulo" })),
                h("ion-item", null,
                    h("ion-label", { position: "floating" }, "Descri\u00E7\u00E3o"),
                    h("ion-textarea", { name: "descricao", required: true, maxlength: 2000, value: this.state.descricao, onIonChange: e => this.handleChange(e), autofocus: true }),
                    h("t-message", { name: "descricao" })),
                h("ion-item", null,
                    h("ion-label", { position: "floating" }, "Especifica\u00E7\u00F5es T\u00E9cnicas"),
                    h("ion-textarea", { name: "especificacoesTecnicas", required: true, maxlength: 5000, value: this.state.especificacoesTecnicas, onIonChange: e => this.handleChange(e), autofocus: true }),
                    h("t-message", { name: "especificacoesTecnicas" })),
                h("ion-item", null,
                    h("ion-label", { position: "floating" }, "Valor"),
                    h("ion-input", { name: "valor", type: "number", step: "1", min: "1", required: true, value: this.state.valor, onIonChange: e => this.handleChange(e) }),
                    h("t-message", { name: "valor" })),
                h("ion-item", null,
                    h("ion-label", null, "Ativo"),
                    h("ion-toggle", { value: this.state.ativo, onIonChange: e => this.handleChange(e) })),
                h("ion-item", null,
                    h("ion-label", null, "Upload image"),
                    h("input", { type: "file", accept: "image/jpeg, image/jpg, image/png", onChange: e => this.handleImageChange(e) })),
                h("ion-item", { lines: "none" },
                    h("ion-label", null, "Foto do produto"),
                    this.state && this.state.caminhoImagem ?
                        h("img", { class: "t-image", src: imageService.getImageUrl(this.state.caminhoImagem) })
                        : null),
                h("br", null),
                this.renderMarcas())));
    }
    render() {
        return [
            h("ion-header", null,
                h("ion-toolbar", { color: "primary" },
                    h("ion-buttons", { slot: "start" },
                        h("ion-back-button", { defaultHref: '/produto/listar' })),
                    h("ion-title", null,
                        this.produtoId ? 'Editar' : 'Inserir',
                        " Produto"),
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
], ProdutoInserirEditar.prototype, "produtoId", void 0);
__decorate([
    State()
], ProdutoInserirEditar.prototype, "state", void 0);
__decorate([
    Element()
], ProdutoInserirEditar.prototype, "host", void 0);
__decorate([
    State()
], ProdutoInserirEditar.prototype, "marcaOptions", void 0);
ProdutoInserirEditar = __decorate([
    Component({
        tag: 'produto-inserir-editar',
        styleUrl: 'produto-inserir-editar.scss'
    })
], ProdutoInserirEditar);
export { ProdutoInserirEditar };
