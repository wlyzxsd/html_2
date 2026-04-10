import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { useState } from "react";
import Filter from "./Filter";

const Table = (props) => {
    const [activePage, setActivePage] = useState('1');

    const changeActive = (event) => {
        setActivePage(event.target.innerHTML);
    };

    const [dataTable, setDataTable] = useState(props.data);
    const updateDateTable = (value) =>{
        setDataTable(value);
        setActivePage('1');
    }

    const showPag = props.showPag === true;

    const displayData = showPag ? dataTable : dataTable;
    const numRows = showPag ? props.amountRows : displayData.length;

    const n = showPag ? Math.ceil(dataTable.length / props.amountRows) : 1;

    const arr = Array.from({length : n}, (v, i) => i + 1);

    const pages = arr.map((item, index) =>
                    <span key={index} className={
                          Number(activePage) === item ? 'active' : ''}
                          onClick={changeActive}
                    >
                        {item}
                    </span>
    );

    return (
        <>
            <h4>Фильтры</h4>
            <Filter filtering={updateDateTable} data={dataTable} fullData={props.data} />

            <table>
                <TableHead head={Object.keys(props.data[0])} />
                <TableBody body={displayData} 
                           amountRows={numRows} 
                           numPage={showPag ? activePage : 1}

                />
            </table>

            {showPag && n > 1 && (
                <div id="pag">
                    {pages}
                </div>
            )}
        </>
    );
}

export default Table;