import React from "react";

export function PhonebookItem({
  index,
  _id,
  name,
  phoneNumber,
  id,
  sent,
  onEdit,
  onDelete,
  resendData
}) {
  if (!_id) _id = id;
  if (sent) {
    return (
      <tr>
        <td onDoubleClick={() => onEdit(_id, index)}>{index + 1}</td>
        {/* doubleclick to show edit form */}
        <td onDoubleClick={() => onEdit(_id, index)}>{name}</td>
        <td onDoubleClick={() => onEdit(_id, index)}>{phoneNumber}</td>
        <td onDoubleClick={() => onEdit(_id, index)}>
          <button
            className="btn text-success bg-transparent"
            onClick={() => onEdit(_id, index)}
          >
            <i className="fa fa-pencil fa-lg"></i>
          </button>
          <button
            className="btn text-danger bg-transparent mr-2"
            onClick={() => onDelete({ _id, name, phoneNumber, id, sent })}
          >
            <i className="fa fa-trash fa-lg"></i>
          </button>
        </td>
      </tr>
    );
  }
  return (
    <tr>
      <td>{index + 1}</td>
      <td colSpan="2" className="text-danger">Network failed, please check your connection</td>
      <td>
        <button
          className="btn text-primary bg-transparent"
          onClick={() => resendData(_id, name, phoneNumber)}
        >
          <i className="fa fa-refresh fa-lg mr-2"></i> Resend
        </button>
      </td>
    </tr>
  );
}
