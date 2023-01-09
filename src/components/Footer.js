import Box from "@mui/material/Box";
import Link from '@mui/material/Link';
import Typography from "@mui/material/Typography";
import { theme } from "./StyledComponents";

export default function Footer() {
    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            bgcolor: theme.palette.secondary.main,
            color: theme.palette.primary.main
        }}>

            <Typography sx={{ p: '40px' }} varient='h3'>
                Copyright © 2023&nbsp;
                <Link underline="hover" rel="noopener" target="_blank" href="https://www.tyrellblackburn.com/">
                    Tyrell Blackburn
                </Link>
                . All Rights Reserved. Powered by&nbsp;
                <Link underline="hover" rel="noopener" target="_blank" href="https://www.thecocktaildb.com/">
                    TheCocktailDB
                </Link>.&nbsp;Logo created by&nbsp;
                <Link title="cocktail icons" underline="hover" rel="noopener" target="_blank" href="https://www.flaticon.com/free-icons/cocktail">
                    Freepik - Flaticon
                </Link>.
            </Typography>
        </Box>
    )
}