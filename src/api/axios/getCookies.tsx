// /* eslint-disable no-var */
// "use client";
// import Cookies from "js-cookie";

//   export const getCookies = () => {
//   const token = Cookies.get("token");
//   if (token) {
//     return token;
//   } else {
//     return "";
//   }
// };

// export default function  parseJwt (token:any) {
//   let base64Url = token.split('.')[1];
//   let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//   let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
//       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//   }).join(''));

//   return JSON.parse(jsonPayload);
// }

