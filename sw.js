if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const l=e=>i(e,t),c={module:{uri:t},exports:o,require:l};s[t]=Promise.all(n.map((e=>c[e]||l(e)))).then((e=>(r(...e),o)))}}define(["./workbox-c7240f55"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index.43328387.js",revision:null},{url:"assets/index.81f430a8.css",revision:null},{url:"assets/vendor.ed2d22c6.css",revision:null},{url:"index.html",revision:"606ecb836a122ea92dedabb4216af78d"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"robots.txt",revision:"ba6f740fa983702705c4c6a78cd0faa1"},{url:"manifest.webmanifest",revision:"f4afc6b2fc60d8185eac178eb53424a6"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
