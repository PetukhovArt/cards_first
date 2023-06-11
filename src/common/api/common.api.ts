import axios from "axios";
import globalRouter from "common/globalRouter";
import { RouteNames } from "routes/routes";

export const instance = axios.create({
  baseURL:
    // process.env.NODE_ENV === "development"
    //   ? "http://localhost:7542/2.0/"
    //   :
    "https://neko-back.herokuapp.com/2.0/",
  withCredentials: true,
});

// export const instanceHeroku = axios.create({
//   baseURL: "https://neko-back.herokuapp.com/2.0/",
//   withCredentials: true,
// });

//for redirect
// instanceHeroku.interceptors.response.use(function (response) {
//   if (response.status === 401 && globalRouter.navigate) {
//     globalRouter.navigate(RouteNames.LOGIN);
//   }
//   return response;
// });
