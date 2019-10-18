import React from "react";
import PropTypes from "prop-types";

export default function PhonebookItem ({
  index,
  _id,
  name,
  phoneNumber,
  onEdit,
  onDelete,
  onDoubleClick
}) {
  return (  
  <tr>
    <td scope="row" onDoubleClick={onDoubleClick}>
      {index + 1}
    </td>
    <td onDoubleClick={onDoubleClick}>{name}</td>
    <td onDoubleClick={onDoubleClick}>{phoneNumber}</td>
    <td onDoubleClick={onDoubleClick}>
      <a
        href=""
        className="btn text-success bg-transparent"
        onClick={e => {
          e.preventDefault();
          onEdit(_id);
        }}
      >
        <i className="fa fa-pencil fa-lg"></i>
      </a>
      <a
        href=""
        className="btn text-danger bg-transparent mr-2"
        onClick={e => {
          e.preventDefault();
          onDelete(_id);
        }}
      >
        <i className="fa fa-pencil fa-lg"></i>
      </a>
    </td>
  </tr>
);

PhonebookItem.propTypes({
  index: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired
});