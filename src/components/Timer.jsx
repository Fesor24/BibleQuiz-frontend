import style from "../styles/Timer.module.css";
import Button from "../components/Button";

function Timer({
  countdown,
  handleNextButtonClick,
  handleSaveButtonClick,
  handleResetButtonClick,
}) {
  return (
    
      <div className={style.timer}>
        {/* <Circle borderWidth ={borderWidth} circleText= {"00:30"} colorText={colorText} /> */}

        <p className={style.timerText}>
          00:
          {countdown === 0
            ? "00"
            : countdown < 10
            ? `0${countdown}`
            : countdown}
        </p>

        <div>
          <Button click={handleNextButtonClick}>
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
          </Button>
          &nbsp; &nbsp;
          <Button click={handleSaveButtonClick}>
            <i class="fa fa-arrow-left"></i>
          </Button>
          &nbsp; &nbsp;
          <Button click={handleResetButtonClick}>
            <i class="fa-solid fa-ban"></i>
          </Button>
        </div>
      </div>
    
  );
}

export default Timer;
