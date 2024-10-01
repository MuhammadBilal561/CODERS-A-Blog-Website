'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const pageAlign = require('./page-align-bf197eb4.js');
const animationRegistry = require('./animation-registry-d7c0b19d.js');
const currency = require('./currency-ba038e2f.js');
const library = require('./library-289cf13f.js');
const fetch$1 = require('./fetch-2dba325c.js');
const addQueryArgs = require('./add-query-args-17c551b6.js');

const scAlertCss = ":host{display:block}[hidden]{display:none !important}::slotted(*:not(:first-child)){margin-top:0.5rem;margin-bottom:0}::slotted(ul){line-height:1.4em;list-style-type:disc;margin:0;padding:0;padding-left:20px}.alert{font-family:var(--sc-input-font-family);font-weight:var(--sc-font-weight-normal);font-size:var(--sc-button-font-size-medium);line-height:var(--sc-line-height-dense);border-radius:var(--sc-alert-border-radius, var(--sc-border-radius-medium));padding:var(--sc-spacing-large);display:flex;align-items:flex-start;border:var(--sc-alert-border, var(--sc-input-border));border-top:solid var(--sc-alert-border-width, 3px);color:var(--sc-alert-color, var(--sc-input-label-color));background:var(--sc-alert-background-color, var(--sc-color-white));box-shadow:var(--sc-shadow-small)}.alert__text{flex:1}.alert.alert--primary{border-top-color:var(--sc-alert-primary-border-color, var(--sc-color-primary-500))}.alert.alert--primary a{color:var(--sc-color-primary-900)}.alert.alert--primary .alert__title{color:var(--sc-alert-title-color, var(--sc-color-gray-800))}.alert.alert--primary .alert__icon{color:var(--sc-alert-primary-icon-color, var(--sc-color-primary-500))}.alert.alert--info{border-top-color:var(--sc-alert-info-border-color, var(--sc-color-info-500))}.alert.alert--info a{color:var(--sc-color-info-900)}.alert.alert--info .alert__title{color:var(--sc-alert-title-color, var(--sc-color-gray-800))}.alert.alert--info .alert__icon{color:var(--sc-alert-info-icon-color, var(--sc-color-info-500))}.alert.alert--danger{border-top-color:var(--sc-alert-danger-border-color, var(--sc-color-danger-500))}.alert.alert--danger a{color:var(--sc-color-danger-900)}.alert.alert--danger .alert__title{color:var(--sc-alert-title-color, var(--sc-color-gray-800))}.alert.alert--danger .alert__icon{color:var(--sc-alert-danger-icon-color, var(--sc-color-danger-500))}.alert.alert--warning{border-top-color:var(--sc-alert-warning-border-color, var(--sc-color-warning-500))}.alert.alert--warning a{color:var(--sc-color-warning-900)}.alert.alert--warning .alert__title{color:var(--sc-alert-title-color, var(--sc-color-gray-800))}.alert.alert--warning .alert__icon{color:var(--sc-alert-warning-icon-color, var(--sc-color-warning-500))}.alert.alert--success{border-top-color:var(--sc-alert-success-border-color, var(--sc-color-success-500))}.alert.alert--success a{color:var(--sc-color-success-900)}.alert.alert--success .alert__title{color:var(--sc-alert-title-color, var(--sc-color-gray-800))}.alert.alert--success .alert__icon{color:var(--sc-alert-success-icon-color, var(--sc-color-success-500))}.alert__icon{flex:1;flex:0 0 auto;display:flex;align-items:center;font-size:var(--sc-font-size-large);padding-inline-end:var(--sc-spacing-medium)}.alert__title{font-weight:var(--sc-font-weight-semibold)}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);border:0}.alert__close{transition:background-color var(--sc-transition-fast) ease;display:inline-flex;border-radius:var(--sc-border-radius-small);padding:var(--sc-spacing-x-small);margin-left:auto;cursor:pointer}.alert__close svg{width:1em;height:1em}.alert--is-rtl{text-align:right}.alert--is-rtl.alert-close{margin-right:auto;margin-left:unset}.alert--is-rtl ::slotted(ul){margin:0;padding:0;padding-right:20px}";

const ScAlert = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.scHide = index.createEvent(this, "scHide", 7);
    this.scShow = index.createEvent(this, "scShow", 7);
    this.open = false;
    this.title = undefined;
    this.closable = false;
    this.type = 'primary';
    this.duration = Infinity;
    this.scrollOnOpen = undefined;
    this.scrollMargin = '0px';
    this.noIcon = undefined;
    this.autoHideTimeout = undefined;
  }
  /** Shows the alert. */
  async show() {
    if (this.open) {
      return;
    }
    this.open = true;
  }
  /** Hides the alert */
  async hide() {
    if (!this.open) {
      return;
    }
    this.open = false;
  }
  restartAutoHide() {
    clearTimeout(this.autoHideTimeout);
    if (this.open && this.duration < Infinity) {
      this.autoHideTimeout = setTimeout(() => this.hide(), this.duration);
    }
  }
  handleMouseMove() {
    this.restartAutoHide();
  }
  handleCloseClick() {
    this.hide();
  }
  /** Emit event when showing or hiding changes */
  handleOpenChange() {
    this.open ? this.scShow.emit() : this.scHide.emit();
    if (this.open && this.scrollOnOpen) {
      this.el.scrollIntoView({ behavior: 'smooth' });
    }
  }
  componentDidLoad() {
    this.handleOpenChange();
  }
  iconName() {
    switch (this.type) {
      case 'danger':
        return 'alert-circle';
      case 'success':
        return 'check-circle';
      case 'warning':
        return 'alert-triangle';
      default:
        return 'info';
    }
  }
  icon() {
    return index.h("sc-icon", { name: this.iconName() });
  }
  render() {
    return (index.h(index.Host, { style: { 'scroll-margin-top': this.scrollMargin } }, index.h("div", { class: {
        'alert': true,
        'alert--primary': this.type === 'primary',
        'alert--success': this.type === 'success',
        'alert--info': this.type === 'info',
        'alert--warning': this.type === 'warning',
        'alert--danger': this.type === 'danger',
        'alert--is-rtl': pageAlign.isRtl()
      }, part: "base", role: "alert", "aria-live": "assertive", "aria-atomic": "true", "aria-hidden": this.open ? 'false' : 'true', hidden: this.open ? false : true, onMouseMove: () => this.handleMouseMove() }, index.h("div", { class: "alert__icon", part: "icon" }, index.h("slot", { name: "icon" }, this.icon())), index.h("div", { class: "alert__text", part: "text" }, index.h("div", { class: "alert__title", part: "title" }, index.h("slot", { name: "title" }, this.title)), index.h("div", { class: "alert__message", part: "message" }, index.h("slot", null))), this.closable && (index.h("span", { part: "close", class: "alert__close", onClick: () => this.handleCloseClick() }, index.h("span", { class: "sr-only" }, "Dismiss"), index.h("svg", { class: "h-5 w-5", "x-description": "Heroicon name: solid/x", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true" }, index.h("path", { "fill-rule": "evenodd", d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z", "clip-rule": "evenodd" })))))));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "open": ["handleOpenChange"]
  }; }
};
ScAlert.style = scAlertCss;

