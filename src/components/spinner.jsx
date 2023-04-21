import React from 'react'
import style from '../styles/Spinner.module.css'

function spinner({position, top, right, width, height, zIndex}) {
  return (
    
      <div className={style.spinner} style={{position: position, top:top, 
        right:right, height:height, width:width}}></div>
    
  );
}

export default spinner