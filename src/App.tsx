import React, { useEffect } from "react";
import { RouterProvider, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { appActions } from "features/app/appSlice";
import { router } from "routes/routes";
import { Header } from "components/Header/Header";
import s from "./App.module.css";
import { authThunks } from "features/auth/authSlice";
import { RootState } from "app/store";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authThunks.isAuthTC());
  }, []);

  return (
    <div className={s.appWrapper}>
      <Header />
      <div className={s.main}>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