const scBlockUiCss = ":host{display:block;position:var(--sc-block-ui-position, absolute);top:-5px;left:-5px;right:-5px;bottom:-5px;overflow:hidden;display:flex;align-items:center;justify-content:center}:host>*{z-index:1}:host:after{content:\"\";position:var(--sc-block-ui-position, absolute);top:0;left:0;right:0;bottom:0;cursor:wait;background:var(--sc-block-ui-background-color, var(--sc-color-white));opacity:var(--sc-block-ui-opacity, 0.15)}:host.transparent:after{background:transparent}.overlay__content{font-size:var(--sc-font-size-large);font-weight:var(--sc-font-weight-semibold);display:grid;gap:0.5em;text-align:center}";

const ScBlockUi = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.zIndex = 1;
    this.transparent = undefined;
    this.spinner = undefined;
  }
  render() {
    return (index.h("div", { part: "base", class: { overlay: true, transparent: this.transparent }, style: { 'z-index': this.zIndex.toString() } }, index.h("div", { class: "overlay__content", part: "content" }, index.h("slot", { name: "spinner" }, !this.transparent && this.spinner && index.h("sc-spinner", null)), index.h("slot", null))));
  }
};
ScBlockUi.style = scBlockUiCss;

const scButtonCss = ":host{display:inline-block;width:auto;cursor:pointer;--primary-color:var(--sc-color-primary-text);--primary-background:var(--sc-color-primary-500)}:host([full]){display:block}::slotted(*){pointer-events:none}.button{box-sizing:border-box;z-index:10;display:inline-flex;align-items:stretch;justify-content:center;width:100%;border-style:solid;border-width:var(--sc-input-border-width);font-family:var(--sc-input-font-family);font-weight:var(--sc-font-weight-semibold);text-decoration:none;user-select:none;white-space:nowrap;vertical-align:middle;padding:0;transition:var(--sc-input-transition, var(--sc-transition-medium)) background-color, var(--sc-input-transition, var(--sc-transition-medium)) color, var(--sc-input-transition, var(--sc-transition-medium)) border, var(--sc-input-transition, var(--sc-transition-medium)) box-shadow, var(--sc-input-transition, var(--sc-transition-medium)) opacity;cursor:inherit}.button::-moz-focus-inner{border:0}.button:focus{outline:none}.button:focus-visible{box-shadow:0 0 0 var(--sc-focus-ring-width) var(--sc-focus-ring-color-primary)}.button.button--disabled{cursor:not-allowed}.button.button--disabled *{pointer-events:none}.button.button--disabled .button__label,.button.button--disabled .button__suffix,.button.button--disabled .button__prefix{opacity:0.5}.button ::slotted(.sc--icon){pointer-events:none}.button__prefix,.button__suffix{flex:0 0 auto;display:flex;align-items:center}.button__label{display:flex;align-items:center}.button__label ::slotted(sc-icon){vertical-align:-2px}.button:not(.button--text):not(.button--link){box-shadow:var(--sc-shadow-small)}.button.button--standard.button--default{background-color:var(--sc-button-default-background-color, var(--sc-color-white));border-color:var(--sc-button-default-border-color, var(--sc-color-gray-300));color:var(--sc-button-default-color, var(--sc-color-gray-600))}.button.button--standard.button--default:hover:not(.button--disabled){background-color:var(--sc-button-default-hover-background-color, var(--sc-color-white));border-color:var(--sc-button-default-focus-border-color, var(--primary-background));color:var(--primary-background)}.button.button--standard.button--default:focus:not(.button--disabled){background-color:var(--sc-button-default-focus-background-color, var(--sc-color-white));border-color:var(--sc-button-default-focus-border-color, var(--sc-color-white));color:var(--primary-background);box-shadow:0 0 0 var(--sc-focus-ring-width) var(--sc-focus-ring-color-primary)}.button.button--standard.button--default:active:not(.button--disabled){background-color:var(--sc-button-default-active-background-color, var(--sc-color-white));border-color:var(--sc-button-default-active-border-color, var(--sc-color-white));color:var(--primary-background)}.button.button--standard.button--primary{background-color:var(--primary-background);border-color:var(--primary-background);color:var(--primary-color)}.button.button--standard.button--primary:hover:not(.button--disabled){opacity:0.8}.button.button--standard.button--primary:focus:not(.button--disabled){opacity:0.8;color:var(--primary-color);border-color:var(--sc-color-white);box-shadow:0 0 0 var(--sc-focus-ring-width) var(--sc-focus-ring-color-primary)}.button.button--standard.button--primary:active:not(.button--disabled){background-color:var(--primary-background);border-color:var(--sc-color-white);color:var(--primary-color)}.button.button--standard.button--success{background-color:var(--sc-color-success-500);border-color:var(--sc-color-success-500);color:var(--sc-color-success-text)}.button.button--standard.button--success:hover:not(.button--disabled){background-color:var(--sc-color-success-400);border-color:var(--sc-color-success-400);color:var(--sc-color-success-text)}.button.button--standard.button--success:focus:not(.button--disabled){background-color:var(--sc-color-success-400);border-color:var(--sc-color-success-400);color:var(--sc-color-success-text);box-shadow:0 0 0 var(--sc-focus-ring-width) var(--sc-focus-ring-color-success)}.button.button--standard.button--success:active:not(.button--disabled){background-color:var(--sc-color-success-500);border-color:var(--sc-color-success-500);color:var(--sc-color-success-text)}.button.button--standard.button--info{background-color:var(--sc-color-info-500);border-color:var(--sc-color-info-500);color:var(--sc-color-info-text)}.button.button--standard.button--info:hover:not(.button--disabled){background-color:var(--sc-color-info-400);border-color:var(--sc-color-info-400);color:var(--sc-color-info-text)}.button.button--standard.button--info:focus:not(.button--disabled){background-color:var(--sc-color-info-400);border-color:var(--sc-color-info-400);color:var(--sc-color-info-text);box-shadow:0 0 0 var(--sc-focus-ring-width) var(--sc-focus-ring-color-info)}.button.button--standard.button--info:active:not(.button--disabled){background-color:var(--sc-color-info-500);border-color:var(--sc-color-info-500);color:var(--sc-color-info-text)}.button.button--standard.button--warning{background-color:var(--sc-color-warning-500);border-color:var(--sc-color-warning-500);color:var(--sc-color-warning-text)}.button.button--standard.button--warning:hover:not(.button--disabled){background-color:var(--sc-color-warning-400);border-color:var(--sc-color-warning-400);color:var(--sc-color-warning-text)}.button.button--standard.button--warning:focus:not(.button--disabled){background-color:var(--sc-color-warning-400);border-color:var(--sc-color-warning-400);color:var(--sc-color-warning-text);box-shadow:0 0 0 var(--sc-focus-ring-width) var(--sc-focus-ring-color-warning)}.button.button--standard.button--warning:active:not(.button--disabled){background-color:var(--sc-color-warning-500);border-color:var(--sc-color-warning-500);color:var(--sc-color-warning-text)}.button.button--standard.button--danger{background-color:var(--sc-color-danger-500);border-color:var(--sc-color-danger-500);color:var(--sc-color-danger-text)}.button.button--standard.button--danger:hover:not(.button--disabled){background-color:var(--sc-color-danger-400);border-color:var(--sc-color-danger-400);color:var(--sc-color-danger-text)}.button.button--standard.button--danger:focus:not(.button--disabled){background-color:var(--sc-color-danger-400);border-color:var(--sc-color-danger-400);color:var(--sc-color-danger-text);box-shadow:0 0 0 var(--sc-focus-ring-width) var(--sc-focus-ring-color-danger)}.button.button--standard.button--danger:active:not(.button--disabled){background-color:var(--sc-color-danger-500);border-color:var(--sc-color-danger-500);color:var(--sc-color-danger-text)}.button--outline{background:none;border:solid 1px}.button--outline.button--default{border-color:var(--sc-color-gray-300);color:var(--sc-color-gray-700)}.button--outline.button--default:hover:not(.button--disabled){border-color:var(--primary-background);background-color:var(--primary-background);color:var(--sc-color-white)}.button--outline.button--default:focus:not(.button--disabled){border-color:var(--primary-background);box-shadow:0 0 0 var(--sc-focus-ring-width) var(--primary-background)/var(--sc-focus-ring-alpha)}.button--outline.button--default:active:not(.button--disabled){opacity:0.8;color:var(--sc-color-white)}.button--outline.button--primary{border-color:var(--primary-background);color:var(--primary-background)}.button--outline.button--primary:hover:not(.button--disabled){background-color:var(--primary-background);opacity:0.8;color:var(--sc-color-white)}.button--outline.button--primary:focus:not(.button--disabled){border-color:var(--primary-background);box-shadow:0 0 0 var(--sc-focus-ring-width) var(--primary-background)/var(--sc-focus-ring-alpha)}.button--outline.button--primary:active:not(.button--disabled){border-color:var(--primary-background);background-color:var(--primary-background);opacity:0.9;color:var(--sc-color-white)}.button--outline.button--success{border-color:var(--sc-color-success-500);color:var(--sc-color-success-500)}.button--outline.button--success:hover:not(.button--disabled){background-color:var(--sc-color-success-500);color:var(--sc-color-white)}.button--outline.button--success:focus:not(.button--disabled){border-color:var(--sc-color-success-500);box-shadow:0 0 0 var(--sc-focus-ring-width) var(--sc-color-success-500)/var(--sc-focus-ring-alpha)}.button--outline.button--success:active:not(.button--disabled){border-color:var(--sc-color-success-700);background-color:var(--sc-color-success-700);color:var(--sc-color-white)}.button--outline.button--info{border-color:var(--sc-color-gray-500);color:var(--sc-color-gray-500)}.button--outline.button--info:hover:not(.button--disabled){background-color:var(--sc-color-gray-500);color:var(--sc-color-white)}.button--outline.button--info:focus:not(.button--disabled){border-color:var(--sc-color-gray-500);box-shadow:0 0 0 var(--sc-focus-ring-width) var(--sc-color-gray-500)/var(--sc-focus-ring-alpha)}.button--outline.button--info:active:not(.button--disabled){border-color:var(--sc-color-gray-700);background-color:var(--sc-color-gray-700);color:var(--sc-color-white)}.button--outline.button--warning{border-color:var(--sc-color-warning-500);color:var(--sc-color-warning-500)}.button--outline.button--warning:hover:not(.button--disabled){background-color:var(--sc-color-warning-500);color:var(--sc-color-white)}.button--outline.button--warning:focus:not(.button--disabled){border-color:var(--sc-color-warning-500);box-shadow:0 0 0 var(--sc-focus-ring-width) var(--sc-color-warning-500)/var(--sc-focus-ring-alpha)}.button--outline.button--warning:active:not(.button--disabled){border-color:var(--sc-color-warning-700);background-color:var(--sc-color-warning-700);color:var(--sc-color-white)}.button--outline.button--danger{border-color:var(--sc-color-danger-500);color:var(--sc-color-danger-500)}.button--outline.button--danger:hover:not(.button--disabled){background-color:var(--sc-color-danger-500);color:var(--sc-color-white)}.button--outline.button--danger:focus:not(.button--disabled){border-color:var(--sc-color-danger-500);box-shadow:0 0 0 var(--sc-focus-ring-width) var(--sc-color-danger-500)/var(--sc-focus-ring-alpha)}.button--outline.button--danger:active:not(.button--disabled){border-color:var(--sc-color-danger-700);background-color:var(--sc-color-danger-700);color:var(--sc-color-white)}.button--text{background-color:transparent;border-color:transparent;color:inherit}.button--text:hover:not(.button--disabled){background-color:transparent;border-color:transparent;color:var(--sc-color-gray-600)}.button--text:focus:not(.button--disabled){background-color:transparent;border-color:transparent;box-shadow:0}.button--text:active:not(.button--disabled){background-color:transparent;border-color:transparent;box-shadow:0}.button--text.button--caret.button--has-label{padding-right:var(--sc-spacing-xx-small)}.button--text.button--caret.button--has-label .button__label{padding:0 var(--sc-spacing-xx-small) !important}.button--link{background-color:transparent;border-color:transparent;box-shadow:none;color:var(--sc-button-link-color, var(--primary-background));transition:opacity var(--sc-input-transition, var(--sc-transition-medium)) ease;text-decoration:var(--sc-button-link-text-decoration, none)}.button--link.button--has-label.button--small .button__label,.button--link.button--has-label.button--medium .button__label,.button--link.button--has-label.button--large .button__label{padding:0}.button--link:hover:not(.button--disabled){background-color:transparent;border-color:transparent;opacity:0.75}.button--link:focus:not(.button--disabled){background-color:transparent;border-color:transparent}.button--link:active:not(.button--disabled){background-color:transparent;border-color:transparent}.button--link.button--has-prefix:not(.button--text).button--small,.button--link.button--has-prefix:not(.button--text).button--medium,.button--link.button--has-prefix:not(.button--text).button--large{padding-left:0}.button--link.button--has-prefix:not(.button--text).button--small .button__label,.button--link.button--has-prefix:not(.button--text).button--medium .button__label,.button--link.button--has-prefix:not(.button--text).button--large .button__label{padding-left:var(--sc-spacing-xx-small)}.button--link.button--has-suffix:not(.button--text).button--small,.button--link.button--has-suffix:not(.button--text).button--medium,.button--link.button--has-suffix:not(.button--text).button--large{padding-right:0}.button--link.button--has-suffix:not(.button--text).button--small .button__label,.button--link.button--has-suffix:not(.button--text).button--medium .button__label,.button--link.button--has-suffix:not(.button--text).button--large .button__label{padding-right:var(--sc-spacing-xx-small)}.button--small{font-size:var(--sc-button-font-size-small);height:var(--sc-input-height-small);line-height:calc(var(--sc-input-height-small) - var(--sc-input-border-width) * 2);border-radius:var(--button-border-radius, var(--sc-input-border-radius-small))}.button--medium{font-size:var(--sc-button-font-size-medium);height:var(--sc-input-height-medium);line-height:calc(var(--sc-input-height-medium) - var(--sc-input-border-width) * 2);border-radius:var(--button-border-radius, var(--sc-input-border-radius-medium))}.button--large{font-size:var(--sc-button-font-size-large);height:var(--sc-input-height-large);line-height:calc(var(--sc-input-height-large) - var(--sc-input-border-width) * 2);border-radius:var(--button-border-radius, var(--sc-input-border-radius-large))}.button--full{display:block}.button--pill.button--small{border-radius:var(--sc-input-height-small)}.button--pill.button--medium{border-radius:var(--sc-input-height-medium)}.button--pill.button--large{border-radius:var(--sc-input-height-large)}.button--circle{padding-left:0;padding-right:0}.button--circle.button--small{width:var(--sc-input-height-small);border-radius:50%}.button--circle.button--medium{width:var(--sc-input-height-medium);border-radius:50%}.button--circle.button--large{width:var(--sc-input-height-large);border-radius:50%}.button--circle .button__prefix,.button--circle .button__suffix,.button--circle .button__caret{display:none}.button--caret .button__suffix{display:none}.button--caret .button__caret{display:flex;align-items:center}.button--caret .button__caret svg{width:1em;height:1em}.button--busy{position:relative;cursor:wait}.button--busy .button__prefix,.button--busy .button__label,.button--busy .button__suffix,.button--busy .button__caret{visibility:hidden}.button--busy *{pointer-events:none}.button--loading{position:relative;cursor:wait}.button--loading .button__prefix,.button--loading .button__label,.button--loading .button__suffix,.button--loading .button__caret{visibility:hidden}sc-spinner::part(base){--indicator-color:currentColor;--spinner-size:12px;position:absolute;top:calc(50% - var(--spinner-size) + var(--spinner-size) / 4);left:calc(50% - var(--spinner-size) + var(--spinner-size) / 4)}.button ::slotted(sc-badge){position:absolute;top:0;right:0;transform:translateY(-50%) translateX(50%);pointer-events:none}.button--has-label.button--small .button__label{padding:0 var(--sc-spacing-small)}.button--has-label.button--medium .button__label{padding:0 var(--sc-spacing-medium)}.button--has-label.button--large .button__label{padding:0 var(--sc-spacing-large)}.button--has-prefix:not(.button--text).button--small{padding-left:var(--sc-spacing-x-small)}.button--has-prefix:not(.button--text).button--small .button__label{padding-left:var(--sc-spacing-x-small)}.button--has-prefix:not(.button--text).button--medium{padding-left:var(--sc-spacing-small)}.button--has-prefix:not(.button--text).button--medium .button__label{padding-left:var(--sc-spacing-small)}.button--has-prefix:not(.button--text).button--large{padding-left:var(--sc-spacing-small)}.button--has-prefix:not(.button--text).button--large .button__label{padding-left:var(--sc-spacing-small)}.button--has-suffix.button--small,.button--caret.button--small{padding-right:var(--sc-spacing-x-small)}.button--has-suffix.button--small .button__label,.button--caret.button--small .button__label{padding-right:var(--sc-spacing-x-small)}.button--has-suffix.button--medium,.button--caret.button--medium{padding-right:var(--sc-spacing-small)}.button--has-suffix.button--medium .button__label,.button--caret.button--medium .button__label{padding-right:var(--sc-spacing-small)}.button--has-suffix.button--large,.button--caret.button--large{padding-right:var(--sc-spacing-small)}.button--has-suffix.button--large .button__label,.button--caret.button--large .button__label{padding-right:var(--sc-spacing-small)}:host(.sc-button-group__button--first) .button{border-top-right-radius:0;border-bottom-right-radius:0}:host(.sc-button-group__button--inner) .button{border-radius:0}:host(.sc-button-group__button--last) .button{border-top-left-radius:0;border-bottom-left-radius:0}:host(.sc-button-group__button:not(.sc-button-group__button--first)){margin-left:calc(-1 * var(--sc-input-border-width))}:host(.sc-button-group__button:not(.sc-button-group__button--focus,.sc-button-group__button--first,[type=default]):not(:hover,:active,:focus)) .button:after{content:\"\";position:absolute;top:0;left:0;bottom:0;border-left:solid 1px #fff4;mix-blend-mode:lighten}:host(.sc-button-group__button--hover){z-index:1}:host(.sc-button-group__button--focus){z-index:2}@keyframes busy-animation{0%{background-position:200px 0}}.button--is-rtl.button--has-prefix.button--small,.button--is-rtl.button--has-prefix.button--medium,.button--is-rtl.button--has-prefix.button--large{padding-left:0}.button--is-rtl.button--has-prefix.button--small .button__label,.button--is-rtl.button--has-prefix.button--medium .button__label,.button--is-rtl.button--has-prefix.button--large .button__label{padding-left:0;padding-right:var(--sc-spacing-xx-small)}.button--is-rtl.button--has-suffix.button--small,.button--is-rtl.button--has-suffix.button--medium,.button--is-rtl.button--has-suffix.button--large{padding-right:0}.button--is-rtl.button--has-suffix.button--small .button__label,.button--is-rtl.button--has-suffix.button--medium .button__label,.button--is-rtl.button--has-suffix.button--large .button__label{padding-right:0;padding-left:var(--sc-spacing-xx-small)}";

const ScButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.scBlur = index.createEvent(this, "scBlur", 7);
    this.scFocus = index.createEvent(this, "scFocus", 7);
    this.hasFocus = false;
    this.hasLabel = false;
    this.hasPrefix = false;
    this.hasSuffix = false;
    this.type = 'default';
    this.size = 'medium';
    this.caret = false;
    this.full = false;
    this.disabled = false;
    this.loading = false;
    this.outline = false;
    this.busy = false;
    this.pill = false;
    this.circle = false;
    this.submit = false;
    this.name = undefined;
    this.value = undefined;
    this.href = undefined;
    this.target = undefined;
    this.download = undefined;
    this.autofocus = undefined;
  }
  componentWillLoad() {
    this.handleSlotChange();
  }
  /** Simulates a click on the button. */
  click() {
    this.button.click();
  }
  /** Sets focus on the button. */
  focus(options) {
    this.button.focus(options);
  }
  /** Removes focus from the button. */
  blur() {
    this.button.blur();
  }
  handleSlotChange() {
    this.hasLabel = !!this.button.children;
    this.hasPrefix = !!this.button.querySelector('[slot="prefix"]');
    this.hasSuffix = !!this.button.querySelector('[slot="suffix"]');
  }
  handleBlur() {
    this.hasFocus = false;
    this.scBlur.emit();
  }
  handleFocus() {
    this.hasFocus = true;
    this.scFocus.emit();
  }
  handleClick(event) {
    if (this.disabled || this.loading || this.busy) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (this.submit) {
      this.submitForm();
    }
  }
  submitForm() {
    var _a, _b;
    const form = ((_b = (_a = this.button.closest('sc-form')) === null || _a === void 0 ? void 0 : _a.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('form')) || this.button.closest('form');
    // Calling form.submit() seems to bypass the submit event and constraint validation. Instead, we can inject a
    // native submit button into the form, click it, then remove it to simulate a standard form submission.
    const button = document.createElement('button');
    if (form) {
      button.type = 'submit';
      button.style.position = 'absolute';
      button.style.width = '0';
      button.style.height = '0';
      button.style.clip = 'rect(0 0 0 0)';
      button.style.clipPath = 'inset(50%)';
      button.style.overflow = 'hidden';
      button.style.whiteSpace = 'nowrap';
      form.append(button);
      button.click();
      button.remove();
    }
  }
  render() {
    const Tag = this.href ? 'a' : 'button';
    const interior = (index.h(index.Fragment, null, index.h("span", { part: "prefix", class: "button__prefix" }, index.h("slot", { onSlotchange: () => this.handleSlotChange(), name: "prefix" })), index.h("span", { part: "label", class: "button__label" }, index.h("slot", { onSlotchange: () => this.handleSlotChange() })), index.h("span", { part: "suffix", class: "button__suffix" }, index.h("slot", { onSlotchange: () => this.handleSlotChange(), name: "suffix" })), this.caret ? (index.h("span", { part: "caret", class: "button__caret" }, index.h("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }, index.h("polyline", { points: "6 9 12 15 18 9" })))) : (''), this.loading || this.busy ? index.h("sc-spinner", { exportparts: "base:spinner" }) : ''));
    return (index.h(Tag, { part: "base", class: {
        'button': true,
        [`button--${this.type}`]: !!this.type,
        [`button--${this.size}`]: true,
        'button--caret': this.caret,
        'button--circle': this.circle,
        'button--disabled': this.disabled,
        'button--focused': this.hasFocus,
        'button--loading': this.loading,
        'button--busy': this.busy,
        'button--pill': this.pill,
        'button--standard': !this.outline,
        'button--outline': this.outline,
        'button--has-label': this.hasLabel,
        'button--has-prefix': this.hasPrefix,
        'button--has-suffix': this.hasSuffix,
        'button--is-rtl': pageAlign.isRtl(),
      }, href: this.href, target: this.target, download: this.download, autoFocus: this.autofocus, rel: this.target ? 'noreferrer noopener' : undefined, role: "button", "aria-disabled": this.disabled ? 'true' : 'false', "aria-busy": this.busy || this.loading ? 'true' : 'false', tabindex: this.disabled ? '-1' : '0', disabled: this.disabled || this.busy, type: this.submit ? 'submit' : 'button', name: this.name, value: this.value, onBlur: () => this.handleBlur(), onFocus: () => this.handleFocus(), onClick: e => this.handleClick(e) }, interior));
  }
  get button() { return index.getElement(this); }
};
ScButton.style = scButtonCss;

const scDashboardModuleCss = ":host{display:block;position:relative}.dashboard-module{display:grid;gap:var(--sc-dashboard-module-spacing, 1em)}.heading{font-family:var(--sc-font-sans);display:flex;flex-wrap:wrap;gap:1em;align-items:center;justify-content:space-between}.heading__text{display:grid;flex:1;gap:calc(var(--sc-dashboard-module-spacing, 1em) / 2)}@media screen and (min-width: 720px){.heading{gap:2em}}.heading__title{font-size:var(--sc-dashbaord-module-heading-size, var(--sc-font-size-x-large));font-weight:var(--sc-dashbaord-module-heading-weight, var(--sc-font-weight-bold));line-height:var(--sc-dashbaord-module-heading-line-height, var(--sc-line-height-dense));white-space:nowrap}.heading__description{font-size:var(--sc-font-size-normal);line-height:var(--sc-line-height-dense);opacity:0.85}";

const ScDashboardModule = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.heading = undefined;
    this.error = undefined;
    this.loading = undefined;
  }
  render() {
    return (index.h("div", { class: "dashboard-module", part: "base" }, !!this.error && (index.h("sc-alert", { exportparts: "base:error__base, icon:error__icon, text:error__text, title:error__title, message:error__message", open: !!this.error, type: "danger" }, index.h("span", { slot: "title" }, wp.i18n.__('Error', 'surecart')), this.error)), index.h("div", { class: "heading", part: "heading" }, index.h("div", { class: "heading__text", part: "heading-text" }, index.h("div", { class: "heading__title", part: "heading-title" }, index.h("slot", { name: "heading", "aria-label": this.heading }, this.heading)), index.h("div", { class: "heading__description", part: "heading-description" }, index.h("slot", { name: "description" }))), index.h("slot", { name: "end" })), index.h("slot", null)));
  }
};
ScDashboardModule.style = scDashboardModuleCss;

const locks = new Set();
//
// Prevents body scrolling. Keeps track of which elements requested a lock so multiple levels of locking are possible
// without premature unlocking.
//
function lockBodyScrolling(lockingEl) {
  locks.add(lockingEl);
  document.body.classList.add('sc-scroll-lock');
}
//
// Unlocks body scrolling. Scrolling will only be unlocked once all elements that requested a lock call this method.
//
function unlockBodyScrolling(lockingEl) {
  locks.delete(lockingEl);
  if (locks.size === 0) {
    document.body.classList.remove('sc-scroll-lock');
  }
}

const scDialogCss = ":host{--width:31rem;--header-spacing:var(--sc-spacing-large);--body-spacing:var(--sc-spacing-large);--footer-spacing:var(--sc-spacing-large);display:contents}[hidden]{display:none !important}.dialog{display:flex;align-items:center;justify-content:center;position:fixed;top:0;right:0;bottom:0;left:0;z-index:var(--sc-z-index-dialog);box-sizing:border-box;text-align:left}.dialog__panel{display:flex;flex-direction:column;z-index:2;width:var(--width);max-width:100vw;max-height:100vh;background-color:var(--sc-panel-background-color);border-radius:var(--sc-border-radius-medium);box-shadow:var(--sc-shadow-x-large);position:relative}.dialog__panel:focus{outline:none}@media screen and (max-width: 420px){.dialog__panel{max-height:80vh}}.dialog--open .dialog__panel{display:flex;opacity:1;transform:none}.dialog__header{flex:0 0 auto;display:flex;border-bottom:1px solid var(--sc-color-gray-300)}.dialog__title{flex:1 1 auto;font:inherit;font-size:var(--sc-font-size-large);line-height:var(--sc-line-height-dense);padding:var(--header-spacing);margin:0}.dialog__close{flex:0 0 auto;display:flex;align-items:center;font-size:var(--sc-font-size-x-large);padding:0 calc(var(--header-spacing) / 2);z-index:2}.dialog__body{flex:1 1 auto;padding:var(--body-spacing);overflow:var(--dialog-body-overflow, auto);-webkit-overflow-scrolling:touch}.dialog__footer{flex:0 0 auto;text-align:right;padding:var(--footer-spacing)}.dialog__footer ::slotted(sl-button:not(:first-of-type)){margin-left:var(--sc-spacing-x-small)}.dialog:not(.dialog--has-footer) .dialog__footer{display:none}.dialog__overlay{position:fixed;top:0;right:0;bottom:0;left:0;background-color:var(--sc-overlay-background-color)}";

const ScDialog = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.scRequestClose = index.createEvent(this, "scRequestClose", 7);
    this.scShow = index.createEvent(this, "scShow", 7);
    this.scAfterShow = index.createEvent(this, "scAfterShow", 7);
    this.scHide = index.createEvent(this, "scHide", 7);
    this.scAfterHide = index.createEvent(this, "scAfterHide", 7);
    this.scInitialFocus = index.createEvent(this, "scInitialFocus", 7);
    this.open = false;
    this.label = '';
    this.noHeader = false;
    this.hasFooter = false;
  }
  /** Shows the dialog. */
  async show() {
    if (this.open) {
      return undefined;
    }
    this.open = true;
  }
  /** Hides the dialog */
  async hide() {
    if (!this.open) {
      return undefined;
    }
    this.open = false;
  }
  requestClose(source) {
    const slRequestClose = this.scRequestClose.emit(source);
    if (slRequestClose.defaultPrevented) {
      const animation = animationRegistry.getAnimation(this.el, 'dialog.denyClose');
      animationRegistry.animateTo(this.panel, animation.keyframes, animation.options);
      return;
    }
    this.hide();
  }
  handleKeyDown(event) {
    if (event.key === 'Escape') {
      event.stopPropagation();
      this.requestClose('keyboard');
    }
  }
  async handleOpenChange() {
    if (this.open) {
      // Show
      this.scShow.emit();
      lockBodyScrolling(this.el);
      // When the dialog is shown, Safari will attempt to set focus on whatever element has autofocus. This can cause
      // the dialogs's animation to jitter (if it starts offscreen), so we'll temporarily remove the attribute, call
      // `focus({ preventScroll: true })` ourselves, and add the attribute back afterwards.
      //
      // Related: https://github.com/shoelace-style/shoelace/issues/693
      //
      const autoFocusTarget = this.el.querySelector('[autofocus]');
      if (autoFocusTarget) {
        autoFocusTarget.removeAttribute('autofocus');
      }
      await Promise.all([animationRegistry.stopAnimations(this.dialog), animationRegistry.stopAnimations(this.overlay)]);
      this.dialog.hidden = false;
      // Set initial focus
      requestAnimationFrame(() => {
        const slInitialFocus = this.scInitialFocus.emit();
        if (!slInitialFocus.defaultPrevented) {
          // Set focus to the autofocus target and restore the attribute
          if (autoFocusTarget) {
            autoFocusTarget.focus({ preventScroll: true });
          }
          else {
            this.panel.focus({ preventScroll: true });
          }
        }
        // Restore the autofocus attribute
        if (autoFocusTarget) {
          autoFocusTarget.setAttribute('autofocus', '');
        }
      });
      const panelAnimation = animationRegistry.getAnimation(this.el, 'dialog.show');
      const overlayAnimation = animationRegistry.getAnimation(this.el, 'dialog.overlay.show');
      await Promise.all([animationRegistry.animateTo(this.panel, panelAnimation.keyframes, panelAnimation.options), animationRegistry.animateTo(this.overlay, overlayAnimation.keyframes, overlayAnimation.options)]);
      this.scAfterShow.emit();
    }
    else {
      // Hide
      this.scHide.emit();
      await Promise.all([animationRegistry.stopAnimations(this.dialog), animationRegistry.stopAnimations(this.overlay)]);
      const panelAnimation = animationRegistry.getAnimation(this.el, 'dialog.hide');
      const overlayAnimation = animationRegistry.getAnimation(this.el, 'dialog.overlay.hide');
      await Promise.all([animationRegistry.animateTo(this.panel, panelAnimation.keyframes, panelAnimation.options), animationRegistry.animateTo(this.overlay, overlayAnimation.keyframes, overlayAnimation.options)]);
      this.dialog.hidden = true;
      unlockBodyScrolling(this.el);
      // Restore focus to the original trigger
      const trigger = this.originalTrigger;
      if (typeof (trigger === null || trigger === void 0 ? void 0 : trigger.focus) === 'function') {
        setTimeout(() => trigger.focus());
      }
      this.scAfterHide.emit();
    }
  }
  componentDidLoad() {
    this.hasFooter = !!this.el.querySelector('[slot="footer"]');
    this.dialog.hidden = !this.open;
    if (this.open) {
      lockBodyScrolling(this.el);
    }
  }
  disconnectedCallback() {
    unlockBodyScrolling(this.el);
  }
  render() {
    return (index.h("div", { part: "base", ref: el => (this.dialog = el), class: {
        'dialog': true,
        'dialog--open': this.open,
        'dialog--has-footer': this.hasFooter,
      }, onKeyDown: e => this.handleKeyDown(e) }, index.h("div", { part: "overlay", class: "dialog__overlay", onClick: e => {
        e.preventDefault();
        e.stopImmediatePropagation();
        this.requestClose('overlay');
      }, ref: el => (this.overlay = el), tabindex: "-1" }), index.h("div", { part: "panel", class: "dialog__panel", role: "dialog", "aria-modal": "true", "aria-hidden": this.open ? 'false' : 'true', "aria-label": this.noHeader || this.label, "aria-labelledby": !this.noHeader || 'title', ref: el => (this.panel = el), tabindex: "0" }, !this.noHeader && (index.h("header", { part: "header", class: "dialog__header" }, index.h("h2", { part: "title", class: "dialog__title", id: "title" }, index.h("slot", { name: "label" }, " ", this.label.length > 0 ? this.label : String.fromCharCode(65279), " ")), index.h("sc-button", { class: "dialog__close", type: "text", circle: true, part: "close-button", exportparts: "base:close-button__base", onClick: e => {
        e.preventDefault();
        e.stopImmediatePropagation();
        this.requestClose('close-button');
      } }, index.h("sc-icon", { name: "x", label: wp.i18n.__('Close', 'surecart') })))), index.h("div", { part: "body", class: "dialog__body" }, index.h("slot", null)), index.h("footer", { part: "footer", class: "dialog__footer" }, index.h("slot", { name: "footer" })))));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "open": ["handleOpenChange"]
  }; }
};
animationRegistry.setDefaultAnimation('dialog.show', {
  keyframes: [
    { opacity: 0, transform: 'scale(0.8)' },
    { opacity: 1, transform: 'scale(1)' },
  ],
  options: { duration: 150, easing: 'ease' },
});
animationRegistry.setDefaultAnimation('dialog.hide', {
  keyframes: [
    { opacity: 1, transform: 'scale(1)' },
    { opacity: 0, transform: 'scale(0.8)' },
  ],
  options: { duration: 150, easing: 'ease' },
});
animationRegistry.setDefaultAnimation('dialog.denyClose', {
  keyframes: [{ transform: 'scale(1)' }, { transform: 'scale(1.02)' }, { transform: 'scale(1)' }],
  options: { duration: 150 },
});
animationRegistry.setDefaultAnimation('dialog.overlay.show', {
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  options: { duration: 150 },
});
animationRegistry.setDefaultAnimation('dialog.overlay.hide', {
  keyframes: [{ opacity: 1 }, { opacity: 0 }],
  options: { duration: 150 },
});
ScDialog.style = scDialogCss;

