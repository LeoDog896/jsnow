import{j as ve,l as we,h as xe,a as ke,b as Se,f as $e,d as Pe,c as Le,E as ge,i as Ee,e as Ce,g as Ne,k as Me,m as Ae,r as je,n as Te,o as De,p as Z,q as Be,s as We,t as Oe,u as He,v as Ie,w as Fe,x as Ke,y as Ge,z as Ve,A as _e,B as qe,C as Re,D as G,F as Je,G as he,H as X,S as V,I as q,J as R,K as m,L as v,M as _,N as d,O as h,P as p,Q as H,R as P,T as C,U as K,V as Ue,W as be,X as M,Y as A,Z as j,_ as T,$ as D,a0 as ze,a1 as Qe,a2 as ee,a3 as S,a4 as Xe,a5 as Ye,a6 as Ze,a7 as et,a8 as tt,a9 as nt,aa as J,ab as rt,ac as O,ad as Y,ae as ot,af as it,ag as te}from"./vendor.8122743d.js";const lt=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&e(l)}).observe(document,{childList:!0,subtree:!0});function o(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerpolicy&&(i.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?i.credentials="include":t.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function e(t){if(t.ep)return;t.ep=!0;const i=o(t);fetch(t.href,i)}};lt();const st=["PropertyName",".","?."],at=["TemplateString","LineComment","BlockComment","VariableDefinition","PropertyDefinition"];function U(r,n){let o=[];for(let e in n)o.push({label:e,type:typeof n[e]=="function"?"function":"variable"});return{from:r,options:o,span:/^[\w$]*$/}}function ct(r){var o;let n=Re(r.state).resolveInner(r.pos,-1);if(st.includes(n.name)&&((o=n.parent)==null?void 0:o.name)=="MemberExpression"){let e=n.parent.getChild("Expression");if((e==null?void 0:e.name)=="VariableName"){let t=/\./.test(n.name)?n.to:n.from,i=r.state.sliceDoc(e.from,e.to);if(typeof window[i]=="object")return U(t,window[i])}}else{if(n.name=="VariableName")return U(n.from,window);if(r.explicit&&!at.includes(n.name))return U(r.pos,window)}return null}const ut=ve.data.of({autocomplete:ct}),ft=[we(),xe(),ke(),Se(),$e(),Pe(),Le(),ge.allowMultipleSelections.of(!0),Ee(),Ce.fallback,Ne(),Me(),Ae(),je(),Te(),De(),Z.of([...Be,...We,...Oe,...He,...Ie,...Fe,...Ke,...Ge]),Ve({jsx:!1,typescript:!0}),ut,_e.lineWrapping,Z.of([qe])],dt=r=>!!r&&(typeof r=="object"||typeof r=="function")&&typeof r.then=="function";function B(r){return typeof r.content=="string"?[{content:r.content,color:r.color}]:r.content.map(n=>typeof n.content=="string"?n:n.content.map(o=>B(o)).flat()).flat()}function I(r){return Array.isArray(r)?{content:[{content:"(",color:"#807b7a"},{content:r.length.toString(),color:"#368aa3"},{content:") ",color:"#807b7a"},{content:"[",color:"#807b7a"},...r.map((n,o)=>o+1==r.length?I(n):[I(n),{content:", ",color:"#807b7a"}]).flat(),{content:"]",color:"#807b7a"}]}:dt(r)?{content:"Promise",color:"#807b7a"}:r===!0?{content:"true",color:"#1f924a"}:r===!1?{content:"false",color:"#f55442"}:typeof r=="number"?{content:r.toString(),color:"#368aa3"}:typeof r=="object"?{content:JSON.stringify(r),color:"#807b7a"}:typeof r=="string"?{content:`"${r}"`,color:"#9c8e1f"}:typeof r=="symbol"?{content:[{content:"Symbol(",color:"#807b7a"},I(r.description),{content:")",color:"#807b7a"}]}:typeof r=="bigint"?{content:`${r}n`,color:"#368aa3"}:r===void 0?{content:"undefined",color:"#807b7a"}:r===null?{content:"null",color:"#807b7a"}:{content:r.toString(),color:"#807b7a"}}function pt({types:r}){return{visitor:{MemberExpression(n){!n.node.object||!n.node.property||n.node.object.name=="console"&&n.node.property.name=="log"&&(n.parentPath.node.arguments=[r.identifier(n.node.loc.start.line.toString()),...n.parentPath.node.arguments],n.replaceWith(r.identifier("debug")))}}}}const W=G(!0);function mt({types:r}){function n(e){if(e.parentPath.node.type!=="VariableDeclarator"||e.parentPath.parentPath.parentPath.node.type!=="Program")return;const t=e.parentPath.node.id.name;e.parentPath.parentPath.insertAfter(r.callExpression(r.identifier("debug"),[r.identifier(e.node.loc.start.line.toString()),r.identifier(t)]))}function o(e,t){var i,l,s,u,w,f;t==null&&(t=e.node),e.parentPath.node.type=="ExpressionStatement"&&((i=e.node.callee)==null?void 0:i.identifier)!="debug"&&(Je(W)&&(((s=(l=e.parentPath.parentPath)==null?void 0:l.node)==null?void 0:s.type)=="WhileStatement"||((w=(u=e.parentPath.parentPath)==null?void 0:u.node)==null?void 0:w.type)=="ForStatement")||((f=e.node.loc)==null?void 0:f.start)!=null&&e.replaceWith(r.callExpression(r.identifier("debug"),[r.numericLiteral(e.node.loc.start.line),t])))}return{visitor:{BinaryExpression(e){o(e),n(e)},UnaryExpression(e){o(e),n(e)},CallExpression(e){e.node.callee.object&&e.node.callee.object.name=="console"||(o(e),n(e))},AwaitExpression(e){o(e),n(e)},NewExpression(e){o(e),n(e)},DirectiveLiteral(e){var t,i,l;!((t=e.node)==null?void 0:t.value)||!((l=(i=e.node.loc)==null?void 0:i.start)==null?void 0:l.line)||e.parentPath.replaceWith(r.callExpression(r.identifier("debug"),[r.numericLiteral(e.node.loc.start.line),r.stringLiteral(e.node.value)]))},AssignmentExpression(e){var t;((t=e.node.loc)==null?void 0:t.start)!=null&&e.insertAfter(r.callExpression(r.identifier("debug"),[r.numericLiteral(e.node.loc.start.line),r.identifier(e.node.left.name)]))},Identifier(e){o(e),n(e)},ArrayExpression(e){o(e),n(e)},MemberExpression(e){o(e),n(e)},ObjectExpression(e){o(e),n(e)},TaggedTemplateExpression(e){var t;e.parentPath.node.type=="ExpressionStatement"&&((t=e.node.loc)==null?void 0:t.start)!=null&&(e.parentPath.insertAfter(r.callExpression(r.identifier("debug"),[r.numericLiteral(e.node.loc.start.line),r.identifier(e.toString())])),e.remove())},UpdateExpression(e){o(e),n(e)},Literal(e){e.type!="TemplateLiteral"&&(o(e),n(e))}}}}const gt=Object.getPrototypeOf(async()=>{}).constructor;he.exports.registerPlugins({"stray-expression-babel":mt,"log-transform":pt});function _t(r){return he.exports.transform(r,{filename:"index.ts",presets:["env","typescript"],parserOpts:{allowAwaitOutsideFunction:!0},plugins:["log-transform","stray-expression-babel"]}).code}async function ht(r){if(r=="")return[];try{let n=[];return await gt("debug",r)((t,i)=>{n=[...n,{lineNumber:t,content:i}]}),n.length==0?[]:n.map(t=>({lineNumber:t.lineNumber,content:I(t.content)}))}catch(n){return n}}const z=G(window.innerWidth/2),bt=X(z,r=>Math.max(0,Math.min(window.innerWidth-6,r))),F=G(!1),Q=G(`// Welcome to JSNow!

5 + 5 // Unused expressions are outputted to the right

Array(5).fill(4).map(it => it * 2) // *any* unused expression

function reverse(param: string /* no type checking is done yet */) {
	return param.split("").reverse().join("")
}

reverse("Hello World!")

// Try it out! Stay with the examples here or CTRL + A and delete.

`),ye=X(Q,r=>{if(!r)return"";try{return _t(r)}catch(n){return n}}),yt=X([ye,W,F],async([r])=>r?r instanceof Error?r:await ht(r):[]);function ne(r){let n,o,e,t,i;return{c(){n=m("div"),o=m("h1"),o.textContent="Transformed Code",e=v(),t=m("pre"),i=m("code"),_(o,"class","text-2xl"),_(i,"class","language-js"),_(n,"id","code"),_(n,"class","w-1/2")},m(l,s){d(l,n,s),h(n,o),h(n,e),h(n,t),h(t,i),i.innerHTML=r[0]},p(l,s){s&1&&(i.innerHTML=l[0])},d(l){l&&p(n)}}}function vt(r){let n,o,e,t,i,l,s,u,w,f=r[0]&&ne(r);return{c(){n=m("div"),o=m("div"),e=m("h1"),e.textContent="Settings",t=v(),i=m("span"),i.textContent="Display line by line input ",l=m("input"),s=v(),f&&f.c(),_(e,"class","text-2xl"),_(l,"type","checkbox"),_(l,"name","lineByLine"),_(o,"id","settings"),_(o,"class","w-1/2"),_(n,"class","flex flex-row w-full")},m(b,y){d(b,n,y),h(n,o),h(o,e),h(o,t),h(o,i),h(o,l),l.checked=r[1],h(n,s),f&&f.m(n,null),u||(w=H(l,"change",r[3]),u=!0)},p(b,[y]){y&2&&(l.checked=b[1]),b[0]?f?f.p(b,y):(f=ne(b),f.c(),f.m(n,null)):f&&(f.d(1),f=null)},i:P,o:P,d(b){b&&p(n),f&&f.d(),u=!1,w()}}}function wt(r,n,o){let e,t,i;C(r,ye,u=>o(2,t=u)),C(r,W,u=>o(1,i=u));function l(u){if(!u)return"";try{return K.highlight(t,K.languages.javascript)}catch{return""}}function s(){i=this.checked,W.set(i)}return r.$$.update=()=>{r.$$.dirty&4&&o(0,e=l(t))},[e,i,t,s]}class xt extends V{constructor(n){super();q(this,n,wt,vt,R,{})}}function kt(r){let n,o,e,t,i,l,s,u,w=r[0]("5 + 5 // outputs 10 to the side")+"",f,b,y,L,E=r[0]("const x = 15 / 5 // outputs 3 to the side")+"",x,$,N,c,g;return t=new Ue({props:{class:"pl-4 inline"}}),{c(){n=m("h1"),o=be("Welcome to JSNow!"),e=m("a"),M(t.$$.fragment),i=v(),l=m("p"),l.textContent="Any unused expressions or variable assignments will be printed to the side.",s=v(),u=m("code"),f=v(),b=m("br"),y=v(),L=m("code"),x=v(),$=m("h2"),$.textContent="Planned Features",N=v(),c=m("ul"),c.innerHTML=`<li>- Tabs</li> 
	<li>- Fancy Output (range, toggle buttons)</li> 
	<li>- Interactive input (sliders, radio)</li> 
	<li>- Github Gist intergration</li>`,_(e,"href","https://github.com/LeoDog896/jsnow"),_(n,"class","text-3xl"),_($,"class","text-xl")},m(a,k){d(a,n,k),h(n,o),h(n,e),A(t,e,null),d(a,i,k),d(a,l,k),d(a,s,k),d(a,u,k),u.innerHTML=w,d(a,f,k),d(a,b,k),d(a,y,k),d(a,L,k),L.innerHTML=E,d(a,x,k),d(a,$,k),d(a,N,k),d(a,c,k),g=!0},p:P,i(a){g||(j(t.$$.fragment,a),g=!0)},o(a){T(t.$$.fragment,a),g=!1},d(a){a&&p(n),D(t),a&&p(i),a&&p(l),a&&p(s),a&&p(u),a&&p(f),a&&p(b),a&&p(y),a&&p(L),a&&p(x),a&&p($),a&&p(N),a&&p(c)}}}function St(r){function n(o){if(!o)return"";try{return K.highlight(o,K.languages.javascript)}catch{return""}}return[n]}class $t extends V{constructor(n){super();q(this,n,St,kt,R,{})}}const{document:re}=nt;function oe(r,n,o){const e=r.slice();return e[19]=n[o],e}function ie(r,n,o){const e=r.slice();return e[22]=n[o],e}function le(r,n,o){const e=r.slice();return e[19]=n[o],e}function se(r,n,o){const e=r.slice();return e[22]=n[o],e}function ae(r,n,o){const e=r.slice();return e[16]=n[o],e}function Pt(r){return{c:P,m:P,p:P,d:P}}function Lt(r){let n;function o(i,l){return i[15]instanceof Error?Nt:i[5]?Ct:Et}let e=o(r),t=e(r);return{c(){n=m("p"),t.c(),_(n,"class","px-1 w-full text-[1rem] leading-[1.4058rem]")},m(i,l){d(i,n,l),t.m(n,null)},p(i,l){e===(e=o(i))&&t?t.p(i,l):(t.d(1),t=e(i),t&&(t.c(),t.m(n,null)))},d(i){i&&p(n),t.d()}}}function Et(r){let n,o=r[15],e=[];for(let t=0;t<o.length;t+=1)e[t]=ue(oe(r,o,t));return{c(){for(let t=0;t<e.length;t+=1)e[t].c();n=Y()},m(t,i){for(let l=0;l<e.length;l+=1)e[l].m(t,i);d(t,n,i)},p(t,i){if(i&16){o=t[15];let l;for(l=0;l<o.length;l+=1){const s=oe(t,o,l);e[l]?e[l].p(s,i):(e[l]=ue(s),e[l].c(),e[l].m(n.parentNode,n))}for(;l<e.length;l+=1)e[l].d(1);e.length=o.length}},d(t){O(e,t),t&&p(n)}}}function Ct(r){let n,o=r[15].sort(me),e=[];for(let t=0;t<o.length;t+=1)e[t]=de(le(r,o,t));return{c(){for(let t=0;t<e.length;t+=1)e[t].c();n=Y()},m(t,i){for(let l=0;l<e.length;l+=1)e[l].m(t,i);d(t,n,i)},p(t,i){if(i&16){o=t[15].sort(me);let l;for(l=0;l<o.length;l+=1){const s=le(t,o,l);e[l]?e[l].p(s,i):(e[l]=de(s),e[l].c(),e[l].m(n.parentNode,n))}for(;l<e.length;l+=1)e[l].d(1);e.length=o.length}},d(t){O(e,t),t&&p(n)}}}function Nt(r){let n,o=r[15].toString().split(`
`),e=[];for(let t=0;t<o.length;t+=1)e[t]=pe(ae(r,o,t));return{c(){for(let t=0;t<e.length;t+=1)e[t].c();n=Y()},m(t,i){for(let l=0;l<e.length;l+=1)e[l].m(t,i);d(t,n,i)},p(t,i){if(i&16){o=t[15].toString().split(`
`);let l;for(l=0;l<o.length;l+=1){const s=ae(t,o,l);e[l]?e[l].p(s,i):(e[l]=pe(s),e[l].c(),e[l].m(n.parentNode,n))}for(;l<e.length;l+=1)e[l].d(1);e.length=o.length}},d(t){O(e,t),t&&p(n)}}}function ce(r){let n,o=r[22].content+"";return{c(){n=m("span"),S(n,"color",r[22].color)},m(e,t){d(e,n,t),n.innerHTML=o},p(e,t){t&16&&o!==(o=e[22].content+"")&&(n.innerHTML=o),t&16&&S(n,"color",e[22].color)},d(e){e&&p(n)}}}function ue(r){let n,o,e=B(r[19].content),t=[];for(let i=0;i<e.length;i+=1)t[i]=ce(ie(r,e,i));return{c(){n=m("p");for(let i=0;i<t.length;i+=1)t[i].c();o=v()},m(i,l){d(i,n,l);for(let s=0;s<t.length;s+=1)t[s].m(n,null);h(n,o)},p(i,l){if(l&16){e=B(i[19].content);let s;for(s=0;s<e.length;s+=1){const u=ie(i,e,s);t[s]?t[s].p(u,l):(t[s]=ce(u),t[s].c(),t[s].m(n,o))}for(;s<t.length;s+=1)t[s].d(1);t.length=e.length}},d(i){i&&p(n),O(t,i)}}}function fe(r){let n,o=r[22].content+"";return{c(){n=m("span"),S(n,"color",r[22].color)},m(e,t){d(e,n,t),n.innerHTML=o},p(e,t){t&16&&o!==(o=e[22].content+"")&&(n.innerHTML=o),t&16&&S(n,"color",e[22].color)},d(e){e&&p(n)}}}function de(r){let n,o,e=B(r[19].content),t=[];for(let i=0;i<e.length;i+=1)t[i]=fe(se(r,e,i));return{c(){n=m("p");for(let i=0;i<t.length;i+=1)t[i].c();o=v(),_(n,"class","absolute"),S(n,"top",document.querySelector(".cm-content").children[r[19].lineNumber-1].getBoundingClientRect().y+"px")},m(i,l){d(i,n,l);for(let s=0;s<t.length;s+=1)t[s].m(n,null);h(n,o)},p(i,l){if(l&16){e=B(i[19].content);let s;for(s=0;s<e.length;s+=1){const u=se(i,e,s);t[s]?t[s].p(u,l):(t[s]=fe(u),t[s].c(),t[s].m(n,o))}for(;s<t.length;s+=1)t[s].d(1);t.length=e.length}l&16&&S(n,"top",document.querySelector(".cm-content").children[i[19].lineNumber-1].getBoundingClientRect().y+"px")},d(i){i&&p(n),O(t,i)}}}function pe(r){let n,o=r[16]+"",e;return{c(){n=m("p"),e=be(o),_(n,"class","text-red-700")},m(t,i){d(t,n,i),h(n,e)},p(t,i){i&16&&o!==(o=t[16]+"")&&ot(e,o)},d(t){t&&p(n)}}}function Mt(r){return{c:P,m:P,p:P,d:P}}function At(r){let n,o,e,t,i,l,s,u,w,f,b,y,L,E,x,$,N;o=new ze({props:{alt:"Settings",class:"scale-125 hover:rotate-12 transition-transform fixed bottom-5 right-5"}}),o.$on("click",r[9]),t=new Qe({props:{alt:"Info",class:"scale-125 hover:rotate-12 transition-transform fixed bottom-5 right-[60px]"}}),t.$on("click",r[10]);let c={ctx:r,current:null,token:null,hasCatch:!1,pending:Mt,then:Lt,catch:Pt,value:15};return ee(E=r[4],c),{c(){n=v(),M(o.$$.fragment),e=v(),M(t.$$.fragment),i=v(),l=m("div"),s=m("div"),u=m("div"),w=v(),f=m("div"),b=v(),y=m("div"),L=v(),c.block.c(),_(u,"class","grow outline-none"),_(u,"data-gramm","false"),_(u,"data-gramm_editor","false"),_(u,"data-enable-grammarly","false"),_(u,"spellcheck","false"),_(f,"class","absolute translate-x-[-50%] w-[2px] cursor-col-resize h-screen bg-grey border-2"),S(f,"left",r[3]+"px"),_(y,"class","absolute px-2 w-[2px] translate-x-[-50%] cursor-col-resize h-screen bg-transparent"),S(y,"left",r[3]+"px"),_(s,"class","flex"),S(l,"grid-template-columns",r[3]+"px "+(window.innerWidth-r[3])+"px"),_(l,"class","gap-0 grid grid-rows-1 grid-cols-2")},m(g,a){d(g,n,a),A(o,g,a),d(g,e,a),A(t,g,a),d(g,i,a),d(g,l,a),h(l,s),h(s,u),r[11](u),h(s,w),h(s,f),h(s,b),h(s,y),h(l,L),c.block.m(l,c.anchor=null),c.mount=()=>l,c.anchor=null,x=!0,$||(N=[H(re.body,"mousemove",r[7]),H(re.body,"mouseup",r[8]),H(y,"mousedown",r[12])],$=!0)},p(g,[a]){r=g,(!x||a&8)&&S(f,"left",r[3]+"px"),(!x||a&8)&&S(y,"left",r[3]+"px"),c.ctx=r,a&16&&E!==(E=r[4])&&ee(E,c)||Xe(c,r,a),(!x||a&8)&&S(l,"grid-template-columns",r[3]+"px "+(window.innerWidth-r[3])+"px")},i(g){x||(j(o.$$.fragment,g),j(t.$$.fragment,g),x=!0)},o(g){T(o.$$.fragment,g),T(t.$$.fragment,g),x=!1},d(g){g&&p(n),D(o,g),g&&p(e),D(t,g),g&&p(i),g&&p(l),r[11](null),c.block.d(),c.token=null,c=null,$=!1,Ye(N)}}}const me=(r,n)=>r.lineNumber-n.lineNumber;function jt(r,n,o){let e,t,i,l,s,u;C(r,Q,c=>o(13,e=c)),C(r,F,c=>o(1,t=c)),C(r,z,c=>o(2,i=c)),C(r,bt,c=>o(3,l=c)),C(r,yt,c=>o(4,s=c)),C(r,W,c=>o(5,u=c));const{open:w}=Ze("simple-modal"),f=et.fromClass(class{constructor(){}update(c){c.docChanged&&Q.set(c.state.doc.toString())}});let b;tt(()=>new _e({state:ge.create({doc:e,extensions:[ft,f]}),parent:b}));const y=c=>{t&&J(z,i=c.clientX,i)},L=c=>{J(F,t=!1,t)},E=()=>w(xt),x=()=>w($t);function $(c){rt[c?"unshift":"push"](()=>{b=c,o(0,b)})}return[b,t,i,l,s,u,w,y,L,E,x,$,()=>{J(F,t=!0,t)}]}class Tt extends V{constructor(n){super();q(this,n,jt,At,R,{})}}function Dt(r){let n,o;return n=new Tt({}),{c(){M(n.$$.fragment)},m(e,t){A(n,e,t),o=!0},i(e){o||(j(n.$$.fragment,e),o=!0)},o(e){T(n.$$.fragment,e),o=!1},d(e){D(n,e)}}}function Bt(r){let n,o;return n=new it({props:{transitionBg:r[0],transitionWindow:r[1],$$slots:{default:[Dt]},$$scope:{ctx:r}}}),{c(){M(n.$$.fragment)},m(e,t){A(n,e,t),o=!0},p(e,[t]){const i={};t&4&&(i.$$scope={dirty:t,ctx:e}),n.$set(i)},i(e){o||(j(n.$$.fragment,e),o=!0)},o(e){T(n.$$.fragment,e),o=!1},d(e){D(n,e)}}}function Wt(r){return[e=>te(e,{duration:150}),e=>te(e,{duration:150})]}class Ot extends V{constructor(n){super();q(this,n,Wt,Bt,R,{})}}new Ot({target:document.body});
