import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#57c5b6",
    },
    secondary: {
      main: "#002b5b",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize !important",
          fontSize: 14,
          fontWeight: 600,
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          "& .MuiTableRow-head": {
            background: "#57c5b655",
          },
          "& .MuiTableRow-head .MuiTableCell-root": {
            fontWeight: 600,
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: 5,
        },
      },
    },
  },
});
