!function(){"use strict";var e="SRData";function n(e){var n=document.createElement("div");return n.id="set-randomizer--warning",n.innerHTML=e,n.style.cssText="color: firebrick;font-size: 40%; background-color: white; border: 2px solid red; margin: 40px 10px 0px; padding: 15px; text-shadow: 0px 0px; ",n}const t="(?:[a-zA-Z_][a-zA-Z0-9_\\-]*|\\*)",s=":(?:(n(?:-\\d+)?|-\\d|\\d+)|(\\*))",r={star:!0};function o(e,n){const t=[];for(let s=0;s<e.length;s+=n)t[t.length]=e.slice(s,s+n);return t}function l(e,n,t,s,r,o,l,i){let c;if(t)c=[Number(t)];else if(s){const n=Number(s.slice(1));c=[e.length+n-1]}else if(o){const n=r+Number(o);c=e[n]?[n]:[]}else if(l){const t=n.find(e=>e.name===l),s=t?t.sets:[];if(t&&i){const n=Number(i)>=0?Number(i):e.length+Number(i)-1;c=s[n]>=0?[s[n]]:[]}else c=s}else c=[r];return c}function i(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function c(e,n){if(!n||e.length!==n.length)return!1;for(let t=0,s=e.length;t<s;t++)if(e[t]instanceof Array&&n[t]instanceof Array){if(!c(e[t],n[t]))return!1}else if(e[t]!=n[t])return!1;return!0}function a(e,n){const t={},s=function(n=e.cssSelector){if(t[n])return t[n];{const e=document.querySelectorAll(n);return t[n]=e}};let o=!0;const l={},c=function(n=e.cssSelector){if(l[n])return l[n];{const e=s(n);if(!e||0===e.length)return o=!1,l[n]="";const t=[...e].map(e=>e.innerHTML).join("%%sr%%ELEMDELIM%%");return l[n]=t}},a=(e.isRegex?e.openDelim:i(e.openDelim))+"((?:.|\\n|\\r)*?)"+(e.isRegex?e.closeDelim:i(e.closeDelim)),u={},f=function(n=e.cssSelector){if(u[n])return u[n];{const e=[],t=c(n);let s;try{s=RegExp(a,"gm")}catch{return o=!1,u[n]=[]}let r=s.exec(t);for(;r;)e.push(r[1]),r=s.exec(t);return u[n]=e}},d={},m=function(t=e.cssSelector){if(d[t])return d[t];{const s=[],r=f(t);for(const[t,o]of r.entries()){const r=o.split(e.isRegex?new RegExp(e.fieldSeparator):e.fieldSeparator).map((e,s)=>[n,t,s,e,"n"]);s.push(r)}return d[t]=s}},p=function(n,t,o,l,a,u,d,g=e.cssSelector){const h=function(e,n){const t=e.find(e=>"default"===e.name).stylings;return e.forEach(e=>{["colors","classes"].forEach(t=>{e.stylings[t].randomIndices=n[e.name]?n[e.name][t]:[],e.stylings[t].nextIndex=0})}),{defaultStyle:t,propAccessor:function(n,s=null,r=t){const o=n?e.find(e=>e.name===n).stylings:null,l=s?e.find(e=>e.name===s).stylings:null,i=function(e=null,n=null){return e&&n?l&&l[e]&&l[e][n]||o&&o[e]&&l[e][n]||r[e][n]:e?l&&l[e]||o&&o[e]||r[e]:l||o||r};let c;return{getProp:i,getNextIndex:function(e){let n;const t=i(e);return void 0===c?t.collectiveIndexing&&t.randomStartIndex?0===t.randomIndices.length?(n=Math.floor(Math.random()*t.values.length),t.randomIndices.push(n)):n=0===t.nextIndex?t.randomIndices[0]:t.nextIndex%t.values.length:t.collectiveIndexing?n=t.nextIndex%t.values.length:t.randomStartIndex?(t.setIndex||(t.setIndex=0),void 0===(n=t.randomIndices[t.setIndex])&&(n=Math.floor(Math.random()*t.values.length),t.randomIndices.push(n)),t.setIndex+=1):n=0:n=++c%t.values.length,c=n,t.nextIndex=c+1,n}}},exportIndices:function(){const n={};return e.forEach(e=>{n[e.name]={},["colors","classes"].forEach(t=>{n[e.name][t]=e.stylings[t].randomIndices})}),n}}}(t,a),y=function(e,n){const t=new RegExp("%%(.+)%%(\\d+)%%(\\d+)%%");return{pickStyle:function(e){for(let s=e.length-1;s>=0;s--){let o;if(o=e[s].match(t)){const e=o[1],t=Number(o[2]),s=Number(o[3]),l=n.find(n=>!(n[1]!=r&&n[1]!==e||n[2]!=r&&n[2]!==t||n[3]!=r&&n[3]!==s));if(void 0!==l)return l[0]}}return null},pickValue:function(n,s,o){const l=n.match(t);if(!l)return n;const i=l[1],c=Number(l[2]),a=Number(l[3]);let u;try{if(void 0===(u=e[i][c].values[a]))throw"error"}catch{return null}const f=s?s.find(e=>!(e[1]!=r&&e[1]!==i||e[2]!=r&&e[2]!==c||e[3]!=r&&e[3]!==a)):null,d=o?o.find(e=>!(e[1]!=r&&e[1]!==i||e[2]!=r&&e[2]!==c||e[3]!=r&&e[3]!==a)):null;return`<span${f?` style="color: ${f[0]}"`:""}${d?` class="${d[0]}"`:""}>${u}</span>`}}}(u,l),$=Array(n.length);for(const e of n){const n=[],t=o[e.order],s=h.propAccessor(t,y.pickStyle(e.rendering.map(e=>e[3])));"sort"===s.getProp("display")?e.rendering.sort():"orig"===s.getProp("display")&&(e.rendering=d.find(n=>n.name===e.order).elements);for(const t of e.rendering){const[e,r,o,l,i]=t;if("d"!==i){const e=s.getNextIndex("colors"),t=s.getProp("colors","values")?` color: ${s.getProp("colors","values")[e]};`:"",i=`class="set-randomizer--element set-randomizer--element-index-${r}-${o}"`,c=s.getProp("block")?" display: block;":"",a=`style="padding: 0px ${s.getProp("fieldPadding")}px;${t}${c}"`,u=y.pickValue(l,s.getProp("colors","rules"),s.getProp("classes","rules"));if(u){const e=s.getProp("block")?`<record ${i} ${a}><div>${x=l,x.replace(RegExp("</div><div>","g"),"<br>").replace(RegExp("<div>","g"),"<br>")}</div></record>`:`<record ${i} ${a}>${u}</record>`;n.push(e)}}}"none"===s.getProp("display")?$[e.order]="":0===n.length||"empty"===s.getProp("display")?$[e.order]=`${s.getProp("openDelim")}`+`${s.getProp("emptySet")}`+`${s.getProp("closeDelim")}`:$[e.order]=`${s.getProp("openDelim")}`+`${n.join(s.getProp("fieldSeparator"))}`+`${s.getProp("closeDelim")}`}var x;let v=c(g);for(const[n,t]of f(g).entries())v=v.replace(e.isRegex?new RegExp(`${e.openDelim}${i(t)}${e.closeDelim}`):`${e.openDelim}${t}${e.closeDelim}`,`${$[n]}`);const b=s(g);if(v.split("%%sr%%ELEMDELIM%%").forEach((e,n)=>b[n].innerHTML=e),"div#clozed"===g){const e=m("div#original").flat();if(e.length>0){const t=n.map(n=>({rendering:n.rendering.map(n=>[n[0],n[1],e.find(e=>e[0]===n[0]&&e[1]===n[1])[2],n[3]]),order:n.order}));p(t,renderDirectives,a,"div#original")}}return console.log(h.exportIndices()),h.exportIndices()};return{getElementsOriginal:m,renderSets:p,isValid:o}}function u(e,n){n-=e.length*Math.floor(n/e.length),e.push.apply(e,e.splice(0,n))}function f(e,n){const t=[];for(const n of e)t.push(n);for(const e of n)t.includes(e)||t.push(e);return t}function d(e,n){const t=[];for(const s of n){const n=e[s];n&&t.push(n)}if(n.length<e.length)for(const s of Array.from(new Array(e.length-n.length),(e,t)=>t+n.length))t.push(e[s]);return t}function m(e,n){const t=[];let s=0;for(const r of n)t.push(e.slice(s,s+r)),s+=r;return t}function p(e,n){e.sort((e,n)=>e[0]===n[0]?0:"c"===e[0]?-1:"m"===e[0]&&"d"===n[0]?-1:"m"===e[0]&&"c"===n[0]?1:"d"===e[0]?1:void 0).forEach(e=>(function(e,n){const t=e[0],s=e[2],r=e[3],o=e[4],l=e[5];let i;switch(typeof s){case"number":i=n[s];break;case"object":i=s.flatMap(e=>n[e])}if(i.length<=r||r<-i.length)return;u(i,r);const c=[];let a=e[1];for(const e of i){const n=e[4];if("d"!==n&&"c"!==n&&(c.push(e.slice(0)),"d"!==t&&"m"!==t||(e[4]="d"),0==--a))break}if(c.forEach(e=>e.splice(4,1,"c")),("c"===t||"m"===t)&&c.length>0){let e=l,t=0;for(t+=n[o].slice(t).findIndex(e=>"n"===e[4]||"d"===e[4]);e>0;)t+=n[o].slice(t).findIndex(e=>"n"===e[4]||"d"===e[4]),t++,e--;-1===t&&(t=n[o].length),n[o].splice(t,0,...c)}u(i,-r)})(e,n))}function g(e,n,t,s){const r=Math.random()*(n-e)+e;return s?r.toFixed(t||2):(Math.round(r)*(t||1)).toString()}function h(e,n,t){return`%%${e}%%${n}%%${t}%%`}function y(e,n,o,l,i=[]){const[c]=function(e){const n=[],o=new RegExp("^\\$(?:evaluate|eval|e)\\((?:\\s*(\\d+)\\s*,\\s*)?"+`(?:(${t})(?:(?:${s})?${s})?)`+`(?:\\s*,\\s*(${t})\\s*)?`);for(const t of e.flat()){let e;const s=t[3];if(e=s.match(o)){const t=e[1],s=e[2],o=Number(e[3]),l=Number(e[5]),i=e[7];n.push(["*"===s?r:s,Number.isNaN(o)?r:o,Number.isNaN(l)?r:l,null!=t?Number(t):1,i])}}return[n]}(e),[a,u]=function(e,n,s,o){const l={},i=[],c=new RegExp(`^\\$(${t})(!)?(?!\\()(\\W)((?:.|\\n|\\r)*)`);n.reverse();const a=new RegExp("\\\\n","g"),u=new RegExp("\\\\.","g");for(const t of e.flat()){let e;const[f,d,m,p]=t;if(e=p.match(c)){const t=e[1],c="!"===e[2],p=e[4].replace(`\\${e[3]}`,"%%sr%%ESCDELIM%%").replace(a,"<br/>").replace(u,e=>e.slice(1)).split(e[3]).map(n=>n.replace("%%sr%%ESCDELIM%%",e[3])),g=(l[t]||(l[t]=[])).push({name:t,idx:l[t]?l[t].length:0,values:p,iter:f,set:d,pos:m})-1,y=n.find(e=>e[0]===t&&e[1]===g||e[0]===t&&e[1]===r||e[0]===r&&e[1]===g||e[0]===r&&e[1]===r&&(e[2]===r||e[2]<p.length)),$=[];let x;if(y){x=y[2]===r;const e=y[2],n=y[3],l=y[4];let i;if(l&&!s.find(e=>e.name===l)&&s.push({name:l,values:[]}),i=o.find(e=>e[1]===d&&e[2]===m))$.push(...i[3]),x=!1;else for(let o=!1,i=0;i<n&&!o;i++){let n=h(t,g,e!==r?e:Math.floor(Math.random()*p.length));if(l){let i=0;const c=100,a=s.find(e=>e.name===l).values;for(;a.includes(n)&&i<c;)n=h(t,g,Math.floor(Math.random()*p.length)),e!==r?i=c:i++;i===c?(n=null,o=!0):s.find(e=>e.name===l).values.push(n)}null!=n&&$.push(n)}}else c&&(x=!1,$.push(...Array.from(l[t][g].values.keys(),e=>h(t,g,e))));$.length>0&&i.push([f,d,m,$,x])}}return[l,i]}(e,c,o,n),[f]=function(e,n,o,l,i,c,a){const u=[],f=new RegExp("^\\$(n|name)!\\(\\)$"),d=new RegExp("^\\$(?:pick|p)\\((?:\\s*(\\d+)\\s*,\\s*)?(?:(\\d+(?:\\.\\d*)?):(\\d+(?:\\.\\d*)?)(?::(\\d+))?|"+`(?:(${t})(?:(?:${s})?${s})?)?)`+`(?:\\s*,\\s*(${t})\\s*)?`),m=new RegExp("^[^\\$]");for(const[t,s]of e.entries()){const e=[];let p=a[t]||!1;for(const t of s){let s;const[c,a,u,y]=t;if(!p&&f.test(y))p=!0;else if(s=o.find(e=>e[1]===a&&e[2]===u)){const n=s[3];s[4]&&i.push([c,a,u,n]),e.push(...n.map(e=>[c,a,u,e]))}else if(s=y.match(d)){const t=void 0!==s[1]?Number(s[1]):1,o=s[10],f=s[2],d=s[3],m=s[4],p=s[5],y=Number(s[6]),$=Number(s[8]),x="*"===p?r:p;console.log("pick:vsn",x);const v=Number.isNaN(y)?s[7]?r:0:y,b=Number.isNaN($)?r:$;o&&!l.find(e=>e.name===o)&&l.push({name:o,values:[]});const M=[],E=l.find(e=>e.name===o);let N;if(N=i.find(e=>e[0]===c&&e[1]===a&&e[2]===u))M.push(...N[3]);else{for(let e=!1,s=0;s<t;s++){let t;if(e)break;if(f&&d){const n=f.includes(".")||d.includes(".");if(t=g(Number(f),Number(d),Number(m),n),E){let s=0;const r=100;for(;E.values.includes(t)&&s<r;)t=g(Number(f),Number(d),Number(m),n),s++;s==r&&(t=null,e=!0)}}else{const s=n[x===r?Object.keys(n)[Math.floor(Math.random()*Object.keys(n).length)]:x],o=v===r?Math.floor(Math.random()*s.length):v,l=s&&s.length>0?s[o]:null;if(l)if(b===r){const e=Math.floor(Math.random()*l.values.length);t=h(l.name,o,e)}else t=h(l.name,o,b);if(t&&E){let n=0;const s=100;for(;E.values.includes(t)&&n<s;){const e=Math.floor(Math.random()*l.values.length);t=h(l.name,o,e),n++}n==s&&(t=null,e=!0)}}null!=t&&(E&&E.values.push(t),M.push(t))}M.length>0&&(x===r||v===r||b===r)&&i.push([c,a,u,M])}e.push(...M.map(e=>[c,a,u,e]))}else(m.test(y)||0===y.length)&&e.push(t)}u.push({iter:c,name:t,elements:e,lastMinute:p})}return[u]}(e,a,u,o,n,l,i);return[f,n,o,a]}const $=`(?:(${t})(?:(?:${s})?${s})?)`;function x(e,n,s){const i=function(e,n){const s=[{name:"default",stylings:n},{name:"none",stylings:{colors:{},classes:{},display:"none"}},{name:"block",stylings:{colors:{},classes:{},openDelim:"",closeDelim:"",fieldPadding:0,block:!0}}],l=new RegExp("^\\$(?:style|s)\\("+`(${t})`+"\\s*,\\s*(.*)\\)$");return e.flat().map(e=>[e,e[3].match(l)]).filter(e=>e[1]).forEach(e=>{const[n,t,l]=e[1];let i=s.find(e=>e.name===t);if(!i){const e=s.push({name:t,stylings:{colors:{},classes:{}}});i=s[e-1]}(function(e){const n=[],t=new RegExp("(\\w+):(?:\\[(.*?)\\]|(?:\"(.*?)\"|'(.*?)'|([^,]+)))?","gm");let s=t.exec(e);for(;s;){const r=[s[1],void 0!==s[2]?s[2]:void 0!==s[3]?s[3]:void 0!==s[4]?s[4]:void 0!==s[5]?s[5]:""];n.push(r),s=t.exec(e)}return n})(l).forEach(e=>{const[n,t]=e;if("od"===n||"openDelim"===n)i.stylings.openDelim=t;else if("cd"===n||"closeDelim"===n)i.stylings.closeDelim=t;else if("fs"===n||"fieldSeparator"===n)i.stylings.fieldSeparator=t;else if("fp"===n||"fieldPadding"===n){const e=Number(t);e>=0&&(i.stylings.fieldPadding=e)}else if("es"===n||"emptySet"===n)i.stylings.emptySet=t;else if("clrs"===n||"colors"===n)i.stylings.colors.values=t.split(",").map(e=>e.trim()).filter(e=>e.length>0);else if("clss"===n||"classes"===n)i.stylings.classes.values=t.split(",").map(e=>e.trim()).filter(e=>e.length>0);else if("clrr"===n||"colorRules"===n)i.stylings.colors.rules=o(t.split(",").map(e=>e.trim()),2).map(e=>{if(2!==e.length)return e;const n=e[1].match(`^${$}$`);if(!n)return null;const[t,s,o,l,i,c]=n;return[e[0],"*"===s?r:s,o?Number(o):r,i?Number(i):r]}).filter(e=>e&&4===e.length);else if("clsr"===n||"classRules"===n)i.stylings.classes.rules=o(t.split(",").map(e=>e.trim()),2).map(e=>{if(2!==e.length)return e;const n=e[1].match(`^${$}$`);if(!n)return null;const[t,s,o,l,i,c]=n;return[e[0],"*"===s?r:s,o?Number(o):r,i?Number(i):r]}).filter(e=>e&&4===e.length);else if("clrci"===n||"colorsCollectiveIndexing"===n){const e="true"===t||"yes"===t||"false"!==t&&"no"!==t&&null;"boolean"==typeof e&&(i.stylings.colors.collectiveIndexing=e)}else if("clrrsi"===n||"colorsRandomStartIndex"===n){const e="true"===t||"yes"===t||"false"!==t&&"no"!==t&&null;"boolean"==typeof e&&(i.stylings.colors.randomStartIndex=e)}else if("clsci"===n||"classesCollectiveIndexing"===n){const e="true"===t||"yes"===t||"false"!==t&&"no"!==t&&null;"boolean"==typeof e&&(i.stylings.classes.collectiveIndexing=e)}else if("clsrsi"===n||"classesRandomStartIndex"===n){const e="true"===t||"yes"===t||"false"!==t&&"no"!==t&&null;"boolean"==typeof e&&(i.stylings.classes.randomStartIndex=e)}else if("blk"===n||"block"===n){const e="true"===t||"yes"===t||"false"!==t&&"no"!==t&&null;"boolean"==typeof e&&(i.stylings.block=e)}else"dp"!==n&&"display"!==n||(i.stylings.display=t)})}),s}(e,n),c=function(e,n,s){const r=new RegExp("^\\$(?:apply|app|a)\\("+`(${t})`+"(?:\\s*,\\s*(?:(\\d+)|(n-\\d+)|((?:\\+|-)\\d+)|"+`(${t})(?::(\\d+|n?-\\d+))?`+"))?\\)$"),o=[];return e.flat().map(e=>[e,e[3].match(r)]).filter(e=>e[1]).forEach(t=>{const[r,i,c,a,u,f,d]=t[1];if(n.find(e=>e.name===i)){l(e,s,c,a,t[0][1],u,f,d).forEach(e=>{o[e]=i})}}),o}(e,i,s),a=function(e,n){const s=new RegExp("^\\$(?:rule|r)\\("+`(${t})`+"(?:\\s*,\\s*(?:"+$+"))?\\)$"),o=[];return e.flat().map(e=>[e,e[3].match(s)]).filter(e=>e[1]).forEach(e=>{const[t,s,l,i,c,a,u]=e[1];if(n.find(e=>e.name===s)){const e=Number(i),n=Number(a);o.push([s,"*"===l?r:l,i?e:r,a?n:r])}}),o}(e,i);return[i,c,a]}function v(e,n,t,s,r,o,l){if(e){const n=Number(e);return o<=n?[[],!0]:[[n],!0]}if(n){const e=r+Number(n);return e<0?[[],!0]:o<e?[[],!0]:[[e],!0]}if(t){const e=o+(Number(t)-1);return e<0?[[],!0]:[[e],!0]}if(s){const e=l.find(e=>e.name===s);return e?[e.sets,!0]:[[],!0]}return[[r],!1]}const b=function(e,n,t,s,r,o){return void 0!==e?e:void 0!==n?n:t?0:r.find(e=>e.name===s).elements.reduce((e,n)=>{return n[2]<o?e+1:e},0)};function M(e){for(var n,t,s=e.length;0!==s;)t=Math.floor(Math.random()*s),n=e[s-=1],e[s]=e[t],e[t]=n;return e}function E(e){return e.map(e=>({iter:e.iter,name:e.name,length:e.elements.length,sets:[[e.iter,e.name]],setLengths:[e.elements.length],order:M([...new Array(e.elements.length).keys()]),lastMinute:e.lastMinute}))}function N(e,n){return e.map(e=>{const t=e.sets.map(e=>n.filter(n=>n.name===e)).map(e=>e[0].elements.length),s=t.reduce((e,n)=>e+n,0);return{iter:e.iter,name:e.name,length:s,sets:e.sets.map(n=>[e.iter,n]),setLengths:t,order:M([...new Array(s).keys()]),lastMinute:e.lastMinute}})}function I(e,n,t){return e.reduce((function(e,n,s){var r=S.apply(void 0,
/*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0



  ([a,b],[1,2])


  List Applicative: [a,1], [a,2], [b,1], [b,2]
  ZipList Applicative: [a,1], [b,2]



sequence






