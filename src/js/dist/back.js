!function(){"use strict";function e(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function n(n){let t={};const s=`${e(n.openDelim)}`+"((?:.|\\n|\\r)*?)"+`${e(n.closeDelim)}`,r=function(e=n.query){if(t[e])return t[e];{const n=document.querySelector(e),r=n?n.innerHTML:"",o=[],l=RegExp(s,"gm");let i=l.exec(r);for(;i;)o.push(i[1]),i=l.exec(r);return t[e]=o}},o=function(e=n.query){const t=[];for(const[s,o]of r(e).entries()){const e=o.split(n.fieldSeparator).map((e,n)=>[s,n,e]);t.push(e)}return t},l=function(e,t,s,i,c,a=n.query){const f=function(e,n){const t=e.find(e=>"default"===e.name).stylings;e.forEach(e=>{e.stylings.randomIndices=n[e.name]||[],e.stylings.nextIndex=0});return{defaultStyle:t,propAccessor:function(n,s=t){const r=n?e.find(e=>e.name===n).stylings:s,o=function(e){return void 0!==r[e]?r[e]:s[e]};let l;return{getProp:o,getIndex:function(){let e;return void 0===l?o("collectiveIndexing")&&o("randomStartIndex")?0===o("randomIndices").length?(e=Math.floor(Math.random()*o("colors").length),o("randomIndices").push(e)):e=0===o("nextIndex")?o("randomIndices")[0]:o("nextIndex")%o("colors").length:o("collectiveIndexing")?e=o("nextIndex")%o("colors").length:o("randomStartIndex")?(e=Math.floor(Math.random()*o("colors").length),o("randomIndices").push(e)):e=0:e=++l%o("colors").length,l=e,r.nextIndex=l+1,e}}},exportIndices:function(){const n={};return e.forEach(e=>{n[e.name]=e.stylings.randomIndices}),n}}}(t,i),d=Array(e.length);for(const[n,t]of e.entries()){const e=[],r=s[n],o=f.propAccessor(r);"sort"===o.getProp("display")?t.rendering.sort():"orig"===o.getProp("display")&&(t.rendering=c.find(e=>e.name===n).elements);for(const[n,s]of t.rendering.entries())if("d"!==s[3]){const n=o.getIndex(),t=o.getProp("colors")?` color: ${o.getProp("colors")[n]};`:"",r=`class="set-randomizer--element set-randomizer--element-index-${s[0]}-${s[1]}"`,l="block"===o.getProp("display")?" display: block;":"",i=`style="padding: 0px ${o.getProp("fieldPadding")}px;${t}${l}"`,c="block"===o.getProp("display")?`<record ${r} ${i}><div>${u=s[2],u.replace(RegExp("</div><div>","g"),"<br>").replace(RegExp("<div>","g"),"<br>")}</div></record>`:`<record ${r} ${i}>${s[2]}</record>`;e.push(c)}"none"===o.getProp("display")?d[t.order]="":0===e.length||"empty"===o.getProp("display")?d[t.order]=`${o.getProp("openDelim")}`+`${o.getProp("emptySet")}`+`${o.getProp("closeDelim")}`:d[t.order]=`${o.getProp("openDelim")}`+`${e.join(o.getProp("fieldSeparator"))}`+`${o.getProp("closeDelim")}`}var u;const m=document.querySelector(a);let p=m?m.innerHTML:"";for(const[e,t]of r(a).entries()){const s=d[e];p=p.replace(`${n.openDelim}${t}${n.closeDelim}`,`${s}`)}if(document.querySelector(a).innerHTML=p,"div#clozed"===a){const n=o("div#original").flat();if(n.length>0){const t=e.map(e=>({rendering:e.rendering.map(e=>[e[0],e[1],n.find(n=>n[0]===e[0]&&n[1]===e[1])[2],e[3]]),order:e.order}));l(t,renderDirectives,i,"div#original")}}return f.exportIndices()};return{getOriginalStructure:o,renderSets:l}}const t="[a-zA-Z_]\\w*";function s(e,n,t,s,r,o,l,i){let c;if(t)c=[Number(t)];else if(s){const n=Number(s.slice(1));c=[e.length+n-1]}else if(o){const n=r+Number(o);c=e[n]?[n]:[]}else if(l){const t=n.find(e=>e.name===l),s=t?t.sets:[];if(t&&i){const n=Number(i)>=0?Number(i):e.length+Number(i)-1;c=s[n]>=0?[s[n]]:[]}else c=s}else c=[r];return c}function r(e,n,t,s){const r=Math.random()*(n-e)+e;return s?r.toFixed(t||2):(Math.round(r)*(t||1)).toString()}function o(e,n){const s=[],o=[],l=new RegExp("^\\$(?:generate|gen|g)\\("+`(${t})\\s*,\\s*`+"\\[((?:.|\\n|\\r)*)\\]\\)","m"),i=[],c=new RegExp("\\\\'","g"),a=new RegExp('\\\\"',"g"),f=new RegExp("\\\\n","g"),d=new RegExp("\\\\.","g");for(const n of e.flat()){let e;if(e=n[2].match(l)){const t=[],s=new RegExp("(?:'((?:.|\\n|\\r)*?[^\\\\])'|\"((?:.|\\n|\\r)*?[^\\\\])\")","g");let r=s.exec(n[2]);for(;r;)r[1]?t.push(r[1].replace(c,"'").replace(f,"<br/>").replace(d,e=>e.slice(1))):r[2]&&t.push(r[2].replace(a,'"').replace(f,"<br/>").replace(d,e=>e.slice(1))),r=s.exec(n[2]);i.push({name:e[1],elements:t})}}const u=new RegExp("^\\$(n|name)!\\(\\)$"),m=new RegExp("^\\$(?:pick|p)\\((?:(\\d+(?:\\.\\d*)?):(\\d+(?:\\.\\d*)?)(?::(\\d+))?|"+`(${t})(?::(n(?:-\\d+)?|-\\d|\\d+))?)`+`(?:\\s*,\\s*(${t}))?\\)`),p=new RegExp("^[^\\$]"),h=[];for(const[t,l]of e.entries()){const e=[];let c=!1;for(const t of l){let s;if(u.test(t[2]))c=!0;else if(s=t[2].match(m)){const l=s[6],c=s[1],a=s[2],f=s[3],d=s[4],u=Number(s[5]);l&&!h.find(e=>e.name===l)&&h.push({name:l,values:[]});const m=t[0],p=t[1];let g,y;if(y=n.find(e=>e[0]===m&&e[1]===p))g=y[2];else if(c&&a){const e=c.includes(".")||a.includes(".");if(g=r(Number(c),Number(a),Number(f),e),l){let n=0;const t=1e3;for(;h.find(e=>e.name===l).values.includes(g)&&n<t;)g=r(Number(c),Number(a),Number(f),e),n++;n==t&&(g=null)}}else{const e=i.find(e=>e.name===d);if(e&&(g="number"!=typeof u||Number.isNaN(u)?e.elements[Math.floor(Math.random()*e.elements.length)]:u>=0?e.elements[e.elements.length<=u?null:u]:e.elements[e.elements.length+u<0?null:e.elements.length+u],l)){let n=0;const t=1e3;for(;h.find(e=>e.name===l).values.includes(g)&&n<t;){const t=Math.floor(Math.random()*e.elements.length);g=e.elements[t],n++}n==t&&(g=null)}}if(g){const n=[m,p,g];l&&h.find(e=>e.name===l).values.push(g),o.push(n),e.push(n)}}else(p.test(t[2])||0===t[2].length)&&e.push(t)}s.push({name:t,elements:e,lastMinute:c})}return[s,o]}function l(e,n,t,s,r,o,l){if(e){const n=Number(e);return o<=n?[[],!0]:[[n],!0]}if(n){const e=r+Number(n);return e<0?[[],!0]:o<e?[[],!0]:[[e],!0]}if(t){const e=o+(Number(t)-1);return e<0?[[],!0]:[[e],!0]}if(s){const e=l.find(e=>e.name===s);return e?[e.sets,!0]:[[],!0]}return[[r],!1]}const i=function(e,n,t,s,r,o){return void 0!==e?e:void 0!==n?n:t?0:r.find(e=>e.name===s).elements.reduce((e,n)=>n[1]<o?e+1:e,0)};function c(e,n){if(!n||e.length!==n.length)return!1;for(let t=0,s=e.length;t<s;t++)if(e[t]instanceof Array&&n[t]instanceof Array){if(!c(e[t],n[t]))return!1}else if(e[t]!=n[t])return!1;return!0}function a(e,n){n-=e.length*Math.floor(n/e.length),e.push.apply(e,e.splice(0,n))}function f(e,n){const t=[];for(const n of e)t.push(n);for(const e of n)t.includes(e)||t.push(e);return t}function d(e,n){const t=[];for(const s of n){const n=e[s];n&&t.push(n)}if(n.length<e.length)for(const s of Array.from(new Array(e.length-n.length),(e,t)=>t+n.length))t.push(e[s]);return t}function u(e,n){const t=[];let s=0;for(const r of n)t.push(e.slice(s,s+r)),s+=r;return t}function m(e,n){const t=e.slice(0).sort((e,n)=>e.sets.length>n.sets.length?-1:e.sets.length<n.sets.length?1:"string"==typeof e.name?-1:1),s=[];for(const e of t){if(!s.reduce((n,t)=>n||e.sets.every(e=>t.includes(e)),!1)){u(d(e.sets.map(e=>n[e]).flat(),e.order),e.setLengths).forEach((t,s)=>{n[e.sets[s]]=t}),s.push(e.sets)}}}function p(e,n,t){const s=[];for(const r of e){let e;(e=t.find(e=>r.name===e.to))?s.push(n.find(n=>n.name===e.from)):(e=n.find(e=>r.name===e.name))?s.push({name:r.name,length:r.length,sets:r.sets,setLengths:r.setLengths,order:f(e.order,r.order),lastMinute:r.lastMinute}):s.push(r)}return s}function h(e,n){e.sort((e,n)=>e[0]===n[0]?0:"c"===e[0]?-1:"m"===e[0]&&"d"===n[0]?-1:"m"===e[0]&&"c"===n[0]?1:"d"===e[0]?1:void 0).forEach(e=>(function(e,n){const t=e[0],s=e[2],r=e[3],o=e[4],l=e[5];let i;switch(typeof s){case"number":i=n[s];break;case"object":i=s.flatMap(e=>n[e])}if(i.length<=r||r<-i.length)return;a(i,r);const c=[];let f=e[1];for(const e of i){const n=e[3];if("d"!==n&&"c"!==n&&(c.push(e.slice(0)),"d"!==t&&"m"!==t||(e[3]="d"),0==--f))break}if(c.forEach(e=>e.splice(3,1,"c")),("c"===t||"m"===t)&&c.length>0){let e=l,t=0;for(;e>0;)t+=n[o].slice(t).findIndex(e=>"n"===e[3]||"d"===e[3]),t++,e--;n[o].splice(t,0,...c)}a(i,-r)})(e,n))}function g(e){for(var n,t,s=e.length;0!==s;)t=Math.floor(Math.random()*s),n=e[s-=1],e[s]=e[t],e[t]=n;return e}function y(e){return e.map(e=>({name:e.name,length:e.elements.length,sets:[e.name],setLengths:[e.elements.length],order:g([...new Array(e.elements.length).keys()]),lastMinute:e.lastMinute}))}function $(e,n){return e.map(e=>{const t=e.sets.map(e=>n.filter(n=>n.name===e)).map(e=>e[0].elements.length),s=t.reduce((e,n)=>e+n,0);return{name:e.name,length:s,sets:e.sets,setLengths:t,order:g([...new Array(s).keys()]),lastMinute:e.lastMinute}})}function x(e,n){const t=function(e){return e.map(e=>e.elements).map(e=>e.map(e=>[e[0],e[1],e[2],"n"]))}(e);JSON.parse(JSON.stringify(t));return[t,[y(e),$(n,e)].flat()]}function b(e,n){n.forEach(n=>(function(e,n){const t=function(e,n){return e.sets.map(e=>({name:e,length:n.find(n=>n.name===e).length})).reduce((e,n)=>e.length<n.length?n:e).name}(e,n);e.dictator=t;const s=n.find(n=>n.name===e.dictator).order;for(const t of e.sets){const r=n.find(e=>e.name===t).order,o=s.filter(e=>e<r.length);n.forEach(n=>{n.name===t&&(n.order=o,e.lastMinute&&(n.lastMinute=!0))})}return n})(n,e))}window.Persistence&&Persistence.isAvailable()&&function(){const[e,r,a,f,d,u,g]=Persistence.getItem("SRdata");if(!(e&&r&&a&&f&&d&&u&&g))return;const y=n(r),$=y.getOriginalStructure();if($){const n=function(e,n){const t=[];for(const s of e)for(const e of n)!c(s.map(e=>e[2]),e.map(e=>e[2]))||t.find(n=>n.from===e[0][0])||t.find(e=>e.to===s[0][0])||t.push({from:e[0][0],to:s[0][0]});return t}($,e),[r,M]=o($,function(e,n){const t=[];for(const s of n){const n=e.find(e=>e.from===s[0]);n&&t.push([n.to,s[1],s[2]])}return t}(n,f)),E=function(e){const n=new RegExp("\\$(?:name|n)(!)?\\("+`(${t})`+"(?:\\s*,\\s*(?:(\\d+)|(n-\\d+)|((?:\\+|-)\\d+)|"+`(${t})(?::(n-\\d+|-\\d|\\d+))?`+"))?\\)$"),r=[];return e.flat().map(e=>[...e,e[2].match(n)]).filter(e=>e[3]).reduce((e,n)=>(n[3][3]||n[3][4]||n[3][5]||n[3][6]||n[3][7]?e.push(n):e.unshift(n),e),[]).forEach(n=>{const[t,o,l,i,c,a,f,d]=n[3],u=s(e,r,i,c,n[0],a,f,d);let m=r.find(e=>e.name===l);if(!m){const e=r.push({name:l,lastMinute:!1,sets:[]});m=r[e-1]}m.sets.push(...u),m.sets.sort(),o&&(m.lastMinute=!0)}),r}($),v=function(e,n){const r=[],o=new RegExp("\\$(?:order|ord|o)(!)?\\("+`(${t})`+"(?:\\s*,\\s*(?:(\\d+)|(n-\\d+)|((?:\\+|-)\\d+)|"+`(${t})(?::(n-\\d+|-\\d|\\d+))?`+"))?\\)$");return e.flat().map(e=>[...e,e[2].match(o)]).filter(e=>e[3]).forEach(t=>{const[o,l,i,c,a,f,d,u]=t[3],m=d&&!u?[d]:s(e,n,c,a,t[0],f,d,u);let p=r.find(e=>e.name===i);if(!p){const e=r.push({name:i,lastMinute:!1,sets:[],dictator:!1});p=r[e-1]}p.sets.push(...m),p.sets.sort(),l&&(p.lastMinute=!0)}),r}($,E),I=function(e,n,s){const r=[],o=`(?:(\\d+)|((?:\\+|-)\\d+)|n(-\\d+)|(${t}))`,c=new RegExp("^\\$(?:(c|copy)|(m|move)|(d|del|delete))\\((?:(\\d+)(?:\\s*,\\s*"+`${o}(?::(?:\\+?(\\d+)|n?(-\\d+)))?`+"(?:\\s*,\\s*"+`${o}(?::(?:\\+?(\\d+)|n?(-\\d+)))?`+")?)?)?\\)$");for(const t of e.flat()){const o=t[2].match(c);if(o){const c=o[1]?"c":o[2]?"m":o[3]?"d":"",a=o[4]?Number(o[4]):999,[f,d]=l(o[11],o[12],o[13],o[14],t[0],e.length,s),u=i(o[15],o[16],d,f[0]?f[0]:t[0],n,t[1]),[m,p]=n.filter(e=>f.includes(e.name)).reduce((e,n,t,s)=>e[1]-(n.elements.length+1)<0?[e[0]||n.name,e[1]]:[null,e[1]-(n.elements.length+1)],[null,u]),[h,g]=l(o[5],o[6],o[7],o[8],t[0],e.length,s),y=i(o[9],o[10],!0,t[0],n,t[1]);null!==h&&null!==m&&a>0&&r.push([c,a,h,y,m,p])}}return console.log(r),r}($,r,E),[N,P]=function(e,n,r){const o=[{name:"default",stylings:n},{name:"none",stylings:{display:"none"}},{name:"block",stylings:{display:"block",openDelim:"",closeDelim:"",fieldPadding:0}}],l=new RegExp("^\\$(?:style|s)\\("+`(${t})`+"\\s*,\\s(.*)\\)$"),i=new RegExp(":(.*)$");e.flat().map(e=>[...e,e[2].match(l)]).filter(e=>e[3]).forEach(e=>{const[n,t,s]=e[3];let r=o.find(e=>e.name===t);if(!r){const e=o.push({name:t,stylings:{}});r=o[e-1]}s.split(",").map(e=>e.trim()).forEach(e=>{if(e.startsWith("od:")||e.startsWith("openDelim:"))r.stylings.openDelim=e.match(i)[1];else if(e.startsWith("cd:")||e.startsWith("closeDelim:"))r.stylings.closeDelim=e.match(i)[1];else if(e.startsWith("fs:")||e.startsWith("fieldSeparator:"))r.stylings.fieldSeparator=e.match(i)[1];else if(e.startsWith("fp:")||e.startsWith("fieldPadding:")){const n=Number(e.match(i)[1]);n>=0&&(r.stylings.fieldPadding=n)}else if(e.startsWith("clrs:")||e.startsWith("colors:")){const n=e.match(i)[1].split(":");r.stylings.colors=n}else if(e.startsWith("ci:")||e.startsWith("collectiveIndexing:")){const n=e.match(i)[1],t="true"===n||"false"!==n&&null;"boolean"==typeof t&&(r.stylings.collectiveIndexing=t)}else if(e.startsWith("rsi:")||e.startsWith("randomStartIndex:")){const n=e.match(i)[1],t="true"===n||"false"!==n&&null;"boolean"==typeof t&&(r.stylings.randomStartIndex=t)}else(e.startsWith("dp:")||e.startsWith("display:"))&&(r.stylings.display=e.match(i)[1])})});const c=[],a=new RegExp("^\\$(?:apply|app|a)\\("+`(${t})`+"(?:\\s*,\\s(?:(\\d+)|(n-\\d+)|((?:\\+|-)\\d+)|"+`(${t})(?::(\\d+|n?-\\d+))?`+"))?\\)$");return e.flat().map(e=>[...e,e[2].match(a)]).filter(e=>e[3]).forEach(n=>{const[t,l,i,a,f,d,u]=n[3];o.find(e=>e.name===l)&&s(e,r,i,a,n[0],f,d,u).forEach(e=>c[e]=l)}),[o,c]}($,a,E),[w,S]=x(r,E),R=p(S,d,n);b(R,v),m(R,w),h(I,w);const W=w.map(e=>e.filter(e=>"d"!==e[3])),D=o(W,[])[0].map((e,n)=>({name:e.name,elements:e.elements,lastMinute:r[n].lastMinute})),A=v.filter(e=>e.lastMinute),[k,L]=x(D,E),q=p(L,u,n);b(q,A),m(q.filter(e=>e.lastMinute),k),y.renderSets(function(e,n){const t=Array(n.length);for(const[s,r]of n.map((e,n)=>({rendering:e,order:n})).entries()){const n=e.find(e=>s===e.to);n?t[n.from]=r:t.push(r)}return t.filter(e=>void 0!==e)}(n,k),N,P,g,r)}}()}();
