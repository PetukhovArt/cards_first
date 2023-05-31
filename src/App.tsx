import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useAppDispatch } from "app/hooks";
import { router } from "routes/routes";
import { Header } from "features/Header/Header";
import s from "./App.module.css";
import { authThunks } from "features/auth/authSlice";
import { ErrorSnackbar } from "components/error-snack-bar/ErrorSnackBar";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authThunks.isAuthTC());
  }, []);

  return (
    <div className={s.appWrapper}>
      <ErrorSnackbar />
      <Header />
      <div className={s.main}>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
