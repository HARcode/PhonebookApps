import axios from 'axios'
import { exportAllDeclaration } from '@babel/types';

const API_URL = 'http://localhost:3001/api/';

const request = axios.create({
    baseURL: API_URL,
    timeout:1000
})

//start Loaditem from database


//star post data
export const addDataSuccess = (phonebookdb) => ({
    type:'ADD_STORE_SUCCESS',
    phonebookdb
})

export const addDataFailure = (id) => ({
    type: 'ADD_STORE_FAILURE',
    id
})

export const addDataRedux = (id, name, phoneNumber) => ({
    type: 'ADD_STORE',
    id, name, phoneNumber
})

export const addStore = (name, phoneNumber) => {
    return dispatch => {
        dispatch(addDataRedux(id, name, phoneNumber))
        return request.post('phonebookdb', {name, phoneNumber})
        .then(result => {
            dispatch(addDataSuccess(result.data))
        })
    }
}