const scFlexCss = ":host{display:block;--spacing:var(--sc-spacing-small)}.flex{display:flex;gap:var(--sc-flex-column-gap, var(--spacing));justify-content:var(--sc-flex-space-between, space-between)}.justify-flex-start{justify-content:flex-start}.justify-flex-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-space-between{justify-content:space-between}.justify-space-around{justify-content:space-around}.justify-space-evenly{justify-content:space-evenly}.wrap-wrap{flex-wrap:wrap}.wrap-no-wrap{flex-wrap:no-wrap}.align-flex-start{align-items:flex-start}.align-flex-end{align-items:flex-end}.align-center{align-items:center}.align-baseline{align-items:baseline}.align-stretch{align-items:stretch}.direction-row{flex-direction:row}.direction-row-reverse{flex-direction:row-reverse}.direction-column{flex-direction:column}.direction-column-reverse{flex-direction:column-reverse}@media (max-width: 480px){.stack-mobile{flex-direction:column}}@media (max-width: 768px){.stack-tablet{flex-direction:column}}@media (max-width: 1180px){.stack-desktop{flex-direction:column}}";

const ScFlex = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.alignItems = undefined;
    this.justifyContent = undefined;
    this.flexDirection = undefined;
    this.columnGap = undefined;
    this.flexWrap = undefined;
    this.stack = undefined;
  }
  render() {
    return (index.h("div", { part: "base", class: {
        flex: true,
        ...(this.justifyContent ? { [`justify-${this.justifyContent}`]: true } : {}),
        ...(this.alignItems ? { [`align-${this.alignItems}`]: true } : {}),
        ...(this.flexDirection ? { [`direction-${this.flexDirection}`]: true } : {}),
        ...(this.columnGap ? { [`column-gap-${this.columnGap}`]: true } : {}),
        ...(this.flexWrap ? { [`wrap-${this.flexWrap}`]: true } : {}),
        ...(this.stack ? { [`stack-${this.stack}`]: true } : {}),
      } }, index.h("slot", null)));
  }
};
ScFlex.style = scFlexCss;

