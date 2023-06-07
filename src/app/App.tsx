import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "features/header/Header";
import s from "app/App.module.css";
import { userThunks } from "features/user/userSlice";
import globalRouter from "common/globalRouter";
import { RouteNames } from "routes/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { useAppSelector } from "common/hooks/useAppSelector";
import { RootState } from "app/store";
import { ProgressBar } from "app/ProgressBar/ProgressBar";
import { BearLoader } from "app/BearLoader/BearLoader";

function App() {
  const isAuth = useAppSelector((state: RootState) => state.user.isAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // globalRouter.navigate = navigate; //for redirect (by axios Interceptor) in components after response OK
  // https://dev.to/davidbuc/how-to-use-router-inside-axios-interceptors-react-and-vue-5ece

  useEffect(() => {
    console.log("App useeffect for isAuth");
    dispatch(userThunks.isAuthTC())
      .unwrap()
      .then(() => console.log("authorized"))
      .catch((e) => {
        navigate(RouteNames.LOGIN);
      });
  }, []);

  return (
    <div className={s.appWrapper}>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Header />
      <div className={s.main}>
        <Outlet /> {/*routes.tsx*/}
        {/*Outlet используется для рендеринга вложенных маршрутов внутри родительского маршрута*/}
      </div>
    </div>
  );
}

export default App;
