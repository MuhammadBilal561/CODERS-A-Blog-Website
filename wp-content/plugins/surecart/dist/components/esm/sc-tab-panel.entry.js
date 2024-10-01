import { r as registerInstance, h, H as Host, a as getElement } from './index-644f5478.js';

const scTabPanelCss = ":host{--padding:0;--spacing:var(--sc-spacing-large);display:block}::slotted(*~*){margin-top:var(--spacing)}.tab-panel{border:solid 1px transparent;padding:var(--padding);font-family:var(--sc-font-sans);font-size:var(--sc-font-size-medium)}";

let id = 0;
const ScTabPanel = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.componentId = `tab-panel-${++id}`;
    this.name = '';
    this.active = false;
  }
  render() {
    // If the user didn't provide an ID, we'll set one so we can link tabs and tab panels with aria labels
    this.el.id = this.el.id || this.componentId;
    return (h(Host, { style: { display: this.active ? 'block' : 'none' } }, h("div", { part: "base", class: "tab-panel", role: "tabpanel", "aria-hidden": this.active ? 'false' : 'true' }, h("slot", null))));
  }
  get el() { return getElement(this); }
};
ScTabPanel.style = scTabPanelCss;

export { ScTabPanel as sc_tab_panel };

//# sourceMappingURL=sc-tab-panel.entry.js.map