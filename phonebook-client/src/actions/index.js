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
export const addDataSuccess = (id, phonebook) => ({
  type: "ADD_STORE_SUCCESS",
  id,
  phonebook
});

export const addDataFailure = id => ({
  type: "ADD_STORE_FAILURE",
  id
});

export const addDataRedux = (id, name, phoneNumber) => ({
  type: "ADD_STORE",
  id,
  name,
  phoneNumber
});

export const addStore = (name, phoneNumber) => {
  let id = Date.now();
  return dispatch => {
    dispatch(addDataRedux(id, name, phoneNumber));
    return request
      .post("", { id, name, phoneNumber })
      .then(result => {
        let response = result.data;
        if (response.status) dispatch(addDataSuccess(id, response.data));
        else dispatch(addDataFailure(id))
      })
      .catch(err => {
        dispatch(addDataFailure(id));
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
    dispatch(editDataRedux(id, name, phoneNumber));
    return request
      .put(id, { name, phoneNumber })
      .then(response => {
        dispatch(editDataSuccess(response.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(editDataFailure(id));
      });
  };
};

//end put edit

//start delete deleted
export const deletedDataSuccess = (id, phonebooks) => ({
  type: "DELETE_STORE_SUCCESS",
  id,
  phonebooks
});

export const deletedDataFailure = () => ({
  type: "DELETE_STORE_FAILURE"
});

export const deletedDataRedux = id => ({
  type: "DELETE_STORE",
  id
});
export const deletedData = id => {
  return dispatch => {
    dispatch(deletedDataRedux(id));
    return request
      .delete(id)
      .then(result => {
        dispatch(deletedDataSuccess(id,result.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(deletedDataFailure(id));
      });
  };
};
//end deleted

//start search
export const searchDataSuccess = phonebooks => ({
  type: "SEARCH_DATA_SUCCESS",
  phonebooks
});
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
      .post(`search`, { name, phoneNumber })
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
// export const resend = (id, name, phoneNumber) => {
//   return dispatch => {
//     dispatch(addDataRedux(id, name, phoneNumber));
//     return request
//       .post("", { name, message })
//       .then(function(response) {
//         dispatch(addDataSuccess(response.data));
//       })
//       .catch(function(error) {
//         console.error(error);
//         dispatch(addDataFailure(id));
//       });
//   };
// };
// end resend

export const showEdit = (id, index) => ({ type: "EDIT_ON", id, index });
export const hideEdit = (id, index) => ({ type: "EDIT_OFF", id, index });
