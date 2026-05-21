import { useState, useEffect } from "react";
import ChartDraw from "./ChartDraw";
import * as d3 from "d3";

const Chart = (props) => {
    const [displayOx, setDisplayOx] = useState('Модель');
    const [displayOyMax, setDisplayOyMax] = useState(true);
    const [displayOyMin, setDisplayOyMin] = useState(false);
    const [displayGraphType, setDisplayGraphType] = useState('dot');
    const [displayChartData, setDisplayChartData] = useState([]);
    const [shouldDraw, setShouldDraw] = useState(true);

    const [error, setError] = useState(false);
    const [tempOx, setTempOx] = useState('Модель');
    const [tempOyMax, setTempOyMax] = useState(true);
    const [tempOyMin, setTempOyMin] = useState(false);
    const [tempGraphType, setTempGraphType] = useState('dot');

    useEffect(() => {
        setShouldDraw(false);
    }, [props.resetTrigger]);

    const createArrGraph = (data, key) => {
        if (!data || data.length === 0) return [];

        const groupObj = d3.group(data, d => d[key]);

        let arrGraph = [];
        for (let entry of groupObj) {
            let minMax = d3.extent(entry[1].map(d => d['Макс. скорость']));
            arrGraph.push({labelX : entry[0], values : minMax});
        }

        if (key === 'Год начала выпуска') {
            arrGraph.sort((a,b) => Number(a.labelX) - Number(b.labelX));
        }
        else {
            arrGraph.sort((a, b) => String(a.labelX).localeCompare(String(b.labelX)));
        }

        return arrGraph;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const showMax = tempOyMax;
        const showMin = tempOyMin;
        
        if (!showMax && !showMin) {
            setError(true);
            setShouldDraw(false);
            return;
        }

        setError(false);
        setDisplayOx(tempOx);
        setDisplayOyMax(showMax);
        setDisplayOyMin(showMin);
        setDisplayGraphType(tempGraphType);
        setShouldDraw(true);

        if (props.data && props.data.length > 0) {
            const newData = createArrGraph(props.data, tempOx);
            setDisplayChartData(newData);
        } else {
            setDisplayChartData([]);
        }
    }

    const handleCheckboxChange = (isMax, checked) => {
        if (isMax) {
            setTempOyMax(checked);
        } else {
            setTempOyMin(checked);
        }
        setError(false);
    }

    return (
        <>
            <h4>Визуализация</h4>
            <form onSubmit={handleSubmit}>
                <p>Значение по оси ОХ: </p>
                <div>
                    <input type="radio" name="ox" value='Модель' checked={tempOx === 'Модель'} onChange={() => setTempOx('Модель')} />
                    Модель <br/>
                    <input type="radio" name="ox" value='Год начала выпуска' checked={tempOx === 'Год начала выпуска'} onChange={() => setTempOx('Год начала выпуска')} />
                    Год начала выпуска
                </div>

                <p>Значение по оси ОУ: </p>
                <div style={{color : error ? 'red' : 'black'}}>
                    <input type="checkbox" checked={tempOyMax} onChange={(e) => handleCheckboxChange(true, e.target.checked)} />
                    Максимальная скорость <br/>
                    <input type="checkbox" checked={tempOyMin} onChange={(e) => handleCheckboxChange(false, e.target.checked)} />
                    Минимальная скорость 
                </div>

                <p>Тип диаграммы:</p>
                <div>
                    <select value={tempGraphType} onChange={(event) => setTempGraphType(event.target.value)}>
                        <option value='dot'>Точечная диаграмма</option>
                        <option value='histogram'>Столбчатая диаграмма</option>
                    </select>
                </div>

                <p>
                    <button type="submit">Построить</button>
                </p>
            </form>

            <ChartDraw data={displayChartData} 
                       showMax={displayOyMax}
                       showMin={displayOyMin}
                       graphType={displayGraphType}
                       shouldDraw={shouldDraw}
            />
        </>
    );
}

export default Chart;