import React from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { loadPhonebooks, showEdit, deletedData } from "../actions";
import PhonebookItem from "../components/PhonebookItem";
import PhonebookItemEdit from "./PhonebookItemEdit";

class ListPhonebook extends React.Component {
  componentDidMount() {
    this.props.loadPhonebooks();
  }

  render() {
    const { phonebooks, showEdit, showDelete } = this.props;
    return (
      <div className="table-responsive" style={{maxHeight: "60vh", overflow: "auto"}}>
      <table className="table table-striped table-sm">
        <thead className="thead-dark">
          <tr>
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
          </tr>
        </thead>
        <tbody>
          {phonebooks.map((phonebook, index) =>
            phonebook.editOn ? (
              <PhonebookItemEdit {...phonebook} key={index} index={index} />
            ) : (
              <PhonebookItem
                {...phonebook}
                key={index}
                index={index}
                onEdit={id => showEdit(id, index)}
                onDelete={id => showDelete(id, phonebook.name)}
              />
            )
          )}
        </tbody>
      </table>
      </div>
    );
  }
}

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success ml-2",
    cancelButton: "btn btn-danger"
  },
  buttonsStyling: false
});

const mapStateToProps = state => ({
  phonebooks: state.phonebooks
});

const mapDispatchToProps = dispatch => ({
  loadPhonebooks: () => dispatch(loadPhonebooks()),
  showEdit: (id, index) => dispatch(showEdit(id, index)),
  showDelete: (id, name) => {
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
          dispatch(deletedData(id));
          Swal.fire(
            "Deleted",
            `${name} has been deleted from phonebook`,
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your contact is safe :)",
            "error"
          );
        }
      });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPhonebook);
