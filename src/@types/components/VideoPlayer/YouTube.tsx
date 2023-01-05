import React from 'react';

import ReactPlayer from 'react-player/youtube'

export function YouTubePlayer({ videoId }) {
  
  return (
    
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoId}`}
        width='100%'
        height='100%'
      />
  );
}