import{j as s,b as c}from"./index-CQHIht32.js";import{u as x,A as m}from"./use-user-query-CDITQHX0.js";import{S as r,A as d,h as p,i as u,C as h}from"./copy-btn-3pYlvwZ6.js";import{t as f}from"./test-id-BCzUVKqk.js";function N(){const{listUser:t,actionType:o,retry:i,getRepo:n}=x(),a=o==m.GET_USER;return s.jsxs("div",{className:"flex flex-col gap-y-5 overflow-y-auto px-8 no-scrollbar",children:[a&&Array.from({length:5}).map((e,l)=>s.jsx("div",{children:s.jsxs("div",{className:"flex items-center space-x-4",children:[s.jsx(r,{className:"h-12 w-12 rounded-full"}),s.jsxs("div",{className:"space-y-2",children:[s.jsx(r,{className:"h-4 w-[250px]"}),s.jsx(r,{className:"h-4 w-[200px]"})]})]})},`${l}`)),!a&&t.map((e,l)=>s.jsxs("div",{className:"flex group/user space-x-4 hover:bg-gray-100 px-4 py-3 rounded-md cursor-pointer transition duration-700",onClick:()=>{n(e)},...f(),children:[s.jsxs(d,{className:"h-10 w-10 rounded-full overflow-hidden",children:[s.jsx(p,{src:e.avatar_url}),s.jsx(u,{children:"US"})]}),s.jsxs("div",{className:"",children:[s.jsx("p",{className:"text-xs font-bold tex-gray-500",children:e.login}),s.jsxs("div",{className:"flex items-center gap-x-2",children:[s.jsx("p",{className:"text-xs font-bolder text-gray-500 group-hover/user:text-gray-800 transition duration-300",children:e.url}),s.jsx(h,{value:e.url,isPlain:!0,className:"size-5 [&_svg:not([class*='size-'])]:size-3 hover:bg-white"})]})]})]},e.id)),!a&&!!i&&!t.length&&s.jsx(c,{className:"w-full max-w-[200px] mx-auto"})]})}export{N as default};
