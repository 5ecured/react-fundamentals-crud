import axios from 'axios'
const base = 'http://localhost:3001/players'

const getService = async () => {
    const res = await axios.get(base)
    return res.data
}

const addService = async obj => {
    const res = await axios.post(base, obj)
    return res.data
}

const editService = async (id, obj) => {
    const res = await axios.put(`${base}/${id}`, obj)
    return res.data
}

const deleteService = async id => {
    await axios.delete(`${base}/${id}`)
}

const toggleService = async (id, obj) => {
    const res = await axios.patch(`${base}/${id}`, obj)
    return res.data
}

const toggleAllService = async () => {
    await axios.patch(base)
    // return res.data
}

export default { getService, addService, editService, deleteService, toggleService, toggleAllService }