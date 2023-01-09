import { useParams } from "react-router-dom";
import RetrieveDrink from "./RetrieveDrink";

export default function Search({ allDrinks }) {

    const { id } = useParams();

    let url = '';

    if (id) {
        url = `https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${id}`;
    }

    return <RetrieveDrink url={url} allDrinks={allDrinks} />
}

