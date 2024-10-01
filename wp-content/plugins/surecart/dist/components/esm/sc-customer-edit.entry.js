import { r as registerInstance, h } from './index-644f5478.js';
import { a as apiFetch } from './fetch-2525e763.js';
import { a as addQueryArgs } from './add-query-args-f4c5962b.js';

const scCustomerEditCss = ":host{display:block;position:relative}.customer-edit{display:grid;gap:0.75em}";

const ScCustomerEdit = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.heading = undefined;
    this.customer = undefined;
    this.successUrl = undefined;
    this.loading = undefined;
    this.error = undefined;
  }
  async handleSubmit(e) {
    var _a;
    this.loading = true;
    try {
      const { email, first_name, last_name, phone, billing_matches_shipping, shipping_name, shipping_city, 'tax_identifier.number_type': tax_identifier_number_type, 'tax_identifier.number': tax_identifier_number, shipping_country, shipping_line_1, shipping_postal_code, shipping_state, billing_name, billing_city, billing_country, billing_line_1, billing_postal_code, billing_state, } = await e.target.getFormJson();
      this.customer.billing_address = {
        name: billing_name,
        city: billing_city,
        country: billing_country,
        line_1: billing_line_1,
        postal_code: billing_postal_code,
        state: billing_state,
      };
      this.customer.shipping_address = {
        name: shipping_name,
        city: shipping_city,
        country: shipping_country,
        line_1: shipping_line_1,
        postal_code: shipping_postal_code,
        state: shipping_state,
      };
      await apiFetch({
        path: addQueryArgs(`surecart/v1/customers/${(_a = this.customer) === null || _a === void 0 ? void 0 : _a.id}`, { expand: ['tax_identifier'] }),
        method: 'PATCH',
        data: {
          email,
          first_name,
          last_name,
          phone,
          billing_matches_shipping: billing_matches_shipping === 'on',
          shipping_address: this.customer.shipping_address,
          billing_address: this.customer.billing_address,
          ...(tax_identifier_number && tax_identifier_number_type
            ? {
              tax_identifier: {
                number: tax_identifier_number,
                number_type: tax_identifier_number_type,
              },
            }
            : {}),
        },
      });
      if (this.successUrl) {
        window.location.assign(this.successUrl);
      }
      else {
        this.loading = false;
      }
    }
    catch (e) {
      this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
      this.loading = false;
    }
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    return (h("sc-dashboard-module", { class: "customer-edit", error: this.error }, h("span", { slot: "heading" }, this.heading || wp.i18n.__('Update Billing Details', 'surecart'), ' ', !((_a = this === null || this === void 0 ? void 0 : this.customer) === null || _a === void 0 ? void 0 : _a.live_mode) && (h("sc-tag", { type: "warning", size: "small" }, wp.i18n.__('Test', 'surecart')))), h("sc-card", null, h("sc-form", { onScFormSubmit: e => this.handleSubmit(e) }, h("sc-columns", { style: { '--sc-column-spacing': 'var(--sc-spacing-medium)' } }, h("sc-column", null, h("sc-input", { label: wp.i18n.__('First Name', 'surecart'), name: "first_name", value: (_b = this.customer) === null || _b === void 0 ? void 0 : _b.first_name })), h("sc-column", null, h("sc-input", { label: wp.i18n.__('Last Name', 'surecart'), name: "last_name", value: (_c = this.customer) === null || _c === void 0 ? void 0 : _c.last_name }))), h("sc-column", null, h("sc-phone-input", { label: wp.i18n.__('Phone', 'surecart'), name: "phone", value: (_d = this.customer) === null || _d === void 0 ? void 0 : _d.phone })), h("sc-flex", { style: { '--sc-flex-column-gap': 'var(--sc-spacing-medium)' }, flexDirection: "column" }, h("div", null, h("sc-address", { label: wp.i18n.__('Shipping Address', 'surecart'), showName: true, address: {
        ...(_e = this.customer) === null || _e === void 0 ? void 0 : _e.shipping_address,
      }, required: false, names: {
        name: 'shipping_name',
        country: 'shipping_country',
        line_1: 'shipping_line_1',
        line_2: 'shipping_line_2',
        city: 'shipping_city',
        postal_code: 'shipping_postal_code',
        state: 'shipping_state',
      } })), h("div", null, h("sc-checkbox", { name: "billing_matches_shipping", checked: (_f = this.customer) === null || _f === void 0 ? void 0 : _f.billing_matches_shipping, onScChange: e => {
        this.customer = {
          ...this.customer,
          billing_matches_shipping: e.target.checked,
        };
      } }, wp.i18n.__('Billing address is same as shipping', 'surecart'))), h("div", { style: { display: ((_g = this.customer) === null || _g === void 0 ? void 0 : _g.billing_matches_shipping) ? 'none' : 'block' } }, h("sc-address", { label: wp.i18n.__('Billing Address', 'surecart'), showName: true, address: {
        ...(_h = this.customer) === null || _h === void 0 ? void 0 : _h.billing_address,
      }, names: {
        name: 'billing_name',
        country: 'billing_country',
        line_1: 'billing_line_1',
        line_2: 'billing_line_2',
        city: 'billing_city',
        postal_code: 'billing_postal_code',
        state: 'billing_state',
      }, required: true })), h("sc-tax-id-input", { show: true, number: (_k = (_j = this.customer) === null || _j === void 0 ? void 0 : _j.tax_identifier) === null || _k === void 0 ? void 0 : _k.number, type: (_m = (_l = this.customer) === null || _l === void 0 ? void 0 : _l.tax_identifier) === null || _m === void 0 ? void 0 : _m.number_type })), h("div", null, h("sc-button", { type: "primary", full: true, submit: true }, wp.i18n.__('Save', 'surecart'))))), this.loading && h("sc-block-ui", { spinner: true })));
  }
};
ScCustomerEdit.style = scCustomerEditCss;

export { ScCustomerEdit as sc_customer_edit };

//# sourceMappingURL=sc-customer-edit.entry.js.map