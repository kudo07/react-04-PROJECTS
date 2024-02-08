import { useState } from 'react';
import Info from '../Info';
const initialData = [
  { id: 1, name: 'John', age: 30, city: 'New York' },
  { id: 2, name: 'Alice', age: 25, city: 'Los Angeles' },
  { id: 3, name: 'Bob', age: 35, city: 'Chicago' },
  { id: 4, name: 'Diana', age: 28, city: 'Houston' },
  { id: 5, name: 'Mike', age: 40, city: 'Miami' },
];

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'age', label: 'Age' },
  { key: 'city', label: 'City' },
];
const Search = () => {
  // states
  const [data, setData] = useState(initialData);
  const [sortedColumn, setSortedColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');

  // functions
  const handleSort = (key) => {
    if (sortedColumn === key) {
      setSortDirection(sortDirection === 'asc' ? 'dsc' : 'asc');
    } else {
      setSortedColumn(key);
      setSortDirection('asc');
    }
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // filtered data
  const filteredData = data.filter((row) => {
    Object.values(row).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // sorted data
  const sortedData = sortedColumn
    ? filteredData.sort((a, b) => {
        const aValue = a[sortedColumn];
        const bValue = b[sortedColumn];

        if ((typeof aValue === 'string') & (typeof bValue === 'string')) {
          return sortDirection === 'asc'
            ? aValue.localCompare(bValue)
            : bValue.localCompare(aValue);
        }
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      })
    : filteredData;

  // end--> functions

  return (
    <>
      <Info />
      <div className="App">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} onClick={() => handleSort(column.key)}>
                  {column.label}
                  {sortedColumn === column.key && (
                    <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </>
  );
};

export default Search;
