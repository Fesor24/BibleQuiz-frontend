import React from "react";
import style from "../styles/Sidebar.module.css";
import Circle from "../components/Circle";

function Sidebar({ correct, wrong, remaining, total, setSideBar }) {

   const closeSideBar = () => {
     setSideBar("-450px");
   };

  return (
    <div className={style.container}>
      <p className={style.cancel}>
        <i class="fa-solid fa-xmark fa-2x" onClick={closeSideBar}></i>
      </p>

      <div className={style.sidebar}>
        <div className={style.content}>
          <p className={style.contentText}>Correct</p>
          <Circle circleText={correct} />
        </div>

        <div className={style.content}>
          <p className={style.contentText}>Wrong</p>
          <Circle circleText={wrong} />
        </div>

        <div className={style.content}>
          <p className={style.contentText}>Remaining</p>
          <Circle circleText={remaining - 1 < 0 ? 0 : remaining - 1} />
        </div>

        <div className={style.content}>
          <p className={style.contentText}>Total</p>
          <Circle circleText={total} />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
