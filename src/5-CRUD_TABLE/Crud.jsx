import { useState } from 'react';
import Info from './Info';
import Pagination from './Pagination';
const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'NAME' },
  { key: 'age', label: 'AGE' },
];
const Crud = () => {
  const [data, setData] = useState(getDefaultData());
  const [sortedColumn, setSortedColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, seteditingId] = useState(null);
  const [editData, setEditData] = useState({ id: '', name: '', age: '' });
  const [newItem, setNewItem] = useState({ id: '', name: '', age: '' });

  // const [itemsPerPage] = useState(5);
  const itemsPerPage = 5;

  // FUNCTION-1
  // GENERATE THE DEFAULT DATA
  function getDefaultData() {
    const defaultData = [];
    for (let i = 1; i <= 20; i++) {
      defaultData.push({
        id: i,
        name: `Name ${i}`,
        age: Math.floor(Math.random() * 50) + 20,
      });
    }
    return defaultData;
  }
  // Sorting
  // function-2
  const handleSort = (key) => {
    if (sortedColumn === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortedColumn(key);
      setSortDirection('asc');
    }
  };
  // function-2
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // function-3
  // sorted Items
  const filteredData = data.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
      // (value) => typeof value === 'string' && value.toLowerCase().includes('')
    )
  );
  // function-4
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

  // function-5
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };
  // function -6
  const handleSave = () => {
    const newData = data.map((item) =>
      item.id === editData.id ? { ...editData } : item
    );
    setData(newData);
    seteditingId(null);
    setEditData({ id: '', name: '', age: '' });
  };
  // function-7
  const handleEdit = (id) => {
    seteditingId(id);
    const selectedItem = data.find((item) => item.id === id);
    setEditData({ ...selectedItem });
  };
  // funxtion-8
  const handleDelete = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };
  const handleCreate = () => {
    const id = data.length + 1;
    setNewItem({ id, name: '', age: '' });
    setData([...data, newItem]);
  };
  // cons
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexofFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexofFirstItem, indexOfLastItem);
  const pagiante = (pageNumber) => setCurrentPage(pageNumber);
  return (
    // <Info/>
    <div>
      <input
        type="text"
        placeholder="Search...QUERY"
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
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {console.log(currentItems.id)}
          {currentItems.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>
                {editingId === row.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleChange}
                  />
                ) : (
                  row.name
                )}
              </td>
              <td>
                {editingId === row.id ? (
                  <input
                    type="text"
                    name="age"
                    value={editData.age}
                    onChange={handleChange}
                  />
                ) : (
                  row.age
                )}
              </td>
              <td>
                {editingId === row.id ? (
                  <button onClick={handleSave}>Save</button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(row.id)}>EDIT</button>
                    <button onClick={() => handleDelete(row.id)}>DELETE</button>
                  </>
                )}
              </td>
            </tr>
          ))}
          <tr>
            <td>{data.length + 1}</td>
            <td>
              <input
                type="text"
                name="name"
                value={newItem.name}
                placeholder="enter name"
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                name="age"
                placeholder="enter age"
                value={newItem.age}
                onChange={(e) =>
                  setNewItem({ ...newItem, age: e.target.value })
                }
                required
              />
            </td>
            <td>
              <button onClick={handleCreate}>Create</button>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={sortedData.length}
        paginate={pagiante}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Crud;
