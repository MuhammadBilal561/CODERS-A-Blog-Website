var _a,_b,_c,_d,_e,_f,_g;import apiFetch from"@wordpress/api-fetch";import{__}from"@wordpress/i18n";import{addQueryArgs}from"@wordpress/url";apiFetch.fetchAllMiddleware=null,apiFetch.use(apiFetch.createRootURLMiddleware((null===(_b=null===(_a=null===window||void 0===window?void 0:window.parent)||void 0===_a?void 0:_a.scData)||void 0===_b?void 0:_b.root_url)||(null===(_c=null===window||void 0===window?void 0:window.scData)||void 0===_c?void 0:_c.root_url))),(null===(_d=null===window||void 0===window?void 0:window.scData)||void 0===_d?void 0:_d.nonce)&&(apiFetch.nonceMiddleware=apiFetch.createNonceMiddleware(null===(_e=null===window||void 0===window?void 0:window.scData)||void 0===_e?void 0:_e.nonce),apiFetch.use(apiFetch.nonceMiddleware)),(null===(_f=null===window||void 0===window?void 0:window.scData)||void 0===_f?void 0:_f.nonce_endpoint)&&(apiFetch.nonceEndpoint=null===(_g=null===window||void 0===window?void 0:window.scData)||void 0===_g?void 0:_g.nonce_endpoint),apiFetch.use(((o,n)=>(o.path=addQueryArgs(o.path,{t:Date.now()}),n(o))));export default apiFetch;export const parseJsonAndNormalizeError=o=>{const n={code:"invalid_json",message:__("The response is not a valid JSON response.","surecart")};if((null==o?void 0:o.code)&&(null==o?void 0:o.message))throw o;if(!o||!o.json)throw n;return o.json().catch((()=>{throw n}))};export const handleNonceError=async o=>{const n=await parseJsonAndNormalizeError(o);if("rest_cookie_invalid_nonce"!==n.code)throw n;return window.fetch(apiFetch.nonceEndpoint).then((o=>{if(o.status>=200&&o.status<300)return o;throw o})).then((o=>o.text())).then((o=>{apiFetch.nonceMiddleware.nonce=o}))};