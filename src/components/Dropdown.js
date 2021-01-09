import React, { useRef, useEffect, useState } from 'react';

const Dropdown = ({ label, options, selected, onSelectedChange }) => {
  const [open, setOpen] = useState(false);
  // create ref object, then assign it to the most parent element we are returning from this component
  // now when the component is rendered for the very first time, we can get a reference to it by saying ref.current (current property on ref gives us reference to the element)
  const ref = useRef();

  // Run one time to set up the event listener one time
  useEffect(() => {
    const onBodyClick = (event) => {
      // console.log('BODY clicked!');
      // console.log(event.target);
      // contain method belongs to all DOM elements and it allows us to check if one DOM element is contained inside of another
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

// when the user clicks on an item, the browser itself creates an event object. The event object describes some information about the click eg. where the mouse wa when the user click, what element the user clicked on
// The browser then hands off the event object to React. React does some processing on that event and then provides the event object to onClick event handler.
// onClick gets invoked and the first orgument to it tis the event object
// Event Bubbling- when the user clicks the element, the event does not stop there. Instead the event object trvels up tot he next parent element to that div. If that element has a click event handler on it, it is automatically invoked.
// this way the event travels up the all the parent elements and the browser checks it the parent element has a event handler. if it does, it is invoked automatically. So the event bubbles up the DOM structure

// Click sequesnce
// Body clicked
// Item clicked
// Dropdown clicked

// Scenario 1
// User clicks on an element that is created by the Dropdown Component
// If aa user clicks on one of these elements,then we probably dont want any code we write inside the body event listener to open/close the dropdown

// Scenario 2
// User clicks on any element outside the ones created by the Dropdown
// If a user clicks on any of these elements, we so want the body event listener to close the dropdown.(because the click event already bubbles up and reaches the parent element onwhich the event handler to flip the open state is set, which sets it to close)

// so we have to figure out 
// 1. what elelemt was clicked
// 2. whether or no that element is inside the dropdown (with useRef)

// useRef is similar to React.createRef
// allows us to create a reference to a direct DOM element
// We are gona make use of useRef to get reference to the most parent element that is being created by the Dropdown(div with classs "ui form")
// then checking if the clicked element is within this element

