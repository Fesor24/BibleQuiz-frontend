import style from "../styles/Timer.module.css";
import Button from "../components/Button";

function Timer({
  countdown,
  handleNextButtonClick,
  handleSaveButtonClick,
  handleResetButtonClick,
  isRevisionQuestionSection,
  handleDeleteRevisionQuestions
}) {
  return (
    <div className={style.timer}>
      {/* <Circle borderWidth ={borderWidth} circleText= {"00:30"} colorText={colorText} /> */}

      <p className={style.timerText}>
        00:
        {countdown === 0 ? "00" : countdown < 10 ? `0${countdown}` : countdown}
      </p>

      <div class={style.btnGroup}>
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
        &nbsp; &nbsp;
        {isRevisionQuestionSection && (
          <Button click={handleDeleteRevisionQuestions}>
            <i class="fa-solid fa-trash"></i>
          </Button>
        )}
      </div>
    </div>
  );
}

export default Timer;
