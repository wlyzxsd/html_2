import { useState, useEffect } from "react";
import ChartDraw from "./ChartDraw";
import * as d3 from "d3";

const Chart = (props) => {
    const [ox, setOx] = useState('Страна');
    const [oy, setOy] = useState([true, false]);
    const [graphType, setGraphType] = useState('dot');
    const [error, setError] = useState(false);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (props.data && props.data.length > 0) {
            const newData = createArrGraph(props.data, ox);
            setChartData(newData);
        } else {
            setChartData([]);
        }
    }, [props.data, ox]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const showMax = event.target['oy'][0].checked;
        const showMin = event.target['oy'][1].checked;
        const newOx = event.target['ox'].value;
        const newGraphType = event.target['graph_type'].value;

        // Всегда обновляем ox и graphType
        setOx(newOx);
        setGraphType(newGraphType);

        if (!showMax && !showMin) {
            setError(true);
            setOy([false, false]);  // очищаем график
            if (props.data && props.data.length > 0) {
                const newData = createArrGraph(props.data, newOx);
                setChartData(newData);
            }
            return;
        }

        setError(false);
        setOy([showMax, showMin]);

        if (props.data && props.data.length > 0) {
            const newData = createArrGraph(props.data, newOx);
            setChartData(newData);
        }
    }

    const handleCheckboxChange = () => {
        // Только убираем ошибку, но график не трогаем
        if (error) {
            setError(false);
        }
    }

    const createArrGraph = (data, key) => {
        if (!data || data.length === 0) return [];

        const groupObj = d3.group(data, d => d[key]);

        let arrGraph = [];
        for (let entry of groupObj) {
            let minMax = d3.extent(entry[1].map(d => d['Высота']));
            arrGraph.push({labelX : entry[0], values : minMax});
        }

        if (key === 'Год') {
            arrGraph.sort((a,b) => Number(a.labelX) - Number(b.labelX));
        }
        else {
            arrGraph.sort((a, b) => String(a.labelX).localeCompare(String(b.labelX)));
        }

        return arrGraph;
    }

    return (
        <>
            <h4>Визуализация</h4>
            <form onSubmit={handleSubmit}>
                <p>Значение по оси ОХ: </p>
                <div>
                    <input type="radio" name="ox" value='Страна' defaultChecked={ox === 'Страна'} />
                    Страна <br/>
                    <input type="radio" name="ox" value='Год' defaultChecked={ox === 'Год'} />
                    Год 
                </div>

                <p>Значение по оси ОУ: </p>
                <div style={{color : error ? 'red' : 'black'}}>
                    <input type="checkbox" name="oy" defaultChecked={oy[0]} onChange={handleCheckboxChange} />
                    Максимальная высота <br/>
                    <input type="checkbox" name="oy" defaultChecked={oy[1]} onChange={handleCheckboxChange} />
                    Минимальная высота 
                </div>

                <p>Тип диаграммы:</p>
                <div>
                    <select name='graph_type' defaultValue={graphType}>
                        <option value='dot'>Точечная диаграмма</option>
                        <option value='histogram'>Гистограмма</option>
                    </select>
                </div>

                <p>
                    <button type="submit">Построить</button>
                </p>
            </form>

            <ChartDraw data={createArrGraph(props.data, ox)} 
                       showMax={oy[0]}
                       showMin={oy[1]}
                       graphType={graphType}
            />
        </>
    );
}

export default Chart;