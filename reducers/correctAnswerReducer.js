const correctAnswerReducer = (state = 0, action) => {
  //console.log(state, 'state', action);
  switch (action.type) {
    case "IS_CORRECT":
      console.log({ ...state, correctStatus: action.payload.score });
      // return { ...state, correctStatus: action.payload.score };
      return { ...state, correctStatus: action.payload.score };
    default:
      return state;
  }
}

export default correctAnswerReducer;
