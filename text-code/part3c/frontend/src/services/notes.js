import axios from 'axios'

const port = 3000
const baseUrl = `/api/notes`

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = (newObject) => {
    return axios.post(baseUrl, newObject).then(response => response.data)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
}

const getAllWithNonExisting = () => {
    const request = axios.get(baseUrl)
    const nonExisting = {
        id: 10000,
        content: 'This note is not saved to server',
        important: true,
    }
    return request.then(response => response.data.concat(nonExisting))
}

export default {
    getAll,
    create,
    update,
    getAllWithNonExisting
}