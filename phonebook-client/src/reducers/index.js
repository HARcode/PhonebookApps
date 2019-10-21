import { combineReducers } from "redux";
import { loadPhonebookReducer } from "./loadPhonebookReducer";
import { editPhonebookReducer } from "./editPhonebookReducer";
import { addPhonebookReducer } from "./addPhonebookReducer";

function listPhonebookReducer(state = [], action) {
  const loads = ["LOAD_PHONEBOOKS_SUCCESS", "LOAD_PHONEBOOK_FAILURE"];
  const edits = [
    "EDIT_DATA_SUCCESS",
    "EDIT_DATA_FAILURE",
    "EDIT_DATA",
    "EDIT_ON",
    "EDIT_OFF"
  ];
  const adds = ["ADD_STORE_SUCCESS", "ADD_STORE_FAILURE", "ADD_STORE"];

  const type = action.type;
  if (loads.includes(type)) return loadPhonebookReducer(state, action);
  if (edits.includes(type)) return editPhonebookReducer(state, action);
  if (adds.includes(type)) return addPhonebookReducer(state, action);
  return state;
}

export default combineReducers({ phonebooks: listPhonebookReducer });
