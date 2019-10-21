import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addStore} from '../actions/index';
import swal from 'sweetalert2';

class AddPhonebooks extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            phoneNumber: '',
            added:false
        }
        this.handleButtonAdd = this.handleButtonAdd.bind(this)
        this.handleButtonCancel = this.handleButtonCancel.bind(this)
    }

    handleButtonAdd() {
        this.setState({added:true})
    }
    handleButtonCancel () {
        this.setState({added: false})
    }

    handleNameChange(e) {
        this.setState({name: e.target.value})
    }
}