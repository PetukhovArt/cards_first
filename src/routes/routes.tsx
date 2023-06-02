import React from "react";
import {
  createBrowserRouter,
  createHashRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import { Profile } from "features/profile/Profile";
import ErrorPage from "common/error-page/ErrorPage";
import { Login } from "features/login/Login";
import { Register } from "features/register/Register";
import { CheckEmail } from "features/check-email/CheckEmail";
import { SetNewPassword } from "features/set-new-password/SetNewPassword";
import { ForgotPassword } from "features/forgot-password/ForgotPassword";
import { Packs } from "features/packs/Packs";
import { Learn } from "features/learn/Learn";
import App from "App";

export enum RouteNames {
  START_PAGE = "/",
  ERROR_PAGE = "*",
  LOGIN = "/login",
  REGISTER = "/register",
  CHECK_EMAIL = "/check-email",
  NEW_PASSWORD = "/set-new-password",
  FORGOT_PASSWORD = "/forgot-password",
  PROFILE = "/profile",
  PACKS = "/packs",
  LEARN = "/learn",
}

export const router = createHashRouter(
  createRoutesFromElements(
    <Route path={RouteNames.START_PAGE} element={<App />}>
      <Route path={RouteNames.START_PAGE} element={<Navigate to={RouteNames.PACKS} />} />
      <Route path={RouteNames.ERROR_PAGE} element={<ErrorPage />} />
      <Route path={RouteNames.PROFILE} element={<Profile />} />
      <Route path={RouteNames.LOGIN} element={<Login />} />
      <Route path={RouteNames.REGISTER} element={<Register />} />
      <Route path={RouteNames.CHECK_EMAIL} element={<CheckEmail />} />
      <Route path={RouteNames.NEW_PASSWORD} element={<SetNewPassword />} />
      <Route path={RouteNames.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={RouteNames.PACKS} element={<Packs />} />
      <Route path={RouteNames.LEARN} element={<Learn />} />
    </Route>
  )
);

// export const router = createHashRouter([
//   //createBrowserRouter
//   //createHashRouter  if use GitHub pages
//   {
//     path: RouteNames.START_PAGE,
//     element: <Packs />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: RouteNames.PROFILE,
//     element: <Profile />,
//   },
//   {
//     path: RouteNames.LOGIN,
//     element: <Login />,
//   },
//   {
//     path: RouteNames.REGISTER,
//     element: <Register />,
//   },
//   {
//     path: RouteNames.CHECK_EMAIL,
//     element: <CheckEmail />,
//   },
//   {
//     path: RouteNames.NEW_PASSWORD,
//     element: <SetNewPassword />,
//   },
//   {
//     path: RouteNames.FORGOT_PASSWORD,
//     element: <ForgotPassword />,
//   },
//   {
//     path: RouteNames.PACKS,
//     element: <Packs />,
//   },
//   {
//     path: RouteNames.LEARN,
//     element: <Learn />,
//   },
// ]);
