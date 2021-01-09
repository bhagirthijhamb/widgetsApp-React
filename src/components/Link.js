import React from 'react';

const Link = ({ className, href, children }) => {
  const onClick = (e) => {
    // metaKey and ctrlKey are both boolean properties
    // these are goig to be either true/false based on whether the respective key was held down when the user clicked on this thing 
    // if either of these are true, we dont want to run any of the below stuff. Instead we want the browser to do just its normal thing which is to open a new tab and navigate to the href on this link.
    // so if either of these are true, we return early
    if(e.metaKey || e.ctrlKey){
      return;
    }

    e.preventDefault();
    window.history.pushState({}, '', href);

    // This will communicate to the Route components that the url has just changed
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
    // Go to Route component and tell it to listen this above event
  }

  return (
    <a onClick={onClick} className={className} href={href}>
      {children}
    </a>
  )
}

export default Link;