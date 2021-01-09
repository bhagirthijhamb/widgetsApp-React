import React, { Fragment, useState } from 'react';

const Accordion = ({ items }) => {
  // array destructuring
  const [activeIndex, setActiveIndex] = useState(null)
  // alternate to 
  // const things = useState(null);
  // activeIndex = things[0]; piece of state
  // setActiveIndex = things[1]; function that we call to update this piece of state (will cause the component to rerender)
  // useState() takes default value for our pice of state (null here)
  // Is immediately asssigned to activeIndex which is later updated by using setActiveindex()

  // helper function
  const onTitleClick = (index) => {
    // console.log('Title Clicked', index)
    setActiveIndex(index);
  }
  const renderedItems = items.map((item, index) => {
    const active = index === activeIndex ? 'active' : '';
    return (
      <Fragment key={item.title}>
        <div className={`title ${active}`} onClick={() => onTitleClick(index)}>
          <i className="dropdown icon"></i>
          {item.title}
        </div>
        <div className={`content ${active}`}>
          <p>{item.content}</p>
        </div>
      </Fragment>
    )
  })

  return (
    <div className="ui styled accordion">
      {/* <h2>{items.length}</h2> */}
      {renderedItems}
      {/* <h1>{activeIndex}</h1> */}
    </div>
  )

}

export default Accordion;