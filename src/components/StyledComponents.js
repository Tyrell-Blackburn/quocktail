import {
  Button,
  Box,
  TextField,
  InputBase,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

const PRIMARY_GREEN = "#39B54A";
const SECONDARY_NAVY = "#2B5468";
const TEXT_COLOR = "#5C5C5C";

// export const theme = createTheme({
//   palette: {
//     primary: {
//       // light: will be calculated from palette.primary.main,
//       main: global.PRIMARY_GREEN,
//       // dark: will be calculated from palette.primary.main,
//       // contrastText: will be calculated to contrast with palette.primary.main
//     },
//     secondary: {
//       light: "#0066ff",
//       main: "#0044ff",
//       // dark: will be calculated from palette.secondary.main,
//       contrastText: "#ffcc00",
//     },
//   },
// });

export const MainContainer = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    minHeight: "100vh",
  }));

  export const PrimaryButton = styled(Button)(() => ({
    textTransform: "none"
  }));
