import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [ term, setTerm ] = useState('');
  const [ results, setResults ] = useState([]);

  // whenever we rerender our coumponent AND term ahs changed, run that arrow function right there.
  // that arrow function gets executed when our component is first rendered as well.
  useEffect(() => {
    const search = async () => {
      const data = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: term
        }
      });
      setResults(data);
    }
    search();
  }, [term])

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label htmlFor="">Enter Search Term</label>
          <input value={term} onChange={e => setTerm(e.target.value)} type="text" className="input"/>
        </div>
      </div>
    </div>
  )
}

export default Search;