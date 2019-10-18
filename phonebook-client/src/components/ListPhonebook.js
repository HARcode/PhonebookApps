import React from "react";
import PropTypes from "prop-types";
import PhonebookItem from "./PhonebookItem";

function ListPhonebook({ phonebooks, showEdit, showDelete }) {
  return (
    <table className="table table-striped table-sm">
      <thead className="thead-dark">
        <th scope="col" className="th-sm">
          #
        </th>
        <th scope="col" className="th-sm">
          Name
        </th>
        <th scope="col" className="th-sm">
          Phone
        </th>
        <th scope="col" className="th-sm">
          Actions
        </th>
      </thead>
      <tbody>
        {phonebooks.map((phonebook, index) => (
          <PhonebookItem
            {...phonebook}
            key={index}
            index={index}
            onEdit={id => showEdit(id, index)}
            onDelete={id => showDelete(id, phonebook.name)}
          />
        ))}
      </tbody>
    </table>
  );
}

ListPhonebook.propTypes({
  phonebook: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired
    })
  ).isRequired,
  showEdit: PropTypes.func.isRequired,
  showDelete: PropTypes.func.isRequired
});

export default ListPhonebook;
