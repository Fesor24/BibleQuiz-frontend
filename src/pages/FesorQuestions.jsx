import React, { useState, useEffect } from "react";
import style from "../styles/ThousandQuestions.module.css";
import Sidebar from "../components/Sidebar";
import Timer from "../components/Timer";
import Question from "../components/Question";
import Button from "../components/Button";
import { useNavigate, Link } from "react-router-dom";
import {
  useFetchFesorQuestions,
  useAddRevisionQuestion,
} from "../api/ApiClient";
import { useSelector, useDispatch } from "react-redux";
import * as Action from "../redux/fesorQuestionsSlice";
import RequireAuth from "../components/Auth/requireAuth";

function FesorQuestions() {
 
  const [disableButtons, setDisableButtons] = useState(false);

  const [fesorQuestions, setFesorQuestions] = useState();

  const [sideBar, setSideBar] = useState("-450px"); 

  const [access, setAccess] = useState(false);

  const [questionsFinished, setQuestionsFinished] = useState(false);

  const questions = useSelector((state) => state.fesorQuestions.queue);

  const { opacity, disabledButtons } = useSelector(
    (state) => state.fesorQuestions
  );

  const question = useSelector(
    (state) => state.fesorQuestions.queue[state.fesorQuestions.index]
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const countdownNumber = 45;

  const { correctAnswers, wrongAnswers, questionsAttempted } =
    useSelector((state) => state.fesorQuestions);

  const fetchFesorQuestions = useFetchFesorQuestions();

  const addRevisionQuestion = useAddRevisionQuestion();

  useEffect(() => {

    document.title = "Fesors' Questions";
    const access = JSON.parse(localStorage.getItem("hasAccess"));

    setAccess(access);

    const token = JSON.parse(localStorage.getItem("token"));

    if (access) {
      async function fetchAllFesorQuestions() {
        await fetchFesorQuestions(token)
          .then((response) => {
            if (response.data.successful) {
              console.log(response.data.result);
              setFesorQuestions(response.data.result);
              dispatch(Action.startQuizAction(response.data.result));
            } else {
              console.log(response.data.errorMessage);
            }
          })
          .catch((error) => {
            console.log("error", error);
          });
      }

      if (questions?.length === 0) {
        fetchAllFesorQuestions();
      }
    }
  }, []);

  useEffect(() => {
    document.title = "Fesor's Questions";

    // dispatch(Action.resetOpacityAction());

    const correct = JSON.parse(localStorage.getItem("fesorCorrectAnswer"));
    const wrong = JSON.parse(localStorage.getItem("fesorWrongAnswer"));
    const index = JSON.parse(localStorage.getItem("fesorQuestionsAttempted"));

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

      // increaseWrongAnswers();
      // console.log(state);
    }
  }, [countdown]);

  const clearTimer = () => {
    clearTimeout(timerId);
  };

  const handleNextButtonClick = () => {
    // setFinishedTimer(true);
    setCountdown(countdownNumber);
    setDisableButtons(false);
    dispatch(Action.nextQuestionAction());
    dispatch(Action.remainingQuestionsAction());
    dispatch(Action.setOpacityAction(0));
    dispatch(Action.setDisableButtonAction(false));

    if (questions?.length - questionsAttempted === 1) {
      setQuestionsFinished(true);
    }
    // setAttemptedQuestions(attemptedQuestions + 1);
  };

  const handleSaveButtonClick = () => {
    localStorage.setItem("fesorCorrectAnswer", JSON.stringify(correctAnswers));
    localStorage.setItem("fesorWrongAnswer", JSON.stringify(wrongAnswers));
    localStorage.setItem(
      "fesorQuestionsAttempted",
      JSON.stringify(questionsAttempted)
    );
    navigate("/category");
  };

  const handleResetButtonClick = () => {
    localStorage.removeItem("fesorCorrectAnswer");
    localStorage.removeItem("fesorWrongAnswer");
    localStorage.removeItem("fesorQuestionsAttempted");
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
    localStorage.removeItem("fesorCorrectAnswer");
    localStorage.removeItem("fesorWrongAnswer");
    localStorage.removeItem("fesorQuestionsAttempted");
    dispatch(Action.resetIndexAction());
  };

   const closeSideBar = () => {
     setSideBar("-450px");
   };

   const openSideBar = () => {
     setSideBar("0");
   };

  return (
    <>
      {access ? (
        <>
          {questions?.length === 0 ? (
            <>
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
            </>
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
                      key={"fesor-question"}
                      setSideBar={setSideBar}
                      correct={correctAnswers}
                      wrong={wrongAnswers}
                      remaining={questions?.length - questionsAttempted}
                      total={questions?.length}
                    />
                  </div>

                  <div className={style.questionBar}>
                    {!questionsFinished && (
                      <>
                        <p className={style.openMenu}>
                          <i
                            class="fa-solid fa-bars fa-2x"
                            onClick={openSideBar}
                          ></i>
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

export default RequireAuth(FesorQuestions);
