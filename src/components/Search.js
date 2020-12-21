import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [ term, setTerm ] = useState('programming');
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [ results, setResults ] = useState([]);

  console.log(results);

  // Update debounced term // Implemente debouncing action
  useEffect(() => {
    // setup timer to watch debounced term
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);

    // if the user updates term quickly, cancel timer to setDebouncedTerm and setup a new timer
    return () => {
      clearTimeout(timerId)
    }
  }, [term]) // watch term


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
          srsearch: debouncedTerm
        }
      });
      setResults(data.query.search);
    }
    search();
  }, [debouncedTerm])


  const renderedResults = results.map(result => {
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a href={`https://en.wikipedia.org?curid=${result.pageid}`} className="ui button">Go</a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
          {/* {result.snippet} */}
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