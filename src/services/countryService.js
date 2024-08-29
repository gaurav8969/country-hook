import axios from 'axios';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries';

const getAll = () => {
  return axios.get(`${baseUrl}/api/all`)
    .then(response => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error fetching countries:', error);
      return [];
    });
};

const getCountry = async (country) => {
  if(!country)return;

  try{
    const response = await axios.get(`${baseUrl}/api/name/${country}`);
    return response.data;
  }catch(error){
    console.log('no country found');
  }
};

export default {
  getAll,
  getCountry
};