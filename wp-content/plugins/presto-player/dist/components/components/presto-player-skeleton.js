import{proxyCustomElement,HTMLElement,h}from"@stencil/core/internal/client";const prestoSkeletonCss=":host{position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host{--border-radius:var(--presto-player-border-radius-pill);--color:#e5e7eb;--sheen-color:#f3f4f6;display:block;position:relative}.skeleton{display:flex;width:100%;height:100%;min-height:1rem}.skeleton__indicator{flex:1 1 auto;background:var(--color);border-radius:var(--border-radius)}.skeleton--sheen .skeleton__indicator{background:linear-gradient(270deg, var(--sheen-color), var(--color), var(--color), var(--sheen-color));background-size:400% 100%;background-size:400% 100%;animation:sheen 8s ease-in-out infinite}.skeleton--pulse .skeleton__indicator{animation:pulse 2s ease-in-out 0.5s infinite}@keyframes sheen{0%{background-position:200% 0}to{background-position:-200% 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}",PrestoPlayerSkeletonStyle0=prestoSkeletonCss,PrestoSkeleton=proxyCustomElement(class extends HTMLElement{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.effect="sheen"}render(){return h("div",{key:"0216868b617cb29e8d330467d6e53b7e951b433f",part:"base",class:{skeleton:!0,"skeleton--pulse":"pulse"===this.effect,"skeleton--sheen":"sheen"===this.effect},"aria-busy":"true","aria-live":"polite"},h("div",{key:"16d4cc096efc3652130b78a59a4f42df139e094f",part:"indicator",class:"skeleton__indicator"}))}static get style(){return PrestoPlayerSkeletonStyle0}},[1,"presto-player-skeleton",{effect:[1]}]);function defineCustomElement$1(){"undefined"!=typeof customElements&&["presto-player-skeleton"].forEach((e=>{"presto-player-skeleton"===e&&(customElements.get(e)||customElements.define(e,PrestoSkeleton))}))}const PrestoPlayerSkeleton=PrestoSkeleton,defineCustomElement=defineCustomElement$1;export{PrestoPlayerSkeleton,defineCustomElement};