import React from 'react';

import { Feed } from '~/components';


const IPhone = ({ activate }) => {

  const getActivateClass = () => {
    if (activate === true) return 'iphone activate';
    if (activate === false) return 'iphone deactivate';
    return 'iphone';
  }
  return (
    <div className={getActivateClass()}>
      <div className="screen">
        <Feed />
      </div>
      <div className="island"></div>
      <div className="swiper"></div>
      <div className="btn right lock"></div>
      <div className="btn left volume up"></div>
      <div className="btn left volume down"></div>
      <div className="btn left ringer"></div>
    </div>
  );
}

export default IPhone;