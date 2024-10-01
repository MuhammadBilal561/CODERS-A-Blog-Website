'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const pure = require('./pure-5be33f24.js');
const watchers = require('./watchers-fecceee2.js');
const mutations = require('./mutations-164b66b1.js');
const store = require('./store-96a02d63.js');
require('./watchers-7fad5b15.js');
const getters = require('./getters-f0495158.js');
const getters$1 = require('./getters-1e382cac.js');
const mutations$2 = require('./mutations-8d7c4499.js');
const mutations$1 = require('./mutations-7113e932.js');
const getters$2 = require('./getters-8b2c88a6.js');
const addQueryArgs = require('./add-query-args-17c551b6.js');
require('./_commonjsHelpers-537d719a.js');
require('./index-00f0fc21.js');
require('./utils-a086ed6e.js');
require('./get-query-arg-53bf21e2.js');
require('./index-fb76df07.js');
require('./google-62bdaeea.js');
require('./currency-ba038e2f.js');
require('./price-f1f1114d.js');
require('./util-efd68af1.js');
require('./address-07819c5b.js');

const scStripePaymentElementCss = "sc-stripe-payment-element{display:block}sc-stripe-payment-element [hidden]{display:none}.loader{display:grid;height:128px;gap:2em}.loader__row{display:flex;align-items:flex-start;justify-content:space-between;gap:1em}.loader__details{display:grid;gap:0.5em}";

