import React from 'react'
import style from '../styles/Spinner.module.css'

function spinner() {
  return (
    <div >
      <div className={style.spinner}></div>
    </div>
  );
}

export default spinner