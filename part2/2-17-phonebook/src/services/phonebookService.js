import axios from 'axios'

const port = 3000
const baseUrl = `http://localhost:${port}/persons`

const getPersons = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const addNewPerson = (newPersonObj) => {
    return axios.post(baseUrl, newPersonObj).then(response => response.data)
}

const updatePerson = (id, newPersonObj) => {
    return axios.put(`${baseUrl}/${id}`, newPersonObj).then(response => response.data)
}

const removePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

export default {
    getPersons,
    addNewPerson,
    updatePerson,
    removePerson
}