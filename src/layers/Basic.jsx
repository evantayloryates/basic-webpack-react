import React, { useEffect, useState } from 'react';
import { useDeviceInfo } from '../hooks/index';

const clientId = "388498590624-30g1olannucusb9gnhlop2f7chgik9km.apps.googleusercontent.com";
const discoveryDocs = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];
const scope = "https://www.googleapis.com/auth/gmail.send";

function handleClientLoad() {
    // Load the API client and auth2 library
    window.gapi.load('client:auth2', initClient);
}

function initClient() {
    window.gapi.client.init({
        clientId: clientId,
        discoveryDocs: discoveryDocs,
        scope: scope
    }).then(function () {
         // Listen for sign-in state changes.
         gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

         // Handle the initial sign-in state.
         updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
}

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
      // User is signed in.
      // Now you can use gapi.client.gmail.* APIs
  } else {
      // User is not signed in. Start sign-in flow.
      gapi.auth2.getAuthInstance().signIn();
  }
}

const sendEmail = () => {
  const emailContent =
  `To: taylor@nkeylabs.com
  Subject: Test Email
  Content-Type: text/plain; charset=utf-8

  This is a test email from your React Application.`;

  const base64EncodedEmail = btoa(emailContent).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  const request = window.gapi.client.gmail.users.messages.send({
      'userId': 'me',
      'resource': {
          'raw': base64EncodedEmail
      }
  });

  request.execute(response => console.log(response));
}

const Basic = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [targetIndex, setTargetIndex] = useState(null);

  function scrollToPage(index) {
    const pages = document.querySelectorAll('.bpage-container'); // Assuming each page has a class of "page"
    
    if (index >= 0 && index < pages.length) {
      pages[index].scrollIntoView({ behavior: 'smooth' });
    }
  }

  const handleScroll = (evt) => {
    const calculatedIndex = Math.round(evt.target.scrollTop / window.innerHeight)
    
    setActiveIndex (prev => {
      return prev !== calculatedIndex ? calculatedIndex : prev;
    });
  }

  useEffect(() => {
    const scrollerElement = document.getElementById('scroller');

    scrollerElement.addEventListener('scroll', handleScroll);
    return () => {
      scrollerElement.removeEventListener('scroll', handleScroll);
    }
  }, [])

  useEffect(() => {
    if (activeIndex === targetIndex) {
      setTargetIndex(null);
    }
  }, [activeIndex])

  const updatePage = (index) => {
    setTargetIndex(_ => index);
    scrollToPage(index);
  }

  const effectiveIndex = targetIndex === null ? activeIndex : targetIndex;

  const { isMobile } = useDeviceInfo()
  const pathSource = './images/nkey-logo-504x144.png';
  const [width, height] = isMobile ? ['322','92'] : ['504','144'];


handleClientLoad();
  return (
    <div className={`bcontent ${isMobile ? 'mobile' : ''}`} id="scroller">
      <div className={`bmenu-container ${effectiveIndex === 0 ? 'hidden' : ''}`}>
        <ul className='bmenu'>
          <li className={effectiveIndex === 1 ? 'active' : ''} onClick={() => updatePage(1)}>Services</li>
          <li className={effectiveIndex === 2 ? 'active' : ''} onClick={() => updatePage(2)}>About</li>
          <li className={effectiveIndex === 3 ? 'active' : ''} onClick={() => updatePage(3)}>Contact</li>
        </ul>
      </div>

      <button onClick={() => updatePage(1)} className={`scroll-hint beaker-btn ${effectiveIndex === 0 ? 'active' : ''}`}>
          <i className='fa fa-chevron-down' />
      </button>
      
    
      <div className="bpage-container">
        <img 
          className='logo-main'
          src={pathSource}
          alt='NKEY Logo' 
          width={width}
          height={height}
          style={{ imageRendering: 'optimizeQuality' }}
        />
      </div>
      <div className="bpage-container">
        <h1>Services</h1>
        <p>an example text box</p>
      </div>
      <div className="bpage-container">
        <h1>About</h1>
        <p>an example text box</p>
      </div>
      <div className="bpage-container">
        <h1>Contact</h1>
        <p>an example text box</p>
        <button onClick={sendEmail}>Email</button>
      </div>
      <div className='bfooter-container'>
        <p className='footer-text'>&copy; 2023 NKEY Labs, LLC. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Basic;