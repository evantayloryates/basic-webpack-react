import React, { useEffect, useState } from 'react';
import './bart.scss'

import poster from './assets/poster_300x175.jpeg';
import productBrandLogo from './assets/product-brand-logo.svg';
import { PlayIcon, VolumeIcon, ProgressBarSummary, ProgressBar, ShirtIcon, CloseIcon, ColorSelector } from './components'


const INITIAL_PLAYTIME_DATA = {
  currentSeconds: 0,
  totalSeconds: 256,
}

const getVideo = () => {
  return document.getElementById('video-player');
}

const START_TIME = 0;
const productRanges = [
  {
    start: 6.5,
    end: 15.5,
  },
  {
    start: 17.5,
    end: 21.3,
  },
  {
    start: 23.5,
    end: 38,
  },
  {
    start: 39.3,
    end: 44,
  },
  {
    start: 56.5,
    end: 60.1,
  },
  {
    start: 65.1,
    end: 74.3,
  },
  {
    start: 105.6,
    end: 117,
  },
  {
    start: 156,
    end: 158,
  },
  {
    start: 191.2,
    end: 196.8,
  },
  {
    start: 201.4,
    end: 211.5,
  },
  {
    start: 218.3,
    end: 224,
  },
  {
    start: 232.6,
    end: 234,
  },
]

const colors = {
  'black': {
    id: 'black',
    displayName: 'Black',
    styleColor: 'rgb(42,43,47)',
    default: false,
    img: './images/colors/black_product.png',
    price: 298,
    href: 'https://huckberry.com/store/flint-and-tinder/category/p/59676-flannel-lined-waxed-trucker-jacket',
  },
  'coal': {
    id: 'coal',
    displayName: 'Coal',
    styleColor: 'rgb(49,49,49)',
    default: false,
    img: './images/colors/coal_product.png',
    price: 298,
    href: 'https://huckberry.com/store/flint-and-tinder/category/p/55983-flannel-lined-waxed-trucker-jacket',
  },
  'dark_navy': {
    id: 'dark_navy',
    displayName: 'Dark Navy',
    styleColor: 'rgb(51,57, 63)',
    default: false,
    img: './images/colors/dark_navy_product.png',
    price: 298,
    href: 'https://huckberry.com/store/flint-and-tinder/category/p/75964-flannel-lined-waxed-trucker-jacket',
  },
  'field_tan': {
    id: 'field_tan',
    displayName: 'Field Tan',
    styleColor: 'rgb(178, 143, 96)',
    default: true,
    img: './images/colors/field_tan_product.png',
    price: 298,
    href: 'https://huckberry.com/store/flint-and-tinder/category/p/55166-flannel-lined-waxed-trucker-jacket',
  },
  'havana': {
    id: 'havana',
    displayName: 'Havana',
    styleColor: 'rgb(118, 78, 54)',
    default: false,
    img: './images/colors/havana_product.png',
    price: 298,
    href: 'https://huckberry.com/store/flint-and-tinder/category/p/55984-flannel-lined-waxed-trucker-jacket',
  },
  'light_grey': {
    id: 'light_grey',
    displayName: 'Light Grey',
    styleColor: 'rgb(78, 78, 78)',
    default: false,
    img: './images/colors/light_grey_product.png',
    price: 298,
    href: 'https://huckberry.com/store/flint-and-tinder/category/p/59463-flannel-lined-waxed-trucker-jacket',
  },
  'forest': {
    id: 'forest',
    displayName: 'Forest',
    styleColor: 'rgb(89, 78, 59)',
    default: false,
    img: './images/colors/forest_product.png',
    price: 298,
    href: 'https://huckberry.com/store/flint-and-tinder/category/p/71015-flannel-lined-waxed-trucker-jacket',
  },
}


