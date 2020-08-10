import React from "react";
import { Provider } from "mobx-react";
import { ThemeProvider } from "@material-ui/styles";

import theme from "./styles/theme";
import { Notify } from "./components/general";
import routes from "./components/routes";
import stores from "./stores";
import "./App.css";

function App() {
  return (
    <Provider {...stores}>
      <Notify />
      <ThemeProvider theme={theme}>{routes}</ThemeProvider>
    </Provider>
  );
}

export default App;
