import { r as registerInstance, h, F as Fragment, a as getElement } from './index-644f5478.js';
import { a as apiFetch } from './fetch-2525e763.js';
import { o as onFirstVisible } from './lazy-64c2bf3b.js';
import { p as productNameWithPrice, i as intervalString } from './price-178c2e2b.js';
import { f as formatTaxDisplay } from './tax-79350864.js';
import { a as addQueryArgs } from './add-query-args-f4c5962b.js';
import './currency-728311ef.js';

const scUpcomingInvoiceCss = ":host{display:block;position:relative}.upcoming-invoice{display:grid;gap:var(--sc-spacing-large)}.upcoming-invoice>*{display:grid;gap:var(--sc-spacing-medium)}.new-plan{display:grid;gap:0.25em;color:var(--sc-input-label-color)}.new-plan__heading{font-weight:var(--sc-font-weight-bold)}";

const ScUpcomingInvoice = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.heading = undefined;
    this.successUrl = undefined;
    this.subscriptionId = undefined;
    this.priceId = undefined;
    this.variantId = undefined;
    this.quantity = undefined;
    this.discount = undefined;
    this.payment_method = undefined;
    this.quantityUpdatesEnabled = true;
    this.adHocAmount = undefined;
    this.loading = undefined;
    this.busy = undefined;
    this.error = undefined;
    this.price = undefined;
    this.invoice = undefined;
    this.couponError = undefined;
  }
  componentWillLoad() {
    onFirstVisible(this.el, () => {
      this.fetchItems();
    });
  }
  isFutureInvoice() {
    return this.invoice.start_at >= new Date().getTime() / 1000;
  }
  async fetchItems() {
    var _a, _b;
    try {
      this.loading = true;
      await Promise.all([this.getInvoice(), this.getPrice()]);
    }
    catch (e) {
      console.error(e);
      this.error = ((_b = (_a = e === null || e === void 0 ? void 0 : e.additional_errors) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) || (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
    }
    finally {
      this.loading = false;
    }
  }
  async getPrice() {
    if (!this.priceId)
      return;
    this.price = (await apiFetch({
      path: addQueryArgs(`surecart/v1/prices/${this.priceId}`, {
        expand: ['product'],
      }),
    }));
  }
  async getInvoice() {
    if (!this.subscriptionId)
      return;
    this.invoice = (await apiFetch({
      method: 'PATCH',
      path: addQueryArgs(`surecart/v1/subscriptions/${this.subscriptionId}/upcoming_period/`, {
        expand: [
          'period.checkout',
          'checkout.line_items',
          'line_item.price',
          'price.product',
          'checkout.payment_method',
          'checkout.manual_payment_method',
          'checkout.discount',
          'discount.promotion',
          'discount.coupon',
          'payment_method.card',
          'payment_method.payment_instrument',
          'payment_method.paypal_account',
          'payment_method.bank_account',
        ],
      }),
      data: {
        price: this.priceId,
        variant: this.variantId,
        quantity: this.quantity,
        ...(this.adHocAmount ? { ad_hoc_amount: this.adHocAmount } : {}),
        ...(this.discount ? { discount: this.discount } : {}),
      },
    }));
    return this.invoice;
  }
  async applyCoupon(e) {
    try {
      this.couponError = '';
      this.busy = true;
      this.discount = {
        promotion_code: e.detail,
      };
      await this.getInvoice();
    }
    catch (e) {
      this.couponError = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
    }
    finally {
      this.busy = false;
    }
  }
  async updateQuantity(e) {
    try {
      this.error = '';
      this.busy = true;
      this.quantity = e.detail;
      await this.getInvoice();
    }
    catch (e) {
      this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
    }
    finally {
      this.busy = false;
    }
  }
  async onSubmit() {
    try {
      this.error = '';
      this.busy = true;
      await apiFetch({
        path: `surecart/v1/subscriptions/${this.subscriptionId}`,
        method: 'PATCH',
        data: {
          price: this.priceId,
          quantity: this.quantity,
          variant: this.variantId,
          ...(this.adHocAmount ? { ad_hoc_amount: this.adHocAmount } : {}),
          ...(this.discount ? { discount: this.discount } : {}),
        },
      });
      if (this.successUrl) {
        window.location.assign(this.successUrl);
      }
      else {
        this.busy = false;
      }
    }
    catch (e) {
      this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
      this.busy = false;
    }
  }
  renderName(price) {
    if (typeof (price === null || price === void 0 ? void 0 : price.product) !== 'string') {
      return productNameWithPrice(price);
    }
    return wp.i18n.__('Plan', 'surecart');
  }
  renderRenewalText() {
    var _a;
    if (this.isFutureInvoice()) {
      return (h("div", null, wp.i18n.__("You'll be switched to this plan", 'surecart'), ' ', h("strong", null, wp.i18n.__('at the end of your billing cycle on', 'surecart'), ' ', h("sc-format-date", { type: "timestamp", date: (_a = this.invoice) === null || _a === void 0 ? void 0 : _a.start_at, month: "short", day: "numeric", year: "numeric" }))));
    }
    return (h("div", null, wp.i18n.__("You'll be switched to this plan", 'surecart'), " ", h("strong", null, wp.i18n.__('immediately', 'surecart'))));
  }
  renderEmpty() {
    return h("slot", { name: "empty" }, wp.i18n.__('Something went wrong.', 'surecart'));
  }
  renderLoading() {
    return (h("div", null, h("sc-skeleton", { style: { width: '30%', marginBottom: '0.75em' } }), h("sc-skeleton", { style: { width: '20%', marginBottom: '0.75em' } }), h("sc-skeleton", { style: { width: '40%' } })));
  }
  renderContent() {
    var _a;
    if (this.loading) {
      return this.renderLoading();
    }
    if (!((_a = this.invoice) === null || _a === void 0 ? void 0 : _a.checkout)) {
      return this.renderEmpty();
    }
    const checkout = this.invoice.checkout;
    return (h("div", { class: "new-plan" }, h("div", { class: "new-plan__heading" }, this.renderName(this.price)), h("div", null, h("sc-format-number", { type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: checkout === null || checkout === void 0 ? void 0 : checkout.total_amount }), " ", intervalString(this.price)), h("div", { style: { fontSize: 'var(--sc-font-size-small)' } }, this.renderRenewalText())));
  }
  renderSummary() {
    var _a, _b;
    if (this.loading) {
      return this.renderLoading();
    }
    if (!this.invoice) {
      return this.renderEmpty();
    }
    const checkout = (_a = this.invoice) === null || _a === void 0 ? void 0 : _a.checkout;
    const manualPaymentMethod = (checkout === null || checkout === void 0 ? void 0 : checkout.manual_payment) ? checkout === null || checkout === void 0 ? void 0 : checkout.manual_payment_method : null;
    return (h(Fragment, null, (_b = checkout === null || checkout === void 0 ? void 0 : checkout.line_items) === null || _b === void 0 ? void 0 :
      _b.data.map(item => {
        var _a, _b, _c, _d, _e, _f;
        return (h("sc-product-line-item", { imageUrl: (_b = (_a = item.price) === null || _a === void 0 ? void 0 : _a.product) === null || _b === void 0 ? void 0 : _b.image_url, name: (_d = (_c = item.price) === null || _c === void 0 ? void 0 : _c.product) === null || _d === void 0 ? void 0 : _d.name, priceName: (_e = item === null || item === void 0 ? void 0 : item.price) === null || _e === void 0 ? void 0 : _e.name, variantLabel: ((item === null || item === void 0 ? void 0 : item.variant_options) || []).filter(Boolean).join(' / ') || null, editable: this.quantityUpdatesEnabled, purchasableStatusDisplay: item === null || item === void 0 ? void 0 : item.purchasable_status_display, removable: false, quantity: item === null || item === void 0 ? void 0 : item.quantity, amount: item === null || item === void 0 ? void 0 : item.total_amount, currency: (_f = item === null || item === void 0 ? void 0 : item.price) === null || _f === void 0 ? void 0 : _f.currency, interval: intervalString(item === null || item === void 0 ? void 0 : item.price), onScUpdateQuantity: e => this.updateQuantity(e) }));
      }), h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Subtotal', 'surecart')), h("sc-format-number", { slot: "price", type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: checkout === null || checkout === void 0 ? void 0 : checkout.subtotal_amount })), !!checkout.proration_amount && (h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Proration Credit', 'surecart')), h("sc-format-number", { slot: "price", type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: -(checkout === null || checkout === void 0 ? void 0 : checkout.proration_amount) }))), !!checkout.applied_balance_amount && (h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Applied Balance', 'surecart')), h("sc-format-number", { slot: "price", type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: -(checkout === null || checkout === void 0 ? void 0 : checkout.applied_balance_amount) }))), !!checkout.trial_amount && (h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Trial', 'surecart')), h("sc-format-number", { slot: "price", type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: checkout === null || checkout === void 0 ? void 0 : checkout.trial_amount }))), h("sc-coupon-form", { discount: checkout === null || checkout === void 0 ? void 0 : checkout.discount, label: wp.i18n.__('Add Coupon Code', 'surecart'), onScApplyCoupon: e => this.applyCoupon(e), error: this.couponError, collapsed: true, buttonText: wp.i18n.__('Add Coupon Code', 'surecart') }), !!checkout.tax_amount && (h("sc-line-item", null, h("span", { slot: "description" }, formatTaxDisplay(checkout === null || checkout === void 0 ? void 0 : checkout.tax_label)), h("sc-format-number", { slot: "price", type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: checkout === null || checkout === void 0 ? void 0 : checkout.tax_amount }))), h("sc-divider", { style: { '--spacing': '0' } }), h("sc-line-item", null, h("span", { slot: "description" }, wp.i18n.__('Payment', 'surecart')), h("a", { href: addQueryArgs(window.location.href, {
        action: 'payment',
      }), slot: "price-description" }, h("sc-flex", { "justify-content": "flex-start", "align-items": "center", style: { '--spacing': '0.5em' } }, !!manualPaymentMethod && h("sc-manual-payment-method", { paymentMethod: manualPaymentMethod }), !manualPaymentMethod && h("sc-payment-method", { paymentMethod: checkout === null || checkout === void 0 ? void 0 : checkout.payment_method }), h("sc-icon", { name: "edit-3" })))), h("sc-line-item", { style: { '--price-size': 'var(--sc-font-size-x-large)' } }, h("span", { slot: "title" }, wp.i18n.__('Total Due', 'surecart')), h("sc-format-number", { slot: "price", type: "currency", currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency, value: checkout === null || checkout === void 0 ? void 0 : checkout.amount_due }), h("span", { slot: "currency" }, checkout.currency))));
  }
  render() {
    return (h("div", { class: "upcoming-invoice" }, this.error && (h("sc-alert", { open: !!this.error, type: "danger" }, h("span", { slot: "title" }, wp.i18n.__('Error', 'surecart')), this.error)), h(Fragment, null, h("sc-dashboard-module", { heading: wp.i18n.__('New Plan', 'surecart'), class: "plan-preview", error: this.error }, h("sc-card", null, this.renderContent())), h("sc-dashboard-module", { heading: wp.i18n.__('Summary', 'surecart'), class: "plan-summary" }, h("sc-form", { onScFormSubmit: () => this.onSubmit() }, h("sc-card", null, this.renderSummary()), h("sc-button", { type: "primary", full: true, submit: true, loading: this.loading || this.busy, disabled: this.loading || this.busy }, wp.i18n.__('Confirm', 'surecart')))), h("sc-text", { style: { '--text-align': 'center', '--font-size': 'var(--sc-font-size-small)', '--line-height': 'var(--sc-line-height-normal)' } }, h("slot", { name: "terms" }))), this.busy && h("sc-block-ui", null)));
  }
  get el() { return getElement(this); }
};
ScUpcomingInvoice.style = scUpcomingInvoiceCss;

export { ScUpcomingInvoice as sc_upcoming_invoice };

//# sourceMappingURL=sc-upcoming-invoice.entry.js.map