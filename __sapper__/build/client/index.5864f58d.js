import{S as s,i,s as e,e as a,f as c,g as t,d as n,k as l,E as r,l as o,m as f,F as u,J as h,B as k}from"./client.72d4fbc6.js";function p(s){let i,e,k,p,m,d;return{c(){i=a("span"),e=a("i"),this.h()},l(s){i=c(s,"SPAN",{class:!0});var a=t(i);e=c(a,"I",{class:!0}),t(e).forEach(n),a.forEach(n),this.h()},h(){l(e,"class",k=s[8]+" fa-"+s[0]+" "+s[2]+" "+s[6]),l(i,"class",p="icon "+s[1]+" "+s[7]+" "+(s[4]?"is-left":"")+" "+(s[5]?"is-right":"")),r(i,"is-clickable",s[3])},m(a,c){o(a,i,c),f(i,e),m||(d=u(i,"click",s[12]),m=!0)},p(s,[a]){325&a&&k!==(k=s[8]+" fa-"+s[0]+" "+s[2]+" "+s[6])&&l(e,"class",k),178&a&&p!==(p="icon "+s[1]+" "+s[7]+" "+(s[4]?"is-left":"")+" "+(s[5]?"is-right":""))&&l(i,"class",p),186&a&&r(i,"is-clickable",s[3])},i:h,o:h,d(s){s&&n(i),m=!1,d()}}}function m(s,i,e){let a,{type:c=""}=i,{pack:t="fas"}=i,{icon:n}=i,{size:l=""}=i,{customClass:r=""}=i,{customSize:o=""}=i,{isClickable:f=!1}=i,{isLeft:u=!1}=i,{isRight:h=!1}=i,p="",m="";return s.$$set=s=>{"type"in s&&e(9,c=s.type),"pack"in s&&e(10,t=s.pack),"icon"in s&&e(0,n=s.icon),"size"in s&&e(1,l=s.size),"customClass"in s&&e(2,r=s.customClass),"customSize"in s&&e(11,o=s.customSize),"isClickable"in s&&e(3,f=s.isClickable),"isLeft"in s&&e(4,u=s.isLeft),"isRight"in s&&e(5,h=s.isRight)},s.$$.update=()=>{if(1024&s.$$.dirty&&e(8,a=t||"fas"),2050&s.$$.dirty)if(o)e(6,p=o);else switch(l){case"is-small":break;case"is-medium":e(6,p="fa-lg");break;case"is-large":e(6,p="fa-3x");break;default:e(6,p="")}if(512&s.$$.dirty){c||e(7,m="");let s=[];if("string"==typeof c)s=c.split("-");else for(let i in c)if(c[i]){s=i.split("-");break}s.length<=1?e(7,m=""):e(7,m=`has-text-${s[1]}`)}},[n,l,r,f,u,h,p,m,a,c,t,o,function(i){k(s,i)}]}class d extends s{constructor(s){super(),i(this,s,m,p,e,{type:9,pack:10,icon:0,size:1,customClass:2,customSize:11,isClickable:3,isLeft:4,isRight:5})}}function g(s,...i){return Object.keys(s).reduce(((e,a)=>(-1===i.indexOf(a)&&(e[a]=s[a]),e)),{})}function b(s){switch(s){case"is-info":return"info-circle";case"is-success":return"check-circle";case"is-warning":return"exclamation-triangle";case"is-danger":return"exclamation-circle";default:return null}}function $(s){return i=>{const e=Object.keys(s.$$.callbacks),a=[];return e.forEach((e=>a.push(u(i,e,(i=>k(s,i)))))),{destroy:()=>{a.forEach((s=>s()))}}}}export{d as I,$ as g,g as o,b as t};
