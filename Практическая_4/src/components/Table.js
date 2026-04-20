import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { useState } from "react";
import Filter from "./Filter";
import Sort from "./Sort";

const Table = (props) => {
    const [activePage, setActivePage] = useState(1);
    const [dataTable, setDataTable] = useState(props.data);
    const [filteredDataUnsorted, setFilteredDataUnsorted] = useState(props.data);
    const [resetSortKey, setResetSortKey] = useState(0);

    const updateDateTable = (value) => {
        setDataTable(value);
        setActivePage(1);
    }

    const updateAfterFilter = (value) => {
        setFilteredDataUnsorted([...value]);
        setDataTable([...value]);
        setActivePage(1);
        setResetSortKey(prev => prev + 1);
    }

    const showPag = props.showPag === true;
    const rowsPerPage = Number(props.amountRows);
    
    const startIdx = (activePage - 1) * rowsPerPage;
    const displayData = showPag 
        ? dataTable.slice(startIdx, startIdx + rowsPerPage)
        : dataTable;
    
    const totalPages = Math.ceil(dataTable.length / rowsPerPage);
    const pages = Array.from({length: totalPages}, (_, i) => i + 1).map(page => (
        <span key={page} className={activePage === page ? 'active' : ''} onClick={() => setActivePage(page)}>
            {page}
        </span>
    ));

    return (
        <>
            <h4>Фильтры</h4>
            <Filter filtering={updateAfterFilter} data={dataTable} fullData={props.data} />

            <h4>Сортировка</h4>
            <Sort fullData={props.data} 
                  filteredDataUnsorted={filteredDataUnsorted} 
                  data={dataTable} 
                  onSort={updateDateTable}
                  resetTrigger={resetSortKey}
            />

            <table>
                <TableHead head={Object.keys(props.data[0])} />
                <TableBody body={displayData} />
            </table>

            {showPag && totalPages > 1 && (
                <div id="pag">
                    {pages}
                </div>
            )}
        </>
    );
}

export default Table;