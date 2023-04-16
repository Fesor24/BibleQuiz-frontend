import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import style from '../styles/Home.module.css';
import { useEffect } from 'react';
import { checkTokenForExpiry } from '../helper/coreFunction';


function Home() {

  useEffect(() => {
    document.title = "Home"

    checkTokenForExpiry();

  }, [])

  var curWidth =window.innerWidth

  // console.log(curWidth);

  var desiredWidth = 400;

  var phoneButton = curWidth < desiredWidth;

  return (
    <div className={style.container}>
      <div className={style.mainWrapper}>
        <h1 className={`${style.mainTitle} ${style.mainTitleEffect}`}>
          gtcc bible quiz
        </h1>

        <Link to="/category">
          <Button
            name="Get started"
            fontSize={phoneButton && "1.5rem"}
            borderRadius={phoneButton && "20px"}
            padding={phoneButton && ".7rem 1.5rem"}
          >
            <i class="fa fa-play-circle" aria-hidden="true"></i>
          </Button>
        </Link>
      </div>
      {/* <p className={style.developer}>Developed by <a href="mailto:onafesowale@gmail.com">Fesor</a></p> */}
    </div>
  );
}

export default Home;