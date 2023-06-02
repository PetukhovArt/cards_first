import React from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import s from "features/Header/Header.module.scss";
import { ProgressBar } from "features/app/ProgressBar/ProgressBar";
import Button from "@mui/material/Button";
import { Link, NavLink, useLocation } from "react-router-dom";
import { SuperButton } from "components/super-button/SuperButton";
import { RouteNames } from "routes/routes";
import ava from "../../assets/images/ava.png";

export const Header = () => {
  const isLoading = useAppSelector<boolean>((state) => state.app.isLoading);
  const user = useAppSelector((state) => state.auth.profile);

  const location = useLocation();
  const profilePage = location.pathname === RouteNames.PROFILE;

  return (
    <>
      <div className={s.header} id="header">
        <div className={`container ${s.headerContainer}`}>
          <div>
            <h1>Cards</h1>
          </div>
          {!profilePage && ( //если страница профайл , то кнопку не показывать
            <div className={s.actions}>
              <SuperButton name={"Sign In"} redirectPath={RouteNames.LOGIN} />
            </div>
          )}
          {profilePage && (
            <div className={s.actions}>
              <div className={s.userName}>{user && user.name ? user.name : "user"}</div>
              <div className={s.avatar}>
                <img src={user && user.avatar ? user.avatar : ava} alt="userAva" />
              </div>
            </div>
          )}
        </div>
        {isLoading && <ProgressBar />}
      </div>
    </>
  );
};
