import React, { Component } from 'react';
import './NewPerson.css';

class Logout extends Component {
  constructor() {
    super();
    var chk = {
        islogin: false,
        isadmin: false,
        uname: null,
    }
    window.localStorage.setItem('chk',JSON.stringify(chk));
    window.location.replace('/Login')
  }
}
export default Logout;
