import React, { useEffect, useState } from 'react';
import { useDeviceInfo } from '../hooks/index';
import emailjs from '@emailjs/browser';


const Basic = () => {
  const [activeIndex, setActiveIndex] = useState(3);
  const [targetIndex, setTargetIndex] = useState(null);
  const [contactFormLoading, setContactFormLoading] = useState(false);

  const [successToastActive, setSuccessToastActive] = useState(false);

  function scrollToPage(index) {
    const pages = document.querySelectorAll('.bpage-container'); // Assuming each page has a class of "page"
    
    if (index >= 0 && index < pages.length) {
      pages[index].scrollIntoView({ behavior: 'smooth' });
    }
  }

  const handleSuccess = (evt, res) => {
    evt.target.reset();
    setSuccessToastActive(p => true);
    setInterval(() => {
      setSuccessToastActive(p => false);
    }, 5000)

  }

  const sendEmail = (e) => {
    e.preventDefault();
    
    setContactFormLoading(true);
    emailjs.sendForm('nkey-email-client', 'nkey-public-contact-form', e.target, 'gf7mYyCUkILOQTGHL')
    .then((res) => handleSuccess(e, res))
    .finally(() => setContactFormLoading(false))
  }

  const handleScroll = (evt) => {
    const calculatedIndex = Math.round(evt.target.scrollTop / window.innerHeight)
    
    setActiveIndex (prev => {
      return prev !== calculatedIndex ? calculatedIndex : prev;
    });
  }

  useEffect(() => {
    scrollToPage(activeIndex);
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
  // const isMobile = true;
  const pathSource = './images/nkey-logo-504x144.png';
  const [width, height] = isMobile ? ['322','92'] : ['504','144'];

  return (
    <div className={`bcontent ${isMobile ? 'mobile' : ''}`} id="scroller">
      <div className={`success-toast ${successToastActive ? 'active' : ''}`}>
        Email sent <i className="fa-solid fa-check fa-lg"></i>
      </div>
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
        <h1>Let’s connect</h1>
        <form id="contact-form" className={contactFormLoading ? 'loading' : ''} onSubmit={sendEmail}>
          <label htmlFor="name">Name <sup>*</sup></label>
          <input type="text" id="name" name="name" required />
          <br/>

          <label htmlFor="email">Email <sup>*</sup></label>
          <input type="email" id="email" name="email" required />
          <br/>

          <label htmlFor="message">Message <sup>*</sup></label>
          <textarea id="message" name="message" rows="4" required></textarea>
          <br/>

          <button type="submit" value="Submit">Submit</button>
        </form>
      </div>
      <div className='bfooter-container'>
        <p className='footer-text'>&copy; 2023 NKEY Labs, LLC. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Basic;