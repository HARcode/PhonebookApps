import React from "react";
import ListPhonebook from "./containers/ListPhonebook";
import SearchPhonebook from "./containers/SearchPhonebook";
import AddPhonebooks from "./containers/AddPhonebooks"

function App() {
  return (
    <div className="container body-dashboard">
      <div className="card" style={{width: "100%"}}>
        <div className="card-header bg-primary justify-content-between text-white">
          <h3><i className="fa fa-address-card mr-2"></i>Phonebook App</h3>
        </div>
        <div className="card-body">
          <AddPhonebooks />
          <div className="row my-2">
            <SearchPhonebook />
          </div>
          <div className="row my-2">
            <ListPhonebook />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
