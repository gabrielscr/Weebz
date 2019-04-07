/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';

import '@tempusdigital/ionic';
import '@ionic/core';
import 'ionicons';


export namespace Components {

  interface AppRoot {}
  interface AppRootAttributes extends StencilHTMLAttributes {}

  interface LoaderCustomizavel {
    'dismiss': () => Promise<void>;
    'message': string;
    'show': () => Promise<void>;
    'spinner': string;
  }
  interface LoaderCustomizavelAttributes extends StencilHTMLAttributes {
    'message'?: string;
    'spinner'?: string;
  }

  interface SpinnerLoader {}
  interface SpinnerLoaderAttributes extends StencilHTMLAttributes {}

  interface ToastCustomizavel {
    'message': string;
    'showToast': () => Promise<void>;
  }
  interface ToastCustomizavelAttributes extends StencilHTMLAttributes {
    'message'?: string;
  }

  interface MarcaInserirEditar {
    'marcaId': number;
  }
  interface MarcaInserirEditarAttributes extends StencilHTMLAttributes {
    'marcaId'?: number;
  }

  interface MarcaListar {}
  interface MarcaListarAttributes extends StencilHTMLAttributes {}

  interface MarcaSelecionar {
    'marcaSelecionada': any;
  }
  interface MarcaSelecionarAttributes extends StencilHTMLAttributes {
    'marcaSelecionada'?: any;
  }

  interface MenuPage {}
  interface MenuPageAttributes extends StencilHTMLAttributes {}

  interface ProdutoInserirEditar {
    'produtoId': number;
  }
  interface ProdutoInserirEditarAttributes extends StencilHTMLAttributes {
    'produtoId'?: number;
  }

  interface ProdutoListar {}
  interface ProdutoListarAttributes extends StencilHTMLAttributes {}

  interface ToastComponent {
    'color': string;
    'duration': number;
    'message': string;
    'show': () => Promise<void>;
  }
  interface ToastComponentAttributes extends StencilHTMLAttributes {
    'color'?: string;
    'duration'?: number;
    'message'?: string;
  }
}

