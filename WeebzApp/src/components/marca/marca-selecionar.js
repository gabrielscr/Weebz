var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, State, Prop, Listen } from '@stencil/core';
import marcaService from './marca-service';
let MarcaSelecionar = class MarcaSelecionar {
    constructor() {
        this.quantidadeRegistros = 20;
        this.paginaAtual = 1;
        this.tamanhoPagina = 20;
        this.pesquisa = "";
    }
    async ionViewWillEnter() {
        this.marcas = null;
        await this.listarMarcas();
    }
    async listarMarcas() {
        let marcas = await marcaService.listar({
            paginaAtual: this.paginaAtual,
            pesquisa: this.pesquisa,
            tamanhoPagina: this.tamanhoPagina
        });
        this.quantidadeRegistros = marcas.length;
        let deletarPrimeiroItem = false;
        if (!this.marcas) {
            this.marcas =
                [{
                        id: 1,
                        descricao: '',
                        selecionado: false
                    }];
            deletarPrimeiroItem = true;
        }
        this.marcas = [...this.marcas, ...marcas];
        if (deletarPrimeiroItem)
            this.marcas.shift();
    }
    async pesquisar(e) {
        await this.loader.show();
        this.pesquisa = e.target.value;
        this.paginaAtual = 1;
        this.marcas = null;
        await this.listarMarcas();
        await this.loader.dismiss();
    }
    handleMarcaSelecionada(marca) {
        this.marcas.find(e => e.id == marca.id).selecionado = true;
    }
    verificarMarcaSelecionada(marca) {
        if (this.marcaSelecionada) {
            if (this.marcaSelecionada.id == marca.id)
                return this.marcaSelecionada.selecionado;
        }
        else
            return false;
    }
    renderMarca(marca) {
        return (h("ion-item", null,
            h("ion-label", null, marca.descricao),
            h("ion-radio", { checked: this.verificarMarcaSelecionada(marca), onClick: () => this.handleMarcaSelecionada(marca) })));
    }
    renderMarcas() {
        return [
            h("ion-radio-group", { allowEmptySelection: true }, this.marcas.map(marca => this.renderMarca(marca)))
        ];
    }
    renderizarNenhumRegistroEncontrado() {
        return (h("ion-item", { lines: "none" },
            h("ion-label", { "text-center": true }, "Nenhum registro encontrado.")));
    }
    async confirmar() {
        let marcaSelecionada = this.marcas.find(e => e.selecionado);
        await this.modalController.componentOnReady();
        await this.modalController.dismiss({
            data: marcaSelecionada
        });
    }
    async fechar() {
        await this.modalController.componentOnReady();
        await this.modalController.dismiss();
    }
    async carregarDadosInfiniteScroll(e) {
        this.paginaAtual += 1;
        setTimeout(async () => {
            await this.listarMarcas();
            e.target.complete();
        }, 500);
    }
    renderizarInfiniteScroll() {
        if (this.marcas && this.marcas.length >= 20) {
            return (h("ion-infinite-scroll", { disabled: this.quantidadeRegistros < 20, onIonInfinite: e => this.carregarDadosInfiniteScroll(e) },
                h("ion-infinite-scroll-content", { loadingSpinner: "bubbles", loadingText: "Carregando..." })));
        }
    }
    render() {
        return [
            h("ion-header", null,
                h("ion-toolbar", { color: 'primary' },
                    h("ion-title", null, "Marcas"),
                    h("ion-buttons", { slot: "start" },
                        h("ion-button", { onClick: () => this.fechar() },
                            h("ion-icon", { name: "arrow-back" }))),
                    h("ion-buttons", { slot: "end" },
                        h("ion-button", { onClick: () => this.confirmar() }, "Confirmar"))),
                h("ion-toolbar", { color: "primary" },
                    h("ion-searchbar", { placeholder: "pesquise por descri\u00E7\u00E3o", debounce: 500, onIonChange: e => this.pesquisar(e) }))),
            h("ion-content", null,
                h("ion-list", null,
                    this.marcas ?
                        this.marcas.length > 0 ?
                            this.renderMarcas()
                            : this.renderizarNenhumRegistroEncontrado()
                        : h("spinner-loader", null),
                    this.renderizarInfiniteScroll())),
            h("ion-modal-controller", { ref: e => this.modalController = e }),
            h("loader-customizavel", { ref: e => this.loader = e, message: "Por favor, aguarde...", spinner: "crescent" })
        ];
    }
};
__decorate([
    State()
], MarcaSelecionar.prototype, "marcas", void 0);
__decorate([
    State()
], MarcaSelecionar.prototype, "quantidadeRegistros", void 0);
__decorate([
    Prop()
], MarcaSelecionar.prototype, "marcaSelecionada", void 0);
__decorate([
    Listen('ionViewWillEnter')
], MarcaSelecionar.prototype, "ionViewWillEnter", null);
MarcaSelecionar = __decorate([
    Component({
        tag: 'marca-selecionar'
    })
], MarcaSelecionar);
export { MarcaSelecionar };
