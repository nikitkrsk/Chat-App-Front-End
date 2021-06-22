import { red } from "@material-ui/core/colors";

export const themesConfig = {
  legacy: {
    palette: {
      type: "dark",
      primary: {
        light: "#FFFFFF",
        main: "#7289da",
        dark: "#99aab5",
      },
      secondary: {
        light: "#ffffff",//"#7d7e7e",
        main: "#FFFFFF", //
        dark: "#2F3136",
        contrastText: "#FFFFFF",
      },
      background: {
        paper: "#202225",
        default: "#23272a",
      },
      error: red,
    },
    props: {
      MuiSvgIcon: {
        htmlColor: "#FFFFFF",
      },
    },
    status: {
      danger: "orange",
    },
  },

  light: {
    palette: {
      type: "light",
      primary: {
        light: "#C2C7F1",
        main: "#ffffff",
        dark: "#161EB3",
      },
      secondary: {
        light: "#000000",
        main: "#4379FF",
        dark: "#cacaca",
        contrastText: "#1E1F23",
      },
      background: {
        paper: "#f7f7f7",
        default: "#ffffff",
      },
      error: red,
    },
    props: {
      MuiSvgIcon: {
        htmlColor: "#606060",
      },
    },
    status: {
      danger: "orange",
    },
  },
};

export default themesConfig;
