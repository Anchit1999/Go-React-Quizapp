import React, { Component } from 'react';
import './NewPerson.css';

class NewPerson extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        firstName: "",
        lastName: "",
        userName: "",
        password: "",
        sportsscore: "0",
        moviesscore: "0",
        gkscore: "0",
        totalscore: "0",
        data: [],
      },
      submitted: false,
      alreadyexists: false,
    }
    this.handleFChange = this.handleFChange.bind(this);
    this.handleLChange = this.handleLChange.bind(this);
    this.handleUChange = this.handleUChange.bind(this);
    this.handleCChange = this.handleCChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    console.log(this.state.formData.userName);
    var uname = this.state.formData.userName;
    const request = new Request('http://127.0.0.1:8080/people/'+uname);
    fetch(request)
      .then(response => response.json())
        .then(data => {
            console.log(data);
            if(this.state.formData.userName === data.username)
            {
                this.setState({alreadyexists: true})
            }
            else
            {
              this.setState({alreadyexists: false})
              // console.log(JSON.stringify(this.state.formData))
              fetch('http://localhost:8080/people', {
                method: 'POST',
                body: JSON.stringify(this.state.formData),
              })
                 .then(response => {
                   if(response.status >= 200 && response.status < 300)
                     this.setState({submitted: true});
                 });
            }
        });
  }

  handleFChange(event) {
    this.state.formData.firstName = event.target.value;
  }
  handleLChange(event) {
    this.state.formData.lastName = event.target.value;
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
          <h1 className="App-title">Register Here</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>First Name</label>
                <input type="text" className="form-control" value={this.state.firstName} onChange={this.handleFChange}/>
            </div>
            <div className="form-group">
                <label>Last Name</label>
                <input type="text" className="form-control" value={this.state.lastName} onChange={this.handleLChange}/>
            </div>
            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" value={this.state.userName} onChange={this.handleUChange}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={this.state.password} onChange={this.handleCChange}/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>

        {this.state.submitted &&
          <div>
            <h2>
              New person successfully added.
            </h2>
             This has been printed using conditional rendering.
          </div>
        }
        {this.state.alreadyexists &&
          <div>
            <h2>
              Username Already Exists.
            </h2>
          </div>
        }

      </div>
    );
  }
}

export default NewPerson;
