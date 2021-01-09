import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Convert = ({ language, text }) => {
  const [translated, setTranslated] = useState('');
  const [debouncedText, setDebouncedText] = useState(text);

  useEffect(() => {
    const timerId  = setTimeout(() => {
      setDebouncedText(text);
    }, 1000)

    return () => { // cleanup function
      clearTimeout(timerId);
    }
  }, [text])
  
  useEffect(() => {
    // console.log('New language or text');
    const doTranslation = async () => {
      const { data } = await axios.post('https://translation.googleapis.com/language/translate/v2', {}, {
      params: {
        // q: text,
        q: debouncedText,
        target: language.value,
        key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
      }
    })
    setTranslated(data.data.translations[0].translatedText);
    }

    doTranslation(); // this function will be called anytime we first load the component, change language or chnage test
  // }, [language, text])
  }, [language, debouncedText])
  return (
    <h1 className="ui header">{translated}</h1>
  );
}

export default Convert;

// text === ''
// useEffect # 1
// Set a timer to update 'debouncedText' in 500ms
// Return a cleanup function that cancels this timer

// debouncedText === ''
// useEffect # 2
// Make a request with 'debouncedText'