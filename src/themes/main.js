import { red } from "@material-ui/core/colors";

export const themesConfig = {
  legacy: {
    palette: {
      type: "dark",
      primary: {
        light: "FFFFFF",
        main: "#010D26",
        dark: "#021835",
      },
      secondary: {
        light: "#ffffff",//"#7d7e7e",
        main: "#42BADC", //
        dark: "#F4BF3A",
        contrastText: "#FFFFFF",
      },
      background: {
        paper: "#021835",
        default: "#010D26",
      },
      error: red,
    },
    props: {
      MuiSvgIcon: {
        htmlColor: "#42BADC",
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
        light: "#b9c0da",
        main: "#4379FF",
        dark: "#5433FF",
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
