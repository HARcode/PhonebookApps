import React, { Component } from "react";
import { connect } from "react-redux";
import { addStore } from "../actions/index";
import { Manager, Reference, Popper } from "react-popper";
import Swal from "sweetalert2";

class AddPhonebooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phoneNumber: "",
      added: false,
      isValid: true
    };
    this.handleButtonAdd = this.handleButtonAdd.bind(this);
    this.handleButtonCancel = this.handleButtonCancel.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleButtonAdd() {
    this.setState({ added: true });
  }

  handleButtonCancel() {
    this.setState({ added: false });
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handlePhoneChange(e) {
    let validation = new RegExp("^(08[0-9]{8,11})$");
    let phoneNumber = e.target.value;
    if (!phoneNumber.match(validation))
      this.setState({ phoneNumber, isValid: false });
    else this.setState({ phoneNumber, isValid: true });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (
      this.state.name.trim().length === 0 ||
      this.state.phoneNumber.trim().length === 0 ||
      !this.state.isValid
    ) {
      Swal.fire({
        title: "Phonebook is not added.",
        timer: 2000,
        type: "warning",
        showConfirmButton: false
      });
      if (!this.state.isValid) this.setState({ phoneNumber: "" });
    } else {
      this.props.addStore(this.state.name, this.state.phoneNumber);
      this.setState({ name: "", phoneNumber: "" });
    }
  }

  render() {
    if (this.state.added) {
      return (
        <div className="my-1">
          <div className="card">
            <div className="card-header">
              <strong>Add Form</strong>
            </div>
            <div className="card-body">
              <form className="form-inline" onSubmit={this.handleSubmit}>
                <div className="form-check mb-2 mr-sm-2">
                  <input
                    type="text"
                    className="form-control mb-2 mr-sm-2"
                    id="inlineFormInputName2"
                    placeholder="Name"
                    name="Name"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                    required
                    size="10"
                  />
                </div>
                <Manager>
                  <Reference>
                    {({ ref }) => (
                      <input
                        type="text"
                        className="form-control  mb-3 mr-sm-3"
                        size="10"
                        value={this.state.phoneNumber}
                        onChange={this.handlePhoneChange}
                        required={true}
                        ref={ref}
                        placeholder="Phone number"
                      />
                    )}
                  </Reference>
                  {!this.state.isValid && (
                    <Popper placement="bottom">
                      {({ ref, style, placement, arrowProps }) => (
                        <div ref={ref} style={style} data-placement={placement}>
                          <span className="text-danger">
                            Please input a valid phone number
                          </span>
                          <div ref={arrowProps.ref} style={arrowProps.style} />
                        </div>
                      )}
                    </Popper>
                  )}
                </Manager>

                <div className="form-check mb-2 mr-sm-2">
                  <button
                    type="submit"
                    className="btn text-success bg-transparent mr-2"
                  >
                    <i className="fa fa-check-circle"></i> Submit
                  </button>
                  <button
                    type="button"
                    className="btn text-danger bg-transparent mr-2"
                    onClick={this.handleButtonCancel}
                  >
                    <i className="fa fa-ban"></i> Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <button
          type="button"
          className="btn btn-success my-1"
          onClick={this.handleButtonAdd}
        >
          <i className="fa fa-plus"></i> Add
        </button>
      );
    }
  }
}

const mapDispatchToProps = dispatch => ({
  addStore: (name, phoneNumber) => dispatch(addStore(name, phoneNumber))
});

export default connect(
  null,
  mapDispatchToProps
)(AddPhonebooks);
