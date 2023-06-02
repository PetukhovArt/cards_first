import React from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import s from "features/Header/Header.module.scss";
import { ProgressBar } from "features/app/ProgressBar/ProgressBar";
import Button from "@mui/material/Button";
import { Link, NavLink } from "react-router-dom";

export const Header = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector<boolean>((state) => state.app.isLoading);

  return (
    <>
      <div className={s.header} id="header">
        <div className={`container ${s.headerContainer}`}>
          <div>
            <h1>Cards</h1>
          </div>
          <div className={s.actions}>
            {/*<Button component={Link} to="/about">*/}
            {/*  Go to About page*/}
            {/*</Button>*/}
            <Button variant={"contained"}> Sign In </Button>
            {/*<Button variant={"contained"}> Sign Up </Button>*/}
            {/*<span>nick</span>*/}
            {/*<img src="src/features/Header#" alt="logo" />*/}
          </div>
        </div>
        {isLoading && <ProgressBar />}
      </div>
    </>
  );
};
