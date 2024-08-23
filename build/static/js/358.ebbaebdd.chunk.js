"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[358],{53276:(e,n,o)=>{o.d(n,{A:()=>p});var l=o(82483);const r=(0,l.createContext)(null);function t(e){let{clientId:n,nonce:o,onScriptLoadSuccess:t,onScriptLoadError:c,children:s}=e;const i=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{nonce:n,onScriptLoadSuccess:o,onScriptLoadError:r}=e,[t,c]=(0,l.useState)(!1),s=(0,l.useRef)(o);s.current=o;const i=(0,l.useRef)(r);return i.current=r,(0,l.useEffect)((()=>{const e=document.createElement("script");return e.src="https://accounts.google.com/gsi/client",e.async=!0,e.defer=!0,e.nonce=n,e.onload=()=>{var e;c(!0),null===(e=s.current)||void 0===e||e.call(s)},e.onerror=()=>{var e;c(!1),null===(e=i.current)||void 0===e||e.call(i)},document.body.appendChild(e),()=>{document.body.removeChild(e)}}),[n]),t}({nonce:o,onScriptLoadSuccess:t,onScriptLoadError:c}),d=(0,l.useMemo)((()=>({clientId:n,scriptLoadedSuccessfully:i})),[n,i]);return l.createElement(r.Provider,{value:d},s)}function c(){const e=(0,l.useContext)(r);if(!e)throw new Error("Google OAuth components must be used within GoogleOAuthProvider");return e}function s(e){var n;return null!==(n=null===e||void 0===e?void 0:e.clientId)&&void 0!==n?n:null===e||void 0===e?void 0:e.client_id}const i={large:40,medium:32,small:20};function d(e){let{onSuccess:n,onError:o,useOneTap:r,promptMomentNotification:t,type:d="standard",theme:a="outline",size:u="large",text:v,shape:p,logo_alignment:h,width:m,locale:g,click_listener:x,containerProps:f,...w}=e;const j=(0,l.useRef)(null),{clientId:b,scriptLoadedSuccessfully:y}=c(),S=(0,l.useRef)(n);S.current=n;const k=(0,l.useRef)(o);k.current=o;const A=(0,l.useRef)(t);return A.current=t,(0,l.useEffect)((()=>{var e,n,o,l,t,c,i,f,E;if(y)return null===(o=null===(n=null===(e=null===window||void 0===window?void 0:window.google)||void 0===e?void 0:e.accounts)||void 0===n?void 0:n.id)||void 0===o||o.initialize({client_id:b,callback:e=>{var n;if(!(null===e||void 0===e?void 0:e.credential))return null===(n=k.current)||void 0===n?void 0:n.call(k);const{credential:o,select_by:l}=e;S.current({credential:o,clientId:s(e),select_by:l})},...w}),null===(c=null===(t=null===(l=null===window||void 0===window?void 0:window.google)||void 0===l?void 0:l.accounts)||void 0===t?void 0:t.id)||void 0===c||c.renderButton(j.current,{type:d,theme:a,size:u,text:v,shape:p,logo_alignment:h,width:m,locale:g,click_listener:x}),r&&(null===(E=null===(f=null===(i=null===window||void 0===window?void 0:window.google)||void 0===i?void 0:i.accounts)||void 0===f?void 0:f.id)||void 0===E||E.prompt(A.current)),()=>{var e,n,o;r&&(null===(o=null===(n=null===(e=null===window||void 0===window?void 0:window.google)||void 0===e?void 0:e.accounts)||void 0===n?void 0:n.id)||void 0===o||o.cancel())}}),[b,y,r,d,a,u,v,p,h,m,g]),l.createElement("div",{...f,ref:j,style:{height:i[u],...null===f||void 0===f?void 0:f.style}})}class a extends Error{}function u(e){let n=e.replace(/-/g,"+").replace(/_/g,"/");switch(n.length%4){case 0:break;case 2:n+="==";break;case 3:n+="=";break;default:throw new Error("base64 string is not of the correct length")}try{return function(e){return decodeURIComponent(atob(e).replace(/(.)/g,((e,n)=>{let o=n.charCodeAt(0).toString(16).toUpperCase();return o.length<2&&(o="0"+o),"%"+o})))}(n)}catch(o){return atob(n)}}a.prototype.name="InvalidTokenError";var v=o(56723);const p=e=>{let{onSuccess:n,onFailure:o,auto_select:l,text:r,useOneTap:c}=e;return(0,v.jsx)(t,{clientId:"73457248543-vn1bjkn98qogdcljl35job6ek20e82qt.apps.googleusercontent.com",children:(0,v.jsx)(d,{theme:"outline",shape:"pill",onSuccess:e=>{console.log(e);const o=function(e,n){if("string"!==typeof e)throw new a("Invalid token specified: must be a string");n||(n={});const o=!0===n.header?0:1,l=e.split(".")[o];if("string"!==typeof l)throw new a("Invalid token specified: missing part #".concat(o+1));let r;try{r=u(l)}catch(t){throw new a("Invalid token specified: invalid base64 for part #".concat(o+1," (").concat(t.message,")"))}try{return JSON.parse(r)}catch(t){throw new a("Invalid token specified: invalid json for part #".concat(o+1," (").concat(t.message,")"))}}(e.credential);n(o),console.log(o)},onError:e=>{console.log("Login Failed",e)},auto_select:l,text:r,useOneTap:c})})}},50358:(e,n,o)=>{o.r(n),o.d(n,{default:()=>h});var l=o(82483),r=(o(31154),o(7817)),t=o(23080),c=(o(58510),o(91965)),s=o(49482),i=o(93376),d=o(99891),a=o(16409),u=o(710),v=o(53276),p=(o(42060),o(77651),o(56723));const h=()=>{const{handleSubmit:e,control:n,formState:{errors:o}}=(0,t.mN)({}),{isAuthenticated:h,isLoading:m}=(0,c.d4)((e=>e.auth)),[g,x]=(0,l.useState)(null),f=(0,i.Zp)(),w=(0,c.wA)();return(0,l.useEffect)((()=>{if(!0===h)return f("/email-verification/".concat(g))}),[f,h,g]),(0,p.jsx)("div",{children:(0,p.jsx)("div",{class:"hk-wrapper hk-pg-auth","data-footer":"simple",children:(0,p.jsx)("div",{class:"hk-pg-wrapper pt-0 pb-xl-0 pb-5",children:(0,p.jsx)("div",{class:"hk-pg-body pt-0 pb-xl-0",children:(0,p.jsx)("div",{class:"container-xxl",children:(0,p.jsx)("div",{class:"row",children:(0,p.jsx)("div",{class:"col-sm-10 position-relative mx-auto",children:(0,p.jsx)("div",{class:"auth-content py-8",children:(0,p.jsx)("form",{class:"w-100",onSubmit:e((e=>{var n;const o={...e,role:"USER",country:null===e||void 0===e||null===(n=e.country)||void 0===n?void 0:n.value};x(null===e||void 0===e?void 0:e.email),w((0,s.DY)(o))})),children:(0,p.jsx)("div",{class:"row",children:(0,p.jsx)("div",{class:"col-xxl-5 col-xl-7 col-lg-8 col-sm-10 mx-auto",children:(0,p.jsx)("div",{class:"card card-border",children:(0,p.jsxs)("div",{class:"card-body",children:[(0,p.jsx)("div",{className:"d-flex justify-content-center pb-2",children:(0,p.jsx)("img",{className:" ",src:a,width:300,alt:"brand"})}),(0,p.jsx)("h4",{class:"text-center mb-0",children:"Sign Up to Desktopcrm"}),(0,p.jsxs)("p",{class:"p-xs mt-2 mb-4 text-center",children:["Already a member ?"," ",(0,p.jsx)(d.N_,{to:"/sign-in",children:(0,p.jsx)("u",{children:"Sign In"})})]}),!0===m?(0,p.jsx)(u.A,{}):(0,p.jsxs)("div",{class:"row gx-3",children:[(0,p.jsx)("div",{className:"col-lg-6",children:(0,p.jsx)(r.A,{name:"name",placeholder:"Your Full Name",control:n,rules:{required:{value:!0,message:"Field required!"}},errors:o})}),(0,p.jsx)("div",{className:"col-lg-6",children:(0,p.jsx)(r.A,{name:"username",placeholder:"Username",control:n,rules:{required:{value:!0,message:"Field required!"}},errors:o})}),(0,p.jsx)("div",{className:"col-lg-12",children:(0,p.jsx)(r.A,{name:"email",type:"email",placeholder:"Email Address",control:n,rules:{required:{value:!0,message:"Field required!"}},errors:o})}),(0,p.jsx)("div",{className:"col-lg-12",children:(0,p.jsx)(r.A,{name:"password",type:"password",placeholder:"Password containing 8+ characters",control:n,rules:{required:{value:!0,message:"Field required!"}},errors:o})}),(0,p.jsx)("div",{className:"col-lg-12 col-sm-6",children:(0,p.jsx)(r.A,{name:"personal_phone",type:"string",placeholder:"Phone Number eg: '+14849993639'",control:n,rules:{required:{value:!0,message:"Field required!"}},errors:o})}),(0,p.jsx)("div",{className:"col-lg-12 col-sm-6",children:(0,p.jsx)(r.A,{name:"location",placeholder:"Address eg: LA, street 2, apt # 45434",control:n,rules:{required:{value:!0,message:"Field required!"}},errors:o})})]}),(0,p.jsx)("button",{type:"submit",class:"btn btn-primary btn-rounded btn-uppercase btn-block",children:"Create account"}),(0,p.jsx)("div",{className:"text-center py-2",children:"OR"}),(0,p.jsx)("div",{className:"d-flex justify-content-center",children:(0,p.jsx)(v.A,{onSuccess:e=>{w((0,s.Lx)(e.email,"1234567890",!1,"google",e)),console.log("Logged in successfully!",e)},onFailure:e=>{console.error("Login failed:",e)},text:"signup_with",auto_select:!1,useOneTap:!1})})]})})})})})})})})})})})})})}}}]);
//# sourceMappingURL=358.ebbaebdd.chunk.js.map