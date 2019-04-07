import { Component, State, Listen, Prop } from '@stencil/core';
import marcaService from './marca-service';
import Api from '../../common/base/api.typings';


@Component({
  tag: 'marca-listar'
})
export class MarcaListar {
  @State() marcas: Api.Marca.Listar.MarcaDto[];

  @State() quantidadeRegistros: number = 20;

  @Prop({ connect: 'ion-alert-controller' }) alertController: any;

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

    this.quantidadeRegistros = marcas.length;

    let deletarPrimeiroItem = false;

    if (!this.marcas) {
      this.marcas =
        [{
          id: 1,
          descricao: ''
        }];

      deletarPrimeiroItem = true;
    }

    if (deletarPrimeiroItem)
      this.marcas.shift();
  }

  async excluir(e, id: number) {
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();

    await this.alertController.componentOnReady();

    let alert = await this.alertController.create({
      header: 'Excluir',
      message: 'Esta ação não pode ser desfeita',
      buttons: [
        {
          role: 'cancel',
          text: 'Cancelar'
        },
        {
          text: 'Confirmar',
          handler: async () => {
            await this.loader.show();
            await marcaService.excluir({ id: id });
            this.marcas = null;
            await this.listarMarcas();
            await this.loader.dismiss();
          }
        }]
    });

    await alert.present();
  }

  renderizarMarca(marca: Api.Marca.Listar.MarcaDto) {
    return (
      <ion-item button onClick={() => this.redirecionar(marca.id)}>
        <ion-label>Descrição</ion-label>
        <ion-button slot="end" fill="clear" onClick={e => this.excluir(e, marca.id)}>
          <ion-icon color="danger" name="trash"></ion-icon>
        </ion-button>
      </ion-item>
    );
  }

  renderizarMarcas() {
    return (
      this.marcas.map(e => this.renderizarMarca(e))
    );
  }

  renderizarNenhumRegistroEncontrado() {
    return (
      <ion-item lines="none">
        <ion-label text-center>Nenhum registro encontrado.</ion-label>
      </ion-item>
    );
  }

  async pesquisar(e) {
    await this.loader.show();
    this.pesquisa = e.target.value;
    this.paginaAtual = 1;
    this.marcas = null;
    await this.listarMarcas();
    await this.loader.dismiss();
  }

  redirecionar(id?: number) {
    let nav = document.querySelector('ion-nav');
    nav.push('marca-inserir-editar', { marcaId: id });
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
        <ion-toolbar color="primary">
          <ion-title>Marcas</ion-title>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
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
                this.renderizarMarcas() :
                this.renderizarNenhumRegistroEncontrado() :
              <spinner-loader></spinner-loader>
          }
          {this.renderizarInfiniteScroll()}
        </ion-list>
        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
          <ion-fab-button onClick={() => this.redirecionar()}>
            <ion-icon name="add"></ion-icon>
          </ion-fab-button>
        </ion-fab>
      </ion-content>,
      <loader-customizavel
        ref={e => this.loader = e as any}
        message="Por favor, aguarde..."
        spinner="crescent">
      </loader-customizavel>
    ];
  }
}
