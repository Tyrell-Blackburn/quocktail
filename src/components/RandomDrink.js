import RetrieveDrink from "./RetrieveDrink";

import { useState, useEffect } from "react";

export default function RandomDrink() {
    
    const url = `https://www.thecocktaildb.com/api/json/v2/9973533/random.php`;
    const [cocktail, setCocktail] = useState(null);

    useEffect(() => {
        if (url) {
            let ignore = false;
            fetch(url)
                .then(response => response.json())
                .then(json => {
                    if (!ignore) {
                        setCocktail(json.drinks[0]);
                    }
                });
            return () => {
                ignore = true;
            };
        }
    }, [url]);



    return (
        <>
            <RetrieveDrink cocktail={cocktail} url={url} type={'random'} />
        </>
    )
}
