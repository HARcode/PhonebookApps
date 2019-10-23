import { compareObjects } from "../helpers/compare";
import {
  LOAD_DATA_SUCCESS,
  LOAD_DATA_FAILURE,
  ADD_DATA,
  ADD_DATA_SUCCESS,
  ADD_DATA_FAILURE,
  DELETE_DATA,
  DELETE_DATA_SUCCESS,
  DELETE_DATA_FAILURE,
  SEARCH_DATA,
  SEARCH_DATA_SUCCESS,
  SEARCH_DATA_FAILURE,
  EDIT_DATA,
  EDIT_ON,
  EDIT_OFF,
  EDIT_DATA_SUCCESS,
  EDIT_DATA_FAILURE
} from "../constants/actionTypes";

export const phonebooks = (state = [], action) => {
  const { type, id, name, phoneNumber, index, phonebook } = action;

  switch (type) {
    case LOAD_DATA_SUCCESS:
      return action.phonebooks.map(item => ({
        ...item,
        sent: true,
        isNew: false,
        editOn: false
      }));

    case ADD_DATA:
      const oldState = state.map(item => ({ ...item, isNew: false }));
      const newState = [
        ...oldState,
        { id, name, phoneNumber, editOn: false, sent: true, isNew: true }
      ];
      return newState.sort(compareObjects);

    case ADD_DATA_SUCCESS:
      return [
        ...state.filter(item => item.id !== id),
        { ...phonebook, editOn: false, sent: true, isNew: true }
      ].sort(compareObjects);

    case ADD_DATA_FAILURE:
      return state
        .map(item => ({ ...item, sent: item.id !== action.id && item.sent }))
        .sort(compareObjects);

    case EDIT_ON:
      return state.map((item, idx) => ({
        ...item,
        editOn: (item._id === id && idx === index) || item.editOn
      }));

    case EDIT_OFF:
      return state.map((item, idx) => ({
        ...item,
        editOn: (item._id !== id || idx !== index) && item.editOn
      }));

    case EDIT_DATA:
    case EDIT_DATA_SUCCESS:
      return state.map(item =>
        item._id === id ? { ...item, name, phoneNumber, sent: true } : item
      );

    case EDIT_DATA_FAILURE:
      return state.map(item =>
        item._id === id ? { ...item, sent: false } : item
      );

    case DELETE_DATA:
    case DELETE_DATA_SUCCESS:
      return state.filter(item =>
        item._id ? item._id !== id : item.id !== id
      );
    case DELETE_DATA_FAILURE:
      return [...state, phonebook].sort(compareObjects);

    case SEARCH_DATA:
      return state.filter(
        item =>
          item.name.match(name) &&
          item.phoneNumber.match(phoneNumber) &&
          item.sent
      );

    case SEARCH_DATA_SUCCESS:
      return action.phonebooks.map(item => ({
        ...item,
        sent: true,
        isNew: false,
        editOn: false
      }));

    case LOAD_DATA_FAILURE:
    case SEARCH_DATA_FAILURE:
    default:
      return state;
  }
};
