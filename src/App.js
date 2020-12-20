import React from 'react';
import Accordion from './components/Accordion';
import Search from './components/Search';
import Counter from './components/Counter';

const items = [
  {
    title: 'What is React?',
    content: 'React is a front-end JavaScript framework'
  },
  {
    title: 'Why use React?',
    content: 'React is a favourite JavaScript framework amongst engineers'
  },
  {
    title: 'How do you use React?',
    content: ' You use React by creating components'
  }
]

export default () => {
  return (
    <div>
      {/* <Accordion items={items} /> */}
      <Search />
      {/* <Counter /> */}
    </div>
  )
}

// An accordion component
// A Wikipedia  API search component
// A Dropdown item selection component
// A google Translate API component