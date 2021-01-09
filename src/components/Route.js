import { useEffect, useState } from 'react';

const Route = ({ path, children }) => {
  // this piece of state follows/tracks what the value of window.location.pathname is.
  // window.location.pathname is always kept uptodate (whenever you look at wondow.location.pathname it is going to show exactly whatever the pathname is inside the address bar. )
  // we are introducing this piece of state whose sole purpose is to get the Route component to rerender itself (otherwise we could have refered to window.location.pathname to know what the current path is)
  // this piece of state exists is to get our route to update
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // asiigning an event listener inside a component is usually done inside useEffect hook
  useEffect(() => {
    // Event handlers we wire up manually inside the component
    // Usually we only want that event handler to run/wired up/start listening one time
    // creating the callback function as a separate variable
    // If we ever decide to stop showing the Route component on the screen, we want to make sure we clean up this event listener
    const onLocationChange = () => {
      // console.log('Location change');
      setCurrentPath(window.location.pathname);
    }
    window.addEventListener('popstate', onLocationChange)

    // so we return a cleanup function where we remove the event listener on 'popstate' event
    return () => {
      window.removeEventListener('popstate', onLocationChange);
    }
  }, []) // only run the function inside useEffect when the componenet is first rendered to the screen

  // return window.location.pathname === path ? children : null
  return currentPath === path ? children : null
}

export default Route;

// Anytime we setup an event listener inside of a component, we need a useEffect hook
// Event handlers that we wire up mannully inside of the component.
// Usually we want to run that event handler to run one time or to wire up and start listening one time. So we mention empty array ([]) as a second argument to the useEffect.
// that means only run that code when the component is first rendered to the screen.