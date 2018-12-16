import React, { Component } from 'react';
import './NewPerson.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        userName: "",
        password: "",
      },
      submitted: false,
      login: false,
    }
    this.handleUChange = this.handleUChange.bind(this);
    this.handleCChange = this.handleCChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    var chk = {
        islogin: false,
        isadmin: false,
        uname: null,
    }
    window.localStorage.setItem('chk',JSON.stringify(chk));
    
  }
  handleSubmit (event) {
    event.preventDefault();
    this.setState({submitted: true})
    console.log(this.state.formData.userName)
    var name = this.state.formData.userName
    const request = new Request('http://127.0.0.1:8080/people/'+name);
    fetch(request)
      .then(response => response.json())
        .then(data => {
            console.log(data);
            var chk;
            if(this.state.formData.userName === "Admin" && this.state.formData.password === data.password)
            {
                console.log("kclahkfblh")
                this.setState({login: true})
                chk = {
                    islogin: true,
                    isadmin: true,
                    uname: this.state.formData.userName,
                }
            }
            else if(this.state.formData.password === data.password)
            {
                console.log("true")
                this.setState({login: true})
                chk = {
                    islogin: true,
                    isadmin: false,
                    uname: this.state.formData.userName,
                }
            }
            else
            {
                console.log("false")
                this.setState({login: false})
                chk = {
                    islogin: false,
                    isadmin: false,
                    uname: null,
                }
            }
            window.localStorage.setItem('chk',JSON.stringify(chk));
            console.log(chk)
            if(chk.islogin){
              window.location.replace('/')
            }
            
        });
  }
  handleUChange(event) {
    this.state.formData.userName = event.target.value;
  }
  handleCChange(event) {
    this.state.formData.password = event.target.value;
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Login</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" value={this.state.userName} onChange={this.handleUChange} required/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={this.state.password} onChange={this.handleCChange} required/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>

        {this.state.login &&
          <div>
            <h2>
              Successfully logged in.
            </h2>
             This has been printed using conditional rendering.
          </div>
        }
        {!this.state.login && this.state.submitted &&
          <div>
            <h2>
              Please Enter Correct Details.
            </h2>
          </div>
        }

      </div>
    );
  }
}

export default Login;