const ScFormatDate = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.locale = undefined;
    this.date = new Date();
    this.weekday = undefined;
    this.era = undefined;
    this.year = undefined;
    this.month = undefined;
    this.day = undefined;
    this.hour = undefined;
    this.minute = undefined;
    this.second = undefined;
    this.timeZoneName = undefined;
    this.timeZone = undefined;
    this.hourFormat = 'auto';
    this.type = 'date';
  }
  render() {
    const dateString = this.type === 'timestamp' ? parseInt(this.date.toString()) * 1000 : this.date;
    const date = new Date(dateString);
    const hour12 = this.hourFormat === 'auto' ? undefined : this.hourFormat === '12';
    // Check for an invalid date
    if (isNaN(date.getMilliseconds())) {
      return;
    }
    return new Intl.DateTimeFormat(this.locale, {
      weekday: this.weekday,
      era: this.era,
      year: this.year,
      month: this.month,
      day: this.day,
      hour: this.hour,
      minute: this.minute,
      second: this.second,
      timeZoneName: this.timeZoneName,
      timeZone: this.timeZone,
      hour12: hour12,
    }).format(date);
  }
};

const UNIT_TYPES = {
  kg: 'kilogram',
  lb: 'pound',
  g: 'gram',
  oz: 'ounce',
};
const ScFormatNumber = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.value = 0;
    this.locale = undefined;
    this.type = 'decimal';
    this.noGrouping = false;
    this.currency = 'USD';
    this.currencyDisplay = 'symbol';
    this.minimumIntegerDigits = undefined;
    this.minimumFractionDigits = null;
    this.maximumFractionDigits = undefined;
    this.minimumSignificantDigits = undefined;
    this.maximumSignificantDigits = undefined;
    this.noConvert = undefined;
    this.unit = 'lb';
  }
  render() {
    if (isNaN(this.value)) {
      return '';
    }
    const lang = navigator.language || (navigator === null || navigator === void 0 ? void 0 : navigator.browserLanguage) || (navigator.languages || ['en'])[0];
    // maybe convert zero decimal currencies.
    const value = this.noConvert || this.type !== 'currency' ? this.value : currency.maybeConvertAmount(this.value, this.currency.toUpperCase());
    // decide how many decimal places to use.
    const minimumFractionDigits = value % 1 == 0 ? 0 : 2;
    return new Intl.NumberFormat(this.locale || lang, {
      style: this.type,
      currency: this.currency.toUpperCase(),
      currencyDisplay: this.currencyDisplay,
      useGrouping: !this.noGrouping,
      minimumIntegerDigits: this.minimumIntegerDigits,
      minimumFractionDigits: this.minimumFractionDigits !== null ? this.minimumFractionDigits : minimumFractionDigits,
      maximumFractionDigits: this.maximumFractionDigits,
      minimumSignificantDigits: this.minimumSignificantDigits,
      maximumSignificantDigits: this.maximumSignificantDigits,
      unit: UNIT_TYPES[this.unit],
    }).format(value);
  }
};

