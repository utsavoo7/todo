import { blue } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiTable: {
      styleOverrides: {
        root: {
          "& .MuiTableHead-root": {
            background: blue[50],
            "& .MuiTableCell-root": {
              fontWeight: 600,
              borderBottom: "none",
              fontSize: 14,
            },
          },
          "& .MuiTableCell-root": {
            borderBottom: `solid 1px ${blue[400]}`,
          },
          "& .MuiTableRow-root:last-child": {
            "& .MuiTableCell-root": {
              borderBottom: "none",
            },
          },
        },
      },
    },
  },
});
