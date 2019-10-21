import { combineReducers } from "redux";
import { loadPhonebookReducer } from "./loadPhonebookReducer";
import { editPhonebookReducer } from "./editPhonebookReducer";
import { addPhonebookReducer } from "./addPhonebookReducer";
import { delPhonebookReducer } from "./delPhonebookReducer";
import { searchPbReducer } from "./searchPbReducer";

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
  const deletes = [
    "DELETE_STORE_SUCCESS",
    "DELETE_STORE_FAILURE",
    "DELETE_STORE"
  ];
  const searchs = ["SEARCH_DATA_SUCCESS", "SEARCH_DATA_FAILURE", "SEARCH_DATA"];

  const type = action.type;
  if (loads.includes(type)) return loadPhonebookReducer(state, action);
  else if (edits.includes(type)) return editPhonebookReducer(state, action);
  else if (adds.includes(type)) return addPhonebookReducer(state, action);
  else if (deletes.includes(type)) return delPhonebookReducer(state, action);
  else if (searchs.includes(type)) return searchPbReducer(state, action);
  return state;
}

export default combineReducers({ phonebooks: listPhonebookReducer });
