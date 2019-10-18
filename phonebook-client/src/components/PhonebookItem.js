import React from "react";
import PropTypes from "prop-types";

function PhonebookItem({
  index,
  _id,
  name,
  phoneNumber,
  onEdit,
  onDelete
}) {
  return (
    <tr>
      <td scope="row" onDoubleClick={() => onEdit(_id)}>
        {index + 1}
      </td>
      <td onDoubleClick={() => onEdit(_id)}>{name}</td>
      <td onDoubleClick={() => onEdit(_id)}>{phoneNumber}</td>
      <td onDoubleClick={() => onEdit(_id)}>
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
}

PhonebookItem.propTypes({
  index: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
});

export default PhonebookItem;
