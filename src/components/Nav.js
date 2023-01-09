import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { NavButton, theme, UnstyledLink } from "./StyledComponents";
import logo from '../images/logo-quocktail.png';
import favoritesEmptyIcon from '../images/icon-favorites-empty.png';
import favoritesFullIcon from '../images/icon-favorites-full.png';

// Attribution for when add favorites
{/* <a href="https://www.flaticon.com/free-icons/heart" title="heart icons">Heart icons created by Kiranshastry - Flaticon</a> */ }

const pages = [
    "Home",
    "Search",
    "Advanced Search",
    "Discover",
];

const settings = ["Favorites", "Logout"];

const determineLink = (page) => {
    let link;
    switch(page) {
        case "Home":
            link = '/'
            break;
        case "Search":
            link = '/search'
            break;
        case "Advanced Search":
            link = '/advsearch'
            break;
        case "Discover":
            link = '/random'
            break;
        default:
            link = '#'
    }
    return link;
}

export default function Nav() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="fixed" sx={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.main
        }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <UnstyledLink to={`/`}>
                        <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1, height: '32px' }} component="img" src={logo} alt="Quocktail Logo" />
                    </UnstyledLink>
                    <UnstyledLink to={`/`}>
                        <Typography
                            variant="h5"
                            color={theme.palette.primary.main}
                            sx={{
                                mr: 2,
                                ml: '15px',
                                display: { xs: "none", md: "flex" },
                                fontFamily: "Gravitas One",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                textDecoration: "none"
                            }}
                        >
                            Quocktail
                        </Typography>
                    </UnstyledLink>

                    {/* Mobile menu */}

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <UnstyledLink to={determineLink(page)} key={page}>
                                        <Typography>{page}</Typography>
                                    </UnstyledLink>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1, height: '32px' }} component="img" src={logo} alt="Quocktail Logo" />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "Gravitas One",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        Quocktail
                    </Typography>

                    {/* Render Desktop Menu */}

                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {pages.map((page) => (
                            <UnstyledLink to={determineLink(page)} key={page}>
                                <NavButton
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2, display: "block", fontSize: {
                                            md: '.97rem', // theme.breakpoints.up('md')
                                            lg: '1.3rem', // theme.breakpoints.up('lg')
                                        },
                                        px: {
                                            md: '.5rem',
                                            lg: '1.7rem',
                                        }
                                    }}
                                >
                                    {page}
                                </NavButton>
                            </UnstyledLink>
                        ))}
                    </Box>

                    {/* Right Avatar Menu */}
                    {/* <Box sx={{ display: { xs: "none", md: "flex" }, mr: 2, width: '32px' }} component="img" src={favoritesEmptyIcon} alt="Favorites Icon" />
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box> */}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
