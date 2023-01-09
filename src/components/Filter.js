import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Filter({ title, sourceList, setter }) {

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
            <Typography component="div" variant="h6">
                {title}
            </Typography>
            <Autocomplete
                sx={{width: '100%', p: '1rem'}}
                clearOnEscape
                disableCloseOnSelect
                autoHighlight
                multiple
                options={sourceList}
                onChange={(event, selectedValue) => setter(selectedValue)}
                renderOption={(props, option, { selected }) => (
                    <li {...props}>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option}
                    </li>
                )}
                renderInput={(params) => (
                    <TextField {...params} hiddenLabel label={`Select ${title}`} />
                )}
            />
        </Box>
    )
}