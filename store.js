import { createStore, combineReducers } from 'redux';
import statueReducer from './reducers/statusReducer';

const mainReducer = combineReducers({
  count: statueReducer
});

const commonData = {
  status: {
    currCount: 0
  }
};

const store = createStore(mainReducer, commonData);

export default store;
