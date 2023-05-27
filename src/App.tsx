import React, { useEffect } from "react";
import "./App.css";
import { Counter } from "features/counter/Counter";
import { RouterProvider } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { appActions } from "features/app/app.slice";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material";
import { store } from "app/store";
import { router } from "routes/routes";

const theme = createTheme();
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;

export const Test = () => {
  const isLoading = useAppSelector((state) => state.app.isLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(appActions.setIsLoading({ isLoading: false }));
    }, 3000);
  }, []);

  return (
    <div className="App">
      {isLoading && <h1>Loader...</h1>}
      <Counter />
    </div>
  );
};
