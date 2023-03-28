import React from "react";
import style from "../styles/Sidebar.module.css";
import Circle from "../components/Circle";

function Sidebar({ correct, wrong, remaining, total }) {

  return (
    <div className={style.container}>
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
