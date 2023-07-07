import React, { useState } from 'react';
import IPhone from '~/components/iphone.jsx';
import { useDeviceInfo } from '~/hooks'

const Home = () => {
  const { isMobile } = useDeviceInfo()
  const pathSource = isMobile ? './images/nkey-logo-322x92.png' : './images/nkey-logo-504x144.png';
  const [width, height] = isMobile ? ['322','92'] : ['504','144'];
  const [demoPageActive, setDemoPageActive] = useState();


  const toggleDemoPage = () => setDemoPageActive(prev => !prev);

  const getBeakerClass = () => {
    if (demoPageActive === true) return 'beaker-btn demo';
    if (demoPageActive === false) return 'beaker-btn nodemo';
    return 'beaker-btn';
  }
  
  const getCircleClass = () => {
    if (demoPageActive === true) return 'circle activate';
    if (demoPageActive === false) return 'circle deactivate';
    return 'circle';
  }

  return (
    <div className={isMobile ? 'page-container mobile' : 'page-container'}>
      <div className='page-body'>
        <img 
          className='logo-main'
          src={pathSource}
          alt='NKEY Logo' 
          width={width}
          height={height}
          style={{ imageRendering: 'optimizeQuality' }}
        />

        <div className={getCircleClass()} />
        
        <IPhone activate={demoPageActive}/>
        
        <button onClick={toggleDemoPage} className={getBeakerClass()}>
          <i className='fa fa-solid fa-flask' />
        </button>
      </div>
      <div className='page-footer'>
        <p className='footer-text'>&copy; 2023 NKEY Labs. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Home;
