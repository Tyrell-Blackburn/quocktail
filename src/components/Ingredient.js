import Typography from "@mui/material/Typography";
import Skeleton from '@mui/material/Skeleton';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useState } from "react";

export default function Ingredient({ ingredient, measure, index }) {

    const [imgLoading, setImgLoading] = useState(true);

    const skeleton = <Skeleton variant="rounded" sx={{ height: '100%', minHeight: '100px', width: '100%', minWidth: '100px'}} />

    const img = (
        <img
            onLoad={() => setImgLoading(false)}
            alt={`ingredient ${index + 1}`}
            src={`https://www.thecocktaildb.com/images/ingredients/${ingredient}-small.png`} />
    )

    return (
        <Grid2 item xs={12} sm={6} md={4} lg={4}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
            }}>
            {imgLoading ? skeleton : ''}
            {img}
            <Typography
                sx={{ m: '10px' }}
                variant="body1"
                component="div">{measure} {ingredient}
            </Typography>
        </Grid2>
    )
}