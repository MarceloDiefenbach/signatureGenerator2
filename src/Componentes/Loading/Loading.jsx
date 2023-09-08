import React from 'react';
import './Loading.css'

import { Player } from '@lottiefiles/react-lottie-player';

const Loading = () => {
  return (
    <div className='loading-overlay'>
      <Player
        src='https://lottie.host/8db4aa34-3140-41f6-9e5e-d63c2b73a753/cPm7P3T94Q.json'
        className="player"
        loop
        autoplay
        style={{ height: '150px', width: '150px' }}
      />
      <h4 className='loading_label'>
        Carregando
      </h4>
    </div>
  );
}

export default Loading;
