import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
})
//admin
export const insertFlight = payload => api.post(`/flight/createflight`, payload)
export const getAllFlights = () => api.get(`/flight/getflights`)
export const getFlightById = id => api.get(`/flight/getflight/${id}`)
export const updateFlightbyId = (id, payload) => api.put(`/flight/updateflight/${id}`, payload)
export const deleteFlightById = id => api.delete(`/flight/deleteflight/${id}`)

//sprint 2 
export const confirmFlight = payload => api.post(`/reservation/createreservation`, payload)

//user profile 
export const getUserInfo = id => api.get(`/user/u/${id}`)
export const updateUserInfo = (id, payload) => api.put(`/user/uupdate/${id}`, payload, {
    headers: {
        'x-access-token': localStorage.getItem('token')
    }
}
)
//
export const getReservationsById = id => api.get(`/reservation/getreservation/${id}`)
export const deleteReservationById = id => api.delete(`/reservation/deletereservation/${id}`)
export const payReservation = (id, payload) => api.post(`/reservation/sendmailpay/${id}`, payload)

//authentication
export const loginUser = payload => api.post(`/user/ulogin`, payload)
export const registerUser = payload => api.post(`/user/ucreate`, payload);
export const validateEmail = payload => api.post('/user/checkEmail', payload);
export const validateUsername = payload => api.post('/user/checkUsername', payload);

//sprint 3
export const updatePassword = (id, payload) => api.put(`/user/passupdate/${id}`, payload)

const apis = {
    insertFlight,
    getAllFlights,
    getFlightById,
    updateFlightbyId,
    deleteFlightById,

    confirmFlight,
    getUserInfo,
    updateUserInfo,
    getReservationsById,
    deleteReservationById,
    payReservation,
    loginUser,
    registerUser,
    validateEmail,
    validateUsername,
    updatePassword,
}

export default apis