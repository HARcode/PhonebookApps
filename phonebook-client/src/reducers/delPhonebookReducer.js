export function delPhonebookReducer(state = [], action) {
  switch (action.type) {
    case "DELETE_STORE":
      return state.filter(item => item._id !== action.id);
    case "DELETE_STORE_SUCCESS":
      return state.filter(item => item._id !== action.id);
    case "DELETE_STORE_FAILURE":
    default:
      return state;
  }
}
