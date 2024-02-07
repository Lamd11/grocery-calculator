import React, { useState } from 'react';
import './App.css';

function App() {
  // State to manage the list of items
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: 0 });

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate taxed total (you can adjust the tax rate)
    const taxRate = 0.1;
    const taxedTotal = newItem.price + newItem.price * taxRate;

    // Add the new item to the list
    setItems([...items, { ...newItem, taxedTotal }]);
    
    // Clear the form
    setNewItem({ name: '', price: 0 });
  };

  return (
    <div className="App">
      <h1>Grocery Calculator</h1>

      {/* Form to add new items */}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
          />
        </label>
        <button type="submit">Add Item</button>
      </form>

      {/* Table to display items */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Taxed Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>${item.taxedTotal.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
