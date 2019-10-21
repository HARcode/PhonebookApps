import React from "react";
import { connect } from "react-redux";
import { searchData } from "../actions";

class SearchPhonebook extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleKeyUp() {
    let regExpPhone = new RegExp("^([0-9])+$");
    let value = this.state.value;
    let values = value.split(" ");
    values = values.filter(value => value.length > 0);
    let phone = values.filter(value => value.match(regExpPhone)).join('');
    let name = values.filter(value => !value.match(regExpPhone)).join(' ');
    this.props.searchData(name, phone);
  }

  render() {
    return (
      <form className="form-inline">
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fa fa-search"></i>
            </div>
          </div>
          <input
            type="text"
            placeholder="Search"
            value={this.state.value}
            size="15"
            onChange={this.handleChange}
            className="form-control mr-sm-2"
            onKeyUp={this.handleKeyUp}
          />
        </div>
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
