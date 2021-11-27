!function(){function e(e){try{return document.head.querySelector(e)}catch(e){return null}}function t(e,t){return e="__pwacompat_"+e,void 0!==t&&(v[e]=t),v[e]}function n(){var n=(f=e('link[rel="manifest"]'))?f.href:"";if(!n)throw'can\'t find <link rel="manifest" href=".." />\'';var r=function(e){for(var t={},n=0;n<e.length;t={c:t.c},++n){t.c=e[n];try{return new URL("",t.c),function(e){return function(t){return new URL(t||"",e.c).toString()}}(t)}catch(e){}}return function(e){return e||""}}([n,location]),a=t("manifest");if(a)try{o(JSON.parse(a),r)}catch(e){console.warn("PWACompat error",e)}else{var i=new XMLHttpRequest;i.open("GET",n),i.withCredentials="use-credentials"===f.getAttribute("crossorigin"),i.onload=function(){try{var e=JSON.parse(i.responseText);t("manifest",i.responseText),o(e,r)}catch(e){console.warn("PWACompat error",e)}},i.send(null)}}function r(t,n,r){if(!e(t+r)){for(var a in t=document.createElement(t),n)t.setAttribute(a,n[a]);return document.head.appendChild(t),t}}function a(e,t){t&&(!0===t&&(t="yes"),r("meta",{name:e,content:t},'[name="'+e+'"]'))}function i(e){var t=e.sizes.split(/\s+/g).map((function(e){return"any"===e?1/0:parseInt(e,10)||0}));return{src:e.src,type:e.type,sizes:e.sizes,h:Math.max.apply(null,t),f:e.f?e.f.split(/\s+/g):["any"]}}function o(n,o){function d(e,t,r,a){var i=window.devicePixelRatio,o=u({width:e*i,height:t*i});if(o.scale(i,i),o.fillStyle=_,o.fillRect(0,0,e,t),o.translate(e/2,(t-20)/2),a&&(t=a.width/i,128<(i=a.height/i)&&(t/=i/128,i=128),48<=t&&48<=i&&(o.drawImage(a,t/-2,i/-2,t,i),o.translate(0,i/2+20))),o.fillStyle=C?"white":"black",o.font="24px HelveticaNeue-CondensedBold",o.font=getComputedStyle(f).getPropertyValue("--pwacompat-splash-font"),i=n.name||n.short_name||document.title,a=(t=o.measureText(i)).j||24,o.translate(0,a),t.width<.8*e)o.fillText(i,t.width/-2,0);else for(i=i.split(/\s+/g),t=1;t<=i.length;++t){var l=i.slice(0,t).join(" "),c=o.measureText(l).width;(t===i.length||c>.6*e)&&(o.fillText(l,c/-2,0),o.translate(0,1.2*a),i.splice(0,t),t=0)}return function(){var e=o.canvas.toDataURL();return v(r,e),e}}function v(e,t){var n=document.createElement("link");n.setAttribute("rel","apple-touch-startup-image"),n.setAttribute("media","(orientation: "+e+")"),n.setAttribute("href",t),document.head.appendChild(n)}function w(e,t){var n=window.screen,r=d(n.width,n.height,"portrait",e),a=d(n.height,n.width,"landscape",e);setTimeout((function(){A.p=r(),setTimeout((function(){A.l=a(),t()}),10)}),10)}function b(){t("iOS",JSON.stringify(A))}var y=(n.icons||[]).map(i).sort((function(e,t){return t.h-e.h})),x=y.filter((function(e){return-1<e.f.indexOf("any")})),S=(0<(y=y.filter((function(e){return-1<e.f.indexOf("maskable")}))).length?y:x).map((function(e){var t={rel:"icon",href:o(e.src),sizes:e.sizes},n='[sizes="'+e.sizes+'"]';if(r("link",t,'[rel="icon"]'+n),h&&!(120>e.h))return t.rel="apple-touch-icon",r("link",t,'[rel="apple-touch-icon"]'+n)})).filter(Boolean),k=!!((y=e('meta[name="viewport"]'))&&y.content||"").match(/\bviewport-fit\s*=\s*cover\b/),O=n.display;if(a("mobile-web-app-capable",y=-1!==p.indexOf(O)),function(e,t){if(h||g){var n=c(e);if(h)a("apple-mobile-web-app-status-bar-style",t?"black-translucent":n?"black":"default");else{e:{try{var r=Windows.UI.ViewManagement.ApplicationView.getForCurrentView().titleBar;break e}catch(e){}r=void 0}(t=r)&&(n=n?255:0,t.foregroundColor={r:n,g:n,b:n,a:255},e=l(e),t.backgroundColor={r:e[0],g:e[1],b:e[2],a:e[3]})}}}(n.theme_color||"black",k),m&&(a("application-name",n.short_name),a("msapplication-tooltip",n.description),a("msapplication-starturl",o(n.start_url||".")),a("msapplication-navbutton-color",n.theme_color),(x=x[0])&&a("msapplication-TileImage",o(x.src)),a("msapplication-TileColor",n.background_color)),a("theme-color",n.theme_color),h){var _=n.background_color||"#f8f9fa",C=c(_);if((x=function(e){var t;return(e||[]).filter((function(e){return"itunes"===e.platform})).forEach((function(e){e.id?t=e.id:(e=e.url.match(/id(\d+)/))&&(t=e[1])})),t}(n.related_applications))&&a("apple-itunes-app","app-id="+x),a("apple-mobile-web-app-capable",y),a("apple-mobile-web-app-title",n.short_name||n.name),x=t("iOS"))try{var T=JSON.parse(x);return v("portrait",T.p),v("landscape",T.l),void S.forEach((function(e){var t=T.i[e.href];t&&(e.href=t)}))}catch(e){}var A={i:{}};!function e(){var t=S.shift();if(t){var r=new Image;r.crossOrigin="anonymous",r.onerror=function(){e()},r.onload=function(){r.onload=null,w(r,(function(){var e=n.background_color&&s(r,_);e?(t.href=e,A.i[r.src]=e,function(e){function t(){--n||e()}var n=S.length+1;t(),S.forEach((function(e){var n=new Image;n.crossOrigin="anonymous",n.onerror=t,n.onload=function(){n.onload=null,e.href=s(n,_,!0),A.i[n.src]=e.href,t()},n.src=e.href}))}(b)):b()}))},r.src=t.href}else w(null,b)}()}else a("x5-orientation",x={por:"portrait",lan:"landscape"}[String(n.orientation||"").substr(0,3)]||""),a("screen-orientation",x),"fullscreen"===O?(a("x5-fullscreen","true"),a("full-screen","yes")):y&&(a("x5-page-mode","app"),a("browsermode","application"))}function l(e){var t=u();return t.fillStyle=e,t.fillRect(0,0,1,1),t.getImageData(0,0,1,1).data||[]}function c(e){return e=l(e).map((function(e){return.03928>(e/=255)?e/12.92:Math.pow((e+.055)/1.055,2.4)})),3<Math.abs(1.05/(.2126*e[0]+.7152*e[1]+.0722*e[2]+.05))}function s(e,t,n){n=void 0!==n&&n;var r=u(e);if(r.drawImage(e,0,0),n||255!==r.getImageData(0,0,1,1).data[3])return r.globalCompositeOperation="destination-over",r.fillStyle=t,r.fillRect(0,0,e.width,e.height),r.canvas.toDataURL()}function u(e){var t=(e=void 0===e?{width:1,height:1}:e).height,n=document.createElement("canvas");return n.width=e.width,n.height=t,n.getContext("2d")}if("onload"in XMLHttpRequest.prototype&&!navigator.m){var f,p=["standalone","fullscreen","minimal-ui"],d=navigator.userAgent||"",h=navigator.vendor&&-1!==navigator.vendor.indexOf("Apple")&&(-1!==d.indexOf("Mobile/")||"standalone"in navigator)||!1,m=!!d.match(/(MSIE |Edge\/|Trident\/)/),g="undefined"!=typeof Windows;try{var v=sessionStorage}catch(e){}v=v||{},"complete"===document.readyState?n():window.addEventListener("load",n)}}();