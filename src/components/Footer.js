import Box from "@mui/material/Box";
import Link from '@mui/material/Link';
import Typography from "@mui/material/Typography";

export default function Footer() {
    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center'
        }}>

            <Typography sx={{ p: '40px' }} varient='h3'>
                Copyright © 2022&nbsp;
                <Link underline="hover" rel="noopener" target="_blank" href="https://www.tyrellblackburn.com/">
                    Tyrell Blackburn
                </Link>
                . All Rights Reserved. Powered by&nbsp;
                <Link underline="hover" rel="noopener" target="_blank" href="https://www.thecocktaildb.com/">
                    TheCocktailDB
                </Link>.
            </Typography>
        </Box>
    )
}