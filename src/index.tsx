import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import "./Fonts/fonts.css";
import { Route } from "react-router";
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
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Route strict path="/tableau/:city/:country?">
          <Demo />
        </Route>
        <Route exact path="/">
          <Config />
        </Route>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
