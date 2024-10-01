'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');
const lazy = require('./lazy-bc8baeab.js');
const fetch = require('./fetch-2dba325c.js');
const addQueryArgs = require('./add-query-args-17c551b6.js');

const scLicensesListCss = ":host{display:block}.license__name{font-weight:var(--sc-font-weight-semibold)}.license__details{display:grid;gap:0.25em;color:var(--sc-input-label-color)}";

const ScLicensesList = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.query = {
      page: 1,
      per_page: 10,
    };
    this.heading = wp.i18n.__('Licenses', 'surecart');
    this.isCustomer = undefined;
    this.allLink = undefined;
    this.licenses = [];
    this.copied = false;
    this.loading = false;
    this.error = '';
    this.pagination = {
      total: 0,
      total_pages: 0,
    };
  }
  /** Only fetch if visible */
  componentWillLoad() {
    lazy.onFirstVisible(this.el, () => {
      this.initialFetch();
    });
  }
  async initialFetch() {
    try {
      this.loading = true;
      await this.getLicenses();
    }
    catch (e) {
      console.error(e);
      this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
    }
    finally {
      this.loading = false;
    }
  }
  async getLicenses() {
    if (!this.isCustomer) {
      return;
    }
    const response = (await await fetch.apiFetch({
      path: addQueryArgs.addQueryArgs('surecart/v1/licenses', {
        expand: ['purchase', 'purchase.product', 'activations'],
        ...this.query,
      }),
      parse: false,
    }));
    this.pagination = {
      total: parseInt(response.headers.get('X-WP-Total')),
      total_pages: parseInt(response.headers.get('X-WP-TotalPages')),
    };
    this.licenses = (await response.json());
    return this.licenses;
  }
  renderStatus(status) {
    if (status === 'active') {
      return index.h("sc-tag", { type: "success" }, wp.i18n.__('Active', 'surecart'));
    }
    if (status === 'revoked') {
      return index.h("sc-tag", { type: "danger" }, wp.i18n.__('Revoked', 'surecart'));
    }
    if (status === 'inactive') {
      return index.h("sc-tag", { type: "info" }, wp.i18n.__('Not Activated', 'surecart'));
    }
    return index.h("sc-tag", { type: "info" }, status);
  }
  async copyKey(key) {
    try {
      await navigator.clipboard.writeText(key);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    }
    catch (err) {
      console.error(err);
      alert(wp.i18n.__('Error copying to clipboard', 'surecart'));
    }
  }
  renderLoading() {
    return (index.h("sc-card", { "no-padding": true, style: { '--overflow': 'hidden' } }, index.h("sc-stacked-list", null, index.h("sc-stacked-list-row", { style: { '--columns': '2' }, "mobile-size": 0 }, index.h("div", { style: { padding: '0.5em' } }, index.h("sc-skeleton", { style: { width: '30%', marginBottom: '0.75em' } }), index.h("sc-skeleton", { style: { width: '20%', marginBottom: '0.75em' } }), index.h("sc-skeleton", { style: { width: '40%' } }))))));
  }
  renderEmpty() {
    return (index.h("div", null, index.h("sc-divider", { style: { '--spacing': '0' } }), index.h("slot", { name: "empty" }, index.h("sc-empty", { icon: "file-text" }, wp.i18n.__("You don't have any licenses.", 'surecart')))));
  }
  renderContent() {
    var _a, _b;
    if (this.loading) {
      return this.renderLoading();
    }
    if (((_a = this.licenses) === null || _a === void 0 ? void 0 : _a.length) === 0) {
      return this.renderEmpty();
    }
    return (index.h("sc-card", { "no-padding": true }, index.h("sc-stacked-list", null, (_b = this.licenses) === null || _b === void 0 ? void 0 : _b.map(({ id, purchase, status, activation_limit, activation_count }) => {
      var _a;
      return (index.h("sc-stacked-list-row", { key: id, href: addQueryArgs.addQueryArgs(window.location.href, {
          action: 'show',
          model: 'license',
          id,
        }), "mobile-size": 0 }, index.h("div", { class: "license__details" }, index.h("div", { class: "license__name" }, (_a = purchase === null || purchase === void 0 ? void 0 : purchase.product) === null || _a === void 0 ? void 0 : _a.name), index.h("div", null, this.renderStatus(status), " ", wp.i18n.sprintf(wp.i18n.__('%1s of %2s Activations Used'), activation_count || 0, activation_limit || '∞'))), index.h("sc-icon", { name: "chevron-right", slot: "suffix" })));
    }))));
  }
  render() {
    var _a;
    return (index.h("sc-dashboard-module", { class: "purchase", part: "base", error: this.error }, index.h("span", { slot: "heading" }, index.h("slot", { name: "heading" }, this.heading || wp.i18n.__('License Keys', 'surecart'))), !!this.allLink && !!((_a = this.licenses) === null || _a === void 0 ? void 0 : _a.length) && (index.h("sc-button", { type: "link", href: this.allLink, slot: "end" }, wp.i18n.__('View all', 'surecart'), index.h("sc-icon", { name: "chevron-right", slot: "suffix" }))), this.renderContent()));
  }
  get el() { return index.getElement(this); }
};
ScLicensesList.style = scLicensesListCss;

exports.sc_licenses_list = ScLicensesList;

//# sourceMappingURL=sc-licenses-list.cjs.entry.js.map