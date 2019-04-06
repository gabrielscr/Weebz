import { Component } from '@stencil/core';
import { getEnvironment } from '../../common/base/env-factory';

@Component({
  tag: 'menu-page',
  styleUrl: 'menu-page.scss'
})
export class MenuPage {

  env = getEnvironment();

  render() {
    return [
      <ion-split-pane>

        <ion-menu>
          <ion-header>
            <ion-toolbar color="primary">
              <ion-title class="title-logo" text-center>
                <img class="logo" src="/assets/img/logo.png"></img>
              </ion-title>
            </ion-toolbar>
          </ion-header>
          <ion-content>
            <ion-list lines="none">
              <ion-item-divider>Menu</ion-item-divider>
              <ion-menu-toggle autoHide={false}>
                <ion-item href="#/produto/listar" class="menu-item" routerDirection="root">
                  <ion-icon name="cube" slot="start"></ion-icon> Produtos
                </ion-item>
                <ion-item href="#/marca/listar" class="menu-item" routerDirection="root">
                  <ion-icon name="pricetag" slot="start"></ion-icon> Marcas
                </ion-item>
                <ion-item href="#/quote/list" class="menu-item" routerDirection="root">
                  <ion-icon name="filing" slot="start"></ion-icon> Estoque
                </ion-item>
                <ion-item href="#/quote/list" class="menu-item" routerDirection="root">
                  <ion-icon name="card" slot="start"></ion-icon> Cartões
                </ion-item>
                <ion-item href="#/quote/list" class="menu-item" routerDirection="root">
                  <ion-icon name="barcode" slot="start"></ion-icon> Boletos
                </ion-item>
              </ion-menu-toggle>
              <ion-item-divider>Configurations</ion-item-divider>
              <ion-menu-toggle autoHide={false}>
                <ion-item href="#/system-variation/list" class="menu-item" routerDirection="root">
                  <ion-icon name="cog" slot="start"></ion-icon> Sistema
                </ion-item>
              </ion-menu-toggle>

            </ion-list>
          </ion-content>

        </ion-menu>

        <ion-nav main></ion-nav>

      </ion-split-pane>
    ];
  }

}
