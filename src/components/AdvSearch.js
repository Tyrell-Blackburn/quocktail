
import { useEffect, useState } from 'react';
import { useQueries, useQuery } from '@tanstack/react-query'
import axios from 'axios';

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
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

let filterQueryKeys = [
    'c', // category
    'g', // glass type
    'i' // ingredients
];

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function AdvSearch({ allDrinks }) {

    const alcoholContentFilter = [{ label: 'Alcoholic', buttonIndex: 0 }, { label: 'Optional Alcohol', buttonIndex: 1 }, { label: 'Non-alcoholic', buttonIndex: 2 }];
    const [selectedAlcoholContent, setSelectedAlcoholContent] = useState([]);

    // For ingredients search
    const [selectedValue, setSelectedValue] = useState(''); // value selected by user
    const [typedValue, setTypedValue] = useState(''); // value typed by user

    // Lists from the API to populate filters
    const [categoryList, setCategoryList] = useState(null);
    const [glassTypeList, setGlassTypeList] = useState(null);
    const [ingredientsList, setIngredientsList] = useState(null);

    // Drinks by ingredient from the API
    const [drinksByIngredient, setDrinksByIngredient] = useState(null);

    // Selected filter items
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedGlassTypes, setSelectedGlassTypes] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    const [loading, setLoading] = useState(true); // bool
    const [error, setError] = useState(null); // string
    const [visibleDrinks, setVisibleDrinks] = useState([]);

    const getData = async (url) => {
        console.log('fetching data');
        const response = await axios.get(url);
        return response.data.drinks;
    };

    const filterData = useQueries({
        queries: filterQueryKeys.map(key => {
            return {
                queryKey: [key],
                queryFn: () => getData(`https://www.thecocktaildb.com/api/json/v2/9973533/list.php?${key}=list`),
                refetchOnWindowFocus: false,
                refetchOnMount: false
            }
        })
    })

    const setDrinksByIngredientData = (data) => {
        console.log(data)
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
            return
        }

    }

    const ingredientFilteredDrinks = useQuery({
        queryKey: selectedIngredients,
        queryFn: () => getData(`https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${selectedIngredients.join(',')}`),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        onSuccess: (data) => setDrinksByIngredientData(data)
    })
    
    useEffect(() => {
        console.log('selectedValue', selectedValue);
    }, [selectedValue])
    
    useEffect(() => {
        console.log('ingredientsList', ingredientsList);
    }, [ingredientsList])

    useEffect(() => {
        // console.log(ingredientFilteredDrinks.isFetching, ingredientFilteredDrinks.isLoading, ingredientFilteredDrinks.status, ingredientFilteredDrinks.data);
    }, [ingredientFilteredDrinks])

    useEffect(() => {
        console.log('visibleDrinks', visibleDrinks)
    }, [visibleDrinks])

    useEffect(() => {
        console.log('drinksByIngredient', drinksByIngredient)
    }, [drinksByIngredient])

    useEffect(() => {

        let canSetData = false;
        let loading = false;
        let error = null;

        // check for errors and loading
        // checking if it's loading, has an error, or if the data was loaded with an array or not
        for (let i = 0; i < filterData.length; i++) {
            if (filterData[i].data) {
                if (Array.isArray(filterData[i].data)) {
                    canSetData = true;
                } else {
                    canSetData = false;
                    break;
                }
            }

            if (filterData[i].isError) {
                error = filterData[i].error;
                break;
            } else if (filterData[i].isLoading) {
                loading = true;
                break;
            } else if (filterData[i].data) {
                if (filterData[i].data.message === 'timeout of 6000ms exceeded') {
                    error = 'Timeout fetching data';
                    break;
                } else if (filterData[i].data.message === 'Network Error') {
                    error = 'A network error occured';
                    break;
                }
            }
        }

        setLoading(loading)
        setError(error);

        // If all three are okay, then data can be set
        if (!loading && !error && canSetData && !categoryList && !glassTypeList && !ingredientsList) {
            filterData.forEach(el => {
                const dataType = Object.keys(el.data[0])[0]; // drink category, glass type, ingredients
                switch (dataType) {
                    case 'strCategory':
                        setCategoryList(el.data.map(el => el.strCategory))
                        break;
                    case 'strGlass':
                        setGlassTypeList(el.data.map(el => el.strGlass))
                        break;
                    case 'strIngredient1':
                        setIngredientsList(el.data.map(el => el.strIngredient1))
                        break;
                    default:
                }
            })
        }
    }, [filterData, categoryList, glassTypeList, ingredientsList])

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
        if (selectedCategories.length > 0) {
            newVisibleDrinks = newVisibleDrinks.filter(el => selectedCategories.includes(el.strCategory))
        }
        // Filter for Glass Types
        if (selectedGlassTypes.length > 0) {
            newVisibleDrinks = newVisibleDrinks.filter(el => selectedGlassTypes.includes(el.strGlass))
        }
        // Filter for Ingredients
        if (selectedIngredients.length > 0) {
            newVisibleDrinks = newVisibleDrinks.filter(el => drinksByIngredient.includes(el.strDrink))
        }

        setVisibleDrinks(newVisibleDrinks);
    }, [selectedAlcoholContent, allDrinks, selectedCategories, selectedGlassTypes, selectedIngredients, drinksByIngredient])

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
                color: 'inherit',
                mt: { xs: '56px', sm: '64px', md: '71px', lg: '80px' },
                width: '100%',
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                height: "100vh",
                background: `
                linear-gradient(rgba(0, 0, 0, .4), rgba(0, 0, 0, .4)),
                url(${HomeBackground})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
            }}>

                {/* Alcohol Content Filter */}

                <Box sx={{ background: 'orange', height: '100%', minWidth: '300px', maxWidth: '400px' }}>
                    <Typography component="div" variant="h4">
                        Filter by:
                    </Typography>
                    <Typography component="div" variant="h6">
                        Alcohol Content
                    </Typography>
                    <List sx={{ width: '100%', bgcolor: 'white' }}>
                        {alcoholContentFilter.map(({ label, buttonIndex }) => {
                            return (
                                <ListItem
                                    key={buttonIndex}
                                    disablePadding
                                >
                                    <ListItemButton sx={{ color: '' }} role={undefined} onClick={handleAlcoholContentToggle(buttonIndex)} dense>
                                        <Checkbox
                                            edge="start"
                                            checked={selectedAlcoholContent.indexOf(buttonIndex) !== -1} // if the button's index exists in the button array, then check it
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

                    {/* Other filters */}
                    {
                        loading ? <Box>'Loading'</Box>
                            : error ? <Box>{error}</Box>
                                : categoryList && glassTypeList && ingredientsList ? (
                                    <>
                                        <Filter
                                            title='Added Drink Types'
                                            type='delete'
                                            sourceList={selectedCategories}
                                            fromSetter={setSelectedCategories}
                                            toSetter={setCategoryList}
                                        />

                                        <Filter
                                            title="Drink Types"
                                            type='add'
                                            sourceList={categoryList}
                                            fromSetter={setCategoryList}
                                            toSetter={setSelectedCategories}
                                        />

                                        <Filter
                                            title='Added Glass Types'
                                            type='delete'
                                            sourceList={selectedGlassTypes}
                                            fromSetter={setSelectedGlassTypes}
                                            toSetter={setGlassTypeList}
                                        />

                                        <Filter
                                            title="Glass Types"
                                            type='add'
                                            sourceList={glassTypeList}
                                            fromSetter={setGlassTypeList}
                                            toSetter={setSelectedGlassTypes}
                                        />
                                        {/* Add a drop down here to search for and select ingredients */}
                                        <Typography component="div" variant="h6">
                                            Ingredients
                                        </Typography>

                                        <Autocomplete
                                            clearOnEscape
                                            disableCloseOnSelect
                                            autoHighlight
                                            clearOnBlur // not sure what this does
                                            multiple
                                            options={ingredientsList}
                                            onChange={(event, selectedValue) => setSelectedIngredients(selectedValue)}
                                            renderOption={(props, option, { selected }) => (
                                                <li {...props}>
                                                    <Checkbox
                                                        icon={icon}
                                                        checkedIcon={checkedIcon}
                                                        style={{ marginRight: 8 }}
                                                        checked={selected}
                                                    />
                                                    {option}
                                                </li>
                                            )}
                                            renderInput={(params) => (
                                                <TextField {...params} hiddenLabel label="Select ingredients"/>
                                            )}
                                        />
                                    </>
                                ) : ''
                    }

                </Box>

                {/* Results */}

                <Box sx={{ bgcolor: 'white', height: '100%', width: '70%', overflow: "scroll" }}>
                    <Typography component="div" variant="h5">
                        {visibleDrinks.length === 0 ? 'To see results, first add an \'Alcohol Content\' filter, then refine using the filters below this.' : `${visibleDrinks.length} drinks found.`}
                    </Typography>
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
                                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                            <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography component="div" variant="h5">
                                                    {drink.strDrink}
                                                </Typography>
                                                <UnstyledLink to={`/search/${drink.idDrink}`} target="_blank" rel="noopener noreferrer"><OpenInNewIcon /></UnstyledLink>
                                            </CardContent>
                                            <CardContent sx={{ pt: 0 }}>
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    {/* Assign green color if ingredient select, red if not
                                                Redo this code when I add more filters */}
                                                    {getIngredientsArray(drink).map((el, index, array) => (
                                                        <Box component="span" sx={{
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