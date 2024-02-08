import Search from './1-SEARCH/Search';
import SearchAg from './2-SEARCH-2/SearchAg';
import Navbar from './Navbar';
import { Route, Routes } from 'react-router-dom';
import data from './data.json';
function App() {
  return (
    <div>
      <Navbar data={data} />
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/search2" element={<SearchAg />} />
      </Routes>
    </div>
  );
}

export default App;
