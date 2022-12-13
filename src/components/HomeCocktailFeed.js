import Typography from "@mui/material/Typography";
import { theme } from "./StyledComponents";
import Grid from '@mui/material/Unstable_Grid2';


export default function HomeCocktailFeed({ title, cocktailFeed }) {
    return (
        <>
            <Typography sx={{
                fontFamily: "Roboto Condensed",
                fontWeight: 400,
                letterSpacing: theme.spacing(.4),
                my: theme.spacing(10),
            }} variant="h3">{title}</Typography>
            <Grid container spacing={{ xs: 2, sm: 3, md: 4, lg: 6 }} sx={{ px: 5 }}>
                {cocktailFeed}
            </Grid>
        </>
    )
}
