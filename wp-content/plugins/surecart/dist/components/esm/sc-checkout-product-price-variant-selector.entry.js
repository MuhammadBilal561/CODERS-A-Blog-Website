import { r as registerInstance, h, F as Fragment, a as getElement } from './index-644f5478.js';
import { g as getLineItemByProductId } from './getters-c162c255.js';
import { s as state, o as onChange } from './mutations-b8f9af9f.js';
import { g as getVariantFromValues } from './util-64ee5262.js';
import { u as updateLineItem, a as addLineItem } from './index-d7508e37.js';
import { u as updateFormState } from './mutations-8871d02a.js';
import { c as createErrorNotice } from './mutations-0a628afa.js';
import { i as isProductVariantOptionSoldOut, a as isProductVariantOptionMissing } from './utils-00526fde.js';
import './address-8d75115e.js';
import './index-1046c77e.js';
import './get-query-arg-cb6b8763.js';
import './add-query-args-f4c5962b.js';
import './index-c5a96d53.js';
import './google-357f4c4c.js';
import './currency-728311ef.js';
import './price-178c2e2b.js';
import './fetch-2525e763.js';
import './store-dde63d4d.js';

const scCheckoutProductPriceVariantSelectorCss = "sc-checkout-product-price-variant-selector{display:block}.sc-checkout-product-price-variant-selector{position:relative}.sc-checkout-product-price-variant-selector>*:not(:last-child){display:block;margin-bottom:var(--sc-form-row-spacing, 0.75em)}.sc-checkout-product-price-variant-selector__pills-wrapper{display:flex;flex-wrap:wrap;gap:var(--sc-spacing-x-small)}.sc-checkout-product-price-variant-selector__hidden-input{position:absolute !important;top:0 !important;left:0 !important;opacity:0 !important;padding:0px !important;margin:0px !important;pointer-events:none !important;width:0 !important}";

