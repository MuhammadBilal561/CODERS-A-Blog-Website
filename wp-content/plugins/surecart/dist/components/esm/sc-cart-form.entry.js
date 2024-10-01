import { r as registerInstance, h } from './index-644f5478.js';
import { c as convertLineItemsToLineItemData } from './index-bc0c0045.js';
import { c as createOrUpdateCheckout } from './index-d7508e37.js';
import { s as state, a as store } from './mutations-b8f9af9f.js';
import { u as updateFormState } from './mutations-8871d02a.js';
import './fetch-2525e763.js';
import './add-query-args-f4c5962b.js';
import './get-query-arg-cb6b8763.js';
import './index-1046c77e.js';
import './utils-00526fde.js';
import './index-c5a96d53.js';
import './google-357f4c4c.js';
import './currency-728311ef.js';
import './price-178c2e2b.js';
import './store-dde63d4d.js';

const query = {
  expand: [
    'line_items',
    'line_item.price',
    'price.product',
    'customer',
    'customer.shipping_address',
    'payment_intent',
    'discount',
    'discount.promotion',
    'discount.coupon',
    'shipping_address',
    'tax_identifier',
  ],
};
const ScCartForm = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.quantity = 1;
    this.priceId = undefined;
    this.variantId = undefined;
    this.mode = 'live';
    this.formId = undefined;
    this.busy = undefined;
    this.error = undefined;
  }
  /** Find a line item with this price. */
  getLineItem() {
    var _a, _b, _c;
    const lineItem = (((_b = (_a = state === null || state === void 0 ? void 0 : state.checkout) === null || _a === void 0 ? void 0 : _a.line_items) === null || _b === void 0 ? void 0 : _b.data) || []).find(item => {
      var _a, _b, _c;
      if (this.variantId) {
        return ((_a = item.variant) === null || _a === void 0 ? void 0 : _a.id) === this.variantId && ((_b = item.price) === null || _b === void 0 ? void 0 : _b.id) === this.priceId;
      }
      return ((_c = item.price) === null || _c === void 0 ? void 0 : _c.id) === this.priceId;
    });
    if (!(lineItem === null || lineItem === void 0 ? void 0 : lineItem.id)) {
      return false;
    }
    return {
      id: lineItem === null || lineItem === void 0 ? void 0 : lineItem.id,
      price_id: (_c = lineItem === null || lineItem === void 0 ? void 0 : lineItem.price) === null || _c === void 0 ? void 0 : _c.id,
      quantity: lineItem === null || lineItem === void 0 ? void 0 : lineItem.quantity,
    };
  }
  /** Add the item to cart. */
  async addToCart() {
    const { price } = await this.form.getFormJson();
    try {
      updateFormState('FETCH');
      // if it's ad_hoc, update the amount. Otherwise increment the quantity.
      state.checkout = await this.addOrUpdateLineItem({
        ...(!!price ? { ad_hoc_amount: parseInt(price) || null } : {}),
        ...(!!this.variantId ? { variant_id: this.variantId || null } : {}),
      });
      updateFormState('RESOLVE');
      // store the checkout in localstorage and open the cart
      store.set('cart', { ...store.state.cart, ...{ open: true } });
    }
    catch (e) {
      updateFormState('REJECT');
      console.error(e);
      this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
    }
  }
  async addOrUpdateLineItem(data = {}) {
    var _a, _b;
    // get the current line item from the price id.
    let lineItem = this.getLineItem();
    // convert line items response to line items post.
    let existingData = convertLineItemsToLineItemData(((_a = state === null || state === void 0 ? void 0 : state.checkout) === null || _a === void 0 ? void 0 : _a.line_items) || []);
    // Line item does not exist. Add it.
    return (await createOrUpdateCheckout({
      id: (_b = state === null || state === void 0 ? void 0 : state.checkout) === null || _b === void 0 ? void 0 : _b.id,
      data: {
        live_mode: this.mode === 'live',
        line_items: [
          ...(existingData || []).map((item) => {
            // if the price ids match (we have already a line item)
            const priceOrVariantMatches = this.variantId ? item.price_id === this.priceId && item.variant_id === this.variantId : item.price_id === this.priceId;
            if (priceOrVariantMatches) {
              return {
                ...item,
                ...(!!(data === null || data === void 0 ? void 0 : data.ad_hoc_amount) ? { ad_hoc_amount: data === null || data === void 0 ? void 0 : data.ad_hoc_amount } : {}),
                ...(!!(data === null || data === void 0 ? void 0 : data.variant_id) ? { variant_id: data === null || data === void 0 ? void 0 : data.variant_id } : {}),
                quantity: !(item === null || item === void 0 ? void 0 : item.ad_hoc_amount) ? (item === null || item === void 0 ? void 0 : item.quantity) + 1 : 1, // only increase quantity if not ad_hoc.
              };
            }
            // return item.
            return item;
          }),
          // add a line item if one does not exist.
          ...(!lineItem
            ? [
              {
                price_id: this.priceId,
                variant_id: this.variantId,
                ...(!!(data === null || data === void 0 ? void 0 : data.ad_hoc_amount) ? { ad_hoc_amount: data === null || data === void 0 ? void 0 : data.ad_hoc_amount } : {}),
                quantity: 1,
              },
            ]
            : []),
        ],
      },
      query: {
        ...query,
        form_id: this.formId,
      },
    }));
  }
  render() {
    return (h("sc-form", { ref: el => (this.form = el), onScSubmit: () => {
        this.addToCart();
      } }, this.error && (h("sc-alert", { open: !!this.error, type: "danger" }, h("span", { slot: "title" }, wp.i18n.__('Error', 'surecart')), this.error)), h("slot", null)));
  }
};
ScCartForm.style = "sc-cart-form { display: inline-block }";

export { ScCartForm as sc_cart_form };

//# sourceMappingURL=sc-cart-form.entry.js.map