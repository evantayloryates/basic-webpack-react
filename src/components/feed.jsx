import React from 'react';

import { Card } from '~/components';
import Bart from '~/templates/bart/bart'; 


const Feed = () => {
  
  return (
    <div className='feed-container'>
      <div className='feed-header'></div>
      <div className='feed-body'>
        <Card />
        <Bart />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default Feed;