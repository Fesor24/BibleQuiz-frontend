import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import style from '../styles/Home.module.css';
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { checkTokenForExpiry } from '../helper/coreFunction';


function Home() {

  useEffect(() => {
    document.title = "Home"

    checkTokenForExpiry();

  }, [])

  return (
    <div className={style.container}>
      <div className={style.mainWrapper}>
        <h1 className = {`${style.mainTitle} ${style.mainTitleEffect}`}>gtcc bible quiz</h1>
        

        <Link to="/category">
          <Button name="Get started">
            <i class="fa fa-play-circle" aria-hidden="true"></i>
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;