declare global {
  interface StencilElementInterfaces {
    'AppRoot': Components.AppRoot;
    'LoaderCustomizavel': Components.LoaderCustomizavel;
    'SpinnerLoader': Components.SpinnerLoader;
    'ToastCustomizavel': Components.ToastCustomizavel;
    'MarcaInserirEditar': Components.MarcaInserirEditar;
    'MarcaListar': Components.MarcaListar;
    'MarcaSelecionar': Components.MarcaSelecionar;
    'MenuPage': Components.MenuPage;
    'ProdutoInserirEditar': Components.ProdutoInserirEditar;
    'ProdutoListar': Components.ProdutoListar;
    'ToastComponent': Components.ToastComponent;
  }

  interface StencilIntrinsicElements {
    'app-root': Components.AppRootAttributes;
    'loader-customizavel': Components.LoaderCustomizavelAttributes;
    'spinner-loader': Components.SpinnerLoaderAttributes;
    'toast-customizavel': Components.ToastCustomizavelAttributes;
    'marca-inserir-editar': Components.MarcaInserirEditarAttributes;
    'marca-listar': Components.MarcaListarAttributes;
    'marca-selecionar': Components.MarcaSelecionarAttributes;
    'menu-page': Components.MenuPageAttributes;
    'produto-inserir-editar': Components.ProdutoInserirEditarAttributes;
    'produto-listar': Components.ProdutoListarAttributes;
    'toast-component': Components.ToastComponentAttributes;
  }


  interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {}
  var HTMLAppRootElement: {
    prototype: HTMLAppRootElement;
    new (): HTMLAppRootElement;
  };

  interface HTMLLoaderCustomizavelElement extends Components.LoaderCustomizavel, HTMLStencilElement {}
  var HTMLLoaderCustomizavelElement: {
    prototype: HTMLLoaderCustomizavelElement;
    new (): HTMLLoaderCustomizavelElement;
  };

  interface HTMLSpinnerLoaderElement extends Components.SpinnerLoader, HTMLStencilElement {}
  var HTMLSpinnerLoaderElement: {
    prototype: HTMLSpinnerLoaderElement;
    new (): HTMLSpinnerLoaderElement;
  };

  interface HTMLToastCustomizavelElement extends Components.ToastCustomizavel, HTMLStencilElement {}
  var HTMLToastCustomizavelElement: {
    prototype: HTMLToastCustomizavelElement;
    new (): HTMLToastCustomizavelElement;
  };

  interface HTMLMarcaInserirEditarElement extends Components.MarcaInserirEditar, HTMLStencilElement {}
  var HTMLMarcaInserirEditarElement: {
    prototype: HTMLMarcaInserirEditarElement;
    new (): HTMLMarcaInserirEditarElement;
  };

  interface HTMLMarcaListarElement extends Components.MarcaListar, HTMLStencilElement {}
  var HTMLMarcaListarElement: {
    prototype: HTMLMarcaListarElement;
    new (): HTMLMarcaListarElement;
  };

  interface HTMLMarcaSelecionarElement extends Components.MarcaSelecionar, HTMLStencilElement {}
  var HTMLMarcaSelecionarElement: {
    prototype: HTMLMarcaSelecionarElement;
    new (): HTMLMarcaSelecionarElement;
  };

  interface HTMLMenuPageElement extends Components.MenuPage, HTMLStencilElement {}
  var HTMLMenuPageElement: {
    prototype: HTMLMenuPageElement;
    new (): HTMLMenuPageElement;
  };

  interface HTMLProdutoInserirEditarElement extends Components.ProdutoInserirEditar, HTMLStencilElement {}
  var HTMLProdutoInserirEditarElement: {
    prototype: HTMLProdutoInserirEditarElement;
    new (): HTMLProdutoInserirEditarElement;
  };

  interface HTMLProdutoListarElement extends Components.ProdutoListar, HTMLStencilElement {}
  var HTMLProdutoListarElement: {
    prototype: HTMLProdutoListarElement;
    new (): HTMLProdutoListarElement;
  };

  interface HTMLToastComponentElement extends Components.ToastComponent, HTMLStencilElement {}
  var HTMLToastComponentElement: {
    prototype: HTMLToastComponentElement;
    new (): HTMLToastComponentElement;
  };

  interface HTMLElementTagNameMap {
    'app-root': HTMLAppRootElement
    'loader-customizavel': HTMLLoaderCustomizavelElement
    'spinner-loader': HTMLSpinnerLoaderElement
    'toast-customizavel': HTMLToastCustomizavelElement
    'marca-inserir-editar': HTMLMarcaInserirEditarElement
    'marca-listar': HTMLMarcaListarElement
    'marca-selecionar': HTMLMarcaSelecionarElement
    'menu-page': HTMLMenuPageElement
    'produto-inserir-editar': HTMLProdutoInserirEditarElement
    'produto-listar': HTMLProdutoListarElement
    'toast-component': HTMLToastComponentElement
  }

  interface ElementTagNameMap {
    'app-root': HTMLAppRootElement;
    'loader-customizavel': HTMLLoaderCustomizavelElement;
    'spinner-loader': HTMLSpinnerLoaderElement;
    'toast-customizavel': HTMLToastCustomizavelElement;
    'marca-inserir-editar': HTMLMarcaInserirEditarElement;
    'marca-listar': HTMLMarcaListarElement;
    'marca-selecionar': HTMLMarcaSelecionarElement;
    'menu-page': HTMLMenuPageElement;
    'produto-inserir-editar': HTMLProdutoInserirEditarElement;
    'produto-listar': HTMLProdutoListarElement;
    'toast-component': HTMLToastComponentElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
