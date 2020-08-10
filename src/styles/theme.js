import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3C3B6E",
      dark: "#001E4F",
      light: "#475A96",
    },
    secondary: {
      main: "#B22234",
    },
    background: {
      default: "#EEF1FA",
    },
  },
  typography: {
    fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
  },
});

export default theme;
