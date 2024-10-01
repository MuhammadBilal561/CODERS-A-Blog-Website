'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const watchers = require('./watchers-fecceee2.js');
require('./watchers-7fad5b15.js');
const getters = require('./getters-f0495158.js');
const mutations = require('./mutations-164b66b1.js');
const getters$1 = require('./getters-8b2c88a6.js');
const mutations$1 = require('./mutations-8260a74b.js');
const fetch = require('./fetch-2dba325c.js');
const MockProcessor = require('./MockProcessor-3e4abd31.js');
const mutations$2 = require('./mutations-8d7c4499.js');
const addQueryArgs = require('./add-query-args-17c551b6.js');
const inline = require('./inline-a19db3f2.js');
const store = require('./store-96a02d63.js');
const getters$2 = require('./getters-1e382cac.js');
const mutations$3 = require('./mutations-7113e932.js');
require('./index-00f0fc21.js');
require('./util-efd68af1.js');
require('./utils-a086ed6e.js');
require('./get-query-arg-53bf21e2.js');
require('./index-fb76df07.js');
require('./google-62bdaeea.js');
require('./currency-ba038e2f.js');
require('./price-f1f1114d.js');
require('./address-07819c5b.js');
require('./index-a9c75016.js');

const listenTo = (prop, propKey, callback) => mutations.on('set', (key, newValue, oldValue) => {
  // ignore non-keys
  if (key !== prop)
    return;
  // handle an array, if one has changed, run callback.
  if (Array.isArray(propKey)) {
    if (propKey.some(key => JSON.stringify(newValue === null || newValue === void 0 ? void 0 : newValue[key]) !== JSON.stringify(oldValue === null || oldValue === void 0 ? void 0 : oldValue[key]))) {
      return callback(newValue, oldValue);
    }
  }
  // handle string.
  if (typeof propKey === 'string') {
    if (JSON.stringify(newValue === null || newValue === void 0 ? void 0 : newValue[propKey]) === JSON.stringify(oldValue === null || oldValue === void 0 ? void 0 : oldValue[propKey]))
      return;
    return callback(newValue === null || newValue === void 0 ? void 0 : newValue[propKey], oldValue === null || oldValue === void 0 ? void 0 : oldValue[propKey]);
  }
});

const scCheckoutMolliePaymentCss = ":host{display:block}";

const ScCheckoutMolliePayment = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.processorId = undefined;
    this.method = undefined;
    this.error = undefined;
    this.methods = undefined;
  }
  componentWillLoad() {
    watchers.state.id = 'mollie';
    this.fetchMethods();
    listenTo('checkout', ['total_amount', 'currency', 'reusabled_payment_method_required', 'shipping_address'], () => this.fetchMethods());
  }
  async fetchMethods() {
    var _a;
    const checkout = mutations.state.checkout;
    if (!(checkout === null || checkout === void 0 ? void 0 : checkout.currency) || !(checkout === null || checkout === void 0 ? void 0 : checkout.total_amount))
      return; // wait until we have a currency.
    try {
      mutations$1.lockCheckout('methods');
      const response = (await fetch.apiFetch({
        path: addQueryArgs.addQueryArgs(`surecart/v1/processors/${this.processorId}/payment_method_types`, {
          amount: checkout === null || checkout === void 0 ? void 0 : checkout.total_amount,
          country: ((_a = checkout === null || checkout === void 0 ? void 0 : checkout.shipping_address) === null || _a === void 0 ? void 0 : _a.country) || 'us',
          currency: checkout === null || checkout === void 0 ? void 0 : checkout.currency,
          ...((checkout === null || checkout === void 0 ? void 0 : checkout.reusable_payment_method_required) ? { reusable: checkout === null || checkout === void 0 ? void 0 : checkout.reusable_payment_method_required } : {}),
          per_page: 100,
        }),
      }));
      getters.state.methods = (response === null || response === void 0 ? void 0 : response.data) || [];
    }
    catch (e) {
      mutations$2.createErrorNotice(e);
      console.error(e);
    }
    finally {
      mutations$1.unLockCheckout('methods');
    }
  }
  renderLoading() {
    return (index.h("sc-card", null, index.h("sc-skeleton", { style: { width: '50%', marginBottom: '0.5em' } }), index.h("sc-skeleton", { style: { width: '30%', marginBottom: '0.5em' } }), index.h("sc-skeleton", { style: { width: '60%', marginBottom: '0.5em' } })));
  }
  render() {
    var _a, _b, _c;
    if (getters$1.checkoutIsLocked('methods') && !((_a = getters.availableMethodTypes()) === null || _a === void 0 ? void 0 : _a.length)) {
      return this.renderLoading();
    }
    if (!((_b = mutations.state.checkout) === null || _b === void 0 ? void 0 : _b.currency)) {
      return this.renderLoading();
    }
    if (!((_c = getters.availableMethodTypes()) === null || _c === void 0 ? void 0 : _c.length)) {
      return (index.h("sc-alert", { type: "warning", open: true }, wp.i18n.__('No available payment methods', 'surecart'), ' '));
    }
    const Tag = getters.hasMultipleMethodChoices() ? 'sc-toggles' : 'div';
    return (index.h(index.Fragment, null, index.h(Tag, { collapsible: false, theme: "container" }, (getters.availableMethodTypes() || []).map(method => (index.h("sc-payment-method-choice", { "processor-id": "mollie", "method-id": method === null || method === void 0 ? void 0 : method.id, key: method === null || method === void 0 ? void 0 : method.id }, index.h("span", { slot: "summary", class: "sc-payment-toggle-summary" }, !!(method === null || method === void 0 ? void 0 : method.image) && index.h("img", { src: method === null || method === void 0 ? void 0 : method.image, "aria-hidden": "true" }), index.h("span", null, method === null || method === void 0 ? void 0 : method.description)), index.h("sc-card", null, index.h("sc-payment-selected", { label: wp.i18n.sprintf(wp.i18n.__('%s selected for check out.', 'surecart'), method === null || method === void 0 ? void 0 : method.description) }, !!(method === null || method === void 0 ? void 0 : method.image) && index.h("img", { slot: "icon", src: method === null || method === void 0 ? void 0 : method.image, style: { width: '32px' } }), wp.i18n.__('Another step will appear after submitting your order to complete your purchase details.', 'surecart')))))), index.h(MockProcessor.MockProcessor, { processor: getters.getAvailableProcessor('mock') }), index.h(MockProcessor.ManualPaymentMethods, { methods: getters.availableManualPaymentMethods() })), !!getters$1.checkoutIsLocked('methods') && index.h("sc-block-ui", { class: "busy-block-ui", "z-index": 9, style: { '--sc-block-ui-opacity': '0.4' } })));
  }
};
ScCheckoutMolliePayment.style = scCheckoutMolliePaymentCss;

