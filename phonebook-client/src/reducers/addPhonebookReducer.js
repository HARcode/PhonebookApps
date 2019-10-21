import { compareObjects } from "../helpers/compare";

export function addPhonebookReducer(state = [], action) {
  switch (action.type) {
    case "ADD_STORE":
      let oldState = state.map(item => {
        item.isNew = false;
        return item;
      });
      let newState = [
        ...oldState,
        {
          id: action.id,
          name: action.name,
          phoneNumber: action.phoneNumber,
          editOn: false,
          sent: true,
          isNew: true
        }
      ];
      return newState.sort(compareObjects);
    case "ADD_STORE_SUCCESS":
      return state.map(item => {
        if (item.id === action.id) item.isNew = true;
        else item.isNew = false;
        item.editOn = false;
        item.sent = true;
        return item;
      });
    case "ADD_STORE_FAILURE":
      return state
        .map(item => {
          if (item.id === action.id) item.sent = false;
          return item;
        })
        .sort(compareObjects);
    default:
      return state;
  }
}
