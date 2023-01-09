import { useEffect, useState } from 'react';
import { useQueries, useQuery } from '@tanstack/react-query'
import axios from 'axios';
import Spinner from './Spinner';
import { titleCase } from '../utility/customMethods';

// https://unsplash.com/photos/Sr3bhcYqftA
import HomeBackground from '../images/home-background.png'
import Nav from './Nav';
import Footer from "./Footer";
import { UnstyledLink } from "./StyledComponents";
import Filter from './Filter';

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';

let filterQueryKeys = [
    'c', // category
    'g', // glass type
    'i' // ingredients
];

export default function AdvSearch({ allDrinks }) {

    const alcoholContentFilter = [{ label: 'Alcoholic', buttonIndex: 0 }, { label: 'Optional Alcohol', buttonIndex: 1 }, { label: 'Non-alcoholic', buttonIndex: 2 }];
    const [selectedAlcoholContent, setSelectedAlcoholContent] = useState([0, 1, 2]);

    // Lists from the API to populate filters
    const [drinkTypeList, setDrinkTypeList] = useState(null);
    const [glassTypeList, setGlassTypeList] = useState(null);
    const [ingredientsList, setIngredientsList] = useState(null);

    // Drinks returned from the API that match selected ingredients
    const [drinksByIngredient, setDrinksByIngredient] = useState(null);

    // Selected filter items
    const [selectedDrinkTypes, setSelectedDrinkTypes] = useState([]);
    const [selectedGlassTypes, setSelectedGlassTypes] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    // drinks that are visible to the user
    const [visibleDrinks, setVisibleDrinks] = useState(null);

    const getData = async (url) => {
        // console.log('fetching data');
        const response = await axios.get(url);
        return response.data.drinks;
    };

    function formatData(data) {

        // if data is fine
        if (Array.isArray(data)) {
            const dataType = Object.keys(data[0])[0]; // drink category, glass type, ingredients
            switch (dataType) {
                case 'strCategory':
                    setDrinkTypeList(data.map(el => el.strCategory))
                    break;
                case 'strGlass':
                    setGlassTypeList(data.map(el => el.strGlass))
                    break;
                case 'strIngredient1':
                    setIngredientsList(data.map(el => el.strIngredient1))
                    break;
                default:
            }
        }
    }

    const filterData = useQueries({
        queries: filterQueryKeys.map(key => {
            return {
                queryKey: [key],
                queryFn: () => getData(`https://www.thecocktaildb.com/api/json/v2/9973533/list.php?${key}=list`),
                refetchOnWindowFocus: false,
                refetchOnMount: true,
                onSuccess: data => formatData(data)
            }
        })
    })

    const setDrinksByIngredientData = (data) => {
        // console.log('fetchedIngredientDrinks', data)
        // if data is an array then data is correct and set state
        if (Array.isArray(data)) {
            const drinksArray = data.map(el => el.strDrink);
            setDrinksByIngredient(drinksArray)
            return
        }

        // set error data here

        // if there is no data and the variable is null or already has data, then set data as empty array
        if (data === 'None Found') {
            setDrinksByIngredient([]);
        }

    }

    const ingredientFilteredDrinks = useQuery({
        queryKey: selectedIngredients,
        queryFn: () => getData(`https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${selectedIngredients.join(',')}`),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        onSuccess: (data) => setDrinksByIngredientData(data)
    })

    // useEffect(() => {
    //     console.log('visibleDrinks', visibleDrinks)
    // }, [visibleDrinks])

    useEffect(() => {
        // console.log('visibleDrinks', visibleDrinks)
    }, [ingredientFilteredDrinks])

    // useEffect(() => {
    //     console.log('filterData', filterData)
    // }, [filterData])

    // useEffect(() => {
    //     console.log('ingredientFilteredDrinks', ingredientFilteredDrinks)
    // }, [ingredientFilteredDrinks])

    // useEffect(() => {
    //     console.log('lists', drinkTypeList, glassTypeList, ingredientsList)
    // }, [drinkTypeList, glassTypeList, ingredientsList])

    // applies filters to drinks
    useEffect(() => {
        // variable holds drinks that are visible after filters are applied
        let newVisibleDrinks = [];

        selectedAlcoholContent.forEach(el => {
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

        // Filter for Drink Types
        if (selectedDrinkTypes.length > 0) {
            newVisibleDrinks = newVisibleDrinks.filter(el => selectedDrinkTypes.includes(el.strCategory))
        }
        // Filter for Glass Types
        if (selectedGlassTypes.length > 0) {
            newVisibleDrinks = newVisibleDrinks.filter(el => selectedGlassTypes.includes(el.strGlass))
        }
        // Filter for Ingredients
        if (selectedIngredients.length > 0 && drinksByIngredient) {
            newVisibleDrinks = newVisibleDrinks.filter(el => drinksByIngredient.includes(el.strDrink))
        }

        setVisibleDrinks(newVisibleDrinks);
    }, [selectedAlcoholContent, allDrinks, selectedDrinkTypes, selectedGlassTypes, selectedIngredients, drinksByIngredient])

    const handleAlcoholContentToggle = (value) => () => {
        const currentIndex = selectedAlcoholContent.indexOf(value); // get the position in the array the button number (value) resides (returns -1 if doesn't exists)
        const newChecked = [...selectedAlcoholContent]; // copy existing button array to mutate it

        // this logic toggles the existence of the button index in the button array
        if (currentIndex === -1) { // if the button index doesn't exist
            newChecked.push(value); // then add it
        } else {
            newChecked.splice(currentIndex, 1); // if it does exist, then remove it
        }
        setSelectedAlcoholContent(newChecked); // set the new button array to be the mutated button array
    };

    // used for displaying ingredients from in JSX return
    const getIngredientsArray = drink => {
        let ingredients = [];
        for (const property in drink) {
            if (property.startsWith('strIngredient') && drink[property]) {
                ingredients.push(titleCase(drink[property]));
            }
        }
        return ingredients;
    }

    const isSearchedIngredient = ingredient => selectedIngredients.includes(ingredient);

    function checkError(data) {

        let error = {
            isError: false,
            message: ''
        }

        for (let i = 0; i < data.length; i++) {
            if (data[i]?.isError) {
                error.isError = true;
                error.message = data[i].error;
                break;
            }
            if (data[i]?.data?.message?.includes('timeout')) {
                error.isError = true;
                error.message = 'Timeout fetching data';
                break;
            }
            if (data[i]?.data?.message?.includes('Network Error')) {
                error.isError = true;
                error.message = 'A network error occured';
                break;
            }
        }
        return error;
    }

    const checkLoading = (data) => data.some(data => data.isLoading);

    const filtersIsError = checkError(filterData);
    const filtersIsLoading = checkLoading(filterData);

    const resultsPromp = (
        selectedAlcoholContent.length === 0 ? <Box>To get started, select an Alcohol Content filter.</Box> :
        visibleDrinks === null ? (
                <Box>
                    <Box>Loading Drinks</Box>
                    <Spinner loading />
                </Box>
            ) :
        visibleDrinks ? `${visibleDrinks.length} drinks found.` : '' // X drinks found
    )

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundColor: '#e7ecef',
            background: `linear-gradient(rgba(0, 0, 0, .4), rgba(0, 0, 0, .4)), url(${HomeBackground})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',

        }}>
            <Nav />
            <Box sx={{
                color: 'inherit',
                mt: { xs: '56px', sm: '64px', md: '71px', lg: '80px' },
                width: '100%',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                minHeight: '100vh',
                height: '100%'
            }}>

                {/*
                xs: 0,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1536,
                xxl: 2000
                */}

                {/* Alcohol Content Filter */}

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    bgcolor: 'white',
                    minWidth: { sm: '100%', md: '300px' },
                    position: { md: 'sticky' },
                    top: { md: '71px', lg: '80px' } // used only with position: sticky
                }}>
                    <Typography sx={{ py: '2rem' }} component="div" variant="h4">
                        Filters
                    </Typography>
                    <Typography component="div" variant="h6">
                        Alcohol Content
                    </Typography>
                    <List >
                        {alcoholContentFilter.map(({ label, buttonIndex }) => {
                            return (
                                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                    <ListItem
                                        key={buttonIndex}
                                        disablePadding
                                    >
                                        <ListItemButton sx={{ color: 'inherit' }} role={undefined} onClick={handleAlcoholContentToggle(buttonIndex)} dense>
                                            <Checkbox
                                                edge="start"
                                                checked={selectedAlcoholContent.indexOf(buttonIndex) !== -1}
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{ 'aria-labelledby': label }}
                                            />
                                            <ListItemText id={label} primary={label} />
                                        </ListItemButton>
                                    </ListItem>
                                </Box>
                            );
                        })}
                    </List>

                    {/* Other filters */}
                    {
                        filtersIsLoading ? (
                            <>
                                <Box>Loading Filters</Box>
                                <Spinner loading />
                            </>
                        )
                            : filtersIsError.isError ? <Box>{filtersIsError.message}</Box>
                                : drinkTypeList && glassTypeList && ingredientsList ? (
                                    <>
                                        <Filter title={'Drink Type'} sourceList={drinkTypeList} setter={setSelectedDrinkTypes} />
                                        <Filter title={'Glass Type'} sourceList={glassTypeList} setter={setSelectedGlassTypes} />
                                        <Filter title={'Ingredients'} sourceList={ingredientsList} setter={setSelectedIngredients} />
                                    </>
                                ) : (
                                    <>
                                        Loading Filters
                                        <Spinner loading />
                                    </>
                                )
                    }
                </Box>

                {/* Results */}

                <Box sx={{ bgcolor: 'white', minHeight: '100vh', height: '100%', width: '100%' }}>
                    <Typography sx={{ py: '2rem', textAlign: 'center' }} component="div" variant="h5">
                        {resultsPromp}
                    </Typography>
                    <Grid container>
                        {visibleDrinks?.map((drink) => (
                            <Grid item xs={12} lg={6} xl={6} xxl={4} key={drink.idDrink} >
                                <Box sx={{ p: 1 }} >
                                    {/* This currently isn't working. Need to figure out how to nest a link inside a link */}
                                    <Card sx={{ display: 'flex', bgcolor: '' }}>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 100 }}
                                            image={drink.strDrinkThumb}
                                            alt={drink.strDrink}
                                        />
                                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                            <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <UnstyledLink to={`/search/${drink.idDrink}`}>
                                                    <Typography component="div" variant="h5">
                                                        {drink.strDrink}
                                                    </Typography>
                                                </UnstyledLink>
                                                <UnstyledLink target="_blank" rel="noopener noreferrer" to={`/search/${drink.idDrink}`}>
                                                    <OpenInNewIcon />
                                                </UnstyledLink>
                                            </CardContent>
                                            <CardContent>
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    {/* Assign green color if ingredient select, red if not
                                                Redo this code when I add more filters */}
                                                    {getIngredientsArray(drink).map((el, index, array) => (
                                                        <Box key={index} component="span" sx={{
                                                            color: isSearchedIngredient(el)
                                                                ? 'violet'
                                                                : 'inherit',
                                                        }}>
                                                            {el}{index < array.length - 1 ? <Box component={'span'} sx={{ color: 'black' }}>, </Box> : ''}
                                                        </Box>
                                                    ))}
                                                </Typography>
                                            </CardContent>
                                        </Box>
                                    </Card>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
            <Footer />
        </Box >
    );
}