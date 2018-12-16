import React, { Component } from 'react';
import './ViewPeople.css';

class ViewPeople extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      notadmin: false,
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
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
            <h1 className="App-title">View All People</h1>
          </header>

          <table className="table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Sports Score</th>
                <th>Movie Score</th>
                <th>GK Score</th>
                <th>Total Score</th>
              </tr>
            </thead>
            <tbody>{this.state.data.map(function (item, key) {
              return (
                <tr key={key}>
                  <td>{item.id}</td>
                  <td>{item.firstname}</td>
                  <td>{item.lastname}</td>
                  <td>{item.username}</td>
                  <td>{item.sportsscore}</td>
                  <td>{item.moviesscore}</td>
                  <td>{item.gkscore}</td>
                  <td>{item.totalscore}</td>
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default ViewPeople;
