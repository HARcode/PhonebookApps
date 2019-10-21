import React, { Component } from "react";
import Swal from "sweetalert2";
import { Manager, Reference, Popper } from "react-popper";

export class PhonebookItemEdit extends Component {
  constructor(props) {
    super(props);
    let { name, phoneNumber } = props;
    this.state = { name, phoneNumber, isValid: true };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      (this.props.name === this.state.name &&
        this.props.phoneNumber === this.state.phoneNumber) ||
      !this.state.isValid
    ) {
      Swal.fire({
        title: "Phonebook is not updated.",
        timer: 2000,
        type: "warning",
        showConfirmButton: false
      });
      this.props.onCancel(e);
    } else {
      this.props.onSave(this.state.name, this.state.phoneNumber);
    }
  }

  render() {
    let { index, onCancel } = this.props;
    return (
      <tr>
        <td scope="row">{index + 1}</td>
        <td>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              className="form-control"
              size="8"
              value={this.state.name}
              onChange={this.handleNameChange}
              required={true}
              placeholder="Name"
            />
          </form>
        </td>
        <td>
          <Manager>
            <Reference>
              {({ ref }) => (
                <form onSubmit={this.handleSubmit}>
                  <input
                    type="text"
                    className="form-control"
                    size="8"
                    value={this.state.phoneNumber}
                    onChange={this.handlePhoneChange}
                    required={true}
                    ref={ref}
                    placeholder="Phone number"
                  />
                </form>
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
        </td>
        <td>
          <form onSubmit={this.handleSubmit}>
            <button
              role="link"
              className="btn text-success bg-transparent"
              type="submit"
            >
              <i className="fa fa-check fa-lg"></i>
            </button>
            <a
              href=""
              className="btn text-danger bg-transparent mr-2"
              onClick={onCancel}
            >
              <i className="fa fa-times fa-lg"></i>
            </a>
          </form>
        </td>
      </tr>
    );
  }
}
