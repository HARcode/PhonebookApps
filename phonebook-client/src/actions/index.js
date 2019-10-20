import React from "react";
import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:3001/api/phonebook/",
  timeout: 1000
});

const loadPhonebooks = () => ({
  //
});

export const successAdded = (id, name, phoneNumber) => ({
  type: "ADD_SUCCESS",
  id,
  name,
  phoneNumber
});

export const showEdit = (id, index) => ({ type: "EDIT_ON", id, index });

export const hideEdit = (id, index) => ({ type: "EDIT_OFF", id, index });

export const showDelete = (id, name) => ({ type: "DELETE", id, name });
