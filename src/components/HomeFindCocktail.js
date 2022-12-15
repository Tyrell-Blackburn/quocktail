import {
    Box,
    Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
// https://unsplash.com/photos/Sr3bhcYqftA
import HomeBackground from '../images/home-background.png'

import { theme, Search, SearchIconWrapper, StyledInputBase } from "./StyledComponents";

export default function HomeFindCocktail() {

    return (
        <Box sx={{
            color: theme.palette.secondary.main,
            mt: {xs: '56px', sm: '64px', md: '71px', lg: '80px'},
            width: '100%',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "1000px",
            background: `
                linear-gradient(rgba(0, 0, 0, .4), rgba(0, 0, 0, .4)),
                url(${HomeBackground})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: "center",
                justifyContent: "center",
                flexDirection: 'column',
                textAlign: 'center'
                // backdropFilter: `blur(10px)`
            }}>
                <Typography sx={{
                    fontFamily: "Gravitas One",
                    fontWeight: 700,
                    letterSpacing: theme.spacing(1),
                    mb: theme.spacing(1),
                    [theme.breakpoints.down('sm')]: {
                        fontSize: '2.4rem',
                    }
                }} variant="h1">Quocktail</Typography>
                <Typography sx={{
                    fontFamily: "Roboto Condensed",
                    fontWeight: 400,
                    letterSpacing: theme.spacing(.4),
                    mb: theme.spacing(2),
                    [theme.breakpoints.down('sm')]: {
                        fontSize: '1.3rem',
                    }
                    // }} variant="h3">Indulge in hundreds of cocktail recipies</Typography>
                }} variant="h3">Cocktail inspiration on tap</Typography>
                <Typography sx={{
                    fontFamily: "Roboto Condensed",
                    fontWeight: 400,
                    letterSpacing: theme.spacing(.4),
                    mb: theme.spacing(14),
                    mx: '3rem',
                    [theme.breakpoints.down('sm')]: {
                        fontSize: '.8rem',
                    },
                    backgroundColor: 'rgba(51, 170, 51, .3)',
                }} variant="h5">Spark your creativity with 635 timeless cocktail recipies</Typography>
                <Typography sx={{
                    fontFamily: "Roboto Condensed",
                    fontWeight: 400,
                    letterSpacing: theme.spacing(.1),
                    mb: theme.spacing(2),
                    [theme.breakpoints.down('sm')]: {
                        fontSize: '1.3rem',
                    },
                }} variant="h4">Find your poison</Typography>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon color='secondary' fontSize="large" />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search for a cocktail..."
                        inputProps={{ "aria-label": "search" }}
                    />
                </Search>
            </Box>
        </Box >
    )
}