import React, { useState } from 'react';
import Info from '../Info';
import Pagination from './Pagination';

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
  const [data, setData] = useState(initialData);
  const [sortedColumn, setSortedColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const handleSort = (key) => {
    if (sortedColumn === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortedColumn(key);
      setSortDirection('asc');
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = data.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
      // (value) => typeof value === 'string' && value.toLowerCase().includes('')
    )
  );

  const sortedData = sortedColumn
    ? filteredData.sort((a, b) => {
        const aValue = a[sortedColumn];
        const bValue = b[sortedColumn];
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      })
    : filteredData;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          <tbody>
            {currentItems.map((row) => (
              <tr key={row.id}>
                {columns.map((column) => (
                  <td key={`${row.id}-${column.key}`}>{row[column.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={sortedData.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default Search;