const ScCheckoutPaystackPaymentProvider = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  componentWillLoad() {
    // we need to listen to the form state and pay when the form state enters the paying state.
    this.unlistenToFormState = store.onChange('formState', () => {
      // are we paying?
      if ('paying' === getters$2.currentFormState()) {
        this.confirm();
      }
    });
  }
  disconnectedCallback() {
    this.unlistenToFormState();
  }
  async confirm() {
    var _a, _b, _c, _d;
    // this processor is not selected.
    if ((watchers.state === null || watchers.state === void 0 ? void 0 : watchers.state.id) !== 'paystack')
      return;
    // Must be a paystack session
    if (!((_b = (_a = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.payment_intent) === null || _b === void 0 ? void 0 : _b.processor_data.paystack))
      return;
    // Prevent if already paid.
    if (((_c = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _c === void 0 ? void 0 : _c.status) === 'paid')
      return;
    try {
      // must have a public key and access code.
      const { public_key, access_code } = (_d = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _d === void 0 ? void 0 : _d.payment_intent.processor_data.paystack;
      if (!public_key || !access_code) {
        mutations$2.createErrorNotice({ message: wp.i18n.sprintf(wp.i18n.__('Payment gateway configuration incomplete. Please ensure Paystack is properly configured for transactions.', 'surecart')) });
        return;
      }
      const paystack = new inline.se();
      await paystack.newTransaction({
        key: public_key,
        accessCode: access_code,
        onSuccess: async (transaction) => {
          if ((transaction === null || transaction === void 0 ? void 0 : transaction.status) !== 'success') {
            throw { message: wp.i18n.sprintf(wp.i18n.__('Paystack transaction could not be finished. Status: %s', 'surecart'), transaction === null || transaction === void 0 ? void 0 : transaction.status) };
          }
          return mutations$3.updateFormState('PAID');
        },
        onClose: () => mutations$3.updateFormState('REJECT'),
      });
    }
    catch (err) {
      mutations$2.createErrorNotice(err);
      console.error(err);
      mutations$3.updateFormState('REJECT');
    }
  }
};

exports.sc_checkout_mollie_payment = ScCheckoutMolliePayment;
exports.sc_checkout_paystack_payment_provider = ScCheckoutPaystackPaymentProvider;

//# sourceMappingURL=sc-checkout-mollie-payment_2.cjs.entry.js.map