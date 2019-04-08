import { Component, State, Prop, Listen } from '@stencil/core';
import marcaService from './marca-service';

@Component({
  tag: 'marca-selecionar'
})
export class MarcaSelecionar {

  @State() marcas: ListaMarcas[];

  @State() quantidadeRegistros: number = 20;

  @Prop() marcaSelecionada: any;

  modalController: HTMLIonModalControllerElement;

  paginaAtual: number = 1;

  tamanhoPagina: number = 20;

  pesquisa: string = "";

  loader: HTMLLoaderCustomizavelElement;

  @Listen('ionViewWillEnter')
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

    this.quantidadeRegistros = marcas.marcas.length;

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

    this.marcas = [...this.marcas, ...marcas.marcas];

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

  handleMarcaSelecionada(marca: ListaMarcas) {
    this.marcas.find(e => e.id == marca.id).selecionado = true;
  }

  verificarMarcaSelecionada(marca: ListaMarcas) {
    if (this.marcaSelecionada) {
      if (this.marcaSelecionada.id == marca.id)
        return this.marcaSelecionada.selecionado;
    } else
      return false;
  }

  renderMarca(marca: ListaMarcas) {
    return (
      <ion-item>
        <ion-label>{marca.descricao}</ion-label>
        <ion-radio checked={this.verificarMarcaSelecionada(marca)} onClick={() => this.handleMarcaSelecionada(marca)}></ion-radio>
      </ion-item>
    )
  }

  renderMarcas() {
    return [
      <ion-radio-group allowEmptySelection={true}>
        {this.marcas.map(marca => this.renderMarca(marca))}
      </ion-radio-group>
    ];
  }

  renderizarNenhumRegistroEncontrado() {
    return (
      <ion-item lines="none">
        <ion-label text-center>Nenhum registro encontrado.</ion-label>
      </ion-item>
    );
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
      return (
        <ion-infinite-scroll disabled={this.quantidadeRegistros < 20} onIonInfinite={e => this.carregarDadosInfiniteScroll(e)}>
          <ion-infinite-scroll-content
            loadingSpinner="bubbles"
            loadingText="Carregando...">
          </ion-infinite-scroll-content>
        </ion-infinite-scroll>
      );
    }
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color='primary'>
          <ion-title>Marcas</ion-title>
          <ion-buttons slot="start">
            <ion-button onClick={() => this.fechar()}>
              <ion-icon name="arrow-back"></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-buttons slot="end">
            <ion-button onClick={() => this.confirmar()}>Confirmar</ion-button>
          </ion-buttons>
        </ion-toolbar>
        <ion-toolbar color="primary">
          <ion-searchbar placeholder="pesquise por descrição" debounce={500} onIonChange={e => this.pesquisar(e)}></ion-searchbar>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <ion-list>
          {
            this.marcas ?
              this.marcas.length > 0 ?
                this.renderMarcas()
                : this.renderizarNenhumRegistroEncontrado()
              : <spinner-loader></spinner-loader>
          }
          {this.renderizarInfiniteScroll()}
        </ion-list>
      </ion-content>,
      <ion-modal-controller ref={e => this.modalController = e as any}></ion-modal-controller>,
      <loader-customizavel
        ref={e => this.loader = e as any}
        message="Por favor, aguarde..."
        spinner="crescent">
      </loader-customizavel>
    ];
  }
}

interface ListaMarcas {
  id: number;
  descricao: string;
  selecionado?: boolean;
}