const iconFiles = new Map();
const requestIcon = (url) => {
  if (iconFiles.has(url)) {
    return iconFiles.get(url);
  }
  else {
    const request = fetch(url).then(async (response) => {
      if (response.ok) {
        const div = document.createElement('div');
        div.innerHTML = await response.text();
        const svg = div.firstElementChild;
        return {
          ok: response.ok,
          status: response.status,
          svg: svg && svg.tagName.toLowerCase() === 'svg' ? svg.outerHTML : '',
        };
      }
      else {
        return {
          ok: response.ok,
          status: response.status,
          svg: null,
        };
      }
    });
    iconFiles.set(url, request);
    return request;
  }
};

const scIconCss = ":host{--width:1em;--height:1em;display:inline-block;width:var(--width);height:var(--height);contain:strict;box-sizing:content-box !important}.icon,svg{display:block;height:100%;width:100%;stroke-width:var(--sc-icon-stroke-width, 2px)}";

/**
 * The icon's label used for accessibility.
 */
const LABEL_MAPPINGS = {
  'chevron-down': wp.i18n.__('Open', 'surecart'),
  'chevron-up': wp.i18n.__('Close', 'surecart'),
  'chevron-right': wp.i18n.__('Next', 'surecart'),
  'chevron-left': wp.i18n.__('Previous', 'surecart'),
  'arrow-right': wp.i18n.__('Next', 'surecart'),
  'arrow-left': wp.i18n.__('Previous', 'surecart'),
  'arrow-down': wp.i18n.__('Down', 'surecart'),
  'arrow-up': wp.i18n.__('Up', 'surecart'),
  'alert-circle': wp.i18n.__('Alert', 'surecart'),
};
const parser = new DOMParser();
const ScIcon = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.scLoad = index.createEvent(this, "scLoad", 7);
    this.svg = '';
    this.name = undefined;
    this.src = undefined;
    this.label = undefined;
    this.library = 'default';
  }
  /** @internal Fetches the icon and redraws it. Used to handle library registrations. */
  redraw() {
    this.setIcon();
  }
  componentWillLoad() {
    this.setIcon();
  }
  getLabel() {
    let label = '';
    if (this.label) {
      label = (LABEL_MAPPINGS === null || LABEL_MAPPINGS === void 0 ? void 0 : LABEL_MAPPINGS[this.label]) || this.label;
    }
    else if (this.name) {
      label = ((LABEL_MAPPINGS === null || LABEL_MAPPINGS === void 0 ? void 0 : LABEL_MAPPINGS[this.name]) || this.name).replace(/-/g, ' ');
    }
    else if (this.src) {
      label = this.src.replace(/.*\//, '').replace(/-/g, ' ').replace(/\.svg/i, '');
    }
    return label;
  }
  async setIcon() {
    const library$1 = library.getIconLibrary(this.library);
    const url = this.getUrl();
    if (url) {
      try {
        const file = await requestIcon(url);
        if (url !== this.getUrl()) {
          // If the url has changed while fetching the icon, ignore this request
          return;
        }
        else if (file.ok) {
          const doc = parser.parseFromString(file.svg, 'text/html');
          const svgEl = doc.body.querySelector('svg');
          if (svgEl) {
            if (library$1 && library$1.mutator) {
              library$1.mutator(svgEl);
            }
            this.svg = svgEl.outerHTML;
            this.scLoad.emit();
          }
          else {
            this.svg = '';
            console.error({ status: file === null || file === void 0 ? void 0 : file.status });
          }
        }
        else {
          this.svg = '';
          console.error({ status: file === null || file === void 0 ? void 0 : file.status });
        }
      }
      catch {
        console.error({ status: -1 });
      }
    }
    else if (this.svg) {
      // If we can't resolve a URL and an icon was previously set, remove it
      this.svg = '';
    }
  }
  getUrl() {
    const library$1 = library.getIconLibrary(this.library);
    if (this.name && library$1) {
      return library$1.resolver(this.name);
    }
    else {
      return this.src;
    }
  }
  render() {
    return index.h("div", { part: "base", class: "icon", role: "img", "aria-label": this.getLabel(), innerHTML: this.svg });
  }
  static get assetsDirs() { return ["icon-assets"]; }
  static get watchers() { return {
    "name": ["setIcon"],
    "src": ["setIcon"],
    "library": ["setIcon"]
  }; }
};
ScIcon.style = scIconCss;

