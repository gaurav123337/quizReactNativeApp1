const statusReducer = (state = 0, action) => {
  switch (action.type) {
    case 'CURR_STATE':
      return { ...state, currCount: action.payload };
    default:
      return state;
  }
}

export default statusReducer;
