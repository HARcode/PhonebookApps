export function editPhonebookReducer(state = [], action) {
  switch (action.type) {
    case "EDIT_ON":
      return state.map((item, index) => {
        if (item._id === action.id && index === action.index) item.editOn = true;
        return item;
      });
    case "EDIT_OFF":
      return state.map((item, index) => {
        if (item._id === action.id && index == action.index)
          item.editOn = false;
        return item;
      });
    case "EDIT_DATA":
      return state.map(item => {
        if (item._id === action.id) {
          item.name = action.name;
          item.phoneNumber = action.phoneNumber;
        }
        return item;
      });
    case "EDIT_DATA_SUCCESS":
      let response = action.phonebooks;
      return state.map(item => {
        if (item._id === response.id) {
          item.name = response.name;
          item.phoneNumber = response.phoneNumber;
          item.sent = true;
        }
        return item;
      });
    case "EDIT_DATA_FAILURE":
      return state.map(item => {
        if (item._id === action.id) item.sent = false;
        return item;
      });
    default:
      return state;
  }
}
