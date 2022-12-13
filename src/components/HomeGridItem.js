import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { UnstyledLink } from "./StyledComponents";

import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 250,
    [theme.breakpoints.down('sm')]: {
        width: '100% !important' // Overrides inline-style
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
            border: '4px solid currentColor',
        },
    },
}));

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center 15%',
});

const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
}));

const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));

const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 28,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 14px)',
    transition: theme.transitions.create('opacity'),
}));


export default function HomeGridItem({ cocktail }) {
    return (
        //     <Grid item sm={12} md={6} lg={4} >
        //         <UnstyledLink to={`/drink/${cocktail.idDrink}`}>
        //             <Paper elevation={4} sx={{
        //                 p: 5,
        //                 textAlign: 'center',
        //                 '&:hover': {
        //                     filter: `blur(8px)`,
        //                 },
        //             }}>
        //                 <Box sx={{
        //                     width: '100%',
        //                     borderRadius: '8px',
        //                     '&:hover': {
        //                         opacity: `0.5`,
        //                     },
        //                 }}
        //                     component="img"
        //                     alt={cocktail.strDrink}
        //                     src={cocktail.strDrinkThumb}
        //                 />
        //                 <Typography variant="h6">{cocktail.strDrink}</Typography>
        //                 {/* <Box sx={{
        //                     backgroundColor: 'red',
        //                     // backgroundColor: '#04AA6D',
        //                     color: 'white',
        //                     fontSize: '16px',
        //                     padding: '16px 32px'
        //                 }}>See Recipe
        //                 </Box> */}
        //             </Paper>
        //         </UnstyledLink>
        // </Grid >

        <Grid item xs={12} md={6} lg={4} >
            <UnstyledLink to={`/drink/${cocktail.idDrink}`}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
                    <ImageButton
                        focusRipple
                        style={{
                            width: '100%',
                        }}
                    >
                        <ImageSrc style={{ backgroundImage: `url(${cocktail.strDrinkThumb})` }} />
                        <ImageBackdrop className="MuiImageBackdrop-root" />
                        <Image>
                            <Typography
                                component="span"
                                variant="subtitle1"
                                color="inherit"
                                sx={{
                                    position: 'relative',
                                    p: 4,
                                    pt: 2,
                                    pb: (theme) => theme.spacing(2),
                                }}
                            >
                                {cocktail.strDrink}
                                <ImageMarked className="MuiImageMarked-root" />
                            </Typography>
                        </Image>
                    </ImageButton>
                </Box>
            </UnstyledLink>
        </Grid >
    )
}

