import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [term, setTerm ] = useState('');

  // whenever we rerender our coumponent AND term ahs changed, run that arrow function right there.
  // that arrow function gets executed when our component is first rendered as well.
  useEffect(() => {
    
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