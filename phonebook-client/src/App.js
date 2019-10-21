import React from "react";
import ListPhonebook from "./containers/ListPhonebook";
import SearchPhonebook from "./containers/SearchPhonebook";
import AddPhonebooks from "./containers/AddPhonebooks"

function App() {
  return (
    <div className="container body-dashboard">
      <div className="card" style={{ width: "100%" }}>
        <div className="card-header bg-primary text-white">
          <div className="row justify-content-between align-items-center mx-3 mt-2">
            <h2><i className="fa fa-address-card mr-2"></i>Phonebook App</h2>
            <SearchPhonebook />
          </div>
        </div>
        <div className="card-body">
          {/* <div className="row my-1 mx-1"> */}
            <AddPhonebooks />
          {/* </div> */}
          <div className="row my-2 mx-1">
            <ListPhonebook />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
