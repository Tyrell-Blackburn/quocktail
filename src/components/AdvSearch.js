
import { useEffect, useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query'

import { titleCase } from '../utility/customMethods';

// https://unsplash.com/photos/Sr3bhcYqftA
import HomeBackground from '../images/home-background.png'
import Nav from './Nav';
import Footer from "./Footer";

import { theme } from "./StyledComponents";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import InfoIcon from '@mui/icons-material/Info';

import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Ingredient from './Ingredient';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
}));


export default function AdvSearch({ alcoholDrinks, optionalAlcoholDrinks, noAlcoholDrinks, allDrinks }) {
    const theme = useTheme();

    const alcoholContentFilter = [{ label: 'Alcoholic', buttonIndex: 0 }, { label: 'Optional Alcohol', buttonIndex: 1 }, { label: 'Non-alcoholic', buttonIndex: 2 }];
    const [alcoholContentChecked, setAlcoholContentChecked] = useState([]);
    const [visibleDrinks, setVisibleDrinks] = useState([]);

    useEffect(() => {
        // calculate visible drinks
        let newVisibleDrinks = [];


        alcoholContentChecked.forEach(el => {
            switch (el) {
                case 0:
                    newVisibleDrinks = [...newVisibleDrinks, ...allDrinks.filter(el => el.strAlcoholic === 'Alcoholic')];
                    break;
                case 1:
                    newVisibleDrinks = [...newVisibleDrinks, ...allDrinks.filter(el => el.strAlcoholic === 'Optional alcohol')];
                    break;
                case 2:
                    newVisibleDrinks = [...newVisibleDrinks, ...allDrinks.filter(el => el.strAlcoholic === 'Non alcoholic')];
                    break;
                default:
            }
        })
        setVisibleDrinks(newVisibleDrinks);
    }, [alcoholContentChecked, allDrinks])

    useEffect(() => {
        console.log('visibleDrinks', visibleDrinks)
    }, [visibleDrinks])

    const handleAlcoholContentToggle = (value) => () => {
        const currentIndex = alcoholContentChecked.indexOf(value); // get the position in the array the button number (value) resides (returns -1 if doesn't exists)
        const newChecked = [...alcoholContentChecked]; // copy existing button array to mutate it

        // this logic toggles the existence of the button index in the button array
        if (currentIndex === -1) { // if the button index doesn't exist
            newChecked.push(value); // then add it
        } else {
            newChecked.splice(currentIndex, 1); // if it does exist, then remove it
        }
        setAlcoholContentChecked(newChecked); // set the new button array to be the mutated button array
    };

    const getIngredientsArray = (drink) => {
        let ingredients = [];

        for (const property in drink) {
            if (property.startsWith('strIngredient') && drink[property]) {
                ingredients.push(titleCase(drink[property]));
            }
        }

        return ingredients;
    }

    const isSearchedIngredient = ingredient => {
        // write logic to compare with selected ingredients here
        return true;
    }


    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundColor: '#e7ecef',

        }}>
            <Nav />
            <Box sx={{
                color: theme.palette.secondary.main,
                mt: { xs: '56px', sm: '64px', md: '71px', lg: '80px' },
                width: '100%',
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "80vh",
                background: `
                linear-gradient(rgba(0, 0, 0, .4), rgba(0, 0, 0, .4)),
                url(${HomeBackground})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
            }}>

                {/* Alcohol Content Filter */}

                <Box sx={{ background: 'blue', height: '100%', minWidth: '300px' }}>
                    <List sx={{ width: '100%', bgcolor: 'white' }}>
                        {alcoholContentFilter.map(({ label, buttonIndex }) => {
                            return (
                                <ListItem
                                    key={buttonIndex}
                                    disablePadding
                                >
                                    <ListItemButton sx={{ color: 'red' }} role={undefined} onClick={handleAlcoholContentToggle(buttonIndex)} dense>
                                        <Checkbox
                                            edge="start"
                                            checked={alcoholContentChecked.indexOf(buttonIndex) !== -1} // if the button's index exists in the button array, then check it
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': label }}
                                        />
                                        <ListItemText id={label} primary={label} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </Box>

                {/* Results */}

                <Box sx={{ bgcolor: 'white', height: '100%', width: '70%', overflow: "scroll" }}>
                    <Grid container spacing={0} >
                        {visibleDrinks.map((drink) => (

                            <Grid item xs={12} sm={12} md={6} key={drink.idDrink}>
                                <Box sx={{ p: 2, bgcolor: 'white' }} >
                                    <Card sx={{ display: 'flex', bgcolor: '' }}>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 100 }}
                                            image={drink.strDrinkThumb}
                                            alt={drink.strDrink}
                                        />
                                        <CardContent>
                                            <Typography component="div" variant="h5">
                                                {drink.strDrink}
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                                {getIngredientsArray(drink).map(el => (
                                                    isSearchedIngredient(el)
                                                        ? <Box component="span" sx={{ color: 'green' }}>{el}, </Box>
                                                        : <Box component="span" sx={{ color: 'red' }}>{el}, </Box>
                                                ))}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>

                    {/* <ImageList sx={{ height: '100%' }} cols={4} gap={8} >
                        {visibleDrinks.map((drink) => (
                            <ImageListItem key={drink.idDrink} >
                                <img
                                    src={drink.strDrinkThumb}
                                    srcSet={drink.strDrinkThumb}
                                    alt={drink.strDrink}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    title={drink.strDrink}
                                    subtitle={drink.strDrink}
                                    actionIcon={
                                        <IconButton
                                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                            aria-label={`info about ${drink.strDrink}`}
                                        >
                                            <InfoIcon />
                                        </IconButton>
                                    }
                                />
                            </ImageListItem>
                        ))}
                    </ImageList> */}

                    {/* {visibleDrinks.map((drink) => (
                        <Card sx={{ display: 'flex', bgcolor: '' }}>
                            <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image={drink.strDrinkThumb}
                                alt="Live from space album cover"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        Live From Space
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Mac Miller
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Card>
                    ))} */}

                </Box>
            </Box>
            <Footer />
        </Box>
    );
}