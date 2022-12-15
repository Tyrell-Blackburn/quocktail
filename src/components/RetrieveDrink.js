import { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';

import useData from './useData';
import Typography from "@mui/material/Typography";
import Ingredient from '../components/Ingredient';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import { theme, Search, SearchIconWrapper, StyledInputBase, RandomButton } from "./StyledComponents";
import SearchIcon from "@mui/icons-material/Search";


import Box from "@mui/material/Box";
import Nav from '../components/Nav';

// https://unsplash.com/photos/Sr3bhcYqftA
import HomeBackground from '../images/home-background.png'

import Paper from '@mui/material/Paper';

const Img = styled('img')({
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

export default function RetrieveDrink({ url, type }) {

    // const [cocktail, setCocktail] = useState(null);
    // const [refreshData, setRefreshData] = useState(false);

    // useEffect(() => {
    //     **    const controller = new AbortController();
    //     **    fetch("/people", **{
    //           signal: controller.signal,
    //         }**)
    //           .then((res) => res.json())
    //           .then(setPeople);
    //     **    return () => controller.abort();
    //     **  }, []);

    const getCocktail = async () => {
        const { data: response } = await axios.get(url);
        return response.drinks[0];
    };

    const query = useQuery(['cocktailData'], () => getCocktail());

    // const loadNewDrink = () => {
    //     fetch(url)
    //         .then((res) => {
    //             console.log(res)
    //             console.log(res.json)
    //             return res.json()
    //         }) 
    //         .then((data) => {
    //             console.log(data);
    //             return data
    //         })

    // };



    // const loadNewDrink = () => {
    //     fetch(url)
    //         .then((res) => res.json())
    //         .catch((error) => console.log(error))
    //         .then((data) => setCocktail(data.drinks[0]))
    //         .catch((error) => console.log(error))
    // };


    // const { cocktail: cocktail } = useQuery([cocktail], () =>
    //     fetch(url).then((res) => res.json())
    // );


    useEffect(() => {
        console.log(query.data)
    }, [query]);

    // useEffect(() => {
    //     getData();
    // }, []);

    // const getData = () => {
    //     console.log('fire')
    //     if (url) {
    //         const controller = new AbortController();
    //         let ignore = false;
    //         fetch(url, { signal: controller.signal })
    //             .then(response => response.json())
    //             .then(json => {
    //                 if (!ignore) {
    //                     setCocktail(json.drinks[0]);
    //                 }
    //             });
    //         return () => {
    //             ignore = true;
    //             controller.abort();
    //         };
    //     }
    // };

    // useEffect(() => {
    //     console.log('useEffect')
    //     fetchData(url);
    //     return () => {
    //         controller.abort();
    //     }
    // }, []);

    // useEffect(() => {
    //     const controller = new AbortController();
    //     console.log('useEffect')
    //     loadNewDrink(controller);
    //     return () => {
    //         controller.abort();
    //     }
    // }, []);


    const titleCase = (str) => {
        return str.toLowerCase().split(' ').map((word) => {
            return word.replace(word[0], word[0].toUpperCase());
        }).join(' ');
    }

    let contentType;

    if (type === 'random') {
        contentType = (
            <>
                <RandomButton color='secondary' sx={{ mr: theme.spacing(2) }} variant="contained" onClick={() => getCocktail}>
                    Click
                </RandomButton>
                <Typography sx={{
                    fontFamily: "Roboto Condensed",
                    textAlign: 'right',
                    fontWeight: 400,
                    letterSpacing: theme.spacing(.1),
                    [theme.breakpoints.down('sm')]: {
                        fontSize: '1rem',
                    }
                }} variant="h4">
                    to discover a new drink!
                </Typography>
            </>
        )
    } else {
        contentType = (
            <>
                <Typography sx={{
                    fontFamily: "Roboto Condensed",
                    textAlign: 'right',
                    fontWeight: 400,
                    letterSpacing: theme.spacing(.1),
                    [theme.breakpoints.down('sm')]: {
                        fontSize: '1rem',
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
            </>
        )
    }

    let instructionsArray;
    let ingredients = [];
    let article = '';

    if (query.status === 'success') {

        // splits instructions by '. ' (sentences) then adds adds back a period to the sentences that were stripped of one.
        instructionsArray = query.data.strInstructions.split(/\.\s/).map(str => !str.endsWith('.') ? str.concat('.') : str);

        // Setting the glass type article to use, "a" or "an"
        const vowels = ['a', 'e', 'i', 'o', 'u'];
        for (let i = 0; i < vowels.length; i++) {
            if (query.data.strGlass.toLowerCase()[0] === vowels[i]) {
                article = 'an';
                break;
            } else {
                article = 'a';
            }
        }

        // Creating ingredients array from object to display ingredients
        let ingredientNumber = 0
        for (let key in query.data) {
            // if key is ingredient and not null
            if (key.startsWith('strIngredient') && query.data[key]) {
                ingredientNumber++;
                // then add it to the array with the measurement
                ingredients.push({ ingredient: titleCase(query.data[key]), measure: query.data[`strMeasure${ingredientNumber}`] })
            }
        }
    }

    return (
        <>
            <Nav />
            <Box sx={{
                color: theme.palette.secondary.main,
                mt: { xs: '56px', sm: '64px', md: '71px', lg: '80px' },
                width: '100%',
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh", // this should be 100vh minus top margin
                background: `
                linear-gradient(rgba(0, 0, 0, .4), rgba(0, 0, 0, .4)),
                url(${HomeBackground})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}>
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    maxWidth: '1536px',
                    display: 'flex',
                    alignItems: "center",
                    flexDirection: 'column',
                    textAlign: 'left'
                }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        my: theme.spacing(10)
                    }}>

                        {contentType}

                    </Box>
                    <Box>
                        {query.status === 'success' ? (
                            <Paper
                                sx={{
                                    p: 6,
                                    maxWidth: '100%',
                                    flexGrow: 1,
                                    mx: '40px',
                                    mb: '40px',
                                    borderRadius: '8px'
                                }}
                            >
                                <Typography sx={{
                                    fontFamily: "Roboto Condensed",
                                    fontWeight: 400,
                                    letterSpacing: theme.spacing(.1),
                                    mb: theme.spacing(4),
                                    [theme.breakpoints.down('sm')]: {
                                        fontSize: '2em',
                                    },
                                }} variant="h2">{query.data.strDrink}</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6} lg={4} >
                                        <Img
                                            sx={{
                                                background: `url({query.data.strDrinkThumb}) no-repeat`,
                                                backgroundSize: 'cover'
                                            }}
                                            alt="drink image"
                                            src={query.data.strDrinkThumb}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={4} >
                                        <Typography gutterBottom variant="h4" component="div">
                                            Ingredients
                                        </Typography>
                                        <Grid2 container spacing={2} sx={{ backgroundColor: '' }}>
                                            {ingredients
                                                ? ingredients.map((ingredient, index) => (
                                                    <Ingredient key={`id${index}`} ingredient={ingredient.ingredient} measure={ingredient.measure} index={index} />))
                                                : ''
                                            }
                                        </Grid2>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={4}>
                                        <Typography gutterBottom variant="h4" component="div">
                                            Instructions
                                        </Typography>
                                        <Typography gutterBottom variant="subtitle1" component="div">
                                            Prepare {article} {query.data.strGlass.toLowerCase()}
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <List>
                                                {instructionsArray.map((el, index) => (
                                                    <ListItem divider key={index}>
                                                        <ListItemText
                                                            primaryTypographyProps={{ variant: 'h6' }}
                                                            secondaryTypographyProps={{ variant: 'body1' }}
                                                            primary={`Step ${index + 1}`}
                                                            secondary={el}
                                                        />
                                                    </ListItem>)
                                                )}
                                            </List>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        ) : ''}
                    </Box>
                </Box>
            </Box >
        </>
    )

}