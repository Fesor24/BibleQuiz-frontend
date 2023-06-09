import React, {useEffect, useState} from "react";
import Button from "../components/Button";
import style from "../styles/Home.module.css";
import { Link } from "react-router-dom";
import { checkTokenForExpiry } from "../helper/coreFunction";

function Category() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    document.title = "Category";

    const loggedIn = checkTokenForExpiry();

    setIsLoggedIn(loggedIn);

    
  }, [isLoggedIn]);

  var curWidth = window.innerWidth;

  // console.log(curWidth);

  var desiredWidth = 400;

  var phoneButton = curWidth < desiredWidth;

  const handleLogOut = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("hasAccess");
    setIsLoggedIn(false)
  }

  return (
    <div className={style.container}>
      <div className={style.mainWrapper}>
        <h1 className={style.mainTitle}>Sections</h1>
        <Link to="/tq-source">
          <Button
            name="1000 Questions"
            fontSize={phoneButton && "1.3rem"}
            borderRadius={phoneButton && "20px"}
            padding={phoneButton && ".7rem 1.5rem"}
          >
            <i class="fa fa-file-text" aria-hidden="true"></i>
          </Button>
        </Link>
        {/* <p className={style.info}>Questions from BibleQuiz.Org</p> */}
        <Link to="/fq-source">
          <Button
            name="Fesor's Question"
            fontSize={phoneButton && "1.3rem"}
            borderRadius={phoneButton && "20px"}
            padding={phoneButton && ".7rem 1.5rem"}
          >
            <i class="fa fa-user" aria-hidden="true"></i>
          </Button>
        </Link>
        {/* <p className={style.info}>Questions from preachings/study</p> */}

        <Link to="/revise-questions">
          <Button
            name="Revise Questions"
            fontSize={phoneButton && "1.3rem"}
            borderRadius={phoneButton && "20px"}
            padding={phoneButton && ".7rem 1.5rem"}
          >
            <i class="fa-brands fa-think-peaks"></i>
          </Button>
        </Link>
        {/* <p className={style.info}>Failed questions will be added here</p> */}

        {isLoggedIn ? (
          <>
            <Link to="/category">
              <Button
                name="Logout"
                click={handleLogOut}
                fontSize={phoneButton && "1.3rem"}
                borderRadius={phoneButton && "20px"}
                padding={phoneButton && ".7rem 1.5rem"}
              >
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button
                name="Login"
                fontSize={phoneButton && "1.3rem"}
                borderRadius={phoneButton && "20px"}
                padding={phoneButton && ".7rem 1.5rem"}
              >
                <i class="fa-solid fa-right-from-bracket"></i>
              </Button>
            </Link>
          </>
        )}

        <Link to="/" className={style.link}>
          Back to home
        </Link>
      </div>
    </div>
  );
}

export default Category;
