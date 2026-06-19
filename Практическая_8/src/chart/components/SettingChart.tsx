import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";

import * as React from 'react';

type tSeries = {
    'Максимальная мощность': boolean,
    'Средняя мощность': boolean,
    'Минимальная мощность': boolean,
}

type CheckboxProps = {
    series: tSeries;
    setSeries: React.Dispatch<React.SetStateAction<tSeries>>;
    isBar: boolean;
    setIsBar: React.Dispatch<React.SetStateAction<boolean>>;
}

function SettingChart({ series, setSeries, isBar, setIsBar }: CheckboxProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSeries({
            ...series,
            [event.target.name]: event.target.checked,
        });
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsBar(event.target.value === 'bar');
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, margin: '20px 0' }}>
            <FormControl>
                <FormLabel id="label-radio-group">
                    Тип диаграммы:
                </FormLabel>
                <RadioGroup name="group-radio" value={(isBar) ? 'bar' : 'dot'}
                            onChange={handleRadioChange}>
                    <FormControlLabel value='bar' label='Гистограмма'
                                      control={<Radio checked={isBar} />} />
                    <FormControlLabel value='dot' label='Линейная'
                                      control={<Radio checked={!isBar} />} />
                </RadioGroup>
            </FormControl>

            <Divider orientation="vertical" flexItem />

            <FormControl>
                <FormLabel id="label-checkbox-group">
                    На диаграмме показать:
                </FormLabel>

                <FormControlLabel
                    control={<Checkbox checked={series['Максимальная мощность']}
                                       name="Максимальная мощность"
                                       onChange={handleChange} />}
                    label="максимальную мощность"
                />
                <FormControlLabel
                    control={<Checkbox checked={series['Средняя мощность']}
                                       name="Средняя мощность"
                                       onChange={handleChange} />}
                    label="среднюю мощность"
                />
                <FormControlLabel
                    control={<Checkbox checked={series['Минимальная мощность']}
                                       name="Минимальная мощность"
                                       onChange={handleChange} />}
                    label="минимальную мощность"
                />
            </FormControl>
        </Box>
    );
}

export default SettingChart;