const scSkeletonCss = ":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{--border-radius:var(--sc-border-radius-pill);--color:var(--sc-skeleton-color, var(--sc-color-gray-300));--sheen-color:var(--sc-skeleton-sheen-color, var(--sc-color-gray-400));display:block;position:relative}.skeleton{display:flex;width:100%;height:100%;min-height:1rem}.skeleton__indicator{flex:1 1 auto;background:var(--color);border-radius:var(--border-radius)}.skeleton--sheen .skeleton__indicator{background:linear-gradient(270deg, var(--sheen-color), var(--color), var(--color), var(--sheen-color));background-size:400% 100%;background-size:400% 100%;animation:sheen 3s ease-in-out infinite}.skeleton--pulse .skeleton__indicator{animation:pulse 2s ease-in-out 0.5s infinite}@keyframes sheen{0%{background-position:200% 0}to{background-position:-200% 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}";

const ScSkeleton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.effect = 'sheen';
  }
  render() {
    return (index.h("div", { part: "base", class: {
        'skeleton': true,
        'skeleton--pulse': this.effect === 'pulse',
        'skeleton--sheen': this.effect === 'sheen',
      }, "aria-busy": "true", "aria-live": "polite" }, index.h("div", { part: "indicator", class: "skeleton__indicator" })));
  }
};
ScSkeleton.style = scSkeletonCss;

