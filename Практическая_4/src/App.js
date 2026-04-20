import './CSS/App.css';
import cars from './data.js'
import Table from './components/Table.js';

function App() {
  return (
    <div className='App'>
      <h3>Легенды автопрома</h3>
      <Table data={cars} amountRows={10} showPag={true} />
    </div>
  );
}

export default App;