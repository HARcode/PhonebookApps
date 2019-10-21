import addPbProperties from "../helpers/addPbProperties";

export function searchPbReducer(state = [], action) {
  switch (action.type) {
    case "SEARCH_DATA":
      return state
        .filter(
          item =>
            item.name.match(action.name) &&
            item.phoneNumber.match(action.phoneNumber)
        )
        .map(addPbProperties);
    case "SEARCH_DATA_SUCCESS":
      return action.phonebooks.map(addPbProperties);
    case "SEARCH_DATA_FAILURE":
      return state.map(item => {
        item.sent = false;
        return item;
      });
    default:
      return state;
  }
}
