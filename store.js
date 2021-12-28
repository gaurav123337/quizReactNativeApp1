import { createStore, combineReducers } from 'redux';
import statusReducer from './reducers/statusReducer';
import correctAnswerReducer from './reducers/correctAnswerReducer';

const mainReducer = combineReducers({
  count: statusReducer,
  correctStatus: correctAnswerReducer
});

const commonData = {
  status: {
    currCount: 0,
    score: 0
  }
};

const store = createStore(mainReducer, commonData);

export default store;
