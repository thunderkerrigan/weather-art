import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import "./Fonts/fonts.css";
import { Route, Routes } from "react-router";
import { Demo } from "./Demo/Demo";
import reportWebVitals from "./reportWebVitals";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import "@fontsource/roboto";
import { Config } from "./Config/config";

const theme = createTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          WebkitFontSmoothing: "auto",
        },
      },
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route index element={<Config />} />
        <Route path="/tableau/:city" element={<Demo />} />
        <Route path="/tableau/:city/:country" element={<Demo />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
