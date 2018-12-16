import React, { Component } from 'react';
import './DeletePerson.css';

class DeletePerson extends Component {
  constructor() {
    super();
    this.state = {
      check: '',
      notadmin: false,
      data: []
    }
  }

  handleSubmit = (event) => {
    var val = document.querySelector('input[name="optionradio"]:checked').value;
    console.log('http://localhost:8080/people/' + val);
    event.preventDefault();
    fetch('http://localhost:8080/people/' + val, {
      method: 'DELETE',

    })
      .then(response => {

        if (response.status >= 200 && response.status < 300)
          window.location.reload()
      });
  }
  componentDidMount() {
    var chk = JSON.parse(window.localStorage.getItem('chk'));
    // console.log(chk);
    if (chk.isadmin == false) {
      this.setState({ notadmin: true })
    }
    else {
      const request = new Request('http://127.0.0.1:8080/people/');
      fetch(request)
        .then(response => response.json())
        .then(data => this.setState({ data: data }));
    }
  }

  render() {
    if (this.state.notadmin) {
      return (
        <h2>You are not an Admin</h2>
      )
    }
    else {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Delete a Person</h1>
          </header>
          <div>
            <form onSubmit={this.handleSubmit}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Sno</th>
                    <th>Id</th>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Username</th>
                    <th>Select</th>
                  </tr>
                </thead>
                <tbody>{this.state.data.map(function (item, key) {
                  return (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{item.id}</td>
                      <td>{item.firstname}</td>
                      <td>{item.lastname}</td>
                      <td>{item.username}</td>
                      <td><input type="radio" name="optionradio" value={item.id} /></td>
                    </tr>
                  )
                })}
                </tbody>
              </table>
              <button onClick={this.handleSubmit} className="btn btn-danger">Submit</button>
            </form>
          </div>
        </div>
      );
    }
  }
}

export default DeletePerson;
