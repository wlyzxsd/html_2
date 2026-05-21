const Filter = (props) => {
    const handleSubmit = (event) => {
        event.preventDefault();

        const filterField = {
            'Модель' : event.target['model'].value.toLowerCase(),
            'Поколение' : event.target['generation'].value.toLowerCase(),
            'Тип кузова' : event.target['bodytype'].value.toLowerCase(),
            'Год начала выпуска' : [event.target['year_start'].value, event.target['year_end'].value],
            'Длина' : [event.target['length_start'].value, event.target['length_end'].value],
            'Мощность' : [event.target['power_start'].value, event.target['power_end'].value],
            'Макс. скорость' : [event.target['speed_start'].value, event.target['speed_end'].value],
        };

        let arr = props.fullData;
        for (const key in filterField) {
            const value = filterField[key];

            if (key === 'Год начала выпуска' || key === 'Длина' || key === 'Мощность' || key === 'Макс. скорость') {
                let [min, max] = value;
                if (min === '') {
                    min = -Infinity;
                }
                else {
                    min = Number(min);
                }

                if (max === '') {
                    max = Infinity;
                }
                else {
                    max = Number(max);
                }

                arr = arr.filter(item => {
                    return item[key] >= min && item[key] <= max;
                });
            }
            else if (value && value !== '') {
                arr = arr.filter(item => item[key].toLowerCase().includes(value));
            }
        }

        props.filtering(arr);
    }

    const handleReset = (event) => {
        event.target.reset();
        props.filtering([...props.fullData]);
    }

    return (
        <form onSubmit={handleSubmit} onReset={handleReset}>
            <p>
                <label>Модель: </label>
                <input name='model' type="text" />
            </p>
            <p>
                <label>Поколение: </label>
                <input name='generation' type="text" />
            </p>
            <p>
                <label>Тип кузова: </label>
                <input name='bodytype' type="text" />
            </p>
            <p>
                <label>Год выпуска от: </label>
                <input name='year_start' type="number" />
            </p>
            <p>
                <label>Год выпуска до: </label>
                <input name='year_end' type="number" />
            </p>
            <p>
                <label>Длина от: </label>
                <input name='length_start' type="number" step="0.01" />
            </p>
            <p>
                <label>Длина до: </label>
                <input name='length_end' type="number" step="0.01" />
            </p>
            <p>
                <label>Мощность от: </label>
                <input name='power_start' type="number" />
            </p>
            <p>
                <label>Мощность до: </label>
                <input name='power_end' type="number" />
            </p>
            <p>
                <label>Макс. скорость от: </label>
                <input name='speed_start' type="number" />
            </p>
            <p>
                <label>Макс. скорость до: </label>
                <input name='speed_end' type="number" />
            </p>
            <p>
                <button type="submit">Фильтровать</button>
                <button type="reset">Очистить фильтр</button>
            </p>
        </form>
    );
}

export default Filter;