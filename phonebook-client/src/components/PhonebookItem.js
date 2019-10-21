import React from "react";

function PhonebookItem({
  index,
  _id,
  name,
  phoneNumber,
  id,
  sent,
  onEdit,
  onDelete
}) {
  if (!_id) _id = id;
  if (sent) {
    return (
      <tr>
        <td scope="row" onDoubleClick={() => onEdit(_id)}>
          {index + 1}
        </td>
        {/* doubleclick to show edit form */}
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
            <i className="fa fa-trash fa-lg"></i>
          </a>
        </td>
      </tr>
    );
  }
  return (
    <tr>
      <td scope="row">{index + 1}</td>
      <td colSpan="2">Network failed, please check your connections</td>
      <td>
        
      </td>
    </tr>
  );
}

export default PhonebookItem;
