import { useQuery } from '@tanstack/react-query'
import axios from 'axios';

import Spinner from './Spinner';
import Typography from "@mui/material/Typography";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';

import Ingredient from '../components/Ingredient';
import { theme, RandomButton } from "./StyledComponents";
import FindCocktail from "./FindCocktail";

import Box from "@mui/material/Box";
import Nav from '../components/Nav';

import formatInstructions from "../utility/formatInstructions";

// https://unsplash.com/photos/Sr3bhcYqftA
import HomeBackground from '../images/home-background.png'

import Paper from '@mui/material/Paper';
import { useState } from 'react';

const Img = styled('img')({
    borderRadius: '8px',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

export default function RetrieveDrink({ url, type, allDrinks }) {

    const [imgLoading, setImgLoading] = useState(true);
    const skeleton = <Skeleton variant="rounded" sx={{ height: '100%', width: '100%' }} />

    const getCocktail = async (url) => {
        if (url) {
            const { data: response } = await axios.get(url);
            return response.drinks[0];
        }
    };

    const {
        data,
        refetch,
        isLoading,
        isFetching,
        error,
        isError,
        isSuccess } =
        useQuery({
            queryKey: [url],
            queryFn: () => getCocktail(url),
            refetchOnWindowFocus: false,
            // keepPreviousData: true
        });

    const titleCase = (string) => {
        return string.toLowerCase().split(' ').map((word) => {
            return word.replace(word[0], word[0].toUpperCase());
        }).join(' ');
    }

    // useEffect(() => { console.log('isFetching', isFetching, 'isLoading', isLoading) }, [isFetching, isLoading])

    // this variable holds either the random cocktail button components or the find cocktail ones
    let contentType;

    if (type === 'random') {
        contentType = ( // random cocktail button
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center' }}>
                <RandomButton color='secondary' sx={{
                    mr: { xs: theme.spacing(0), sm: theme.spacing(2) },
                    mb: { xs: theme.spacing(4), sm: theme.spacing(0) }
                }}
                    variant="contained" onClick={refetch}>
                    Tap
                </RandomButton>
                <Typography sx={{
                    fontFamily: "Roboto Condensed",
                    fontWeight: 400,
                    letterSpacing: theme.spacing(.1),
                    fontSize: { xs: '1.8rem', sm: '1.8rem', md: '1.8rem' }
                }} variant="h4">
                    to discover a new drink!
                </Typography>
            </Box>
        )
    } else contentType = (
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center' }}>
            <Typography sx={{
                fontFamily: "Roboto Condensed",
                fontWeight: 400,
                letterSpacing: theme.spacing(.1),
                fontSize: { xs: '1.8rem', sm: '1.5rem', md: '1.8rem' },
                mr: { xs: '', sm: theme.spacing(4) },
                mb: { xs: theme.spacing(4), sm: theme.spacing(0) },
            }} variant="h4">Find your poison
            </Typography>
            <FindCocktail allDrinks={allDrinks} />
        </Box>
    )

    let cocktail;

    if (isLoading || isFetching) {
        if (imgLoading === false) setImgLoading(true);
        cocktail = <Spinner loading />
    } else if (isError) cocktail = <Box sx={{ fontSize: '5rem' }}>{error.message}</Box>
    else if (isSuccess) {

        const drinkImg = <Img alt="drink image" src={data.strDrinkThumb} onLoad={() => setImgLoading(false)} />

        let ingredients = [];
        let article = '';
        let instructionsArray = formatInstructions(data.strInstructions)

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

        cocktail = (
            <>
                <Typography sx={{
                    fontFamily: "Roboto Condensed",
                    fontWeight: 400,
                    textAlign: 'left',
                    letterSpacing: theme.spacing(.1),
                    mb: theme.spacing(4),
                    [theme.breakpoints.down('sm')]: {
                        fontSize: '2em',
                    },
                }} variant="h2">{data.strDrink}</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={4} >
                        {imgLoading ? skeleton : ''}
                        {drinkImg}
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} >
                        <Typography gutterBottom variant="h4" component="div">
                            Ingredients
                        </Typography>
                        <Grid2 container spacing={2} sx={{ backgroundColor: '' }}>
                            {ingredients
                                ? ingredients.map((ingredient, index) => (
                                    <Ingredient key={`id${index}`} ingredient={ingredient.ingredient} measure={ingredient.measure} index={index} isLoading={isLoading} />))
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
                                    <>
                                        <ListItem key={index}>
                                            <ListItemText
                                                primaryTypographyProps={{ variant: 'h6' }}
                                                secondaryTypographyProps={{ variant: 'body1' }}
                                                primary={`Step ${index + 1}`}
                                                secondary={data.strInstructions.length < 2 ? 'Combine ingredients.' : el}
                                            />
                                        </ListItem>
                                        {index < instructionsArray.length - 1 ? <Divider  sx={{ mx: '16px' }} /> : ''}
                                    </>
                                )
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
                alignItems: "flex-start",
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
                        justifyContent: 'flex-start',
                        my: { xs: theme.spacing(4), sm: theme.spacing(10) },
                        mx: theme.spacing(4)
                    }}>
                        {/* random button or search field */}
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