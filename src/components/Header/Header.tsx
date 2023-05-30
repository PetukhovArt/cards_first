import React from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { RootState } from "app/store";
import s from "components/Header/Header.module.scss";
import { ProgressBar } from "features/app/ProgressBar/ProgressBar";
import { isLoadingType } from "features/app/appSlice";

export const Header = () => {
  const dispatch = useAppDispatch();
  const resStatus = useAppSelector<isLoadingType>((state) => state.app.resStatus);

  return (
    <>
      <div className={s.header} id="header">
        <div className={`container ${s.headerContainer}`}>
          <div>
            <h1>Cards</h1>
          </div>
          <div className={s.actions}>
            <button> to smth</button>
            <span>nick</span>
            <img src="#" alt="logo" />
          </div>
        </div>
        {resStatus === "loading" && <ProgressBar />}
      </div>
    </>
  );
};
