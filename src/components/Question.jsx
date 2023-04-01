import Button from "../components/Button";
import React from "react";
import style from "../styles/Question.module.css";
import toastr from "toastr";
import "toastr/build/toastr.css";
import { useAddRevisionQuestion } from "../api/ApiClient";
import { message } from "antd";


function Question({
  clearTimer,
  onFailAddToRevise = true,
  state,
  questionsFinished,
  handleWrongAnswerAndDisableButton,
  handleCorrectAnswerAndDisableButton,
  handleShowAnswer,
  opacity,
  disabledButtons,
}) {


  const addRevisionQuestion = useAddRevisionQuestion();

  const successMessages = [
    "Ileri boys go hear, se dem fit?",
    "Be like this year na our year o",
    "Damn!! You guys on fire",
    "Nice! Perfecto",
    "Daddy's proud",
    "They won't see GTCC coming this year",
    "Dem go collect this year",
  ];

  const failureMessages = [
    "Haba, even Wale knows it",
    "Smh!! We'll get there sha",
    "Hmmm...I smell 4th position this year",
    "Baptist boys are coming, just dey play",
    "Wahala! Wahala! Wahala!!!",
    "So sad",
  ];

  const onFailClick = async () => {

    clearTimer();

    let question = {
      question: state.question,
      answer: state.answer,
    };

    console.log(question);

    if (onFailAddToRevise) {

      const token = JSON.parse(localStorage.getItem('token'));

      await addRevisionQuestion(question, token)
        .then((response) => {
          if (response.data.successful) {
            console.log(response.data.successful);
          } else {
            console.log(response.data.errorMessage);
            message.error("Failed to add question to revision table");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }


    handleWrongAnswerAndDisableButton();

    toastr.options = {
      positionClass: "toast-top-full-width",
      progressBar: true,
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };

    const randomNumber = Math.floor(Math.random() * 6);
    
  //   closeButton: true,
    //   progressBar: true,
    //   timeOut: 2000,
    //   extendedTimeOut: 1000,
    // });
    // toastr.error(failureMessages[randomNumber], {
  

    console.log("finished", questionsFinished);
  };

  const onSuccessClick = () => {
    // correctAnswers();

    handleCorrectAnswerAndDisableButton();

    clearTimer();

    toastr.options = {
      positionClass: "toast-top-full-width",
      progressBar: true,
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };

    const randomNumber = Math.floor(Math.random() * 7);

    console.log(randomNumber);

    // toastr.success(successMessages[randomNumber], {
    //   closeButton: true,
    //   progressBar: true,
    //   timeOut: 2000,
    //   extendedTimeOut: 1000,
    // });
  };


  const handleDisplayAnswer = () => {
    // dispatch(Actions.setOpacityAction(1));

    handleShowAnswer();
    clearTimer();

    console.log("questions", questionsFinished);
  };

  return (
    <>
      {questionsFinished && (
        <>
          <div className={style.finishedQuestions}>
            <h2>
              session completed &nbsp;
              <i class="fa-sharp fa-solid fa-circle-check"></i>
            </h2>
          </div>
        </>
      )}

      {!questionsFinished && (
        <>
          <div className={style.container}>
            <div>
              <h4 key={state?.id} className={style.question}>
                {state?.question}
                {/* Nigeria fought her civil war in what year, when did the war ened and
          who was president at that period ? */}
              </h4>
            </div>
            <div className={style.answer}>
              <p style={{ opacity: opacity }}>
                {state?.answer}
                {/* The civil war was fought in year ...., it ended in year.... and the
          president was President.... */}
              </p>
            </div>

            <div class={style.btnGroup}>
              <Button name="Answer" click={handleDisplayAnswer}>
                <i class="fa fa-book" aria-hidden="true"></i>
              </Button>
              <Button
                name="Right"
                disabled={disabledButtons}
                click={onSuccessClick}
                backgroundColor={disabledButtons && "gray"}
                color={disabledButtons && "brown"}
              >
                <i class="fa fa-check" aria-hidden="true"></i>
              </Button>
              <Button
                name="Wrong"
                disabled={disabledButtons}
                click={onFailClick}
                backgroundColor={disabledButtons && "gray"}
                color={disabledButtons && "brown"}
              >
                <i class="fa fa-times" aria-hidden="true"></i>
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Question;
