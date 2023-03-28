import { createSlice } from "@reduxjs/toolkit";

const revisionQuestionSlice = createSlice({
  name: "revision",
  initialState: {
    queue: [],
    index: 0,
    wrongAnswers: 0,
    correctAnswers: 0,
    questionsAttempted: 0,
    opacity: 0,
    disabledButtons: false
  },
  reducers: {
    startQuizAction: (state, action) => {
      return {
        ...state,
        queue: action.payload,
      };
    },
    nextQuestionAction: (state) => {
      return {
        ...state,
        index: state.index + 1,
      };
    },
    resetIndexAction: (state) => {
      return {
        ...state,
        index: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        questionsAttempted: 0,
      };
    },
    resetOpacityAction: (state) => {
      return {
        ...state,
        opacity: state.opacity = 0
      }
    },
    correctAnswerAction: (state) => {
      return {
        ...state,
        correctAnswers: state.correctAnswers + 1,
      };
    },
    wrongAnswerAction: (state) => {
      return {
        ...state,
        wrongAnswers: state.wrongAnswers + 1,
      };
    },
    remainingQuestionsAction: (state) => {
      return {
        ...state,
        questionsAttempted: state.questionsAttempted + 1,
      };
    },
    setCorrectNumberAction: (state, action) => {
      return {
        ...state,
        correctAnswers: action.payload,
      };
    },
    setWrongNumberAction: (state, action) => {
      return {
        ...state,
        wrongAnswers: action.payload,
      };
    },

    setIndexNumberAction: (state, action) => {
      return {
        ...state,
        index: action.payload,
      };
    },
    setQuestionsAttemptedAction: (state, action) => {
      return {
        ...state,
        questionsAttempted: action.payload,
      };
    },
    setOpacityAction: (state, action) => {
      return {
        ...state,
        opacity: action.payload,
      };
    },
    setDisableButtonAction: (state, action) => {
      return {
        ...state,
        disabledButtons: action.payload,
      };
    },
  },
});

export const {
  startQuizAction,
  nextQuestionAction,
  correctAnswerAction,
  wrongAnswerAction,
  remainingQuestionsAction,
  setCorrectNumberAction,
  setWrongNumberAction,
  setQuestionsAttemptedAction,
  setIndexNumberAction,
  setOpacityAction,
  setDisableButtonAction,
  resetIndexAction,
  resetOpacityAction,
} = revisionQuestionSlice.actions;

export default revisionQuestionSlice.reducer;