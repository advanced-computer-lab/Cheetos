import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});
//admin
export const insertFlight = (payload) =>
  api.post(`/flight/createflight`, payload, {
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  });
export const getAllFlights = () => api.get(`/flight/getflights`);
export const getFlightById = (id) => api.get(`/flight/getflight/${id}`);
export const updateFlightbyId = (id, payload) =>
  api.put(`/flight/updateflight/${id}`, payload, {
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  });
export const deleteFlightById = (id) =>
  api.delete(`/flight/deleteflight/${id}`, {
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  });

//sprint 2
export const confirmFlight = (payload) =>
  api.post(`/reservation/createreservation`, payload, {
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  });

export const editReservation = (id, payload) =>
  api.put(`/reservation/updatereservationflight/${id}`, payload,
    {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }
  );


//user profile
export const getUserInfo = (id) => api.get(`/user/u/${id}`);
export const updateUserInfo = (id, payload) =>
  api.put(`/user/uupdate/${id}`, payload, {
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  });
//
export const getReservationsById = (id) =>
  api.get(`/reservation/getreservation/${id}`, {
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  });
export const deleteReservationById = (id) =>
  api.delete(`/reservation/deletereservation/${id}`, {
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  });
export const payReservation = (id, payload) =>
  api.post(`/reservation/sendmailpay/${id}`, payload, {
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  });

//authentication
export const loginUser = (payload) => api.post(`/user/ulogin`, payload);
export const registerUser = (payload) => api.post(`/user/ucreate`, payload);
export const validateEmail = (payload) => api.post("/user/checkEmail", payload);
export const validateUsername = (payload) =>
  api.post("/user/checkUsername", payload);

//sprint 3
export const updatePassword = (id, payload) =>
  api.put(`/user/passupdate/${id}`, payload, {
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  });

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
  editReservation,
};

export default apis;