const Bart = () => {

  // const togglePlayState = () => {
  //   const video = document.getElementById('video-player');
  //   console.log('PLAYING INLINE WITHOUT CONTROLS');
  //   if (video.paused) {
  //     video.play();
  //   } else {
  //     video.pause();
  //   }
  // }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const video = document.getElementById('video-player');
      let liveProduct = false;
      productRanges.forEach(({start, end}) => {
        if (video.currentTime >= start && video.currentTime <= end) {
          liveProduct = true;
        }
      })
      if (liveProduct) {
        setProductPopperFocused(prev => true);
      } else {
        setProductPopperFocused(prev => false);
      }
    }, 100);
    const video = document.getElementById('video-player');
    window.v = video;
    video.volume = 0;
    video.currentTime = START_TIME;

    return () => {
      clearInterval(intervalId);
    };
  }, []);


  // const [pressedState, setPressedState] = useState('');
  const [productPopperFocused, setProductPopperFocused] = useState(false);
  const [productOverlayActive, setProductOverlayActive] = useState(false);
  // const [muted, setMuted] = useState(true);


  // const shirtIcon = shirtIconFG;
  // const shirtIcon = productPopperState === 'background' ? shirtIconBG : shirtIconFG;

  
  const pauseVideo = (paused) => {
    const video = getVideo();
    if (paused) { video.pause() }
    else { video.play() }
  }

  const muteVideo = (muted) => {
    const video = getVideo();
    if (muted) { video.volume = 0 }
    else { video.volume = 1 }
  }

  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(true);

  const [playedBefore, setPlayedBefore] = useState(false);
  const defaultColor = Object.values(colors).find(c => c.default);
  const [activeColor, setActiveColor] = useState(defaultColor.id);
  
  const toggleMuted = () => {
    muteVideo(!muted)
    setMuted(prev => !prev)
  }

  const togglePaused = () => {
    pauseVideo(!paused)
    if (!playedBefore) {
      muteVideo(false)
      setMuted(prev => false)
      setPlayedBefore(prev => true)
    }
    setPaused(prev => !prev)
  }


  const calcPercentage = (video) => {
    if (video) {
      const percentage = (video.currentTime / video.duration) * 100;
      return Math.round(percentage)
    } else {
      return 0
    }
  }
  const calcPlaytimeData = (video) => {
    if (video) {
      return {
        currentSeconds: video ? Math.floor(video.currentTime) : null,
        totalSeconds: video? Math.floor(video.duration): null,
      }
    } else { return INITIAL_PLAYTIME_DATA }
  }

  useEffect(() => {
    muteVideo(muted);
    pauseVideo(paused);
  }, [])

  
  const preMediaVisibilityClass = paused ? 'visible' : 'hidden';

  const inOverlayMode = () => {
    return paused;
  }

  const modeClass = inOverlayMode() ? 'overlay-mode' : 'player-mode';

  const { currentSeconds, totalSeconds } = calcPlaytimeData(getVideo());

  const productOverlayClass = productOverlayActive ? 'active' : 'inactive';

  return (
    <>
      <div className='bart-shell'>
        <div className={`pre-media-layer fill ${preMediaVisibilityClass}`}> 
          <img style={{ maxWidth: '300px', maxHeight: '175px' }} src={poster} />
          <img className='title-logo' src='./images/film-logo.png' />
        </div>
        <div className='product-layer'>
          <ShirtIcon focused={productPopperFocused && !inOverlayMode()} onClick={() => setProductOverlayActive(prev => true)}/>
        </div>
        <div className={`product-overlay ${productOverlayClass}`}>
          <div className='product-overlay-panel'>
            <div className='colors-column'>
              { Object.values(colors).map(c => (
                <ColorSelector 
                  onClick={() => setActiveColor(prev => c.id)}
                  styleColor={c.styleColor}
                />
              ))}              
            </div>
            <div className='product-column'>
              <img style={{maxHeight: '20px'}} src={productBrandLogo} />
              <img style={{maxHeight: '150px'}} src={colors[activeColor].img} />
              <div className='product-overlay-cta' onClick={() => {window.open(colors[activeColor].href, '_blank');}}>
                <div style={{color: 'darkgrey'}}>{`$${colors[activeColor].price}`}</div>
                <div>Buy Now</div>
              </div>
            </div>
            <div className='actions-column'>
              <CloseIcon onClick={() => setProductOverlayActive(prev => false)}/>
            </div>
          </div>
        </div>
        <div className='controls-layer'>
          <div className={`main-controls ${modeClass}`}>
            <PlayIcon paused={paused} togglePaused={togglePaused} />
            <ProgressBarSummary 
              currentSeconds={currentSeconds}
              totalSeconds={totalSeconds}
              overlayMode={inOverlayMode()}/>
            <VolumeIcon muted={muted} toggleMuted={toggleMuted} />
          </div>
          <ProgressBar overlayMode={inOverlayMode()} percent={calcPercentage(getVideo())} />
        </div>
        <div className='media-layer fill'> 
          <video 
            id='video-player' 
            className='bart-main-media' 
            // src={video}
            src='https://user-images.githubusercontent.com/12351038/233921332-212ad50b-4b39-4ea0-910e-c26b9537730d.mp4'
            type='video/mp4'
            autoPlay={false} 
            webkit-playsinline
            playsInline 
            controls={false} /> 
        </div>
      </div>
      {/* <div className='pie no-round'></div> */}
    </>
  );
}

export default Bart;
