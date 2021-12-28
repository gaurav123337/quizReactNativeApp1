const statusReducer = (state = 0, action) => {
  //console.log(action, 'in Reducer');
  switch (action.type) {
    case 'CURR_STATE':
      //console.log({ ...state, currCount: action.payload }, 'In reducer')
      return { ...state, currCount: action.payload };
    default:
      return state;
  }
}

export default statusReducer;
