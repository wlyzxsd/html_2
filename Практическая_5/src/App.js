import './CSS/App.css';
import cars from './data.js';
import Table from './components/Table.js';
import Chart from './components/Chart.js';
import { useState } from 'react';

function App() {
  const [filteredData, setFilteredData] = useState([]);
  const [resetChartFlag, setResetChartFlag] = useState(0);  

  const handleFilter = (newData, shouldResetChart = false) => {
    setFilteredData(newData || []);
    if (shouldResetChart) {
      setResetChartFlag(prev => prev + 1);  
    }
  };

  return (
    <div className='App'>
      <h3>Легенды автопрома</h3>
      <Chart data={filteredData} resetTrigger={resetChartFlag} />
      <Table data={cars} amountRows={10} showPag={true} onFilterChange={handleFilter} />
    </div>
  );
}

export default App;