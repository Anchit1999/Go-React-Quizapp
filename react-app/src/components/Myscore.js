import React, { Component } from 'react';
import './ViewPeople.css';

class Myscore extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    var chk = JSON.parse(window.localStorage.getItem('chk'));
    const request = new Request('http://127.0.0.1:8080/userquiz/'+chk.uname);
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">My Score</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              <th>Quiz ID</th>
              <th>Category</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.quizno}</td>
                      <td>{item.category}</td>
                      <td>{item.score}</td>
                  </tr>
                )
             })}
          </tbody>
       </table>
      </div>
    );
  }
}

export default Myscore;
