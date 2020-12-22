import { useEffect, useState } from 'react';

const Route = ({ path, children }) => {
  // this piece of state exists is to get our route to update
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    // creating the callback function as a separate variable
    // If we ever decide to stop showing the Route component on the screen, we want to make sure we clean up this event listener
    const onLocationChange = () => {
      // console.log('Location change');
      setCurrentPath(window.location.pathname);
    }
    window.addEventListener('popstate', onLocationChange)

    // so we return a cleanup function where we remove the event listener
    return () => {
      window.removeEventListener('popstate', onLocationChange);
    }
  })
  // return window.location.pathname === path ? children : null
  return currentPath === path ? children : null
}

export default Route;

// Anytime we setup an event listener inside of a component, we need a useEffect hook
// Event handlers that we wie up mannullay inside of the component.
// Usually we want to run that event handler to run one time or to wire up and start listening one time. So we mention empty array ([]) as a second argument to the useEffect.
// that means only run that code whent he compoentn is first rendred to the screen.