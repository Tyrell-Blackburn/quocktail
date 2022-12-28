import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";

import { Link } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import TextField from '@mui/material/TextField';

const TEXT_COLOR = "#5C5C5C";

export const theme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: "#272932",
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            light: "#0066ff",
            main: "#e7ecef",
            contrastText: "#ffcc00",
        },
    },
});

export const NavButton = styled(Button)(() => ({
    fontFamily: 'Roboto Condensed, sans-serif',
    fontSize: '1rem',
    textTransform: "none",
    color: theme.palette.primary.main
}));

export const RandomButton = styled(Button)(() => ({
    fontFamily: "Roboto Condensed",
    fontSize: '2.125rem',
    lineHeight: 1.5,
    mr: '1rem',
    letterSpacing: theme.spacing(.1)
}));

export const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: '8px',
    marginLeft: theme.spacing(4),
    backgroundColor: alpha(theme.palette.common.white, 0.85),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.95)
    },
    width: "auto"
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    // color: "inherit",
    "& .MuiInputBase-input": {
        fontSize: '1.5rem',
        padding: theme.spacing(1.5, 4, 1.5, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: "100%",
        [theme.breakpoints.down('sm')]: {
            fontSize: '1rem',
        },
    }
}));

export const StyledTextInput = styled(TextField)(({ theme }) => ({
    // "& .MuiInputBase-input": {
    //     fontSize: '1.5rem',
    //     padding: theme.spacing(1.5, 4, 1.5, 0),
    //     // vertical padding + font size from searchIcon
    //     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    //     width: "100%",
    //     [theme.breakpoints.down('sm')]: {
    //         fontSize: '1rem',
    //     },
    // }
}));

export const UnstyledLink = styled(Link)(() => ({
    textDecoration: "none",
    color: TEXT_COLOR
}));