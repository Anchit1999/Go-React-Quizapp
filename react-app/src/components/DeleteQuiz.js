import React, { Component } from 'react';
import './Sports.css';

class DeleteQuiz extends Component {
  constructor() {
    super();
    this.state = {
      sports: [],
      movies: [],
      gk: [],
      val: "",
      score: 0,
      notadmin: false,
      submitted: false,
      quizsubmitted: false,
      quizdone: false,
      qscore: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    var chk = JSON.parse(window.localStorage.getItem('chk'));
    // console.log(chk);
    if (chk.isadmin == false) {
      this.setState({ notadmin: true })
    }
    else {
      const request = new Request('http://127.0.0.1:8080/que/');
      fetch(request)
        .then(response => response.json())
        .then(data => {
          // console.log(data);
          var i;
          for (i = 0; i < data.length; i++) {
            if (this.state.sports.indexOf(data[i].qid) == -1 && data[i].category === "Sports") {
              this.state.sports.push(data[i].qid);
            }
            if (this.state.movies.indexOf(data[i].qid) == -1 && data[i].category === "Movies") {
              this.state.movies.push(data[i].qid);
            }
            if (this.state.gk.indexOf(data[i].qid) == -1 && data[i].category === "General Knowledge") {
              this.state.gk.push(data[i].qid);
            }
            // console.log(data[i].qid)   
          }
          // console.log(this.state.sports)
          this.setState({ sports: this.state.sports })
          this.setState({ movies: this.state.movies })
          this.setState({ gk: this.state.gk })
        });
    }
  }
  handleSubmit(event) {
    var a = document.querySelector('input[name="cat"]:checked')
    console.log(a.value);
    console.log(a.id)
    fetch('http://localhost:8080/quiz/' + a.value + '/' + a.id, {
      method: 'DELETE',
    })
    window.location.reload()
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
            <h1 className="App-title">Delete Quiz</h1>
          </header>
          <table className="table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Quiz IDs</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowSpan={this.state.sports.length + 1}>Sports</td>
              </tr>
              {this.state.sports.map(function (item, key) {
                return (
                  <tr key={key}>
                    <td>{item}</td>
                    <td><input type="radio" key={key} name="cat" value="Sports" id={item} /></td>
                  </tr>
                )
              })}
              <tr>
                <td rowSpan={this.state.movies.length + 1}>Movies</td>
              </tr>
              {this.state.movies.map(function (item, key) {
                return (
                  <tr key={key}>
                    <td>{item}</td>
                    <td><input type="radio" key={key} name="cat" value="Movies" id={item} /></td>
                  </tr>
                )
              })}
              <tr>
                <td rowSpan={this.state.gk.length + 1}>General Knowledge</td>
              </tr>
              {this.state.gk.map(function (item, key) {
                return (
                  <tr key={key}>
                    <td>{item}</td>
                    <td><input type="radio" key={key} name="cat" value="General Knowledge" id={item} /></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <button onClick={this.handleSubmit} className="btn btn-danger">Submit</button>
        </div>

      );
    }
  }
}

export default DeleteQuiz;
