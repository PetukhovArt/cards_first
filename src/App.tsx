import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useAppDispatch } from "app/hooks";
import { appActions } from "features/app/appSlice";
import { router } from "routes/routes";
import { Header } from "components/Header/Header";
import s from "./App.module.css";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(appActions.setIsLoading({ isLoading: false }));
    }, 3000);
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
