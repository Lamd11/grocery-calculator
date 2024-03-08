import React, { useState } from 'react';

const TableComponent = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [newPerson, setNewPerson] = useState('');
    const [selectedPerson, setSelectedPerson] = useState('');
    const [persons, setPersons] = useState([]);
    const [newPrice, setNewPrice] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    const calculatePriceAfterTax = (price) => {
        const taxRate = 1.13;
        const priceAfterTax = price * taxRate;
        return priceAfterTax.toFixed(2);
    } 

    const addItem = () => {
        const newItemObject = {
            name: newItem,
            person: selectedPerson, // Use selectedPerson instead of newPerson
            price: parseFloat(newPrice),
        };

        if (editIndex !== null) {
            // If editIndex is not null, update the existing item
            const updatedItems = [...items];
            updatedItems[editIndex] = newItemObject;
            setItems(updatedItems);
            setEditIndex(null);
        } else {
            // If editIndex is null, add a new item
            setItems([...items, newItemObject]);
        }

        setNewItem('');
        setNewPerson('');
        setSelectedPerson('');
        setNewPrice('');
    };

    const editItem = (index) => {
        const itemToEdit = items[index];
        setNewItem(itemToEdit.name);
        setSelectedPerson(itemToEdit.person);
        setNewPrice(itemToEdit.price.toString());
        setEditIndex(index);
    }

    const cancelEdit = () => {
        setNewItem('');
        setNewPerson('');
        setSelectedPerson('');
        setNewPrice('');
        setEditIndex(null);
    }

    const addPerson = () => {
        if (newPerson && !persons.includes(newPerson)){
            setPersons([...persons, newPerson]);
            setSelectedPerson(newPerson); // Set selectedPerson when adding a new person
            setNewPerson('');
        }
    }

    return (
        <div>
            <label>
                Item Name:
                <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                />
            </label>

            <label>
                Name of Person:
                <select
                    value={selectedPerson} // Use selectedPerson instead of newPerson
                    onChange={(e) => setSelectedPerson(e.target.value)}
                >
                    <option value="" disabled>
                        Select Person
                    </option>
                    {persons.map((person, index) => (
                        <option key={index} value={person}>
                            {person}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    value={newPerson}
                    onChange={(e) => setNewPerson(e.target.value)}
                />
                <button onClick={addPerson}>Add Person</button>
            </label>

            <label>
                Price:
                <input
                    type="text"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                />
            </label>

            

            <button onClick={addItem}>{editIndex !== null ? 'Update Item' : 'Add Item'}</button>
            {editIndex !== null && <button onClick={cancelEdit}>Cancel</button>}

            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Price After Tax</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{editIndex === index ? <input value={newItem} onChange={(e) => setNewItem(e.target.value)} /> : item.name}</td>
                            <td>{editIndex === index ? <input value={selectedPerson} onChange={(e) => setSelectedPerson(e.target.value)} /> : item.person}</td>
                            <td>{editIndex === index ? <input value={newPrice} onChange={(e) => setNewPrice(e.target.value)} /> : item.price}</td>
                            <td>{calculatePriceAfterTax(item.price)}</td>
                            <td>
                                {editIndex === index ? (
                                    <button onClick={() => addItem()}>Save</button>
                                ) : (
                                    <button onClick={() => editItem(index)}>Edit</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;
