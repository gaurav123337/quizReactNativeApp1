export const updateQuesNo = (action, payload) => {
  console.log(action, 'action', payload);
  return {
    type: 'CURR_STATE',
    payload: payload
  }
}

export const correctAnswer = (action, payload) => {
  console.log(action, 'action', payload);
  return {
    type: 'IS_CORRECT',
    payload: payload
  }
}
