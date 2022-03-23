import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

function fetchPerson() {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data)
}

function onAddPerson(personObject) {
    const request = axios.post(baseUrl, personObject, {
      headers: { 'Content-Type': 'application/json' }
    })
    return request.then((response) => response.data);
}

function onRemovePerson(id) {
    const request = axios.delete(`http://localhost:3001/persons/${id}`);
    return request.then((response) => response.data);
}

function onUpdateNumber(num, id) {
    const request = axios.put(`http://localhost:3001/persons/${id}`, num, {
        headers: { 'Content-Type': 'application/json' }
    });
    return request.then((response) => response.data);
}

export const person = {
    fetchPerson,
    onAddPerson,
    onRemovePerson,
    onUpdateNumber
}