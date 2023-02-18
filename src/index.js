import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";

import Themes from "./themes";
import App from "./App";
import { LayoutProvider } from "./context/LayoutContext";

ReactDOM.render(
  <LayoutProvider>
      <ThemeProvider theme={Themes.default}>
        <CssBaseline />
        <App />
      </ThemeProvider>
  </LayoutProvider>,
  document.getElementById("root"),
);
