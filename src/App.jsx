import React, { useState, useEffect } from 'react';
import countryService from './services/countryService';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      const data = await countryService.getCountry(name);
      setCountry(data);
    };
    fetchCountry();

  }, [name]);

  if(!name)return {
    empty: true
  };

  if(!country)return {
    found: false
  };

  return country;
};

const Country = ({ country }) => {
  if(country.empty){
    return;
  }

  if ('found' in country && !country.found) {
    return (
      <div>
        not found...
      </div>
    );
  }

  return (
    <div>
      <h3>{country.name.common} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div>
      <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`}/>
    </div>
  );
};

const App = () => {
  const nameInput = useField('text');
  const [name, setName] = useState('');
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <button>find</button>
        <input {...nameInput} />
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;