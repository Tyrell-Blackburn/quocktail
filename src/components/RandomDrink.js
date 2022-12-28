import RetrieveDrink from "./RetrieveDrink";

export default function RandomDrink() {
    
    const url = `https://www.thecocktaildb.com/api/json/v2/9973533/random.php`;


    return (
        <>
            <RetrieveDrink url={url} type={'random'} />
        </>
    )
}
