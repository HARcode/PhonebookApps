import axios from "axios";
import Swal from "sweetalert2";
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

const API_URL = "http://localhost:3001/api/phonebook/";

const request = axios.create({
  baseURL: API_URL,
  timeout: 1000
});
//start Loaditem from database
const loadPhonebooksSuccess = phonebooks => ({
  type: LOAD_DATA_SUCCESS,
  phonebooks
});

const loadPhonebooksFailure = () => ({
  type: LOAD_DATA_FAILURE
});

export const loadPhonebooks = () => {
  return dispatch => {
    return request
      .get("")
      .then(response => {
        dispatch(loadPhonebooksSuccess(response.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(loadPhonebooksFailure());
      });
  };
};
//end LoadItem

//star post data
const addDataSuccess = (id, phonebook) => ({
  type: ADD_DATA_SUCCESS,
  id,
  phonebook
});

const addDataFailure = id => ({
  type: ADD_DATA_FAILURE,
  id
});

const addDataRedux = ({ id, name, phoneNumber }) => ({
  type: ADD_DATA,
  id,
  name,
  phoneNumber
});

export const addStore = (name, phoneNumber) => {
  let id = Date.now();
  return dispatch => {
    dispatch(addDataRedux({ id, name, phoneNumber }));
    return request
      .post("", { id, name, phoneNumber })
      .then(result => {
        let response = result.data;
        if (response.status) {
          dispatch(addDataSuccess(id, response.data));
          Swal.fire({
            title: response.message,
            timer: 2000,
            type: "success",
            showConfirmButton: false
          });
        } else dispatch(addDataFailure(id));
      })
      .catch(err => {
        dispatch(addDataFailure(id));
      });
  };
};
//End Post Add

//start put Edit
const editDataSuccess = ({ id, name, phoneNumber }) => ({
  type: EDIT_DATA_SUCCESS,
  id,
  name,
  phoneNumber
});

const editDataFailure = id => ({
  type: EDIT_DATA_FAILURE,
  id
});

const editDataRedux = ({ id, name, phoneNumber }) => ({
  type: EDIT_DATA,
  id,
  name,
  phoneNumber
});

export const editData = (id, name, phoneNumber, index) => {
  return dispatch => {
    dispatch(editDataRedux({ id, name, phoneNumber }));
    return request
      .put(id, { name, phoneNumber })
      .then(response => {
        dispatch(editDataSuccess(response.data));
        Swal.fire({
          title: response.data.message,
          type: "success",
          timer: 1000,
          showConfirmButton: false
        });
      })
      .catch(err => {
        console.log(err);
        dispatch(editDataFailure(id));
      });
  };
};

export const showEdit = (id, index) => ({ type: EDIT_ON, id, index });
export const hideEdit = (id, index) => ({ type: EDIT_OFF, id, index });
//end put edit

//start delete deleted
const deleteDataSuccess = id => ({
  type: DELETE_DATA_SUCCESS,
  id
});

const deleteDataFailure = (phonebook) => ({
  type: DELETE_DATA_FAILURE,
  phonebook
});

const deleteDataRedux = id => ({
  type: DELETE_DATA,
  id
});

export const deleteData = phonebook => {
  const {_id, id} = phonebook 
  return dispatch => {
    dispatch(deleteDataRedux(_id || id));
    return request
      .delete(_id)
      .then(result => {
        dispatch(deleteDataSuccess(_id || id));
        Swal.fire({
          title: "Deleted",
          text: result.data.message,
          type: "success",
          timer: 2000,
          showConfirmButton: false
        });
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          title: "Connection error",
          text: "Cannot delete the contact",
          type: "error",
          confirmButtonClass: "btn btn-success ml-2",
          confirmButtonText: "Retry",
          cancelButtonClass: "btn btn-danger",
          cancelButtonText: "Cancel",
          reverseButtons: true,
          showCancelButton: true
        }).then(result => {
          if (result.value) dispatch(deleteData(phonebook));
          else dispatch(deleteDataFailure(phonebook));
        });
      });
  };
};
//end deleted

//start search
const searchDataSuccess = phonebooks => ({
  type: SEARCH_DATA_SUCCESS,
  phonebooks
});

const searchDataFailure = () => ({
  type: SEARCH_DATA_FAILURE
});

const searchDataRedux = (name, phoneNumber) => ({
  type: SEARCH_DATA,
  name,
  phoneNumber
});

export const searchData = (name, phoneNumber) => {
  return dispatch => {
    dispatch(searchDataRedux(name, phoneNumber));
    return request
      .post("search", { name, phoneNumber })
      .then(result => {
        dispatch(searchDataSuccess(result.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(searchDataFailure());
      });
  };
};
//end search

//start resend
export const resendData = (id, name, phoneNumber) => {
  return dispatch => {
    dispatch(deleteDataRedux(id));
    dispatch(addStore(name, phoneNumber));
  };
};
// end resend