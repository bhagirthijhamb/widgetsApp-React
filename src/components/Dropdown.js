import React, { useRef, useEffect, useState } from 'react';

const Dropdown = ({ label, options, selected, onSelectedChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Run one time to set up the event listener one time
  useEffect(() => {
    const onBodyClick = (event) => {
      // console.log('BODY clicked!');
      // console.log(event.target);
      if(ref.current && ref.current.contains(event.target)){
        return;
      }
      setOpen(false)
    }
    document.body.addEventListener('click', onBodyClick, { capture: true })

    // cleanup code runs before every rerender
    // and also when the component unmounts
    return () => {
      document.body.removeEventListener('click', onBodyClick, { capture: true })
    }
  }, []) // run one time
  
  const renderedOptions = options.map(option => {
    // if option.value is equal to selected.value, do not render it
    if(option.value === selected.value){
      return null;
    }
    return (
      <div 
        key={option.value} 
        className="item" 
        onClick={() => {
          // console.log('Item clicked!');
          onSelectedChange(option);
        }}
      >
        {option.label}
      </div>
    )
  })
  // console.log(ref.current); 

  return (
    <div ref={ref} className="ui form">
      <div className="field">
        <label htmlFor="" className="label">{label}</label>
        <div 
          onClick={() => {
            // console.log('Dropdown clicked!'); 
            setOpen(!open)
          }} 
          className={`ui selection dropdown ${open ? 'visible active' : ''}`}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu ${open ? 'visible transition' : ''}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dropdown;

// Important
// The Dropdown needs to detect a click event on any element besides one it created
// Event Bubbling is a thing
// The Dropdown has a hard time setting  up event handlers on elements that it does not create.

//So 
// The Dropdown can set up a manual event listener (without React) on the body element.
// A click on any element will bubble up to the body

// Click sequesnce
// Body clicked
// Item clicked
// Dropdown clicked

// Scenario 1
// User clicks on an elemet that is created by the Dropdown Component
// If aa user clicks on one of these elements,then we probably dont want the body event listener to do anything

// Scenario 2
// User clicks on any element besides the ones created by the Dropdown
// I a user clicks on any of these elements, weso want the body event listener to close the dropdown.