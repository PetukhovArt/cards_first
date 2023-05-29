import React from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { RootState } from "app/store";
import s from "./Header.module.css";
import { ProgressBar } from "features/app/ProgressBar/ProgressBar";

export const Header = () => {
  const isLoading = useAppSelector<boolean>((state: RootState) => state.app.isLoading);

  return (
    <>
      <div className={s.header} id="header">
        <div className={`container ${s.headerContainer}`}>
          <div>Cards</div>
          <div className={s.actions}>
            <button> to smth</button>
            <span>nick</span>
            <img src="#" alt="logo" />
          </div>
        </div>
        {isLoading && <ProgressBar />}
      </div>
    </>
  );
};
