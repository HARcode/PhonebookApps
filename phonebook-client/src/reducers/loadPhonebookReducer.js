export function loadPhonebookReducer(state = [], action) {
  switch (action.type) {
    case "LOAD_PHONEBOOKS_SUCCESS":
      return action.phonebooks.map(item => {
        item.sent = true;
        item.isNew = false;
        item.editOn = false;
        return item;
      });
    default:
      return state;
  }
}
