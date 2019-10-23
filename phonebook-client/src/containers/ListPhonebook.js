import React from "react";
import { connect } from "react-redux";
import { loadPhonebooks } from "../actions";
import PhonebookItemActive from "./PhonebookItemActive";
import PhonebookItemEdit from "./PhonebookItemEdit";

class ListPhonebook extends React.Component {
  componentDidMount() {
    this.props.loadPhonebooks();
  }

  render() {
    const { phonebooks } = this.props;
    return (
      <div
        className="table-responsive"
        style={{ maxHeight: "50vh", overflow: "auto" }}
      >
        <table className="table table-fix-head table-striped table-sm">
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
                <PhonebookItemActive {...phonebook} key={index} index={index} />
              )
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  phonebooks: state.phonebooks
});

const mapDispatchToProps = dispatch => ({
  loadPhonebooks: () => dispatch(loadPhonebooks())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPhonebook);
