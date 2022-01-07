import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import statusReducer from './reducers/statusReducer';
import correctAnswerReducer from './reducers/correctAnswerReducer';
import collectMyAnswerReducer from './reducers/collectMyAnswerReducer';
import loadQuesReducer from './reducers/loadQuesReducer';

const mainReducer = combineReducers({
  count: statusReducer,
  correctStatus: correctAnswerReducer,
  collectMyAnswer: collectMyAnswerReducer,
  loadQues: loadQuesReducer
});

// const commonData = {
//   status: {
//     currCount: 0,
//     score: 0
//   }
// };

const commonData = {
  currCount: 0,
  score: 0
};

const store = createStore(mainReducer, commonData, applyMiddleware(thunk));

export default store;
