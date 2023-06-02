import React, { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "app/hooks";
import { Header } from "features/Header/Header";
import s from "./App.module.css";
import { authThunks } from "features/auth/authSlice";
import { ErrorSnackbar } from "components/error-snack-bar/ErrorSnackBar";
import globalRouter from "common/globalRouter";
import { RouteNames } from "routes/routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  globalRouter.navigate = navigate; //for redirect in components after response OK
  // https://dev.to/davidbuc/how-to-use-router-inside-axios-interceptors-react-and-vue-5ece

  useEffect(() => {
    dispatch(authThunks.isAuthTC())
      .unwrap()
      .then((res) => {
        if (res.profile._id) {
          navigate(RouteNames.PROFILE);
        }
      })
      .catch((e) => console.error(e));
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
      {/*<ErrorSnackbar />*/}
      <Header />
      <div className={s.main}>
        <Outlet /> {/*routes.tsx*/}
        {/*Outlet используется для рендеринга вложенных маршрутов внутри родительского маршрута*/}
      </div>
    </div>
  );
}

export default App;
