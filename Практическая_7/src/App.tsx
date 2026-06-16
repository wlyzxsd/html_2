import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './main/Main';
import List from './list/List';
import Chart from './chart/Chart';
import Plane from './plane/Plane';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/list" element={<List />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/plane/:id" element={<Plane />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;