import { useState } from 'react';
import Info from './Info';
import './style.css';

const Spreadsheet = () => {
  // define the state to track the cell focus and input values
  const [focusedCell, setFocusedCell] = useState(null);
  const [cellData, setCellData] = useState(
    Array.from({ length: 8 }, () => Array(8).fill(''))
  );
  console.log(cellData);
  // handleCellClick
  const handleCellClick = (row, col) => {
    if (focusedCell && focusedCell.row === row && focusedCell.col === col) {
      // if the cell is already focused allow input
      setFocusedCell({ row, col, editMode: true });
    } else {
      // otherwise , just focus the cell
      setFocusedCell({ row, col, editMode: false });
    }
  };

  //
  const handleInputChange = (e) => {
    const newData = [...cellData];
    newData[focusedCell.row][focusedCell.col] = e.target.value;
    setCellData(newData);
  };

  // function to render the cells
  const renderCell = (row, col) => {
    const cellValue = cellData[row][col];
    const isFocused =
      focusedCell && focusedCell.row === row && focusedCell.col === col;
    return (
      <div
        key={`${row}-${col}`}
        className={`cell ${isFocused ? 'focused' : ''}`}
        onClick={() => handleCellClick(row, col)}
      >
        {focusedCell &&
        focusedCell.row === row &&
        focusedCell.col === col &&
        focusedCell.editMode ? (
          <input
            value={cellValue}
            onChange={handleInputChange}
            autoFocus
            onFocus={(e) => e.target.select()}
            onBlur={() => setFocusedCell(null)}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              outline: 'none',
              color: 'white',
            }}
          />
        ) : (
          <span style={{ background: 'white' }}>{cellValue}</span>
        )}
      </div>
    );
  };
  //
  // function to render the rows
  const renderRow = (row) => {
    const cells = [];
    for (let col = 0; col < 8; col++) {
      cells.push(renderCell(row, col));
    }
    return (
      <div key={row} className="row">
        {cells}
      </div>
    );
  };
  //
  // function to render the netire table
  const renderTable = () => {
    const rows = [];
    for (let row = 0; row < 8; row++) {
      rows.push(renderRow(row));
    }
    return <div className="table">{rows}</div>;
  };
  //
  //
  return (
    <div>
      <Info />
      {renderTable()}
    </div>
  );
};

export default Spreadsheet;
