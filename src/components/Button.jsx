import React from "react";
import style from "../styles/Button.module.css";

function Button({ name, click, children, disabled, color, backgroundColor, display, padding, type, height,width, borderRadius }) {
  return (
    <button
      className={`${style.btn} ${style.btnFirst}`}
      type = {type}
      disabled={disabled}
      onClick={click}
      style={{
        color: color,
        backgroundColor: backgroundColor,
        display: display,
        padding: padding,
        height:height,
        width: width,
        borderRadius: borderRadius
      }}
    >
      {name} &nbsp;{children}
    </button>
  );
}

export default Button;
