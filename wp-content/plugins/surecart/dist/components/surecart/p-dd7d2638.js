import{o}from"./p-24f06282.js";import{o as s,s as i}from"./p-c3d54c20.js";import{o as d,a as l,b as r,c as n}from"./p-d8da6b4d.js";const t=()=>{const o=[...l().map((({processor_type:o})=>o)),...r().map((({id:o})=>o))];o.includes(i.id)||(i.id=(null==o?void 0:o.length)?null==o?void 0:o[0]:null)},u=()=>{const o=(n()||[]).map((({id:o})=>o));"mollie"===(null==i?void 0:i.id)?o.includes(i.method)||(i.method=(null==o?void 0:o.length)?null==o?void 0:o[0]:null):i.method=null};o("checkout",(()=>{t(),u()})),s("id",(()=>t())),d("processors",(()=>t())),d("methods",(()=>u()));