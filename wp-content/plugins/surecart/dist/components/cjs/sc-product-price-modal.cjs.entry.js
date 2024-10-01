'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const watchers = require('./watchers-51b054bd.js');
const error = require('./error-25dd031d.js');
require('./index-00f0fc21.js');
require('./google-55083ae7.js');
require('./currency-ba038e2f.js');
require('./google-62bdaeea.js');
require('./utils-a086ed6e.js');
require('./util-efd68af1.js');
require('./index-fb76df07.js');
require('./mutations-164b66b1.js');
require('./get-query-arg-53bf21e2.js');
require('./add-query-args-17c551b6.js');
require('./price-f1f1114d.js');
require('./mutations-8260a74b.js');
require('./mutations-7113e932.js');
require('./store-96a02d63.js');
require('./mutations-8d7c4499.js');
require('./index-a9c75016.js');
require('./fetch-2dba325c.js');

const scProductPriceModalCss = ":host{display:block}sc-dialog{--body-spacing:var(--sc-spacing-xx-large);color:var(--sc-color-gray-600);text-decoration:none;font-size:16px}.dialog__header{display:flex;align-items:center;gap:var(--sc-spacing-medium)}.dialog__header-text{line-height:var(--sc-line-height-dense)}.dialog__image img{width:60px;height:60px;display:block}.dialog__action{font-weight:var(--sc-font-weight-bold)}.dialog__product-name{font-size:var(--sc-font-size-small)}";

const ScProductPriceModal = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.buttonText = undefined;
    this.addToCart = undefined;
    this.productId = undefined;
    this.error = undefined;
  }
  async submit() {
    var _a, _b;
    // if add to cart is undefined/false navigate to buy url
    if (!this.addToCart) {
      const checkoutUrl = (_b = (_a = window === null || window === void 0 ? void 0 : window.scData) === null || _a === void 0 ? void 0 : _a.pages) === null || _b === void 0 ? void 0 : _b.checkout;
      if (!checkoutUrl)
        return;
      return window.location.assign(error.getProductBuyLink(this.productId, checkoutUrl));
    }
    // submit the cart form.
    try {
      await error.submitCartForm(this.productId);
    }
    catch (e) {
      console.error(e);
      this.error = e;
    }
  }
  componentWillLoad() {
    // focus on price input when opened.
    watchers.onChange(this.productId, () => {
      setTimeout(() => {
        var _a;
        (_a = this.priceInput) === null || _a === void 0 ? void 0 : _a.triggerFocus();
      }, 50);
    });
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
    if (!((_b = (_a = watchers.state[this.productId]) === null || _a === void 0 ? void 0 : _a.selectedPrice) === null || _b === void 0 ? void 0 : _b.ad_hoc)) {
      return null;
    }
    return (index.h("sc-dialog", { open: ((_c = watchers.state[this.productId]) === null || _c === void 0 ? void 0 : _c.dialog) === ((this === null || this === void 0 ? void 0 : this.addToCart) ? 'ad_hoc_cart' : 'ad_hoc_buy'), onScRequestClose: () => watchers.setProduct(this.productId, { dialog: null }) }, index.h("span", { class: "dialog__header", slot: "label" }, !!((_e = (_d = watchers.state[this.productId]) === null || _d === void 0 ? void 0 : _d.product) === null || _e === void 0 ? void 0 : _e.image_url) && (index.h("div", { class: "dialog__image" }, index.h("img", { src: (_g = (_f = watchers.state[this.productId]) === null || _f === void 0 ? void 0 : _f.product) === null || _g === void 0 ? void 0 : _g.image_url }))), index.h("div", { class: "dialog__header-text" }, index.h("div", { class: "dialog__action" }, wp.i18n.__('Enter An Amount', 'surecart')), index.h("div", { class: "dialog__product-name" }, (_j = (_h = watchers.state[this.productId]) === null || _h === void 0 ? void 0 : _h.product) === null || _j === void 0 ? void 0 : _j.name))), index.h("sc-form", { onScSubmit: e => {
        e.stopImmediatePropagation();
        this.submit();
      }, onScFormSubmit: e => e.stopImmediatePropagation() }, !!this.error && (index.h("sc-alert", { type: "danger", scrollOnOpen: true, open: !!this.error, closable: false }, !!error.getTopLevelError(this.error) && index.h("span", { slot: "title", innerHTML: error.getTopLevelError(this.error) }), (error.getAdditionalErrorMessages(this.error) || []).map((message, index$1) => (index.h("div", { innerHTML: message, key: index$1 }))))), index.h("sc-price-input", { ref: el => (this.priceInput = el), value: (_m = (_l = (_k = watchers.state[this.productId]) === null || _k === void 0 ? void 0 : _k.adHocAmount) === null || _l === void 0 ? void 0 : _l.toString) === null || _m === void 0 ? void 0 : _m.call(_l), "currency-code": (_p = (_o = watchers.state[this.productId]) === null || _o === void 0 ? void 0 : _o.selectedPrice) === null || _p === void 0 ? void 0 : _p.currency, min: (_r = (_q = watchers.state[this.productId]) === null || _q === void 0 ? void 0 : _q.selectedPrice) === null || _r === void 0 ? void 0 : _r.ad_hoc_min_amount, max: (_t = (_s = watchers.state[this.productId]) === null || _s === void 0 ? void 0 : _s.selectedPrice) === null || _t === void 0 ? void 0 : _t.ad_hoc_max_amount, onScInput: e => watchers.setProduct(this.productId, { adHocAmount: parseInt(e.target.value) }), required: true }), index.h("sc-button", { type: "primary", full: true, submit: true, busy: (_u = watchers.state[this.productId]) === null || _u === void 0 ? void 0 : _u.busy }, index.h("slot", null, this.buttonText || wp.i18n.__('Add To Cart', 'surecart'))))));
  }
  get el() { return index.getElement(this); }
};
ScProductPriceModal.style = scProductPriceModalCss;

exports.sc_product_price_modal = ScProductPriceModal;

//# sourceMappingURL=sc-product-price-modal.cjs.entry.js.map