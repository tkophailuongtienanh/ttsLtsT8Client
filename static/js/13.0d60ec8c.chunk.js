(this["webpackJsonpwindmill-dashboard-react"]=this["webpackJsonpwindmill-dashboard-react"]||[]).push([[13],{183:function(e,t,a){e.exports=a.p+"static/media/login-office.72742c2e.jpeg"},184:function(e,t,a){e.exports=a.p+"static/media/login-office-dark.cb4a995f.jpeg"},374:function(e,t,a){"use strict";a.r(t);var o=a(0),l=a.n(o),r=a(2),n=a(45),c=a(183),s=a.n(c),i=a(184),m=a.n(i),d=(a(112),a(30)),u=a(47),p=a.n(u),f=a(69),h=a(61),g=a(32);t.default=function(){const e=Object(r.p)(),{addToast:t}=Object(g.b)(),[a,c]=Object(o.useState)(p.a.get("token")),i=Object(o.useRef)(),u=Object(o.useRef)();return Object(o.useEffect)(()=>{try{const o="https://localhost:7242/api/Authentication/Get",l={"Content-Type":"application/json"};a&&(l.Authorization="Bearer "+a),console.log("headers['Authorization']",l.Authorization);const r={method:"GET",headers:l};(async()=>{const a=await fetch(o,r);if(a.ok){var l=await a.json();console.log("data",l),1005==l.errorCode?(t("danger","Vui l\xf2ng x\xe1c th\u1ef1c email \u0111\u1ec3 ti\u1ebfp t\u1ee5c",1e4),e("/confirmEmail")):window.location.href="/app"}})()}catch(o){}},[a]),l.a.createElement("div",{className:"flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900"},l.a.createElement("div",{className:"flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800"},l.a.createElement("div",{className:"flex flex-col overflow-y-auto md:flex-row"},l.a.createElement("div",{className:"h-32 md:h-auto md:w-1/2"},l.a.createElement("img",{"aria-hidden":"true",className:"object-cover w-full h-full dark:hidden",src:s.a,alt:"Office"}),l.a.createElement("img",{"aria-hidden":"true",className:"hidden object-cover w-full h-full dark:block",src:m.a,alt:"Office"})),l.a.createElement("main",{className:"flex items-center justify-center p-6 sm:p-12 md:w-1/2"},l.a.createElement("div",{className:"w-full"},l.a.createElement("h1",{className:"mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200"},"Login"),l.a.createElement(d.Label,null,l.a.createElement("span",null,"Email"),l.a.createElement(d.Input,{ref:i,className:"mt-1",type:"email",placeholder:"john@doe.com"})),l.a.createElement(d.Label,{className:"mt-4"},l.a.createElement("span",null,"Password"),l.a.createElement(d.Input,{ref:u,className:"mt-1",type:"password",placeholder:"***************"})),l.a.createElement("button",{className:"transition-colors duration-150 font-medium focus:outline-none  \r py-2 rounded-lg text-sm text-white bg-purple-600 border-0 active:bg-purple-600 \r hover:bg-purple-700 focus:shadow-outline-purple w-full mt-4",onClick:async()=>{if(!Object(h.a)(i)||!Object(h.a)(u))return;const e={email:i.current.value,password:u.current.value};console.log("log",e);const a=await Object(f.b)("Authentication/Login",{method:"POST",body:e}),o=a.data;"200"==a.code?(console.log(o),p.a.set("token",o.token),p.a.set("role",JSON.stringify(o.role)),c(o.token)):a.code&&t("danger",a.code+": "+o.errorCode+"-"+o.message,1e4)}},"Log in"),l.a.createElement("hr",{className:"my-8"}),l.a.createElement("p",{className:"mt-4"},l.a.createElement(n.b,{className:"text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline",to:"/forgot-password"},"Forgot your password?")),l.a.createElement("p",{className:"mt-1"},l.a.createElement(n.b,{className:"text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline",to:"/create-account"},"Create account")))))))}}}]);
//# sourceMappingURL=13.0d60ec8c.chunk.js.map