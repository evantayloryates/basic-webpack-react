import React from 'react';
import beakerIcon from '../icons/chemistry.png';

const Home = () => {
  return (
    <div className="page-container">
      <div className="page-body">
        <h1 className="logo">
          <div className="logo-letter n">
            <div className='letter'>N</div>
            <div className="overlay"/>
          </div>
          <div className="logo-letter k">
            <div className='letter'>K</div>
            <div className="overlay"/>
          </div>
          <div className="logo-letter e">
            <div className='letter'>E</div>
            <div className="overlay"/>
          </div>
          <div className="logo-letter y">
            <div className='letter'>Y</div>
            <div className="overlay"/>
            <div className="logo-small">labs</div>
          </div>
        </h1>
        {/* <div className="neumorphic-button">Test</div>
        <div className='beaker-button'>
          <img className="beaker-icon" src={beakerIcon} alt="glass beaker icon"></img>
        </div> */}

        <ul>
          <li><a href="#"><i class="fa fa-solid fa-flask" aria-hidden="true"></i></a></li>
        </ul>
      </div>
      <div className="page-footer">
        <p className='footer-text'>&copy; 2023 NKEY Labs. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Home;
