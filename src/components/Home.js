import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Nav from '../components/Nav';

import HomeFindCocktail from '../components/HomeFindCocktail';
import HomeGridItem from '../components/HomeGridItem';
import HomeCocktailFeed from "../components/HomeCocktailFeed";
import Footer from "../components/Footer";

export default function Home({ allDrinks }) {

    const [latestCocktails, setLatestCocktails] = useState(null);
    const [favoriteCocktails, setfavoriteCocktails] = useState(null);

    const fetchData = (url, setState) => {
        fetch(url)
            .then((res) => {
                if (!res.ok) throw Error('could not fetch the data for that resource');
                return res.json()
            })
            .then((data) => setState(data.drinks))
            .catch((error) => console.log(error));
    }

    // For Newest Cocktails
    useEffect(() => {
        fetchData('https://www.thecocktaildb.com/api/json/v2/9973533/recent.php', setLatestCocktails)
    }, []);

    // For Most Popular
    useEffect(() => {
        fetchData('https://www.thecocktaildb.com/api/json/v2/9973533/popular.php', setfavoriteCocktails)
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
            <HomeFindCocktail allDrinks={allDrinks} />
            <Box sx={{
                width: '100%',
                maxWidth: '1536px',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                <HomeCocktailFeed title="Newest Cocktails" cocktailFeed={latestCocktailsToRender} />
                <HomeCocktailFeed title="Most Popular" cocktailFeed={favoriteCocktailsToRender} />
            </Box>
            <Footer />
        </Box>
    );
}