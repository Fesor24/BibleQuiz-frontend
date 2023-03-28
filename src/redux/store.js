import { configureStore, combineReducers } from "@reduxjs/toolkit";
import questionReducer from "./thousandQuestionsSlice";
import revisionReducer from "./revisionQuestionSlice";
import globalReducer from "./globalSlice"
import fesorReducer from "./fesorQuestionsSlice";

const rootReducer = combineReducers({
  thousandQuestions: questionReducer,
  revisionQuestions: revisionReducer,
  globalSetting: globalReducer,
  fesorQuestions: fesorReducer
});

export default configureStore({ reducer: rootReducer });
