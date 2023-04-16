import React, { useState, useEffect } from "react";
import style from "../styles/ThousandQuestions.module.css";
import Sidebar from "../components/Sidebar";
import Timer from "../components/Timer";
import Question from "../components/Question";
import Button from "../components/Button";
import { useNavigate, Link } from "react-router-dom";
import {
  useFetchThousandQuestions,
  useAddRevisionQuestion,
} from "../api/ApiClient";
import { useSelector, useDispatch } from "react-redux";
import * as Action from "../redux/thousandQuestionsSlice";
import RequireAuth from "../components/Auth/requireAuth";

function ThousandQuestions() {
  const [disableButtons, setDisableButtons] = useState(false);

  const [thousandQuestions, setThousandQuestions] = useState();

  const [access, setAccess] = useState(false);

  const [sideBar, setSideBar] = useState('-450px'); 

  const [questionsFinished, setQuestionsFinished] = useState(false);

  const questions = useSelector((state) => state.thousandQuestions.queue);

  const { opacity, disabledButtons } = useSelector(
    (state) => state.thousandQuestions
  );

  const question = useSelector(
    (state) => state.thousandQuestions.queue[state.thousandQuestions.index]
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const countdownNumber = 45;

  const { correctAnswers, wrongAnswers, questionsAttempted } = useSelector(
    (state) => state.thousandQuestions
  );

  const fetchThousandQuestions = useFetchThousandQuestions();

  const addRevisionQuestion = useAddRevisionQuestion();

  useEffect(() => {
    const access = JSON.parse(localStorage.getItem("hasAccess"));

    setAccess(access);

    if (access) {
      async function fetchAllThousandQuestions() {
        const token = JSON.parse(localStorage.getItem("token"));

        await fetchThousandQuestions(token)
          .then((response) => {
            if (response.data.successful) {
              console.log(response.data.result);
              setThousandQuestions(response.data.result);
              dispatch(Action.startQuizAction(response.data.result));
            } else {
              console.log(response.data.errorMessage);
            }
          })
          .catch((error) => {
            console.log("error from catch", error);
          });
      }

      if (questions?.length === 0) {
        fetchAllThousandQuestions();
      }
    } else {
      return;
    }
  }, []);

  useEffect(() => {
    document.title = "Thousand Questions";

    // dispatch(Action.resetOpacityAction());

    const correct = JSON.parse(localStorage.getItem("thousandCorrectAnswer"));
    const wrong = JSON.parse(localStorage.getItem("thousandWrongAnswer"));
    const index = JSON.parse(
      localStorage.getItem("thousandQuestionsAttempted")
    );

    if (index) {
      dispatch(Action.setCorrectNumberAction(correct));
      dispatch(Action.setWrongNumberAction(wrong));
      dispatch(Action.setIndexNumberAction(index));
      dispatch(Action.setQuestionsAttemptedAction(index));

      if (correct + wrong === index) {
        setDisableButtons(true);
      }
    }
  }, []);

  // Countdown state
  const [countdown, setCountdown] = useState(countdownNumber);
  const [finishedTimer, setFinishedTimer] = useState(true);

  let timerId;

  // Setting timer function in use effect
  useEffect(() => {

    document.title = "Thousand Questions";
    // if (isAuthenticated){
    if (countdown > 0) {
      timerId = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      setFinishedTimer(true);
      return () => clearTimeout(timerId);
    } else {
      setFinishedTimer(false);
      setDisableButtons(true);
      dispatch(Action.setOpacityAction(1));
      dispatch(Action.setDisableButtonAction(true));
      dispatch(Action.wrongAnswerAction());

      let body = {
        question: question?.question,
        answer: question?.answer,
      };

      const token = JSON.parse(localStorage.getItem("token"));

      const AddToRevision = async () => {
        await addRevisionQuestion(body, token)
          .then((response) => {
            if (response.data.successful) {
              console.log(response.data.result);
            } else {
              console.log(response.data.errorMessage);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };

      AddToRevision();
    }
    // }
  }, [countdown, questionsAttempted]);

  const clearTimer = () => {
    clearTimeout(timerId);
  };

  const handleNextButtonClick = () => {
    setCountdown(countdownNumber);
    setDisableButtons(false);
    dispatch(Action.nextQuestionAction());
    dispatch(Action.remainingQuestionsAction());
    dispatch(Action.setOpacityAction(0));
    dispatch(Action.setDisableButtonAction(false));

    if (questions?.length - questionsAttempted === 1) {
      setQuestionsFinished(true);
    }
  };

  const handleSaveButtonClick = () => {
    localStorage.setItem(
      "thousandCorrectAnswer",
      JSON.stringify(correctAnswers)
    );
    localStorage.setItem("thousandWrongAnswer", JSON.stringify(wrongAnswers));
    localStorage.setItem(
      "thousandQuestionsAttempted",
      JSON.stringify(questionsAttempted)
    );
    navigate("/category");
  };

  const handleResetButtonClick = () => {
    localStorage.removeItem("thousandCorrectAnswer");
    localStorage.removeItem("thousandWrongAnswer");
    localStorage.removeItem("thousandQuestionsAttempted");
    dispatch(Action.resetIndexAction());
    setCountdown(countdownNumber);
    dispatch(Action.setOpacityAction(0));
    dispatch(Action.setDisableButtonAction(false));
  };

  const handleWrongAnswerAndDisableButton = () => {
    dispatch(Action.wrongAnswerAction());

    dispatch(Action.setDisableButtonAction(true));
  };

  const handleCorrectAnswerAndDisableButton = () => {
    dispatch(Action.correctAnswerAction());

    dispatch(Action.setDisableButtonAction(true));
  };

  const handleShowAnswer = () => {
    dispatch(Action.setOpacityAction(1));
  };

  const handleBackToCategory = () => {
    setQuestionsFinished(false);
    localStorage.removeItem("thousandCorrectAnswer");
    localStorage.removeItem("thousandWrongAnswer");
    localStorage.removeItem("thousandQuestionsAttempted");
    dispatch(Action.resetIndexAction());
  };

  const closeSideBar =()=>{
    setSideBar('-450px')
  }

  const openSideBar =() => {
    setSideBar('0');
  }

  return (
    <>
      {access ? (
        <>
          {questions.length === 0 ? (
            <div className={style.blankContainer}>
              <div class={style.blank}>
                <h3>No questions at the moment</h3>
                <i class="fa-solid fa-magnifying-glass fa-4x"></i>
                <h3>Questions will be available soon. Loading...</h3>
                <i class="fa-solid fa-empty-set"></i>
                <Link to="/category">
                  <Button name="Back to Category">
                    <i class="fa-sharp fa-solid fa-backward"></i>
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className={style.container}>
                <div className={style.displayPage}>
                  <div className={style.sideBar} style={{ left: sideBar }}>
                    {/* <p className={style.cancel}>
                      <i
                        class="fa-solid fa-xmark fa-2x"
                        onClick={closeSideBar}
                      ></i>
                    </p> */}
                    <Sidebar
                      correct={correctAnswers}
                      setSideBar={setSideBar}
                      wrong={wrongAnswers}
                      remaining={questions?.length - questionsAttempted}
                      total={questions?.length}
                    />
                  </div>

                  <div className={style.questionBar}>
                    {!questionsFinished && (
                      <>
                        <p className={style.openMenu}>
                          <i class="fa-solid fa-bars fa-2x" onClick={openSideBar}></i>
                        </p>
                        <Timer
                          countdown={countdown}
                          handleNextButtonClick={handleNextButtonClick}
                          handleResetButtonClick={handleResetButtonClick}
                          handleSaveButtonClick={handleSaveButtonClick}
                        />
                      </>
                    )}

                    {questionsFinished && (
                      <>
                        <div className={style.startAgain}>
                          <Link to="/category">
                            <Button
                              name="Back to Category"
                              click={handleBackToCategory}
                            >
                              <i
                                class="fa fa-arrow-left"
                                aria-hidden="true"
                              ></i>
                            </Button>
                          </Link>
                        </div>
                      </>
                    )}

                    <div className={style.question}>
                      <Question
                        disableButtons={disableButtons}
                        displayAnswer={finishedTimer}
                        clearTimer={clearTimer}
                        state={question}
                        handleWrongAnswerAndDisableButton={
                          handleWrongAnswerAndDisableButton
                        }
                        handleCorrectAnswerAndDisableButton={
                          handleCorrectAnswerAndDisableButton
                        }
                        handleShowAnswer={handleShowAnswer}
                        opacity={opacity}
                        disabledButtons={disabledButtons}
                        questionsFinished={questionsFinished}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className={style.blankContainer}>
            <div class={style.blank}>
              <h3>You do not have permission</h3>
              <i class="fa-solid fa-hand-point-left fa-3x"></i>
              <h3>Check back in a minute</h3>
              <h3>Might let you in...</h3>
              <i class="fa-solid fa-empty-set"></i>
              <Link to="/category">
                <Button name="Back to Category">
                  <i class="fa-sharp fa-solid fa-backward"></i>
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default RequireAuth(ThousandQuestions);
