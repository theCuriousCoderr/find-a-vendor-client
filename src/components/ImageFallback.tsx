import React from 'react'

function ImageFallback({size} : {size: string}) {
    return (
      <div className={`${size} flex items-end`}>
        <div className="h-full w-1/2 bg-yellow-500/50"></div>
        <div className="h-[60%] w-1/2 bg-yellow-500/30 -mx-1"></div>
      </div>
    );
  }

export default ImageFallback