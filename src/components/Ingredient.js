import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export default function Ingredient({ ingredient, measure, index }) {

    return (
        <Grid2 item xs={12} sm={6} md={4} lg={4}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
            }}>
            <img
                alt={`ingredient ${index + 1}`}
                src={`https://www.thecocktaildb.com/images/ingredients/${ingredient}-small.png`} />
            <Typography
                sx={{ m: '10px' }}
                variant="body1"
                component="div">{measure} {ingredient}</Typography>
        </Grid2>
    )
}