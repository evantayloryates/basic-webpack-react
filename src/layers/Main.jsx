import React from 'react';


const Main = () => {
  return (
    <>
        <div className='bmenu-container'>
          <ul className="bmenu">
            <li>
              Home
            </li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="pages">
          <div className="child">Home</div>
          <div className="child">Demo</div>
          <div className="child">About</div>
          <div className="child">Contact</div>
        </div>
      {/* </div> */}
      <div className="footer">Third Row - Sticky to Bottom</div>
      {/* <div className="header">
      </div> */}
      {/* <div className="content"> */}
        {/* <div className="menu">
          <ul className="menulist">
            <li>Home</li>
            <li>Demo</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
          <button className="beaker-btn demo">
            <i className='fa fa-solid fa-flask' />
          </button>
        </div> */}
      
    </>
  );
};

export default Main;

1
2
3
4
5
6
7
8
9
10