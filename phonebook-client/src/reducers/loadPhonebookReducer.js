import addPbProperties from "../helpers/addPbProperties";

export function loadPhonebookReducer(state = [], action) {
  switch (action.type) {
    case "LOAD_PHONEBOOKS_SUCCESS":
      return action.phonebooks.map(addPbProperties);
    default:
      return state;
  }
}
