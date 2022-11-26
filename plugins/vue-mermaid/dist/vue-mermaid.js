define(["mermaid"],function(n){"use strict";function e(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function t(n,e){return o(n)||d(n,e)||c()}function r(n){return i(n)||a(n)||u()}function i(n){if(Array.isArray(n)){for(var e=0,t=new Array(n.length);e<n.length;e++)t[e]=n[e];return t}}function o(n){if(Array.isArray(n))return n}function a(n){if(Symbol.iterator in Object(n)||"[object Arguments]"===Object.prototype.toString.call(n))return Array.from(n)}function d(n,e){var t=[],r=!0,i=!1,o=void 0;try{for(var a,d=n[Symbol.iterator]();!(r=(a=d.next()).done)&&(t.push(a.value),!e||t.length!==e);r=!0);}catch(n){i=!0,o=n}finally{try{r||null==d.return||d.return()}finally{if(i)throw o}}return t}function u(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function c(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function s(){const n=document.head||document.getElementsByTagName("head")[0],e=s.styles||(s.styles={}),t="undefined"!=typeof navigator&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());return function(r,i){if(!document.querySelector('style[data-vue-ssr-id~="'+r+'"]')){const o=t?i.media||"default":r,a=e[o]||(e[o]={ids:[],parts:[],element:void 0});if(!a.ids.includes(r)){let e=i.source,d=a.ids.length;if(a.ids.push(r),t&&(a.element=a.element||document.querySelector("style[data-group="+o+"]")),!a.element){const e=a.element=document.createElement("style");e.type="text/css",i.media&&e.setAttribute("media",i.media),t&&(e.setAttribute("data-group",o),e.setAttribute("data-next-index","0")),n.appendChild(e)}if(t&&(d=parseInt(a.element.getAttribute("data-next-index")),a.element.setAttribute("data-next-index",d+1)),a.element.styleSheet)a.parts.push(e),a.element.styleSheet.cssText=a.parts.filter(Boolean).join("\n");else{const n=document.createTextNode(e),t=a.element.childNodes;t[d]&&a.element.removeChild(t[d]),t.length?a.element.insertBefore(n,t[d]):a.element.appendChild(n)}}}}}function l(n){n.component("vue-mermaid",h)}n=n&&n.hasOwnProperty("default")?n.default:n;const f={name:"VueMermaid",props:{type:{type:String,default:"graph TD"},nodes:{type:Array,required:!0},styles:{type:Array,default:function(){return[]}},config:{type:Object,default:function(){return{theme:"default",startOnLoad:!1}}}},data:function(){return{edges:[{type:"default",open:"[",close:"]"},{type:"round",open:"(",close:")"},{type:"circle",open:"((",close:"))"},{type:"asymetric",open:">",close:"]"},{type:"rhombus",open:"{",close:"}"}]}},mounted:function(){this.init(),this.loadNodes()},computed:{nodeObject:function(){var n=this.nodes;if(Array.isArray(n)&&n.length>0){return function(n,t){return Object.assign.apply(Object,[{}].concat(r(n.map(function(n){return e({},n[t],n)}))))}(n,"id")}return{}},customStyle:function(){var n=this.nodes,e=this.styles;return n.filter(function(n){return n.style}).map(function(n){return"style ".concat(n.id," ").concat(n.style)}).concat(e)},parseCode:function(){var n=this.nodes;if(Array.isArray(n)&&n.length>0){var e=this.type+"\n",t=e+this.getGroupNodes(n)+this.customStyle.join(" \n");return this.load(t),console.log(t),t}return""}},methods:{getGroupNodes:function(n){var e=this,i=new Map;return n.forEach(function(n){var e=n.group||"",t=i.get(e)||{nids:new Set,narr:[]};t.nids.add(n.id),t.narr.push(n),i.set(e,t)}),r(i.entries()).map(function(n){var r=t(n,2),i=r[0],o=r[1],a=o.nids,d=o.narr;if(""!==i){var u=[],c=[];d.forEach(function(n){n.next?(u.push({id:n.id,text:n.text,style:n.style}),n.next.forEach(function(e){a.has(e)?u.push({id:n.id,text:n.text,link:n.link,next:[e]}):c.push({id:n.id,text:n.text,link:n.link,next:[e]})})):u.push(n)});var s=e.buildNodesStr(u),l=e.buildNodesStr(c);return"subgraph ".concat(i," \n ").concat(s," end \n ").concat(l)}return e.buildNodesStr(d)}).join(" \n")},buildNodesStr:function(n){var e=this;return n.map(function(n){return n.next&&n.next.length>0?n.next.map(function(t){var r=e.nodeObject[t]||e.nodeObject[t.id];return null!=r&&void 0!==r?"".concat(e.buildNode(n)).concat(e.buildLink(n)).concat(e.buildNode(r)):"".concat(e.buildNode(n))}).join("\n"):"".concat(e.buildNode(n))}).join("\n")+"\n"+n.filter(function(n){return n.editable}).map(function(n){return"click ".concat(n.id," mermaidClick")}).join("\n")+"\n"},buildNode:function(n){var e=n.edgeType?this.edges.find(function(e){return e.type===n.edgeType}):this.edges.find(function(n){return"default"===n.type});return"".concat(n.id).concat(e.open).concat(n.text).concat(e.close)},buildLink:function(n){return n.link?n.link:"--\x3e"},loadNodes:function(){this.load(this.parseCode)},init:function(){var e=this;window.mermaidClick=function(n){e.edit(n)},n.initialize(this.config)},load:function(e){if(e){var t=document.getElementById("mermaid");t&&(t.removeAttribute("data-processed"),t.replaceChild(document.createTextNode(e),t.firstChild),n.init(e,t))}},edit:function(n){this.$emit("nodeClick",n)}}};var m=function(){var n=this,e=n.$createElement;return(n._self._c||e)("div",{staticClass:"mermaid",attrs:{id:"mermaid"}},[n._v(n._s(n.parseCode))])},p=[];m._withStripped=!0;var h=function(n,e,t,r,i,o,a,d){const u=("function"==typeof t?t.options:t)||{};u.__file="/Users/liu/githome/vue-mermaid/src/vue-mermaid.vue",u.render||(u.render=n.render,u.staticRenderFns=n.staticRenderFns,u._compiled=!0,i&&(u.functional=!0)),u._scopeId=r;{let n;if(e&&(n=function(n){e.call(this,a(n))}),void 0!==n)if(u.functional){const e=u.render;u.render=function(t,r){return n.call(r),e(t,r)}}else{const e=u.beforeCreate;u.beforeCreate=e?[].concat(e,n):[n]}}return u}({render:m,staticRenderFns:p},function(n){n&&n("data-v-1d591062_0",{source:"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",map:{version:3,sources:[],names:[],mappings:"",file:"vue-mermaid.vue"},media:void 0})},f,void 0,!1,void 0,s,void 0);return{install:l}});
