import React from 'react';

const Link = ({ className, href, children }) => {
  const onClick = (e) => {
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