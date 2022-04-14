var o=Object.defineProperty;var l=Object.getOwnPropertySymbols;var m=Object.prototype.hasOwnProperty,c=Object.prototype.propertyIsEnumerable;var s=(u,e,a)=>e in u?o(u,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):u[e]=a,i=(u,e)=>{for(var a in e||(e={}))m.call(e,a)&&s(u,a,e[a]);if(l)for(var a of l(e))c.call(e,a)&&s(u,a,e[a]);return u};import{A as H,F as h}from"./index.7db24c1d.js";import{a as C,j as t}from"./index.3a0da52c.js";import{u as p,r}from"./vendor.b6cedc01.js";const w={email:{required:"\u042D\u0442\u043E \u043F\u043E\u043B\u0435 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0435",pattern:{value:/^((?=[a-zA-Z0-9])[a-zA-Z0-9!#$%&\\'*+\-\/=?^_`.{|}~]{1,25})@(([a-zA-Z0-9\-]){1,25}\.)([a-zA-Z0-9]{2,4})$/,message:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 email"},maxLength:{value:40,message:"\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0434\u043B\u0438\u043D\u043D\u044B\u0439 email"}},password:{required:"\u042D\u0442\u043E \u043F\u043E\u043B\u0435 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0435",pattern:{value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,24}$/,message:"\u041F\u0430\u0440\u043E\u043B\u044C \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043B\u0430\u0442\u0438\u043D\u0438\u0446\u0443 \u0438 \u043F\u0440\u043E\u043F\u0438\u0441\u043D\u044B\u0435 \u0431\u0443\u043A\u0432\u044B"},minLength:{value:8,message:"\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u0430\u044F \u0434\u043B\u0438\u043D\u0430 8 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432"},maxLength:{value:24,message:"\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0430\u044F \u0434\u043B\u0438\u043D\u0430 24 \u0441\u0438\u043C\u0432\u043E\u043B\u0430"}}};const B=({title:u,children:e,canGoBack:a=!1})=>{const n=p();return C("div",{className:"form-wrapper",children:[C("div",{className:"form-wrapper__header",children:[a&&t("div",{className:"form-wrapper__redirect",children:t(H,{onClick:()=>n(-1),classname:"form-wrapper__back",rotate:180})}),t("div",{className:"form-wrapper__title",children:t("h3",{children:u})})]}),t("div",{className:"form-wrapper__content",children:e})]})};const Z=({children:u})=>t("div",{className:"container",children:u}),d=u=>r.exports.createElement("svg",i({width:86,height:52,viewBox:"0 0 86 52",fill:"none",xmlns:"http://www.w3.org/2000/svg"},u),r.exports.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M69.9616 32.1894H62.2314V1.07302H69.8828V18.2848C70.9652 18.5933 71.6646 18.4839 72.2393 17.5113C73.3923 15.5628 74.6696 13.6821 75.9415 11.8014C76.049 11.6351 76.1899 11.4917 76.3564 11.3802C76.5229 11.2686 76.7106 11.1913 76.9091 11.1527H84.979L78.4928 20.5889C78.284 20.8182 78.1706 21.1149 78.1755 21.4209C78.1805 21.7269 78.3025 22.0202 78.5185 22.2431C80.609 25.115 83.3777 29.2913 85.4286 32.1894H79.6013C79.6013 32.1894 76.522 32.3203 75.1822 29.6444C74.157 27.9431 73.2569 26.6018 72.2042 25.1183C72.0768 24.9388 72.0674 24.8135 71.8257 24.5862C71.6646 24.4348 71.4747 24.3159 71.2658 24.2363C71.0575 24.1567 70.8347 24.1179 70.6106 24.1222C70.3864 24.1266 70.1655 24.174 69.9607 24.2617L69.9616 32.1894ZM58.2394 32.1894H50.5385V30.9004C50.534 27.4308 50.534 23.9608 50.5385 20.4904C50.5385 18.531 49.944 17.4949 48.5182 17.0212C47.6946 16.7752 46.8152 16.7684 45.988 17.0017C45.1604 17.2349 44.4215 17.698 43.8617 18.334C43.647 18.6859 43.5454 19.092 43.57 19.5004C43.5497 23.1458 43.5587 26.7901 43.5587 30.4409V32.1894H35.8567V11.1724H42.581L42.7162 13.3102C43.0316 13.0585 43.2219 12.9163 43.4021 12.7631C44.7468 11.5686 46.4228 10.7836 48.2221 10.5054C50.0219 10.227 51.8657 10.4677 53.526 11.1975C54.9198 11.7091 56.1165 12.6271 56.9527 13.8254C57.7885 15.0237 58.2223 16.4438 58.1944 17.891C58.1944 17.891 58.2394 27.3986 58.2394 32.1894ZM19.9379 32.1894H12.344V6.01956e-08H19.9379V32.1894ZM0.640866 11.1582H8.23925V32.1894H0.640866V11.1582ZM24.1212 11.1582H31.7274V32.1894H24.1212V11.1582ZM4.47047 8.20419C3.8974 8.2366 3.32355 8.15523 2.78394 7.96504C2.24433 7.77489 1.75027 7.4799 1.33193 7.09809C0.913586 6.71632 0.579725 6.25568 0.350733 5.74443C0.12174 5.23314 0.00241168 4.68188 3.618e-05 4.1243C-0.00233932 3.56673 0.112287 3.01455 0.336915 2.50144C0.561543 1.98833 0.89147 1.52506 1.30654 1.13991C1.72162 0.754768 2.21314 0.455817 2.75111 0.261311C3.28909 0.0668051 3.86222 -0.0191603 4.43554 0.00863054C7.12303 0.00097215 8.88013 1.59061 8.89026 4.03692C8.92928 4.60485 8.84062 5.17426 8.6304 5.70558C8.42022 6.2369 8.09357 6.71748 7.67309 7.11391C7.2526 7.51039 6.74836 7.81325 6.19533 8.00152C5.6423 8.18979 5.05376 8.25896 4.47047 8.20419ZM27.8922 8.20419C27.0692 8.15492 26.2791 7.87289 25.619 7.3929C24.9589 6.91295 24.4578 6.2559 24.1773 5.50278C23.8968 4.74966 23.8492 3.93326 24.0403 3.15418C24.2315 2.37509 24.653 1.66734 25.253 1.11801C25.8531 0.568689 26.6054 0.201814 27.4174 0.0625519C28.2294 -0.0767098 29.0655 0.0177224 29.823 0.33423C30.5804 0.650739 31.226 1.17548 31.6803 1.84387C32.1345 2.51226 32.3776 3.29512 32.3796 4.09602C32.4039 4.66418 32.302 5.23073 32.0809 5.75722C31.8597 6.28371 31.5244 6.75776 31.0978 7.14722C30.6713 7.53664 30.1633 7.83234 29.6087 8.01417C29.054 8.19596 28.4655 8.25967 27.8832 8.20088L27.8922 8.20419Z",fill:"white"}),r.exports.createElement("path",{d:"M2.70952 51.8352L3.59713 49.0872H7.91251L8.80012 51.8352H11.5096L7.38696 39.7838H4.12851L0 51.8352H2.70952ZM4.23947 47.0982L5.71102 42.5377H5.80445L7.276 47.0982H4.23947Z",fill:"white"}),r.exports.createElement("path",{d:"M23.1034 44.003C22.7706 41.2196 20.68 39.619 17.9121 39.619C14.753 39.619 12.3412 41.8669 12.3412 45.8095C12.3412 49.7403 14.7121 52 17.9121 52C20.9779 52 22.829 49.9463 23.1034 47.7278L20.5457 47.7161C20.3063 49.0048 19.3019 49.7462 17.953 49.7462C16.1369 49.7462 14.9048 48.3869 14.9048 45.8095C14.9048 43.3027 16.1194 41.8728 17.9705 41.8728C19.3545 41.8728 20.353 42.679 20.5457 44.003H23.1034Z",fill:"white"}),r.exports.createElement("path",{d:"M26.9175 51.8352L27.8051 49.0872H32.1205L33.0081 51.8352H35.7177L31.595 39.7838H28.3365L24.208 51.8352H26.9175ZM28.4475 47.0982L29.919 42.5377H30.0125L31.484 47.0982H28.4475Z",fill:"white"}),r.exports.createElement("path",{d:"M41.561 51.8352C45.2048 51.8352 47.4122 49.5638 47.4122 45.7977C47.4122 42.0434 45.2048 39.7838 41.596 39.7838H37.3215V51.8352H41.561ZM39.85 49.6521V41.9669H41.4617C43.7041 41.9669 44.8895 43.1203 44.8895 45.7977C44.8895 48.4869 43.7041 49.6521 41.4559 49.6521H39.85Z",fill:"white"}),r.exports.createElement("path",{d:"M49.4496 51.8352H57.5315V49.7344H51.9781V46.8569H57.0935V44.7562H51.9781V41.8845H57.5081V39.7838H49.4496V51.8352Z",fill:"white"}),r.exports.createElement("path",{d:"M59.6828 39.7838V51.8352H62.1354V43.9618H62.2347L65.3296 51.7764H66.9997L70.0946 43.9912H70.1939V51.8352H72.6465V39.7838H69.5282L66.2347 47.8808H66.0946L62.8011 39.7838H59.6828Z",fill:"white"}),r.exports.createElement("path",{d:"M74.1934 39.7838L78.5555 47.5748V51.8352H81.0665V47.5748L85.4286 39.7838H82.5965L79.8694 44.9739H79.7526L77.0256 39.7838H74.1934Z",fill:"white"}));const g=({children:u})=>C("div",{className:"auth-container",children:[t("header",{className:"auth-container__header",children:t("a",{href:"https://ilink.dev/promo/academy.html",target:"_blank",rel:"noreferrer",children:t(d,{})})}),t("main",{className:"auth-container__body",children:u}),t(h,{})]});export{g as A,Z as C,B as F,w as a};
