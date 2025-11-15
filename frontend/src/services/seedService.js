import axios from "axios";

const API_URL = "http://localhost:8081/api/seeds";

export const getAllSeeds = () => axios.get(API_URL);

export const getSeedById = (id) => axios.get(`${API_URL}/${id}`);

export const createSeed = (data) => axios.post(API_URL, data);

export const updateSeed = (id, data) => axios.put(`${API_URL}/${id}`, data);

export const deleteSeed = (id) => axios.delete(`${API_URL}/${id}`);
