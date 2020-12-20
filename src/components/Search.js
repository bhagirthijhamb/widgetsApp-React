import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [ term, setTerm ] = useState('programming');
  const [ results, setResults ] = useState([]);

  console.log(results);
  // whenever we rerender our coumponent AND term ahs changed, run that arrow function right there inside useEffect. (also the first time the component renders)
  // that arrow function gets executed when our component is first rendered as well.
  // useEffect will always be invoked the first time the component is rendered.
  useEffect(() => {
    // create a helper function with temprary variable search 
    // or create a IIFE
    // or use promises
    const search = async () => {
      const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
        // create the query string after ? 
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: term
        }
      });
      setResults(data.query.search);
    }
    // call the helper functio search
    search();
  }, [term])

  const renderedResults = results.map(result => {
    return (
      <div key={result.pageid} className="item">
        <div className="content">
          <div className="header">
            {result.title}
          </div>
          {result.snippet}
        </div>
      </div>
    )
  })

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label htmlFor="">Enter Search Term</label>
          <input value={term} onChange={e => setTerm(e.target.value)} type="text" className="input"/>
        </div>
      </div>
      <div className="ui celled list">
        {renderedResults}
      </div>
    </div>
  )
}

export default Search;