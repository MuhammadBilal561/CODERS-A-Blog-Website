import{proxyCustomElement,HTMLElement,createEvent,h}from"@stencil/core/internal/client";const scTabGroupCss=":host{display:block;--sc-tabs-min-width:225px}.tab-group{display:flex;flex-wrap:wrap;position:relative;border:solid 1px transparent;border-radius:0;flex-direction:row}@media screen and (min-width: 750px){.tab-group{flex-wrap:nowrap}}.tab-group__tabs{display:flex;flex-wrap:wrap;flex:0 0 auto;flex-direction:column;margin-bottom:var(--sc-spacing-xx-large)}.tab-group__nav-container{order:1;flex:1 0 100%}@media screen and (min-width: 750px){.tab-group__nav-container{min-width:var(--sc-tabs-min-width);flex:0 1 auto}}.tab-group__body{flex:1 1 auto;order:2}@media screen and (min-width: 750px){.tab-group__body{padding:0 var(--sc-spacing-xx-large)}}::slotted(sc-tab){margin-bottom:var(--sc-spacing-xx-small)}",ScTabGroup$1=proxyCustomElement(class extends HTMLElement{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.scTabHide=createEvent(this,"scTabHide",7),this.scTabShow=createEvent(this,"scTabShow",7),this.tabs=[],this.panels=[],this.activeTab=void 0}componentDidLoad(){this.syncTabsAndPanels(),this.setAriaLabels(),this.setActiveTab(this.getActiveTab()||this.tabs[0],{emitEvents:!1}),this.mutationObserver=new MutationObserver((()=>{this.syncTabsAndPanels()})),this.mutationObserver.observe(this.el,{attributes:!0,childList:!0,subtree:!0})}disconnectedCallback(){this.mutationObserver.disconnect()}syncTabsAndPanels(){this.tabs=this.getAllTabs(),this.panels=this.getAllPanels()}setAriaLabels(){this.tabs.map((t=>{const e=this.panels.find((e=>e.name===t.panel));e&&(t.setAttribute("aria-controls",e.getAttribute("id")),e.setAttribute("aria-labelledby",t.getAttribute("id")))}))}handleClick(t){const e=t.target.closest("sc-tab");(null==e?void 0:e.closest("sc-tab-group"))===this.el&&e&&this.setActiveTab(e,{scrollBehavior:"smooth"})}handleKeyDown(t){const e=t.target.closest("sc-tab");if((null==e?void 0:e.closest("sc-tab-group"))!==this.el)return!0;if(["Enter"," "].includes(t.key)&&e&&this.setActiveTab(e,{scrollBehavior:"smooth"}),["ArrowUp","ArrowDown","Home","End"].includes(t.key)){const e=document.activeElement;if(e&&"sc-tab"===e.tagName.toLowerCase()){let a=this.tabs.indexOf(e);"Home"===t.key?a=0:"End"===t.key?a=this.tabs.length-1:"ArrowUp"===t.key?a=Math.max(0,a-1):"ArrowDown"===t.key&&(a=Math.min(this.tabs.length-1,a+1)),this.tabs[a].triggerFocus({preventScroll:!0}),t.preventDefault()}}}setActiveTab(t,e){if(e=Object.assign({emitEvents:!0,scrollBehavior:"auto"},e),t&&t!==this.activeTab&&!t.disabled){const a=this.activeTab;this.activeTab=t,this.tabs.map((t=>t.active=t===this.activeTab)),this.panels.map((t=>t.active=t.name===this.activeTab.panel)),e.emitEvents&&(a&&this.scTabHide.emit(a.panel),this.scTabShow.emit(this.activeTab.panel))}}getActiveTab(){return this.getAllTabs().find((t=>t.active))}getAllChildren(){const t=this.el.shadowRoot.querySelectorAll("slot"),e=["sc-tab","sc-tab-panel"];return Array.from(t).map((t=>{var e;return null===(e=null==t?void 0:t.assignedElements)||void 0===e?void 0:e.call(t,{flatten:!0})})).flat().reduce(((t,e)=>{var a;return t.concat(e,[...(null===(a=null==e?void 0:e.querySelectorAll)||void 0===a?void 0:a.call(e,"*"))||[]])}),[]).filter((t=>{var a,s;return e.includes(null===(s=null===(a=null==t?void 0:t.tagName)||void 0===a?void 0:a.toLowerCase)||void 0===s?void 0:s.call(a))}))}getAllTabs(t=!1){return this.getAllChildren().filter((e=>t?"sc-tab"===e.tagName.toLowerCase():"sc-tab"===e.tagName.toLowerCase()&&!e.disabled))}getAllPanels(){return this.getAllChildren().filter((t=>"sc-tab-panel"===t.tagName.toLowerCase()))}render(){return h("div",{part:"base",class:{"tab-group":!0},onClick:t=>this.handleClick(t),onKeyDown:t=>this.handleKeyDown(t)},h("div",{class:"tab-group__nav-container",part:"nav"},h("div",{class:"tab-group__nav"},h("div",{part:"tabs",class:"tab-group__tabs",role:"tablist"},h("slot",{onSlotchange:()=>this.syncTabsAndPanels(),name:"nav"})))),h("div",{part:"body",class:"tab-group__body"},h("slot",{onSlotchange:()=>this.syncTabsAndPanels()})))}get el(){return this}static get style(){return scTabGroupCss}},[1,"sc-tab-group",{activeTab:[32]}]);function defineCustomElement$1(){"undefined"!=typeof customElements&&["sc-tab-group"].forEach((t=>{"sc-tab-group"===t&&(customElements.get(t)||customElements.define(t,ScTabGroup$1))}))}const ScTabGroup=ScTabGroup$1,defineCustomElement=defineCustomElement$1;export{ScTabGroup,defineCustomElement};