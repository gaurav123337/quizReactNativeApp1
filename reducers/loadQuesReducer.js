const loadQuesReducer = (state = '', action) => {
  switch (action.type) {
    case "LOAD":
      const allQues = [action.payload];
      return allQues;
    default:
      return state;
  }
}

export default loadQuesReducer;
