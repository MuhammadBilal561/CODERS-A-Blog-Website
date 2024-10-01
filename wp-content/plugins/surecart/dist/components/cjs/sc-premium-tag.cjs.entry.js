'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');

const ScPremiumTag = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'small';
  }
  render() {
    return (index.h("sc-tag", { type: "success", size: this.size }, wp.i18n.__('Premium', 'surecart')));
  }
};

exports.sc_premium_tag = ScPremiumTag;

//# sourceMappingURL=sc-premium-tag.cjs.entry.js.map