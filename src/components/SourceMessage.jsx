import React from 'react'
import Button from "./Button"
import styles from "../styles/Source.module.css"
import { Link } from 'react-router-dom'

function SourceMessage({name, source, link}) {
  return (
    <div className={styles.container}>
      <div className={styles.mainWrapper}>
        <h3 className={styles.source}>{source}</h3>
        <Link to={link}>
          <Button name={name}>
            <i class="fa-sharp fa-solid fa-play"></i>
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default SourceMessage