const scSpinnerCss = ":host{--track-color:#0d131e20;--indicator-color:var(--sc-color-primary-500);--stroke-width:2px;--spinner-size:1em;display:inline-block}.spinner{display:inline-block;width:var(--spinner-size);height:var(--spinner-size);border-radius:50%;border:solid var(--stroke-width) var(--track-color);border-top-color:var(--indicator-color);border-right-color:var(--indicator-color);animation:1s linear infinite spin}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}";

const ScSpinner = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return index.h("span", { part: "base", class: "spinner", "aria-busy": "true", "aria-live": "polite" });
  }
};
ScSpinner.style = scSpinnerCss;

const ScSubscriptionReactivate = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.scRequestClose = index.createEvent(this, "scRequestClose", 7);
    this.scRefresh = index.createEvent(this, "scRefresh", 7);
    this.open = undefined;
    this.subscription = undefined;
    this.busy = undefined;
    this.error = undefined;
    this.upcomingPeriod = undefined;
    this.loading = false;
  }
  openChanged() {
    if (this.open) {
      this.fetchUpcoming();
    }
  }
  async fetchUpcoming() {
    var _a;
    this.loading = true;
    try {
      this.upcomingPeriod = await fetch$1.apiFetch({
        method: 'PATCH',
        path: addQueryArgs.addQueryArgs(`surecart/v1/subscriptions/${(_a = this.subscription) === null || _a === void 0 ? void 0 : _a.id}/upcoming_period`, {
          skip_product_group_validation: true,
          expand: ['period.checkout'],
        }),
        data: {
          purge_pending_update: false,
        },
      });
    }
    catch (e) {
      this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
    }
    finally {
      this.loading = false;
    }
  }
  async reactivateSubscription() {
    var _a;
    try {
      this.error = '';
      this.busy = true;
      await fetch$1.apiFetch({
        path: `surecart/v1/subscriptions/${(_a = this.subscription) === null || _a === void 0 ? void 0 : _a.id}/restore`,
        method: 'PATCH',
      });
      this.scRefresh.emit();
      this.scRequestClose.emit('close-button');
    }
    catch (e) {
      this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
    }
    finally {
      this.busy = false;
    }
  }
  renderLoading() {
    return (index.h("sc-flex", { flexDirection: "column", style: { gap: '1em' } }, index.h("sc-skeleton", { style: { width: '20%', display: 'inline-block' } }), index.h("sc-skeleton", { style: { width: '60%', display: 'inline-block' } }), index.h("sc-skeleton", { style: { width: '40%', display: 'inline-block' } })));
  }
  render() {
    var _a, _b, _c, _d;
    return (index.h("sc-dialog", { noHeader: true, open: this.open, style: { '--width': '600px', '--body-spacing': 'var(--sc-spacing-xxx-large)' } }, index.h("sc-dashboard-module", { loading: this.loading, heading: wp.i18n.__('Resubscribe', 'surecart'), class: "subscription-reactivate", error: this.error, style: { '--sc-dashboard-module-spacing': '1em' } }, this.loading ? (this.renderLoading()) : (index.h(index.Fragment, null, index.h("div", { slot: "description" }, index.h("sc-alert", { open: true, type: "warning", title: wp.i18n.__('Confirm Charge', 'surecart') }, wp.i18n.__('You will be charged', 'surecart'), ' ', index.h("sc-format-number", { type: "currency", value: (_b = (_a = this.upcomingPeriod) === null || _a === void 0 ? void 0 : _a.checkout) === null || _b === void 0 ? void 0 : _b.amount_due, currency: (_c = this.subscription) === null || _c === void 0 ? void 0 : _c.currency }), ' ', wp.i18n.__('immediately for your subscription.', 'surecart')), index.h("sc-text", { style: {
        '--font-size': 'var(--sc-font-size-medium)',
        '--color': 'var(--sc-input-label-color)',
        '--line-height': 'var(--sc-line-height-dense)',
        'margin-top': 'var(--sc-spacing-medium)',
      } }, wp.i18n.__('Your subscription will be reactivated and will renew automatically on', 'surecart'), ' ', index.h("strong", null, index.h("sc-format-date", { type: "timestamp", date: (_d = this.upcomingPeriod) === null || _d === void 0 ? void 0 : _d.end_at, month: "long", day: "numeric", year: "numeric" })))), index.h("sc-flex", { justifyContent: "flex-start" }, index.h("sc-button", { type: "primary", loading: this.busy, disabled: this.busy, onClick: () => this.reactivateSubscription() }, wp.i18n.__('Yes, Reactivate', 'surecart')), index.h("sc-button", { disabled: this.busy, style: { color: 'var(--sc-color-gray-500)' }, type: "text", onClick: () => this.scRequestClose.emit() }, wp.i18n.__('No, Keep Inactive', 'surecart'))))), this.busy && index.h("sc-block-ui", null))));
  }
  static get watchers() { return {
    "open": ["openChanged"]
  }; }
};

const scTextCss = ":host{display:block;--font-size:var(--font-size, var(--sc-font-size-medium));--font-weight:var(--font-size, var(--sc-font-weight-normal));--line-height:var(--font-size, var(--sc-line-height-medium));--text-align:left;--color:var(--color, inherit)}.text{margin:0;font-size:var(--font-size);font-weight:var(--font-weight);line-height:var(--line-height);text-align:var(--text-align);color:var(--sc-stacked-list-row-text-color, var(--color))}.text.is-truncated{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.text--is-rtl .text{text-align:right}";

const ScText = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.tag = 'p';
    this.truncate = false;
  }
  render() {
    const CustomTag = this.tag;
    return (index.h(CustomTag, { class: {
        'text': true,
        'is-truncated': this.truncate,
        'text--is-rtl': pageAlign.isRtl()
      } }, index.h("slot", null)));
  }
};
ScText.style = scTextCss;

exports.sc_alert = ScAlert;
exports.sc_block_ui = ScBlockUi;
exports.sc_button = ScButton;
exports.sc_dashboard_module = ScDashboardModule;
exports.sc_dialog = ScDialog;
exports.sc_flex = ScFlex;
exports.sc_format_date = ScFormatDate;
exports.sc_format_number = ScFormatNumber;
exports.sc_icon = ScIcon;
exports.sc_skeleton = ScSkeleton;
exports.sc_spinner = ScSpinner;
exports.sc_subscription_reactivate = ScSubscriptionReactivate;
exports.sc_text = ScText;

//# sourceMappingURL=sc-alert_13.cjs.entry.js.map