const ScProductCheckoutSelectVariantOption = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.product = undefined;
    this.label = undefined;
    this.selectorTitle = undefined;
    this.selectedVariant = undefined;
    this.selectedPrice = undefined;
    this.option1 = undefined;
    this.option2 = undefined;
    this.option3 = undefined;
  }
  /** When option values are selected, attempt to find a matching variant. */
  handleOptionChange() {
    var _a, _b;
    this.selectedVariant = getVariantFromValues({
      variants: (_b = (_a = this.product) === null || _a === void 0 ? void 0 : _a.variants) === null || _b === void 0 ? void 0 : _b.data,
      values: {
        ...(this.option1 ? { option_1: this.option1 } : {}),
        ...(this.option2 ? { option_2: this.option2 } : {}),
        ...(this.option3 ? { option_3: this.option3 } : {}),
      },
    });
  }
  /**
   * Is the selected variant out of stock?
   * @returns {boolean} Whether the selected variant is out of stock.
   */
  isSelectedVariantOutOfStock() {
    var _a, _b;
    return ((_a = this.product) === null || _a === void 0 ? void 0 : _a.stock_enabled) && this.hasVariants() && !((_b = this.product) === null || _b === void 0 ? void 0 : _b.allow_out_of_stock_purchases) && this.selectedVariant.available_stock < 1;
  }
  /**
   * Do we have the required selected variant?
   * @returns {boolean} Whether the product has a required variant and it is not selected.
   */
  hasRequiredSelectedVariant() {
    var _a;
    if (!this.hasVariants()) {
      return true;
    }
    return (_a = this.selectedVariant) === null || _a === void 0 ? void 0 : _a.id;
  }
  async reportValidity() {
    this.input.setCustomValidity('');
    if (!this.hasVariants()) {
      return this.input.reportValidity();
    }
    // We don't have a required selected variant.
    if (!this.hasRequiredSelectedVariant()) {
      this.input.setCustomValidity(wp.i18n.__('Please choose an available option.', 'surecart'));
      return this.input.reportValidity();
    }
    // don't let the person checkout with an out of stock selection.
    if (this.isSelectedVariantOutOfStock()) {
      this.input.setCustomValidity(wp.i18n.__('This selection is not available.', 'surecart'));
      return this.input.reportValidity();
    }
    return this.input.reportValidity();
  }
  getSelectedPrice() {
    var _a, _b, _c, _d, _e;
    if (((_c = (_b = (_a = this.product) === null || _a === void 0 ? void 0 : _a.prices) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.length) === 1) {
      return (_e = (_d = this.product) === null || _d === void 0 ? void 0 : _d.prices) === null || _e === void 0 ? void 0 : _e.data[0];
    }
    return this.selectedPrice;
  }
  /** When selected variant and selected price are set, we can update the checkout. */
  async updateLineItems() {
    var _a, _b, _c, _d, _e;
    const selectedPrice = this.getSelectedPrice();
    // We need a price.
    if (!(selectedPrice === null || selectedPrice === void 0 ? void 0 : selectedPrice.id))
      return;
    // get the existing line item.
    const lineItem = this.lineItem();
    // no changes.
    if (((_a = lineItem === null || lineItem === void 0 ? void 0 : lineItem.price) === null || _a === void 0 ? void 0 : _a.id) === (selectedPrice === null || selectedPrice === void 0 ? void 0 : selectedPrice.id) && ((_b = lineItem === null || lineItem === void 0 ? void 0 : lineItem.variant) === null || _b === void 0 ? void 0 : _b.id) === ((_c = this.selectedVariant) === null || _c === void 0 ? void 0 : _c.id))
      return;
    // We need a selected variant if this product has variants.
    if (!this.hasRequiredSelectedVariant())
      return;
    // Don't let the person checkout with an out of stock selection.
    if (this.isSelectedVariantOutOfStock())
      return;
    // create or update the
    try {
      updateFormState('FETCH');
      if (lineItem === null || lineItem === void 0 ? void 0 : lineItem.id) {
        state.checkout = await updateLineItem({
          id: lineItem === null || lineItem === void 0 ? void 0 : lineItem.id,
          data: {
            variant: (_d = this.selectedVariant) === null || _d === void 0 ? void 0 : _d.id,
            price: selectedPrice === null || selectedPrice === void 0 ? void 0 : selectedPrice.id,
            quantity: 1,
          },
        });
      }
      else {
        state.checkout = await addLineItem({
          checkout: state.checkout,
          data: {
            variant: (_e = this.selectedVariant) === null || _e === void 0 ? void 0 : _e.id,
            price: selectedPrice === null || selectedPrice === void 0 ? void 0 : selectedPrice.id,
            quantity: 1,
          },
        });
      }
      updateFormState('RESOLVE');
    }
    catch (e) {
      console.error(e);
      createErrorNotice(e);
      updateFormState('REJECT');
    }
  }
  componentWillLoad() {
    // when checkout changes, update the selected variant and price.
    this.removeListener = onChange('checkout', () => {
      var _a, _b, _c;
      const lineItem = this.lineItem();
      this.selectedVariant = lineItem === null || lineItem === void 0 ? void 0 : lineItem.variant;
      this.selectedPrice = lineItem === null || lineItem === void 0 ? void 0 : lineItem.price;
      this.option1 = (_a = lineItem === null || lineItem === void 0 ? void 0 : lineItem.variant) === null || _a === void 0 ? void 0 : _a.option_1;
      this.option2 = (_b = lineItem === null || lineItem === void 0 ? void 0 : lineItem.variant) === null || _b === void 0 ? void 0 : _b.option_2;
      this.option3 = (_c = lineItem === null || lineItem === void 0 ? void 0 : lineItem.variant) === null || _c === void 0 ? void 0 : _c.option_3;
    });
  }
  // remove listener to prevent leaks.
  disconnectedCallback() {
    this.removeListener();
  }
  // get the line item by product id.
  lineItem() {
    var _a;
    return getLineItemByProductId((_a = this.product) === null || _a === void 0 ? void 0 : _a.id);
  }
  hasVariants() {
    var _a, _b, _c;
    return ((_c = (_b = (_a = this.product) === null || _a === void 0 ? void 0 : _a.variants) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.length) > 0;
  }
  render() {
    var _a, _b, _c, _d, _e;
    return (h("sc-form-control", { class: "sc-checkout-product-price-variant-selector", label: this.selectorTitle }, (this.product.variant_options.data || []).map(({ name, values }, index) => (h("sc-form-control", { label: name }, h("div", { class: "sc-checkout-product-price-variant-selector__pills-wrapper" }, (values || []).map(value => {
      const args = [
        index + 1,
        value,
        {
          ...(this.option1 ? { option_1: this.option1 } : {}),
          ...(this.option2 ? { option_2: this.option2 } : {}),
          ...(this.option3 ? { option_3: this.option3 } : {}),
        },
        this.product,
      ];
      const isUnavailable = isProductVariantOptionSoldOut.apply(void 0, args) || isProductVariantOptionMissing.apply(void 0, args);
      return (h("sc-pill-option", { isUnavailable: isUnavailable, isSelected: this[`option${index + 1}`] === value, onClick: () => (this[`option${index + 1}`] = value) }, h("span", { "aria-hidden": "true" }, value), h("sc-visually-hidden", null, wp.i18n.sprintf(wp.i18n.__('Select %s: %s', 'surecart'), name, value), isUnavailable && h(Fragment, null, " ", wp.i18n.__('(option unavailable)', 'surecart')))));
    }))))), ((_c = (_b = (_a = this.product) === null || _a === void 0 ? void 0 : _a.prices) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.length) > 1 && (h("sc-form-control", { label: !!((_d = this.product.variant_options.data) === null || _d === void 0 ? void 0 : _d.length) ? this.label : null }, h("sc-choices", null, (this.product.prices.data || [])
      .sort((a, b) => (a === null || a === void 0 ? void 0 : a.position) - (b === null || b === void 0 ? void 0 : b.position))
      .map(price => {
      var _a, _b, _c;
      return (h("sc-price-choice-container", { required: true, price: price, label: (price === null || price === void 0 ? void 0 : price.name) || ((_a = this.product) === null || _a === void 0 ? void 0 : _a.name), checked: ((_c = (_b = this.lineItem()) === null || _b === void 0 ? void 0 : _b.price) === null || _c === void 0 ? void 0 : _c.id) === (price === null || price === void 0 ? void 0 : price.id), onScChange: e => {
          if (e.target.checked) {
            this.selectedPrice = price;
          }
        } }));
    })))), h("input", { class: "sc-checkout-product-price-variant-selector__hidden-input", ref: el => (this.input = el), value: (_e = this.selectedVariant) === null || _e === void 0 ? void 0 : _e.id })));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "option1": ["handleOptionChange"],
    "option2": ["handleOptionChange"],
    "option3": ["handleOptionChange"],
    "selectedVariant": ["updateLineItems"],
    "selectedPrice": ["updateLineItems"]
  }; }
};
ScProductCheckoutSelectVariantOption.style = scCheckoutProductPriceVariantSelectorCss;

export { ScProductCheckoutSelectVariantOption as sc_checkout_product_price_variant_selector };

//# sourceMappingURL=sc-checkout-product-price-variant-selector.entry.js.map