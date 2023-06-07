import React from "react";
import {
  createBrowserRouter,
  createHashRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import { Profile } from "features/user/profile/Profile";
import ErrorPage from "common/error-page/ErrorPage";
import { Login } from "features/user/login/Login";
import { Register } from "features/user/register/Register";
import { CheckEmail } from "features/user/check-email/CheckEmail";
import { SetNewPassword } from "features/user/set-new-password/SetNewPassword";
import { ForgotPassword } from "features/user/forgot-password/ForgotPassword";
import { Packs } from "features/packs/Packs";
import { Learn } from "features/learn/Learn";
import App from "app/App";

export enum RouteNames {
  START_PAGE = "/",
  ERROR_PAGE = "/404",
  LOGIN = "/login",
  REGISTER = "/register",
  CHECK_EMAIL = "/check-email",
  SET_NEW_PASSWORD = "/set-new-password",
  FORGOT_PASSWORD = "/forgot-password",
  PROFILE = "/profile",
  PACKS = "/packs",
  LEARN = "/learn",
}

export const router = createHashRouter(
  createRoutesFromElements(
    <Route path={RouteNames.START_PAGE} element={<App />}>
      <Route path={RouteNames.START_PAGE} element={<Packs />} />
      <Route path={RouteNames.PROFILE} element={<Profile />} />
      <Route path={RouteNames.LOGIN} element={<Login />} />
      <Route path={RouteNames.REGISTER} element={<Register />} />
      <Route path={RouteNames.CHECK_EMAIL} element={<CheckEmail />} />
      <Route path={RouteNames.SET_NEW_PASSWORD} element={<SetNewPassword />} />
      <Route path={`${RouteNames.SET_NEW_PASSWORD}/:token`} element={<SetNewPassword />} />
      <Route path={RouteNames.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={RouteNames.PACKS} element={<Packs />} />
      <Route path={RouteNames.LEARN} element={<Learn />} />
      <Route path={RouteNames.ERROR_PAGE} element={<ErrorPage />} />
      <Route path="*" element={<Navigate to={RouteNames.ERROR_PAGE} />} />
    </Route>
  )
);
