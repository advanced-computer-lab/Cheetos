import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
})

export const insertFlight = payload => api.post(`/create`, payload)
export const getAllFlights = () => api.get(`/`)
export const updateFlightbyId = (id, payload) => api.put(`/update/${id}`, payload)
export const deleteFlightById = id => api.delete(`/delete/?id=${id}`)


const apis = {
    insertFlight,
    getAllFlights,
    updateFlightbyId,
    deleteFlightById
}

export default apis