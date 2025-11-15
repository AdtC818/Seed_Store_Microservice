import axios from "axios";

const API_URL = process.env.REACT_APP_CONTACTS_API || "http://localhost:8083";
const CONTACTS_ENDPOINT = `${API_URL}/contacts`;

export const getAllContacts = () => {
  console.log("🌐 GET:", CONTACTS_ENDPOINT);
  return axios.get(CONTACTS_ENDPOINT);
};

export const getContactById = (id) => {
  console.log("🌐 GET:", `${CONTACTS_ENDPOINT}/${id}`);
  return axios.get(`${CONTACTS_ENDPOINT}/${id}`);
};

export const getActiveContacts = () => {
  console.log("🌐 GET:", `${CONTACTS_ENDPOINT}/active`);
  return axios.get(`${CONTACTS_ENDPOINT}/active`);
};

export const getContactsByType = (type) => {
  console.log("🌐 GET:", `${CONTACTS_ENDPOINT}/type/${type}`);
  return axios.get(`${CONTACTS_ENDPOINT}/type/${type}`);
};

export const getContactByIdentification = (identification) => {
  console.log("🌐 GET:", `${CONTACTS_ENDPOINT}/identification/${identification}`);
  return axios.get(`${CONTACTS_ENDPOINT}/identification/${identification}`);
};

export const createContact = (data) => {
  console.log("🌐 POST:", CONTACTS_ENDPOINT, data);
  return axios.post(CONTACTS_ENDPOINT, data);
};

export const updateContact = (id, data) => {
  console.log("🌐 PUT:", `${CONTACTS_ENDPOINT}/${id}`, data);
  return axios.put(`${CONTACTS_ENDPOINT}/${id}`, data);
};

export const deleteContact = (id) => {
  console.log("🌐 DELETE:", `${CONTACTS_ENDPOINT}/${id}`);
  return axios.delete(`${CONTACTS_ENDPOINT}/${id}`);
};