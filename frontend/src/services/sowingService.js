import axios from "axios";

const API_URL = process.env.REACT_APP_SOWING_API || "http://localhost:8082";
const SOWINGS_ENDPOINT = `${API_URL}/sowings`;

export const getAllSowings = () => {
  return axios.get(SOWINGS_ENDPOINT);
};

export const getActiveSowings = () => {
  return axios.get(`${SOWINGS_ENDPOINT}/active`);
};

export const registerSowing = (data) => {
  return axios.post(SOWINGS_ENDPOINT, data);
};

export const updateSowingStatus = (id, status) => {
  return axios.patch(`${SOWINGS_ENDPOINT}/${id}/status?status=${status}`);
};

export const deleteSowing = (id) => {
  return axios.delete(`${SOWINGS_ENDPOINT}/${id}`);
};