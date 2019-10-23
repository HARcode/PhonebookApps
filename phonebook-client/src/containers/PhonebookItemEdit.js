import { connect } from "react-redux";
import { editData, hideEdit } from "../actions";
import { PhonebookItemEdit } from "../components/PhonebookItemEdit";

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSave: (name, phoneNumber) => {
    dispatch(editData(ownProps._id, name, phoneNumber, ownProps.index));
    dispatch(hideEdit(ownProps._id, ownProps.index));
  },
  onCancel: () => dispatch(hideEdit(ownProps._id, ownProps.index))
});

export default connect(
  null,
  mapDispatchToProps
)(PhonebookItemEdit);
