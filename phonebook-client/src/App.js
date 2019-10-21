import React from "react";
import ListPhonebook from "./containers/ListPhonebook";
import AddPhonebooks from "./containers/AddPhonebooks"

function App() {
  return (
    <div className="container body-dashboard">
      <AddPhonebooks />
      <ListPhonebook />
    </div>
  );
}

export default App;
