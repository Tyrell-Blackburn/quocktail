import Typography from "@mui/material/Typography";
import { theme, Search, SearchIconWrapper, StyledInputBase, StyledTextInput } from "./StyledComponents";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from "react";

import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { ConstructionOutlined } from "@mui/icons-material";

export default function FindCocktail({ onHome, allDrinks }) {
    console.log(allDrinks);
    const navigate = useNavigate();

    // value selected by user from autofill options
    const [selectedValue, setSelectedValue] = useState('');
    // value typed by user into search
    const [typedValue, setTypedValue] = useState('');

    const [searchData, setSearchData] = useState(allDrinks);
    const [searchError, setSearchError] = useState(false);
    console.log(allDrinks);

    // useEffect(() => {
    //     const controller = new AbortController();
    //     fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?a=Alcoholic`, { signal: controller.signal })
    //         .then((res) => res.json())
    //         .catch((error) => console.log(error))
    //         .then((data) => setSearchData(data.drinks))
    //         .catch((error) => console.log(error));
    //     return () => {
    //         controller.abort();
    //     }
    // }, [])

    // navigation logic after a cocktail is selected in search field 
    if (selectedValue) {
        console.log(selectedValue);
        setSearchError(false);
        if (selectedValue === '') setSearchError(true);

        const chosenDrink = allDrinks.filter(el => {
            return el.strDrink.toLowerCase() === selectedValue.toLowerCase();
        })
        const id = chosenDrink[0].idDrink;

        if (id) navigate(`/search/${id}`);        
    }

    const handleClick = (e) => {
        console.log(e.target.value);
    }

    // when pressing enter on the search field
    const handleSubmit = e => {
        e.preventDefault();
        setSearchError(false);

        console.log(typedValue);
    
        // pull out drink from database based on typed text
        const chosenDrink = allDrinks.filter(el => {
            return el.strDrink.toLowerCase() === typedValue.toLowerCase();
        })
        console.log(chosenDrink);

        // get drink ID and navigate to URL
        if (chosenDrink.length > 0) {
            const id = chosenDrink[0].idDrink;
            if (id) navigate(`/search/${id}`);
        } else {
            // set error as it means the search string did not match anything in the database
            setSearchError(true); 
        } 
    }

    const handleTypedValue = (newValue) => {
        console.log('typing')
        setSearchError(false);
        setTypedValue(newValue);
    }

    let options;

    if (allDrinks) {
        options = allDrinks.map((el) => {
            return el.strDrink;
        })
    }

    return (
        <>
            <Typography sx={{
                fontFamily: "Roboto Condensed",
                fontWeight: 400,
                letterSpacing: theme.spacing(.1),
                textAlign: 'right',
                [theme.breakpoints.down('sm')]: {
                    fontSize: '1.3rem',
                },
            }} variant="h4">Find your poison</Typography>
            <Box sx={{
                mt: onHome ? theme.spacing(2) : '',
                marginLeft: onHome ? '' : theme.spacing(4),
                position: "relative",
                borderRadius: '8px',
                backgroundColor: alpha(theme.palette.common.white, 0.85),
                "&:hover": {
                    backgroundColor: alpha(theme.palette.common.white, 0.95)
                },
                width: "auto"
            }}>
                <form
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}>
                    {/* <SearchIconWrapper>
                        <SearchIcon color='secondary' fontSize="large" />
                    </SearchIconWrapper> */}
                    <Autocomplete
                        // value selected from drop down
                        // value={selectedValue}
                        onChange={(event, newValue) => setSelectedValue(newValue)}

                        // value typed by user
                        inputValue={typedValue}
                        onInputChange={(event, newInputValue) => handleTypedValue(newInputValue)}

                        disablePortal
                        id="combo-box-demo"
                        options={options}
                        sx={{ width: 300 }}
                        onClick={e => handleClick()}
                        renderInput={(params) => <TextField
                            autoFocus
                            fullWidth
                            hiddenLabel
                            error={searchError}
                            // onClick={e => handleClick()}
                            // onChange={e => setSearch(e.target.value)}
                            placeholder="Search for a cocktail"
                            type="text"
                            InputLabelProps={{ shrink: true }}
                            {...params}
                        />}
                    />
                </form>
            </Box>
        </>
    )
}

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
