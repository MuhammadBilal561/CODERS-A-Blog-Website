import { r as registerInstance, h } from './index-644f5478.js';
import { p as pure } from './pure-4f52cebf.js';
import { a as apiFetch } from './fetch-2525e763.js';
import { a as addQueryArgs } from './add-query-args-f4c5962b.js';
import './_commonjsHelpers-9943807e.js';

const scStripeAddMethodCss = "sc-stripe-add-method{display:block}sc-stripe-add-method [hidden]{display:none}.loader{display:grid;height:128px;gap:2em}.loader__row{display:flex;align-items:flex-start;justify-content:space-between;gap:1em}.loader__details{display:grid;gap:0.5em}";

const ScStripeAddMethod = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.liveMode = true;
    this.customerId = undefined;
    this.successUrl = undefined;
    this.loading = undefined;
    this.loaded = undefined;
    this.error = undefined;
    this.paymentIntent = undefined;
  }
  componentWillLoad() {
    this.createPaymentIntent();
  }
  async handlePaymentIntentCreate() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    // we need this data.
    if (!((_c = (_b = (_a = this.paymentIntent) === null || _a === void 0 ? void 0 : _a.processor_data) === null || _b === void 0 ? void 0 : _b.stripe) === null || _c === void 0 ? void 0 : _c.publishable_key) || !((_f = (_e = (_d = this.paymentIntent) === null || _d === void 0 ? void 0 : _d.processor_data) === null || _e === void 0 ? void 0 : _e.stripe) === null || _f === void 0 ? void 0 : _f.account_id))
      return;
    // check if stripe has been initialized
    if (!this.stripe) {
      try {
        this.stripe = await pure.loadStripe((_j = (_h = (_g = this.paymentIntent) === null || _g === void 0 ? void 0 : _g.processor_data) === null || _h === void 0 ? void 0 : _h.stripe) === null || _j === void 0 ? void 0 : _j.publishable_key, { stripeAccount: (_m = (_l = (_k = this.paymentIntent) === null || _k === void 0 ? void 0 : _k.processor_data) === null || _l === void 0 ? void 0 : _l.stripe) === null || _m === void 0 ? void 0 : _m.account_id });
      }
      catch (e) {
        this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Stripe could not be loaded', 'surecart');
        // don't continue.
        return;
      }
    }
    // load the element.
    // we need a stripe instance and client secret.
    if (!((_q = (_p = (_o = this.paymentIntent) === null || _o === void 0 ? void 0 : _o.processor_data) === null || _p === void 0 ? void 0 : _p.stripe) === null || _q === void 0 ? void 0 : _q.client_secret) || !this.container) {
      console.warn('do not have client secret or container');
      return;
    }
    // get the computed styles.
    const styles = getComputedStyle(document.body);
    // we have what we need, load elements.
    this.elements = this.stripe.elements({
      clientSecret: (_t = (_s = (_r = this.paymentIntent) === null || _r === void 0 ? void 0 : _r.processor_data) === null || _s === void 0 ? void 0 : _s.stripe) === null || _t === void 0 ? void 0 : _t.client_secret,
      appearance: {
        variables: {
          colorPrimary: styles.getPropertyValue('--sc-color-primary-500'),
          colorText: styles.getPropertyValue('--sc-input-label-color'),
          borderRadius: styles.getPropertyValue('--sc-input-border-radius-medium'),
          colorBackground: styles.getPropertyValue('--sc-input-background-color'),
          fontSizeBase: styles.getPropertyValue('--sc-input-font-size-medium'),
        },
        rules: {
          '.Input': {
            border: styles.getPropertyValue('--sc-input-border'),
          },
          '.Input::placeholder': {
            color: styles.getPropertyValue('--sc-input-placeholder-color'),
          },
        },
      },
    });
    // create the payment element.
    this.elements
      .create('payment', {
      wallets: {
        applePay: 'never',
        googlePay: 'never',
      },
    })
      .mount('.sc-payment-element-container');
    this.element = this.elements.getElement('payment');
    this.element.on('ready', () => (this.loaded = true));
  }
  async createPaymentIntent() {
    try {
      this.loading = true;
      this.error = '';
      this.paymentIntent = await apiFetch({
        method: 'POST',
        path: 'surecart/v1/payment_intents',
        data: {
          processor_type: 'stripe',
          live_mode: this.liveMode,
          customer_id: this.customerId,
          refresh_status: true,
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
  /**
   * Handle form submission.
   */
  async handleSubmit(e) {
    var _a;
    e.preventDefault();
    this.loading = true;
    try {
      const confirmed = await this.stripe.confirmSetup({
        elements: this.elements,
        confirmParams: {
          return_url: addQueryArgs(this.successUrl, {
            payment_intent: (_a = this.paymentIntent) === null || _a === void 0 ? void 0 : _a.id,
          }),
        },
        redirect: 'always',
      });
      if (confirmed === null || confirmed === void 0 ? void 0 : confirmed.error) {
        this.error = confirmed.error.message;
        throw confirmed.error;
      }
    }
    catch (e) {
      console.error(e);
      this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
      this.loading = false;
    }
  }
  render() {
    return (h("sc-form", { onScFormSubmit: e => this.handleSubmit(e) }, this.error && (h("sc-alert", { open: !!this.error, type: "danger" }, h("span", { slot: "title" }, wp.i18n.__('Error', 'surecart')), this.error)), h("div", { class: "loader", hidden: this.loaded }, h("div", { class: "loader__row" }, h("div", { style: { width: '50%' } }, h("sc-skeleton", { style: { width: '50%', marginBottom: '0.5em' } }), h("sc-skeleton", null)), h("div", { style: { flex: '1' } }, h("sc-skeleton", { style: { width: '50%', marginBottom: '0.5em' } }), h("sc-skeleton", null)), h("div", { style: { flex: '1' } }, h("sc-skeleton", { style: { width: '50%', marginBottom: '0.5em' } }), h("sc-skeleton", null))), h("div", { class: "loader__details" }, h("sc-skeleton", { style: { height: '1rem' } }), h("sc-skeleton", { style: { height: '1rem', width: '30%' } }))), h("div", { hidden: !this.loaded, class: "sc-payment-element-container", ref: el => (this.container = el) }), h("sc-button", { type: "primary", submit: true, full: true, loading: this.loading }, wp.i18n.__('Save Payment Method', 'surecart'))));
  }
  static get watchers() { return {
    "paymentIntent": ["handlePaymentIntentCreate"]
  }; }
};
ScStripeAddMethod.style = scStripeAddMethodCss;

export { ScStripeAddMethod as sc_stripe_add_method };

//# sourceMappingURL=sc-stripe-add-method.entry.js.map