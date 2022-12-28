import { useEffect } from "react";
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';

import Spinner from './Spinner';
import Typography from "@mui/material/Typography";
import Ingredient from '../components/Ingredient';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import { theme, RandomButton } from "./StyledComponents";
import FindCocktail from "./FindCocktail";

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
    console.log(url)

    const getCocktail = async () => {
        const { data: response } = await axios.get(url);
        return response.drinks[0];
    };

    const refreshCocktail = () => {
        refetch();
    }

    const { data, refetch, fetchStatus, isLoading, error, isError, isSuccess } = useQuery(['data'], () => getCocktail(), { refetchOnWindowFocus: false });

    useEffect(() => {
        console.log('isLoading', isLoading, 'fetchStatus', fetchStatus)
    }, [isLoading, fetchStatus]);

    useEffect(() => {
        console.log(data)
    }, [data]);

    const titleCase = (string) => {
        return string.toLowerCase().split(' ').map((word) => {
            return word.replace(word[0], word[0].toUpperCase());
        }).join(' ');
    }

    // this variable holds either the random cocktail button components or the find cocktail ones
    let contentType;

    if (type === 'random') {
        contentType = ( // random cocktail button
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                my: theme.spacing(10)
            }}>
                <RandomButton color='secondary' sx={{ mr: theme.spacing(2) }} variant="contained" onClick={refreshCocktail}>
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
            </Box>
        )
    } else contentType = <FindCocktail sx={{ flexDirection: 'column' }} />

    let instructionsArray;
    let ingredients = [];
    let article = '';
    let cocktail;

    if (isLoading || fetchStatus === 'fetching') cocktail = <Spinner loading />
    else if (isError) cocktail = <Box sx={{ fontSize: '5rem' }}>{error.message}</Box>
    else if (isSuccess) {

        // splits instructions by '. ' (sentences) then adds adds back a period to the sentences that were stripped of one.
        instructionsArray = data.strInstructions.split(/\.\s/).map(str => !str.endsWith('.') ? str.concat('.') : str);

        // Setting the glass type article to use, "a" or "an"
        const vowels = ['a', 'e', 'i', 'o', 'u'];
        for (let i = 0; i < vowels.length; i++) {
            if (data.strGlass.toLowerCase()[0] === vowels[i]) {
                article = 'an';
                break;
            } else {
                article = 'a';
            }
        }

        // Creating ingredients array from object to display ingredients
        let ingredientNumber = 0
        for (let key in data) {
            // if key is ingredient and not null
            if (key.startsWith('strIngredient') && data[key]) {
                ingredientNumber++;
                // then add it to the array with the measurement
                ingredients.push({ ingredient: titleCase(data[key]), measure: data[`strMeasure${ingredientNumber}`] })
            }
        }

        // setting up options object
        // const option = data

        // });

        cocktail = (
            <>
                <Typography sx={{
                    fontFamily: "Roboto Condensed",
                    fontWeight: 400,
                    letterSpacing: theme.spacing(.1),
                    mb: theme.spacing(4),
                    [theme.breakpoints.down('sm')]: {
                        fontSize: '2em',
                    },
                }} variant="h2">{data.strDrink}</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={4} >
                        <Img alt="drink image" src={data.strDrinkThumb} />
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
                            Prepare {article} {data.strGlass.toLowerCase()}
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
            </>
        )
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
                    justifyContent: 'flex-end',
                    flexDirection: 'column',
                    textAlign: 'center'
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        my: theme.spacing(10),
                        mx: theme.spacing(4)
                    }}>

                        {contentType}

                    </Box>
                    <Box>
                        {url ?
                            <Paper
                                sx={{
                                    p: 6,
                                    maxWidth: '100%',
                                    flexGrow: 1,
                                    mx: '40px',
                                    mb: '40px',
                                    borderRadius: '8px'
                                }}>
                                {cocktail}
                            </Paper>
                            : ''
                        }
                    </Box>
                </Box>
            </Box >
        </>
    )

}