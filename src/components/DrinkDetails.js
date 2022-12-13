import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Nav from '../components/Nav';

export default function DrinkDetails() {

    const { id } = useParams();

    return (
        <>
            <Nav />
            <Box sx={{ backgroundColor: 'red' }}>
                Displaying ${id}
            </Box>
        </>
    )
}