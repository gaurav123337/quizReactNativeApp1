const correctAnswerReducer = (state = 0, action) => {
  switch (action.type) {
    case "IS_CORRECT":
      return { ...state, correctStatus: action.payload.score };
    default:
      return state;
  }
}

export default correctAnswerReducer;
