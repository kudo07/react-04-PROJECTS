import Search from './1-SEARCH/Search';
import Checkbox from './2-CHECKBOX/Checkbox';
import Navbar from './Navbar';
import { Route, Routes } from 'react-router-dom';
import data from './data.json';
import Accordian from './3-ACCORDIAN/Accordian';
import Spreadsheet from './4-SPREADSHEET/Spreadsheet';
import Crud from './5-CRUD_TABLE/Crud';
function App() {
  return (
    <div>
      <Navbar data={data} />
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/search2" element={<Checkbox />} />
        <Route path="/accordian" element={<Accordian />} />
        <Route path="/spreadsheet" element={<Spreadsheet />} />
        <Route path="/crudtable" element={<Crud />} />
      </Routes>
    </div>
  );
}

export default App;
