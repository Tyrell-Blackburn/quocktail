import { theme } from "./StyledComponents";
import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from "react";

import { titleCase } from "../utility/customMethods";

import { useNavigate } from 'react-router-dom';

export default function FindCocktail({ onHome, allDrinks }) {

    const navigate = useNavigate();

    const [selectedValue, setSelectedValue] = useState(''); // value selected by user
    const [typedValue, setTypedValue] = useState(''); // value typed by user
    const [searchError, setSearchError] = useState(false);

    // navigation logic after a cocktail is selected in search field 
    if (selectedValue) {
        setSearchError(false);
        if (selectedValue === '') setSearchError(true); // if nothing is selected throw error

        const chosenDrink = allDrinks.filter(el => {
            return el.strDrink.toLowerCase() === selectedValue.toLowerCase()
        })
        const id = chosenDrink[0].idDrink;

        if (id) {
            navigate(`/search/${id}`);
            setSelectedValue('');
        }
    }

    // when pressing enter on the search field
    const submitIngredientOnEnter = e => {
        e.preventDefault();
        const capitalTypedValued = titleCase(typedValue);

        // pull out drink from database based on typed text
        const chosenDrink = allDrinks.filter(el => {
            return el.strDrink === capitalTypedValued
        })

        // get drink ID and navigate to URL
        if (chosenDrink.length > 0) {
            const id = chosenDrink[0].idDrink;
            if (id) navigate(`/search/${id}`);
            return;
        }

        // throw error when search string does not match drink in database
        setSearchError(true);
    }

    const handleTypedValue = (event, newValue) => {
        // I'm trying to make it so that when you select a drink from the drop down, it loads as normal, but resets the text field to ''. I'm trying to only set the typed value if it's a click event, not a changed one
        // also if user presses back, the search box should change to the text of the previous drink
        // console.log(event);
        // if (event.type === 'change') {
        setSearchError(false);
        setTypedValue(newValue);
        // }
    }

    let options;

    if (allDrinks) {
        options = allDrinks.map(el => el.strDrink);
    }

    return (
        <Box sx={{
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
                onSubmit={submitIngredientOnEnter}>
                <Autocomplete
                    onChange={(event, newValue) => setSelectedValue(newValue)}
                    // value typed by user
                    inputValue={typedValue}
                    onInputChange={(event, newInputValue) => handleTypedValue(event, newInputValue)}
                    blurOnSelect
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    sx={{ width: 316 }}
                    renderInput={(params) => <TextField
                        hiddenLabel
                        error={searchError}
                        placeholder="Search for a cocktail"
                        type="text"
                        InputLabelProps={{ shrink: true }}
                        {...params}
                    />}
                />
            </form>
        </Box>
    )
}