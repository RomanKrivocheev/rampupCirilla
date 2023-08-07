import React, { useState, useEffect } from 'react';
import './Lists.css';

const Lists = ({ username }) => {
  const [people, setPeople] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name: '',
    lastName: '',
    age: '',
    dni: '',
  });
  const [displayedPeople, setDisplayedPeople] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDNI, setDeleteDNI] = useState('');

  useEffect(() => {
    setDisplayedPeople(people);
  }, [people]);

  const handleSavePerson = () => {
    setPeople([...people, newPerson]);
    setNewPerson({ name: '', lastName: '', age: '', dni: '' });
  };

  const handleUpdatePerson = () => {
    const updatedPeople = [...people];
    updatedPeople[editIndex] = newPerson;
    setPeople(updatedPeople);
    setNewPerson({ name: '', lastName: '', age: '', dni: '' });
    setEditMode(false);
    setEditIndex(null);
  };

  const handleDeletePersonByDNI = () => {
    const updatedPeople = people.filter((person) => person.dni !== deleteDNI);
    setPeople(updatedPeople);
    setDeleteDNI('');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      setDisplayedPeople(people);
    } else {
      const filteredPeople = people.filter((person) =>
        person.dni.includes(e.target.value)
      );
      setDisplayedPeople(filteredPeople);
    }
  };

  return (
    <div className='container'>
      <h3>New Person</h3>
      <div className='new-person'>
        <form>
          <div>
            <label>Name:</label>
            <div>
              <input
                type='text'
                value={newPerson.name}
                onChange={(e) =>
                  setNewPerson({ ...newPerson, name: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label>Last Name:</label>
            <div>
              <input
                type='text'
                value={newPerson.lastName}
                onChange={(e) =>
                  setNewPerson({ ...newPerson, lastName: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label>Age:</label>
            <div>
              <input
                type='number'
                value={newPerson.age}
                onChange={(e) =>
                  setNewPerson({ ...newPerson, age: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label>DNI:</label>
            <div>
              <input
                type='text'
                value={newPerson.dni}
                onChange={(e) =>
                  setNewPerson({ ...newPerson, dni: e.target.value })
                }
              />
            </div>
          </div>
          <div className='buttons'>
            <button
              type='button'
              onClick={editMode ? handleUpdatePerson : handleSavePerson}
              disabled={!newPerson.name || !newPerson.lastName}
            >
              {editMode ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>

      <div>
        <strong className='label'>Delete person by DNI:</strong>
        <br />
        <div>
          <input
            type='text'
            value={deleteDNI}
            onChange={(e) => setDeleteDNI(e.target.value)}
          />
        </div>
        <div>
          <button type='button' onClick={handleDeletePersonByDNI}>
            Send
          </button>
        </div>
      </div>

      <div>
        <strong className='label'>Search person by DNI:</strong>
        <br />
        <div>
          <input type='text' value={searchTerm} onChange={handleSearch} />
        </div>
      </div>

      {displayedPeople.length > 0 && (
        <table>
          <thead>
            <tr>
              <th className='table-header'>Name</th>
              <th className='table-header'>Last Name</th>
              <th className='table-header'>Age</th>
              <th className='table-header'>DNI</th>
            </tr>
          </thead>
          <tbody>
            {displayedPeople.map((person, index) => (
              <tr key={index}>
                <td>{person.name}</td>
                <td>{person.lastName}</td>
                <td>{person.age}</td>
                <td>{person.dni}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export { Lists }; // Exporting the Lists component as a named export
