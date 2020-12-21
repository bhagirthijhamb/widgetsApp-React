import React, { useState } from 'react';
import Accordion from './components/Accordion';
import Search from './components/Search';
import Counter from './components/Counter';
import Drowpdown from './components/Dropdown';
import Dropdown from './components/Dropdown';

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
// Static array of data, so it can  be defined inside the component or outside
const options = [
  { label: 'The Color Red', value: 'red' },
  { label: 'The Color Green', value: 'green' },
  { label: 'A shade of Blue', value: 'blue' }
]

export default () => {
  const [selected, setSelected] = useState(options[0])
  return (
    <div>
      {/* <Accordion items={items} /> */}
      {/* <Search /> */}
      {/* <Counter /> */}
      <Dropdown options={options} selected={selected} onSelectedChange={setSelected} />
    </div>
  )
}

// An accordion component
// A Wikipedia  API search component
// A Dropdown item selection component
// A google Translate API component