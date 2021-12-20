export const updateQuesNo = (action, payload) => {
  console.log(action, 'action', payload);
  return {
    type: 'CURR_STATE',
    payload: payload
  }
}
