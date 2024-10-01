'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const consumer = require('./consumer-21fdeb72.js');

const scOrderConfirmationCustomerCss = ":host{display:block}";

const ScOrderConfirmationCustomer = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.order = undefined;
    this.heading = undefined;
    this.customer = undefined;
    this.error = undefined;
    this.loading = undefined;
  }
  render() {
    if (!this.customer) {
      return null;
    }
    return (index.h("sc-customer-details", { customer: this.customer, loading: this.loading, error: this.error }, index.h("span", { slot: "heading" }, index.h("slot", { name: "heading" }, this.heading || wp.i18n.__('Billing Details', 'surecart')))));
  }
};
consumer.openWormhole(ScOrderConfirmationCustomer, ['order', 'customer', 'loading'], false);
ScOrderConfirmationCustomer.style = scOrderConfirmationCustomerCss;

exports.sc_order_confirmation_customer = ScOrderConfirmationCustomer;

//# sourceMappingURL=sc-order-confirmation-customer.cjs.entry.js.map