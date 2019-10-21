import { connect } from "react-redux";
import Swal from "sweetalert2";
import { editData, hideEdit } from "../actions";
import { PhonebookItemEdit } from "../components/PhonebookItemEdit";

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSave: (name, phoneNumber) => {
    dispatch(editData(ownProps._id, name, phoneNumber));
    dispatch(hideEdit(ownProps._id, ownProps.index));
    Swal.fire({
      title: "Data have been edited",
      type: "success",
      timer: 1000,
      showConfirmButton: false
    })
  },
  onCancel: e => {
    e.preventDefault();
    dispatch(hideEdit(ownProps._id, ownProps.index));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(PhonebookItemEdit);
