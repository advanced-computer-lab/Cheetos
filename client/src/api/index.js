import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
})
//admin
export const insertFlight = payload => api.post(`/flight/createflight`, payload)
export const getAllFlights = () => api.get(`/flight/getflights`)
export const updateFlightbyId = (id, payload) => api.put(`/flight/update/${id}`, payload)
export const deleteFlightById = id => api.delete(`/flight/deleteflight/${id}`)

//sprint 2 
export const confirmFlight = payload => api.post(`/reservation/createreservation`, payload)

//user profile 
export const getUserInfo = id => api.get(`/user/u/${id}`)
export const updateUserInfo = (id, payload) => api.put(`/user/uupdate/${id}`, payload)
//
export const getReservationsById = id => api.get(`/reservation/getreservation/${id}`)

const apis = {
    insertFlight,
    getAllFlights,
    updateFlightbyId,
    deleteFlightById , 
    
    confirmFlight , 
    getUserInfo , 
    updateUserInfo , 
    getReservationsById
}

export default apis