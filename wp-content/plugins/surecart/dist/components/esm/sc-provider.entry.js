import { r as registerInstance, c as createEvent, h } from './index-644f5478.js';

const ScProvider = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.mountEmitter = createEvent(this, "mountConsumer", 7);
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
    return h("slot", null);
  }
  static get watchers() { return {
    "STENCIL_CONTEXT": ["watchContext"]
  }; }
};

export { ScProvider as sc_provider };

//# sourceMappingURL=sc-provider.entry.js.map