import './stencil.core';
/**
 * This is an autogenerated file created by the Stencil build process.
 * It contains typing information for all components that exist in this project
 * and imports for stencil collections that might be configured in your stencil.config.js file
 */

import './stencil.core';

declare global {
  namespace JSX {
    interface Element {}
    export interface IntrinsicElements {}
  }
  namespace JSXElements {}

  interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;
    componentOnReady(done: (ele?: this) => void): void;

    forceUpdate(): void;
  }

  interface HTMLAttributes {}
}


declare global {

  namespace StencilComponents {
    interface IonIcon {
      /**
       * Specifies the label to use for accessibility. Defaults to the icon name.
       */
      'ariaLabel': string;
      'color': string;
      /**
       * A combination of both `name` and `src`. If a `src` url is detected it will set the `src` property. Otherwise it assumes it's a built-in named SVG and set the `name` property.
       */
      'icon': string;
      /**
       * Specifies which icon to use on `ios` mode.
       */
      'ios': string;
      /**
       * Specifies which icon to use on `md` mode.
       */
      'md': string;
      /**
       * Specifies which icon to use from the built-in set of icons.
       */
      'name': string;
      /**
       * The size of the icon. Available options are: `"small"` and `"large"`.
       */
      'size': string;
      /**
       * Specifies the exact `src` of an SVG file to use.
       */
      'src': string;
    }
  }

  interface HTMLIonIconElement extends StencilComponents.IonIcon, HTMLStencilElement {}

  var HTMLIonIconElement: {
    prototype: HTMLIonIconElement;
    new (): HTMLIonIconElement;
  };
  interface HTMLElementTagNameMap {
    'ion-icon': HTMLIonIconElement;
  }
  interface ElementTagNameMap {
    'ion-icon': HTMLIonIconElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'ion-icon': JSXElements.IonIconAttributes;
    }
  }
  namespace JSXElements {
    export interface IonIconAttributes extends HTMLAttributes {
      /**
       * Specifies the label to use for accessibility. Defaults to the icon name.
       */
      'ariaLabel'?: string;
      'color'?: string;
      /**
       * A combination of both `name` and `src`. If a `src` url is detected it will set the `src` property. Otherwise it assumes it's a built-in named SVG and set the `name` property.
       */
      'icon'?: string;
      /**
       * Specifies which icon to use on `ios` mode.
       */
      'ios'?: string;
      /**
       * Specifies which icon to use on `md` mode.
       */
      'md'?: string;
      /**
       * Specifies which icon to use from the built-in set of icons.
       */
      'name'?: string;
      /**
       * The size of the icon. Available options are: `"small"` and `"large"`.
       */
      'size'?: string;
      /**
       * Specifies the exact `src` of an SVG file to use.
       */
      'src'?: string;
    }
  }
}

declare global { namespace JSX { interface StencilJSX {} } }

export declare function defineCustomElements(window: any): void;