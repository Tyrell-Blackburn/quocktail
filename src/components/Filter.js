import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';

const ListItemStyled = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));


export default function Filter({ title, type, sourceList, fromSetter, toSetter }) {

    const changeFilter = (elementToMove, fromSetter, toSetter) => () => {

        if (!toSetter) {
            // remove from source
            fromSetter(prevState => prevState.filter(sourceElement => sourceElement !== elementToMove))
            return
        }

        // remove from source
        fromSetter(prevState => prevState.filter(sourceElement => sourceElement !== elementToMove))
        // add to destination
        toSetter(prevState => [...prevState, elementToMove]);
    };

    return (
        <>
            <Typography component="div" variant="h6">
                {title}
            </Typography>
            <Paper
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    p: 0.5,
                    m: 0,
                }}
                component="ul"
            >
                {sourceList.length > 0 ? sourceList.map(element => (
                    <ListItemStyled key={element}>
                        <Chip
                            label={element}
                            // {...getClickListener(type)}
                            onClick={type === 'add' ? changeFilter(element, fromSetter, toSetter) : undefined}
                            onDelete={type === 'delete' ? changeFilter(element, fromSetter, toSetter) : undefined}
                        />
                    </ListItemStyled>
                )) : <span>None</span>
                }
            </Paper>
        </>
    )
}