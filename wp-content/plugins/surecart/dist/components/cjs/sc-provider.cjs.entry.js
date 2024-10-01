'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-f1e4d53b.js');

const ScProvider = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.mountEmitter = index.createEvent(this, "mountConsumer", 7);
    this.STENCIL_CONTEXT = undefined;
    this.consumers = [];
  }
  watchContext(newContext) {
    this.consumers.forEach(consumer => consumer(newContext));
  }
  async mountConsumer(event) {
    event.stopPropagation();
    this.consumers = this.consumers.slice().concat([event.detail]);
    await event.detail(this.STENCIL_CONTEXT);
    const index = this.consumers.indexOf(event.detail);
    const newConsumers = this.consumers.slice(0, index).concat(this.consumers.slice(index + 1, this.consumers.length));
    this.consumers = newConsumers;
  }
  disconnectedCallback() {
    this.consumers.map(consumer => this.mountEmitter.emit(consumer));
  }
  render() {
    return index.h("slot", null);
  }
  static get watchers() { return {
    "STENCIL_CONTEXT": ["watchContext"]
  }; }
};

exports.sc_provider = ScProvider;

//# sourceMappingURL=sc-provider.cjs.entry.js.map