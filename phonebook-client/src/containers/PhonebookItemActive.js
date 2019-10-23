import { connect } from "react-redux";
import Swal from "sweetalert2";
import { showEdit, deleteData, resendData } from "../actions";
import { PhonebookItem } from "../components/PhonebookItem";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success ml-2",
    cancelButton: "btn btn-danger"
  },
  buttonsStyling: false
});

const mapDispatchToProps = dispatch => ({
  onEdit: (_id, index) => dispatch(showEdit(_id, index)),
  onDelete: phonebook => {
    const { name } = phonebook;
    swalWithBootstrapButtons
      .fire({
        title: `Are you sure to delete ${name} from your phonebook?`,
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      })
      .then(result => {
        if (result.value) {
          dispatch(deleteData(phonebook));
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your contact is safe :)",
            type: "error",
            timer: 2000
          });
        }
      });
  },
  resendData: (_id, name, phoneNumber) =>
    dispatch(resendData(_id, name, phoneNumber))
});

export default connect(
  null,
  mapDispatchToProps
)(PhonebookItem);