const ScStripePaymentElement = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.scPaid = index.createEvent(this, "scPaid", 7);
    this.scSetState = index.createEvent(this, "scSetState", 7);
    this.scPaymentInfoAdded = index.createEvent(this, "scPaymentInfoAdded", 7);
    this.error = undefined;
    this.confirming = false;
    this.loaded = false;
    this.styles = undefined;
  }
  async componentWillLoad() {
    this.fetchStyles();
  }
  async handleStylesChange() {
    this.createOrUpdateElements();
  }
  async fetchStyles() {
    this.styles = (await this.getComputedStyles());
  }
  /**
   * We wait for our property value to resolve (styles have been loaded)
   * This prevents the element appearance api being set before the styles are loaded.
   */
  getComputedStyles() {
    return new Promise(resolve => {
      let checkInterval = setInterval(() => {
        const styles = window.getComputedStyle(document.body);
        const color = styles.getPropertyValue('--sc-color-primary-500');
        if (color) {
          clearInterval(checkInterval);
          resolve(styles);
        }
      }, 100);
    });
  }
  /** Maybe load the stripe element on load. */
  async componentDidLoad() {
    const { processor_data } = getters.getProcessorByType('stripe') || {};
    try {
      getters.state.instances.stripe = await pure.pure.loadStripe(processor_data === null || processor_data === void 0 ? void 0 : processor_data.publishable_key, { stripeAccount: processor_data === null || processor_data === void 0 ? void 0 : processor_data.account_id });
    }
    catch (e) {
      this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Stripe could not be loaded', 'surecart');
      // don't continue.
      return;
    }
    // create or update elements.
    this.createOrUpdateElements();
    this.handleUpdateElement();
    this.unlistenToCheckout = mutations.onChange('checkout', () => {
      this.fetchStyles();
      this.createOrUpdateElements();
      this.handleUpdateElement();
    });
    // we need to listen to the form state and pay when the form state enters the paying state.
    this.unlistenToFormState = store.onChange('formState', () => {
      var _a;
      if (!((_a = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.payment_method_required))
        return;
      if ('paying' === getters$1.currentFormState()) {
        this.maybeConfirmOrder();
      }
    });
  }
  disconnectedCallback() {
    this.unlistenToFormState();
    this.unlistenToCheckout();
  }
  getElementsConfig() {
    var _a, _b, _c, _d;
    const styles = getComputedStyle(this.el);
    return {
      mode: ((_a = mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.remaining_amount_due) > 0 ? 'payment' : 'setup',
      amount: (_b = mutations.state.checkout) === null || _b === void 0 ? void 0 : _b.remaining_amount_due,
      currency: (_c = mutations.state.checkout) === null || _c === void 0 ? void 0 : _c.currency,
      setupFutureUsage: ((_d = mutations.state.checkout) === null || _d === void 0 ? void 0 : _d.reusable_payment_method_required) ? 'off_session' : null,
      appearance: {
        variables: {
          colorPrimary: styles.getPropertyValue('--sc-color-primary-500') || 'black',
          colorText: styles.getPropertyValue('--sc-input-label-color') || 'black',
          borderRadius: styles.getPropertyValue('--sc-input-border-radius-medium') || '4px',
          colorBackground: styles.getPropertyValue('--sc-input-background-color') || 'white',
          fontSizeBase: styles.getPropertyValue('--sc-input-font-size-medium') || '16px',
          colorLogo: styles.getPropertyValue('--sc-stripe-color-logo') || 'light',
          colorLogoTab: styles.getPropertyValue('--sc-stripe-color-logo-tab') || 'light',
          colorLogoTabSelected: styles.getPropertyValue('--sc-stripe-color-logo-tab-selected') || 'light',
          colorTextPlaceholder: styles.getPropertyValue('--sc-input-placeholder-color') || 'black',
        },
        rules: {
          '.Input': {
            border: styles.getPropertyValue('--sc-input-border'),
          },
        },
      },
    };
  }
  /** Update the payment element mode, amount and currency when it changes. */
  createOrUpdateElements() {
    var _a, _b, _c, _d, _e;
    // need an order amount, etc.
    if (!((_a = mutations.state === null || mutations.state === void 0 ? void 0 : mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.payment_method_required))
      return;
    if (!getters.state.instances.stripe)
      return;
    if (((_b = mutations.state.checkout) === null || _b === void 0 ? void 0 : _b.status) && ['paid', 'processing'].includes((_c = mutations.state.checkout) === null || _c === void 0 ? void 0 : _c.status))
      return;
    // create the elements if they have not yet been created.
    if (!getters.state.instances.stripeElements) {
      // we have what we need, load elements.
      getters.state.instances.stripeElements = getters.state.instances.stripe.elements(this.getElementsConfig());
      const address = getters$2.getCompleteAddress('shipping');
      // create the payment element.
      getters.state.instances.stripeElements
        .create('payment', {
        defaultValues: {
          billingDetails: {
            name: (_d = mutations.state.checkout) === null || _d === void 0 ? void 0 : _d.name,
            email: (_e = mutations.state.checkout) === null || _e === void 0 ? void 0 : _e.email,
            ...(!!address ? { address } : {}),
          },
        },
        fields: {
          billingDetails: {
            email: 'never',
          },
        },
      })
        .mount(this.container);
      this.element = getters.state.instances.stripeElements.getElement('payment');
      this.element.on('ready', () => (this.loaded = true));
      this.element.on('change', (event) => {
        var _a, _b, _c, _d, _e, _f, _g;
        const requiredShippingPaymentTypes = ['cashapp', 'klarna', 'clearpay'];
        mutations.state.paymentMethodRequiresShipping = requiredShippingPaymentTypes.includes((_a = event === null || event === void 0 ? void 0 : event.value) === null || _a === void 0 ? void 0 : _a.type);
        if (event.complete) {
          this.scPaymentInfoAdded.emit({
            checkout_id: (_b = mutations.state.checkout) === null || _b === void 0 ? void 0 : _b.id,
            currency: (_c = mutations.state.checkout) === null || _c === void 0 ? void 0 : _c.currency,
            processor_type: 'stripe',
            total_amount: (_d = mutations.state.checkout) === null || _d === void 0 ? void 0 : _d.total_amount,
            line_items: (_e = mutations.state.checkout) === null || _e === void 0 ? void 0 : _e.line_items,
            payment_method: {
              billing_details: {
                email: (_f = mutations.state.checkout) === null || _f === void 0 ? void 0 : _f.email,
                name: (_g = mutations.state.checkout) === null || _g === void 0 ? void 0 : _g.name,
              },
            },
          });
        }
      });
      return;
    }
    getters.state.instances.stripeElements.update(this.getElementsConfig());
  }
  /** Update the default attributes of the element when they cahnge. */
  handleUpdateElement() {
    var _a, _b;
    if (!this.element)
      return;
    if (((_a = mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.status) !== 'draft')
      return;
    const { name, email } = mutations.state.checkout;
    const { line_1: line1, line_2: line2, city, state, country, postal_code } = ((_b = mutations.state.checkout) === null || _b === void 0 ? void 0 : _b.shipping_address) || {};
    this.element.update({
      defaultValues: {
        billingDetails: {
          name,
          email,
          address: {
            line1,
            line2,
            city,
            state,
            country,
            postal_code,
          },
        },
      },
      fields: {
        billingDetails: {
          email: 'never',
        },
      },
    });
  }
  async submit() {
    // this processor is not selected.
    if ((watchers.state === null || watchers.state === void 0 ? void 0 : watchers.state.id) !== 'stripe')
      return;
    // submit the elements.
    const { error } = await getters.state.instances.stripeElements.submit();
    if (error) {
      console.error({ error });
      mutations$1.updateFormState('REJECT');
      mutations$2.createErrorNotice(error);
      this.error = error.message;
      return;
    }
  }
  /**
   * Watch order status and maybe confirm the order.
   */
  async maybeConfirmOrder() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    // this processor is not selected.
    if ((watchers.state === null || watchers.state === void 0 ? void 0 : watchers.state.id) !== 'stripe')
      return;
    // must be a stripe session
    if (((_b = (_a = mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.payment_intent) === null || _b === void 0 ? void 0 : _b.processor_type) !== 'stripe')
      return;
    // need an external_type
    if (!((_f = (_e = (_d = (_c = mutations.state.checkout) === null || _c === void 0 ? void 0 : _c.payment_intent) === null || _d === void 0 ? void 0 : _d.processor_data) === null || _e === void 0 ? void 0 : _e.stripe) === null || _f === void 0 ? void 0 : _f.type))
      return;
    // we need a client secret.
    if (!((_k = (_j = (_h = (_g = mutations.state.checkout) === null || _g === void 0 ? void 0 : _g.payment_intent) === null || _h === void 0 ? void 0 : _h.processor_data) === null || _j === void 0 ? void 0 : _j.stripe) === null || _k === void 0 ? void 0 : _k.client_secret))
      return;
    // confirm the intent.
    return await this.confirm((_p = (_o = (_m = (_l = mutations.state.checkout) === null || _l === void 0 ? void 0 : _l.payment_intent) === null || _m === void 0 ? void 0 : _m.processor_data) === null || _o === void 0 ? void 0 : _o.stripe) === null || _p === void 0 ? void 0 : _p.type);
  }
  async confirm(type, args = {}) {
    var _a, _b, _c, _d;
    const confirmArgs = {
      elements: getters.state.instances.stripeElements,
      clientSecret: (_d = (_c = (_b = (_a = mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.payment_intent) === null || _b === void 0 ? void 0 : _b.processor_data) === null || _c === void 0 ? void 0 : _c.stripe) === null || _d === void 0 ? void 0 : _d.client_secret,
      confirmParams: {
        return_url: addQueryArgs.addQueryArgs(window.location.href, {
          ...(mutations.state.checkout.id ? { checkout_id: mutations.state.checkout.id } : {}),
        }),
        payment_method_data: {
          billing_details: {
            email: mutations.state.checkout.email,
          },
        },
      },
      redirect: 'if_required',
      ...args,
    };
    // prevent possible double-charges
    if (this.confirming)
      return;
    // stripe must be loaded.
    if (!getters.state.instances.stripe)
      return;
    try {
      this.scSetState.emit('PAYING');
      const response = type === 'setup' ? await getters.state.instances.stripe.confirmSetup(confirmArgs) : await getters.state.instances.stripe.confirmPayment(confirmArgs);
      if (response === null || response === void 0 ? void 0 : response.error) {
        this.error = response.error.message;
        throw response.error;
      }
      else {
        this.scSetState.emit('PAID');
        // paid
        this.scPaid.emit();
      }
    }
    catch (e) {
      console.error(e);
      mutations$1.updateFormState('REJECT');
      mutations$2.createErrorNotice(e);
      if (e.message) {
        this.error = e.message;
      }
    }
    finally {
      this.confirming = false;
    }
  }
  render() {
    return (index.h("div", { class: "sc-stripe-payment-element", "data-testid": "stripe-payment-element" }, !!this.error && (index.h("sc-text", { style: {
        'color': 'var(--sc-color-danger-500)',
        '--font-size': 'var(--sc-font-size-small)',
        'marginBottom': '0.5em',
      } }, this.error)), index.h("div", { class: "loader", hidden: this.loaded }, index.h("div", { class: "loader__row" }, index.h("div", { style: { width: '50%' } }, index.h("sc-skeleton", { style: { width: '50%', marginBottom: '0.5em' } }), index.h("sc-skeleton", null)), index.h("div", { style: { flex: '1' } }, index.h("sc-skeleton", { style: { width: '50%', marginBottom: '0.5em' } }), index.h("sc-skeleton", null)), index.h("div", { style: { flex: '1' } }, index.h("sc-skeleton", { style: { width: '50%', marginBottom: '0.5em' } }), index.h("sc-skeleton", null))), index.h("div", { class: "loader__details" }, index.h("sc-skeleton", { style: { height: '1rem' } }), index.h("sc-skeleton", { style: { height: '1rem', width: '30%' } }))), index.h("div", { hidden: !this.loaded, class: "sc-payment-element-container", ref: el => (this.container = el) })));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "styles": ["handleStylesChange"]
  }; }
};
ScStripePaymentElement.style = scStripePaymentElementCss;

exports.sc_stripe_payment_element = ScStripePaymentElement;

//# sourceMappingURL=sc-stripe-payment-element.cjs.entry.js.map