export const updateQuesNo = (action, payload) => {
  //console.log(action, 'action', payload);
  return {
    type: 'CURR_STATE',
    payload: payload
  }
}

export const correctAnswer = (action, payload) => {
  //console.log(action, 'action', payload);
  return {
    type: 'IS_CORRECT',
    payload: payload
  }
}

export const collectMyOption = (action, payload) => {
  console.log(action, 'action', payload);
  return {
    type: 'MY_ANSWER',
    payload: payload
  }
}

export const loadQues = (action, payload) => {
  console.log(action, 'action', payload);
  return {
    type: 'LOAD',
    payload: payload
  }
}

export const restart = (action, payload = undefined) => {
  console.log(action, 'action', payload);
  return {
    type: 'RESTART',
    payload: payload
  }
}
