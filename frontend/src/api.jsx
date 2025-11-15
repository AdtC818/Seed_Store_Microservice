import axios from 'axios';

const contactsBase = process.env.REACT_APP_CONTACTS_API || 'http://contacts-service:8080';
const seedsBase = process.env.REACT_APP_SEEDS_API || 'http://seed-service:8080';
const sowingBase = process.env.REACT_APP_SOWING_API || 'http://sowing-service:8080';

export const getContacts = async () => {
  const res = await axios.get(`${contactsBase}/api/contacts`);
  return res.data;
};

export const getSeeds = async () => {
  const res = await axios.get(`${seedsBase}/api/seeds`);
  return res.data;
};

export const getSowings = async () => {
  const res = await axios.get(`${sowingBase}/api/sowings`);
  return res.data;
};
