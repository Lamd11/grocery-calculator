import React, { useState } from 'react';




const TableComponent = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [newPerson, setNewPerson] = useState('');
    const [selectedPerson, setSelectedPerson] = useState('');
    const [persons, setPersons] = useState([]);
    const [newPrice, setNewPrice] = useState('');

    const calculatePriceAfterTax = (price) => {
        const taxRate = 1.13;
        const priceAfterTax = price * taxRate;
        return priceAfterTax.toFixed(2);
    } 

    const addItem = () => {
        
        const newItmeObject = {
            name: newItem,
            person: newPerson,
            price: parseFloat(newPrice),
        };

        setItems([...items, newItmeObject])
        setNewItem('');
        setNewPerson('');
        setNewPrice('');

    };

    const addPerson = () =>{
        if (newPerson && !persons.includes(newPerson)){
            setPersons([...persons, newPerson]);
            setSelectedPerson(newPerson);
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
                value={selectedPerson}
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

            <button onClick={addItem}>Add Item</button>

            
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Name of Person</th>
                        <th>Price</th>
                        <th>Price After Tax</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.person}</td>
                            <td>{item.price}</td>
                            <td>{calculatePriceAfterTax(item.price)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;