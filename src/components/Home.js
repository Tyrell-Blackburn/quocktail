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
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import Image from 'mui-image'

import { PrimaryButton } from "./StyledComponents";
import logo from '../images/logo-quocktail.png';

const pages = [
    "Find a Cocktail",
    "Search by Ingredient",
    "Advanced Search",
    "Discover",
];

const settings = ["Favorites", "Logout"];

export default function Home() {
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
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* <a href="https://www.flaticon.com/free-icons/cocktail" title="cocktail icons">Cocktail icons created by Vitaly Gorbachev - Flaticon</a> */}
                    {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
                    <Image sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} src={logo} height="32px" width="32px" alt="Quocktail Logo" />
                    {/* <img height="32px" sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} src={logo} alt="Quocktail Logo" /> */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            ml: '15px',
                            display: { xs: "none", md: "flex" },
                            fontFamily: "Gravitas One",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        Quocktail
                    </Typography>

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
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
                    {/* <img height="24px" sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} src={logo} alt="Quocktail Logo" /> */}
                    <Image sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} src={logo} height="30px" width="30px" alt="Quocktail Logo" />
                    {/* <Card>
                        <CardMedia
                            component="img"
                            height="24"
                            width="24"
                            image={logo}
                            alt="Quocktail Logo"
                            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                        />
                    </Card> */}
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
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    {/* Right Avatar Menu */}

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
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        // <Box sx={{ flexGrow: 1 }}>
        //   <AppBar position="static">
        //     <Toolbar>
        //       <IconButton
        //         size="large"
        //         edge="start"
        //         color="inherit"
        //         aria-label="menu"
        //         sx={{ mr: 2 }}
        //       >
        //         <MenuIcon />
        //       </IconButton>
        //       <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        //         Quocktail
        //       </Typography>
        //       <PrimaryButton color="inherit">Find a Cocktail</PrimaryButton>
        //       <PrimaryButton color="inherit">Search by Ingredient</PrimaryButton>
        //       <PrimaryButton color="inherit">Advanced Search</PrimaryButton>
        //       <PrimaryButton color="inherit">Discover</PrimaryButton>
        //       <PrimaryButton color="inherit">❤️</PrimaryButton>
        //       <PrimaryButton color="inherit">Log out</PrimaryButton>
        //     </Toolbar>
        //   </AppBar>
        // </Box>
    );
}
