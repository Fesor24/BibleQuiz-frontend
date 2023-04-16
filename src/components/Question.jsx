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
  
    console.log("finished", questionsFinished);
  };

  const onSuccessClick = () => {

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
          <div className={style.container}>
            <div className={style.finishedQuestions}>
              <h2>
                session completed &nbsp;
                <i class="fa-sharp fa-solid fa-circle-check"></i>
              </h2>
            </div>
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
              <Button
                name="Answer"
                click={handleDisplayAnswer}
                border={
                  disabledButtons
                    ? "2px solid rgb(47, 49, 146)"
                    : "2px solid rgb(231, 246, 254)"
                }
              >
                <i class="fa fa-book" aria-hidden="true"></i>
              </Button>
              <Button
                name="Right"
                disabled={disabledButtons}
                click={onSuccessClick}
                backgroundColor={disabledButtons && "rgb(231, 246, 254)"}
                color={disabledButtons && "rgb(47, 49, 146)"}
                border={
                  disabledButtons
                    ? "2px solid rgb(47, 49, 146)"
                    : "2px solid rgb(231, 246, 254)"
                }
              >
                <i class="fa fa-check" aria-hidden="true"></i>
              </Button>
              <Button
                name="Wrong"
                disabled={disabledButtons}
                click={onFailClick}
                backgroundColor={disabledButtons && "rgb(231, 246, 254)"}
                color={disabledButtons && "rgb(47, 49, 146)"}
                border={
                  disabledButtons
                    ? "2px solid rgb(47, 49, 146)"
                    : "2px solid rgb(231, 246, 254)"
                }
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
