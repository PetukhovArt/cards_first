import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "normalize.css";
import "./index.css";
import { store } from "app/store";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material";
import { HashRouter, RouterProvider } from "react-router-dom";
import { router } from "routes/routes";

const container = document.getElementById("root")!;
const root = createRoot(container);
const theme = createTheme();
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      {/*<App />*/}
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
