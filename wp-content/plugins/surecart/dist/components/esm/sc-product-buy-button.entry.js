import { r as registerInstance, h, H as Host, a as getElement } from './index-644f5478.js';
import { g as getProductBuyLink, s as submitCartForm, a as getTopLevelError, b as getAdditionalErrorMessages } from './error-04f07977.js';
import { s as state, b as setProduct, o as onChange, i as isProductOutOfStock, c as isSelectedVariantMissing } from './watchers-5af31452.js';
import './mutations-b8f9af9f.js';
import './index-1046c77e.js';
import './utils-00526fde.js';
import './get-query-arg-cb6b8763.js';
import './add-query-args-f4c5962b.js';
import './index-c5a96d53.js';
import './google-357f4c4c.js';
import './currency-728311ef.js';
import './price-178c2e2b.js';
import './mutations-8c68bd4f.js';
import './mutations-8871d02a.js';
import './store-dde63d4d.js';
import './mutations-0a628afa.js';
import './index-d7508e37.js';
import './fetch-2525e763.js';
import './google-ee26bba4.js';
import './util-64ee5262.js';

const scProductBuyButtonCss = "sc-product-buy-button{position:relative}sc-product-buy-button a.wp-block-button__link{position:relative;text-decoration:none}sc-product-buy-button .sc-block-button--sold-out,sc-product-buy-button .sc-block-button--unavailable{display:none !important}sc-product-buy-button.is-unavailable a{display:none !important}sc-product-buy-button.is-unavailable .sc-block-button--unavailable{display:initial !important}sc-product-buy-button.is-sold-out a{display:none !important}sc-product-buy-button.is-sold-out .sc-block-button--sold-out{display:initial !important}sc-product-buy-button sc-spinner::part(base){--indicator-color:currentColor;--spinner-size:12px;position:absolute;top:calc(50% - var(--spinner-size) + var(--spinner-size) / 4);left:calc(50% - var(--spinner-size) + var(--spinner-size) / 4)}sc-product-buy-button [data-text],sc-product-buy-button [data-loader]{transition:opacity var(--sc-transition-fast) ease-in-out, visibility var(--sc-transition-fast) ease-in-out}sc-product-buy-button [data-loader]{opacity:0;visibility:hidden}sc-product-buy-button.is-disabled{pointer-events:none}sc-product-buy-button.is-busy [data-text]{opacity:0;visibility:hidden}sc-product-buy-button.is-busy [data-loader]{opacity:1;visibility:visible}sc-product-buy-button sc-alert{margin-bottom:var(--sc-spacing-medium)}sc-product-buy-button.is-out-of-stock [data-text]{opacity:0.6}";

const ScProductBuyButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.addToCart = undefined;
    this.productId = undefined;
    this.formId = undefined;
    this.mode = 'live';
    this.checkoutLink = undefined;
    this.error = undefined;
  }
  async handleCartClick(e) {
    var _a, _b, _c, _d, _e;
    e.preventDefault();
    console.log(e);
    // already busy, do nothing.
    if ((_a = state[this.productId]) === null || _a === void 0 ? void 0 : _a.busy)
      return;
    // ad hoc price, use the dialog.
    if ((_c = (_b = state[this.productId]) === null || _b === void 0 ? void 0 : _b.selectedPrice) === null || _c === void 0 ? void 0 : _c.ad_hoc) {
      setProduct(this.productId, { dialog: this.addToCart ? 'ad_hoc_cart' : 'ad_hoc_buy' });
      return;
    }
    // if add to cart is undefined/false navigate to buy url
    if (!this.addToCart) {
      const checkoutUrl = (_e = (_d = window === null || window === void 0 ? void 0 : window.scData) === null || _d === void 0 ? void 0 : _d.pages) === null || _e === void 0 ? void 0 : _e.checkout;
      if (!checkoutUrl)
        return;
      return window.location.assign(getProductBuyLink(this.productId, checkoutUrl, { no_cart: !this.addToCart }));
    }
    // submit the cart form.
    try {
      console.log('submit');
      await submitCartForm(this.productId);
    }
    catch (e) {
      console.error(e);
      this.error = e;
    }
  }
  componentDidLoad() {
    this.link = this.el.querySelector('a');
    this.updateProductLink();
    onChange(this.productId, () => this.updateProductLink());
  }
  updateProductLink() {
    var _a, _b;
    const checkoutUrl = (_b = (_a = window === null || window === void 0 ? void 0 : window.scData) === null || _a === void 0 ? void 0 : _a.pages) === null || _b === void 0 ? void 0 : _b.checkout;
    if (!checkoutUrl || !this.link)
      return;
    this.link.href = getProductBuyLink(this.productId, checkoutUrl, !this.addToCart ? { no_cart: true } : {});
  }
  render() {
    var _a, _b;
    return (h(Host, { class: {
        'is-busy': ((_a = state[this.productId]) === null || _a === void 0 ? void 0 : _a.busy) && !!this.addToCart,
        'is-disabled': (_b = state[this.productId]) === null || _b === void 0 ? void 0 : _b.disabled,
        'is-sold-out': isProductOutOfStock(this.productId) && !isSelectedVariantMissing(this.productId),
        'is-unavailable': isSelectedVariantMissing(this.productId),
      }, onClick: e => this.handleCartClick(e) }, !!this.error && (h("sc-alert", { onClick: event => {
        event.stopPropagation();
      }, type: "danger", scrollOnOpen: true, open: !!this.error, closable: false }, !!getTopLevelError(this.error) && h("span", { slot: "title", innerHTML: getTopLevelError(this.error) }), (getAdditionalErrorMessages(this.error) || []).map((message, index) => (h("div", { innerHTML: message, key: index }))))), h("slot", null)));
  }
  get el() { return getElement(this); }
};
ScProductBuyButton.style = scProductBuyButtonCss;

export { ScProductBuyButton as sc_product_buy_button };

//# sourceMappingURL=sc-product-buy-button.entry.js.map