const collectMyAnswerReducer = (state = [{ question: '', choosenAnswer: '' }], action) => {
  switch (action.type) {
    case "MY_ANSWER":
      const x = [...state, action.payload]
      console.log(x, 'collect my answer reducer');
      return x;
    default:
      return state;
  }
}

export default collectMyAnswerReducer;
