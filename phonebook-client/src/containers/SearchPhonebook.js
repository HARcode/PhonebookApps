import React from "react";
import { connect } from "react-redux";
import { searchData } from "../actions";

class SearchPhonebook extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", phoneNumber: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleKeyUp() {
    this.props.searchData(this.state.name, this.state.phoneNumber);
  }

  render() {
    return (
      <form className="form-inline">
        <input
          type="text"
          name="name"
          placeholder="Search name"
          value={this.state.name}
          size="13"
          onChange={this.handleChange}
          className="form-control mb-2 mr-sm-2"
          onKeyUp={this.handleKeyUp}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Search phone number"
          value={this.state.phoneNumber}
          size="13"
          onChange={this.handleChange}
          className="form-control mb-2 mr-sm-2"
          onKeyUp={this.handleKeyUp}
        />
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  searchData: (name, phoneNumber) => dispatch(searchData(name, phoneNumber))
});

export default connect(
  null,
  mapDispatchToProps
)(SearchPhonebook);
