import React, { useState, useEffect } from 'react';
import Notification from './components/Notification';
import { person } from './service/person';
import AddPerson from './components/AddPerson';
import Home from './components/Home';

// This is exercise 2.11: The Phonebook Step6
function App() {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [message, setMessage] = useState('');
  const error = 'ERROR'

  const fetchPersons = () => {
    person.fetchPerson()
    .then((response) => {
      setPersons(response);
    })
    .catch((error) => console.log(error));
  }

  // Ends here =================================

  // This is exercise 2.15: The Phonebook step7
  const addPerson = (evt) => {
    evt.preventDefault();

    const name = persons.find((p) => p?.name === newPerson);

    if(name) {
      setTimeout(() => {
        setMessage(null);
      }, 5000)
      setMessage(`${error} ${newPerson} is already added, please choose another name!`)
      return false
    }

    if(newPerson === '') {
      setTimeout(() => {
        setMessage(null);
      }, 5000)
      setMessage(`${error} You need to add a name!`);
      return false;
    }

    const generateId = () => {
      const maxId = persons.length > 0 ?
          Math.max(...persons.map(person => person?.id)) : 0
      return maxId + 1;
    }

    const personObject = {
      name: newPerson,
      number: newNumber,
      id: generateId(),
    }

    person.onAddPerson(personObject)
    .then((response) => {
      setPersons([...persons, personObject]);
      setNewPerson('');
      setNewNumber('');
      console.log(response);

      // Ends here =================================

      // This is exercise 2.19: The Phonebook step11 and 12
      setTimeout(() => {
        setMessage(null);
      }, 5000)
      setMessage(`${response?.name} successfully added to Server!`);
    })
    .catch((error) => console.log(error))
  }
  // Ends here =================================

  // This is exercise 2.17: The Phonebook step9
  const handleRemovePerson = (id) => {
    if(window.confirm('Are you sure you want to remove this person')) {
    const findPerson = persons.filter(per => per.id === id)
    person.onRemovePerson(id)
    .then((results) => {
      if(results) {
        const deletePerson = persons.filter((doc) => {
        return doc?.id !== id;
      });
        setPersons(deletePerson);
        setMessage(`${findPerson[0]?.name} data removed`)
        setTimeout(() => {
          setMessage(null);
        }, 5000)
      }
    })
    .catch((error) => {
      console.log(error)
    // Ends here =================================  
      
      // This is exercise 2.20: The Phonebook 12
      if(!findPerson) {
        setMessage(`${findPerson?.name} has already been removed from server.`);
      }
      setTimeout(() => {
        setMessage(null);
      }, 5000)
    });
    } else {
      return false;
    }
  }
  // Ends here =================================

  function addPersonChange(evt) {
    setNewPerson(evt.target.value);
  } 
  function addNumberChange(evt) {
    setNewNumber(evt.target.value);
  } 

  useEffect(() => { fetchPersons() }, []);
  return (
    <div>
      <AddPerson
          addPerson={addPerson}
          addPersonChange={addPersonChange}
          addNumberChange={addNumberChange}
          newPerson={newPerson}
          newNumber={newNumber}
      /><hr />
      {message && <Notification message={message} />}
        <div>
          {persons?.map(person => (
            <div>
              <Home person={person} handleRemovePerson={handleRemovePerson} />
            </div>
          ))}
        </div>
    </div>
  );
}

export default App;
