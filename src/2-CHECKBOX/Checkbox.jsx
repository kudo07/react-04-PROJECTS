import React, { useState } from 'react';
import Info from './Info';

const Checkbox = () => {
  const [sourceList, setSourceList] = useState([
    { id: 1, label: 'Item 1' },
    { id: 2, label: 'Item 2' },
    { id: 3, label: 'Item 3' },
    // Add more items as needed
  ]);

  const [targetList, setTargetList] = useState([
    { id: 4, label: 'Item 4' },
    { id: 5, label: 'Item 5' },
    { id: 6, label: 'Item 6' },
    // Add more items as needed
  ]);
  const [sourceSelectedItems, setSourceSelectedItems] = useState([]);
  const [targetSelectedItems, setTargetSelectedItems] = useState([]);

  // functions

  const handleCheckboxChange = (itemId, isSource) => {
    if (isSource) {
      const updatedSelectedItems = sourceSelectedItems.includes(itemId)
        ? sourceSelectedItems.filter((id) => id !== itemId)
        : [...sourceSelectedItems, itemId];

      setSourceSelectedItems(updatedSelectedItems);
      {
        console.log(updatedSelectedItems);
      }
    } else {
      const updatedSelectedItems = targetSelectedItems.includes(itemId)
        ? targetSelectedItems.filter((id) => id !== itemId)
        : [...targetSelectedItems, itemId];

      setTargetSelectedItems(updatedSelectedItems);
    }
  };
  const handleTransferToTarget = () => {
    const updatedSourceList = sourceList.filter(
      (item) => !sourceSelectedItems.includes(item.id)
    );
    const transferedItem = sourceList.filter((item) =>
      sourceSelectedItems.includes(item.id)
    );
    setSourceList(updatedSourceList);
    setTargetList([...targetList, ...transferedItem]);
    setSourceSelectedItems([]);
  };
  const handleTransferToSource = () => {
    const updatedTargetdList = targetList.filter(
      (item) => !targetSelectedItems.includes(item.id)
    );
    const transferedItems = targetList.filter((item) =>
      targetSelectedItems.includes(item.id)
    );
    setTargetList(updatedTargetdList);
    setSourceList([...sourceList, ...transferedItems]);
    setTargetSelectedItems([]);
  };
  return (
    <>
      <Info />
      <div>
        <div>
          <h2>Source Block</h2>
          {sourceList.map((item) => (
            <div key={item.id}>
              <input
                type="checkbox"
                checked={sourceSelectedItems.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id, true)}
              />
              <label>{item.label}</label>
            </div>
          ))}
        </div>
        <div>
          <button onClick={handleTransferToTarget}>Transfer To Target</button>
        </div>
        <div>
          <h2>Target Block</h2>

          {targetList.map((item) => (
            <div key={item.id}>
              <input
                type="checkbox"
                checked={targetSelectedItems.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id, false)}
              />
              <label>{item.label}</label>
            </div>
          ))}
        </div>
        <div>
          <button onClick={handleTransferToSource}>Transfer To Source</button>
        </div>
      </div>
    </>
  );
};

export default Checkbox;
