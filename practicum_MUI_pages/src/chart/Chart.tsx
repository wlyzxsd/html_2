import Navbar from "../components/Navbar";
import GroupGrid from "./components/GroupGrid";
import { years, countries, types } from "./groupdata";
import Footer from "../components/Footer";

import Select, {SelectChangeEvent} from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import * as React from 'react';
import GroupChart from "./components/GroupChart";

type tSelect = 'Страна' | 'Год' | 'Тип';

function Chart() {
    const [group, setGroup] = React.useState<tSelect>('Страна');
    const [groupData, setGroupData] = React.useState(countries);

    const handleChange = (event: SelectChangeEvent) => {
        const selectedValue = event.target.value as tSelect;
        setGroup(selectedValue);
        
        const groupDataMap = {
            'Страна': countries,
            'Год': years,
            'Тип': types,
        };

        setGroupData(groupDataMap[selectedValue]);
    }

    return (
        <div>
            <Navbar active='3' />

            <Box sx={{width: '200px', m: 'auto'}}>
                <FormControl fullWidth>
                    <InputLabel>Группировать по</InputLabel>
                    <Select id='select-group' value={group} label='Группировать по'
                            onChange={handleChange}>
                        <MenuItem value='Страна'> Стране </MenuItem>
                        <MenuItem value='Год'> Году </MenuItem>
                        <MenuItem value='Тип'> Типу </MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <GroupChart data={groupData} />
            <GroupGrid data={groupData} />
            <Footer />
        </div>
    );
}

export default Chart;