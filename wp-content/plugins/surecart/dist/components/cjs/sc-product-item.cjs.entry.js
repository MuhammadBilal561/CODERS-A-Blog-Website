'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');

const scProductItemCss = ".product-item{text-decoration:none;padding-top:var(--sc-product-item-padding-top);padding-bottom:var(--sc-product-item-padding-bottom);padding-left:var(--sc-product-item-padding-left);padding-right:var(--sc-product-item-padding-right);margin-top:var(--sc-product-item-margin-top);margin-bottom:var(--sc-product-item-margin-bottom);margin-left:var(--sc-product-item-margin-left);margin-right:var(--sc-product-item-margin-right);border:solid var(--sc-product-item-border-width) var(--sc-product-item-border-color);border-radius:var(--sc-product-item-border-radius);color:var(--sc-product-title-text-color);background-color:var(--sc-product-item-background-color);height:100%;box-sizing:border-box;display:grid}";

const ScProductItem = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.product = undefined;
    this.layoutConfig = undefined;
  }
  render() {
    var _a;
    return (index.h("a", { href: (_a = this.product) === null || _a === void 0 ? void 0 : _a.permalink, class: { 'product-item': true } }, this.product &&
      (this.layoutConfig || []).map(layout => {
        var _a, _b, _c, _d;
        const attributes = layout.attributes || {};
        switch (layout.blockName) {
          case 'surecart/product-item-title':
            return index.h("sc-product-item-title", { part: "title" }, (_a = this.product) === null || _a === void 0 ? void 0 : _a.name);
          case 'surecart/product-item-image':
            return index.h("sc-product-item-image", { part: "image", product: this.product, sizing: (_b = layout.attributes) === null || _b === void 0 ? void 0 : _b.sizing });
          case 'surecart/product-item-price':
            return index.h("sc-product-item-price", { part: "price", prices: (_c = this.product) === null || _c === void 0 ? void 0 : _c.prices.data, range: !!(attributes === null || attributes === void 0 ? void 0 : attributes.range), metrics: (_d = this.product) === null || _d === void 0 ? void 0 : _d.metrics });
          default:
            return null;
        }
      })));
  }
};
ScProductItem.style = scProductItemCss;

exports.sc_product_item = ScProductItem;

//# sourceMappingURL=sc-product-item.cjs.entry.js.map