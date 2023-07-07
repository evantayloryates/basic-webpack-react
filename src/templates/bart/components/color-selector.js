import React from 'react';

const ColorSelector = ({ styleColor, onClick }) => {

  return (
    <div onClick={onClick} style={{cursor: 'pointer', width: '26px', height: '26px', borderRadius: '50%', backgroundColor: styleColor}} />
  )
}

export default ColorSelector;