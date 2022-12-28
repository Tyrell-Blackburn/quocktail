import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Nav from './Nav';

import HomeFindCocktail from './HomeFindCocktail';
import HomeGridItem from './HomeGridItem';
import HomeCocktailFeed from "./HomeCocktailFeed";
import Footer from "./Footer";

export default function AdvSearch() {

    const [latestCocktails, setLatestCocktails] = useState(null);
    const [favoriteCocktails, setfavoriteCocktails] = useState(null);

    // For Newest Cocktails
    useEffect(() => {
        fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/recent.php`)
            .then((res) => res.json())
            .catch((error) => console.log(error))
            .then((data) => setLatestCocktails(data.drinks))
            .catch((error) => console.log(error));
    }, []);

    // For Most Popular
    useEffect(() => {
        fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/popular.php`)
            .then((res) => res.json())
            .catch((error) => console.log(error))
            .then((data) => setfavoriteCocktails(data.drinks))
            .catch((error) => console.log(error));
    }, []);


    const renderCocktails = cocktailsToRender => {
        const gridItems = cocktailsToRender.map((cocktail, index) => {
                if (index > 5) return ''
                return <HomeGridItem key={cocktail.idDrink} cocktail={cocktail} />
            })
        return gridItems;
    }

    let latestCocktailsToRender;
    if (latestCocktails) {
        latestCocktailsToRender = renderCocktails(latestCocktails);
    }

    let favoriteCocktailsToRender;
    if (favoriteCocktails) {
        favoriteCocktailsToRender = renderCocktails(favoriteCocktails);
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
            <HomeFindCocktail />
            <Box sx={{
                width: '100%',
                maxWidth: '1536px',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                <HomeCocktailFeed title="Newest Cocktails" cocktailFeed={latestCocktailsToRender} />
                <HomeCocktailFeed title="Most Popular" cocktailFeed={favoriteCocktailsToRender} />
                <Footer />
            </Box>
        </Box>
    );
}