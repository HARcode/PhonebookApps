import axios from "axios";

const API_URL = "http://localhost:3001/api/phonebook/";

const request = axios.create({
  baseURL: API_URL,
  timeout: 1000
});

//start Loaditem from database

export const loadPhonebooksSuccess = phonebooks => ({
  type: "LOAD_PHONEBOOKS_SUCCESS",
  phonebooks
});
export const loadPhonebooksFailure = () => ({
  type: "LOAD_PHONEBOOK_FAILURE"
});
export const loadPhonebooks = () => {
  return dispatch => {
    return request
      .get()
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
export const addDataSuccess = phonebooks => ({
  type: "ADD_STORE_SUCCESS",
  phonebooks
});

export const addDataFailure = () => ({
  type: "ADD_STORE_FAILURE"
});

export const addDataRedux = (name, phoneNumber) => ({
  type: "ADD_STORE",
  id,
  name,
  phoneNumber
});

export const addStore = (name, phoneNumber) => {
  return dispatch => {
    dispatch(addDataRedux(name, phoneNumber));
    return request
      .post({ name, phoneNumber })
      .then(result => {
        dispatch(addDataSuccess(result.data));
      })
      .catch(err => {
        dispatch(addDataFailure(err));
      });
  };
};
//End Post Add

//start put Edit

export const editDataSuccess = phonebooks => ({
  type: "EDIT_DATA_SUCCESS",
  phonebooks
});
export const editDataFailure = id => ({
  type: "EDIT_DATA_FAILURE",
  id
});
export const editDataRedux = (id, name, phoneNumber) => ({
  type: "EDIT_DATA",
  id,
  name,
  phoneNumber
});
export const editData = (id, name, phoneNumber) => {
  return dispatch => {
    dispatch => {
      dispatch(editDataRedux(id, name, phoneNumber));
      return request
        .put(`${id}`, { name, phoneNumber })
        .then(response => {
          dispatch(editDataSuccess(response.data));
        })
        .catch(err => {
          console.log(err);
          dispatch(editDataFailure());
        });
    };
  };
};

//end put edit

//start delete deleted
export const deletedDataSuccess = phonebooks => ({
  type: "DELETED_STORE,SUCCESS",
  phonebooks
});

export const deletedDataFailure = () => ({
  type: "DELETE_STORE_SUCCESS"
});

export const deletedDataRedux = id => ({
  type: "DELETE_STORE",
  id
});
export const deletedData = id => {
  return dispatch => {
    dispatch(deletedDataRedux(id));
    return request
      .delete(`${id}`)
      .then(result => {
        dispatch(deletedDataSuccess(result.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(deletedDataFailure(id));
      });
  };
};
//end deleted

//start search
export const searchDataSuccess = phonebooks => {
  type: "SEARCH_DATA_SUCCESS", phonebooks;
};
export const searchDataFailure = () => ({
  type: "SEARCH_DATA_FAILURE"
});
export const searchDataRedux = (name, phoneNumber) => ({
  type: "SEARCH_DATA",
  name,
  phoneNumber
});
export const searchData = (name, phoneNumber) => {
  return dispatch => {
    dispatch(searchDataRedux(name, phoneNumber));
    return request
      .post(`${search}`, { name, phoneNumber })
      .then(result => {
        dispatch(searchDataSuccess(result.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(searchDataFailure());
      });
  };
};
export const showEdit = (id, index) => ({ type: "EDIT_ON", id, index });

export const hideEdit = (id, index) => ({ type: "EDIT_OFF", id, index });

export const showDelete = (id, name) => ({ type: "DELETE", id, name });
