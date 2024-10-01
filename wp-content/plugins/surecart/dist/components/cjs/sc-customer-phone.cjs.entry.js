'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const mutations = require('./mutations-164b66b1.js');
require('./index-00f0fc21.js');
require('./utils-a086ed6e.js');
require('./get-query-arg-53bf21e2.js');
require('./add-query-args-17c551b6.js');
require('./index-fb76df07.js');
require('./google-62bdaeea.js');
require('./currency-ba038e2f.js');
require('./price-f1f1114d.js');

const scCustomerPhoneCss = ":host{display:block}";

const ScCustomerPhone = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.scChange = index.createEvent(this, "scChange", 7);
    this.scClear = index.createEvent(this, "scClear", 7);
    this.scInput = index.createEvent(this, "scInput", 7);
    this.scFocus = index.createEvent(this, "scFocus", 7);
    this.scBlur = index.createEvent(this, "scBlur", 7);
    this.size = 'medium';
    this.value = '';
    this.pill = false;
    this.label = undefined;
    this.showLabel = true;
    this.help = '';
    this.placeholder = undefined;
    this.disabled = false;
    this.readonly = false;
    this.required = false;
    this.invalid = false;
    this.autofocus = undefined;
    this.hasFocus = undefined;
    this.error = undefined;
  }
  async handleChange() {
    this.value = this.input.value;
    this.scChange.emit();
  }
  async reportValidity() {
    var _a, _b;
    return (_b = (_a = this.input) === null || _a === void 0 ? void 0 : _a.reportValidity) === null || _b === void 0 ? void 0 : _b.call(_a);
  }
  componentWillLoad() {
    this.handleCheckoutChange();
    this.removeChangeListener = mutations.onChange('checkout', () => this.handleCheckoutChange());
  }
  disconnectedCallback() {
    this.removeChangeListener();
  }
  handleCheckoutChange() {
    var _a, _b, _c, _d, _e, _f;
    // we only want to do this  if we don't have a value.
    if (this === null || this === void 0 ? void 0 : this.value)
      return;
    // if the checkout has a phone, use that.
    if ((_a = mutations.state.checkout) === null || _a === void 0 ? void 0 : _a.phone) {
      this.value = (_b = mutations.state.checkout) === null || _b === void 0 ? void 0 : _b.phone;
      return;
    }
    // if the customer has a phone, use that.
    if ((_d = (_c = mutations.state.checkout) === null || _c === void 0 ? void 0 : _c.customer) === null || _d === void 0 ? void 0 : _d.phone) {
      this.value = (_f = (_e = mutations.state.checkout) === null || _e === void 0 ? void 0 : _e.customer) === null || _f === void 0 ? void 0 : _f.phone;
      return;
    }
  }
  render() {
    return (index.h("sc-phone-input", { name: "phone", ref: el => (this.input = el), value: this.value, label: this.label, help: this.help, autocomplete: "phone", placeholder: this.placeholder, readonly: this.readonly, required: this.required, invalid: this.invalid, autofocus: this.autofocus, hasFocus: this.hasFocus, onScChange: () => this.handleChange(), onScInput: () => this.scInput.emit(), onScFocus: () => this.scFocus.emit(), onScBlur: () => this.scBlur.emit() }));
  }
};
ScCustomerPhone.style = scCustomerPhoneCss;

exports.sc_customer_phone = ScCustomerPhone;

//# sourceMappingURL=sc-customer-phone.cjs.entry.js.map