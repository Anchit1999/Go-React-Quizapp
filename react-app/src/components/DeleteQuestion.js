import React, { Component } from 'react';
import './DeletePerson.css';

class DeleteQuestion extends Component {
  constructor() {
    super();
    this.state = {
      check: '',
      data: [],
      notadmin: false,
      submitted: false,
    }
  }

  handleSubmit = (event) => {
    var val = document.querySelector('input[name="optionradio"]:checked').value;
    console.log('http://localhost:8080/que/' + val);
    event.preventDefault();
    fetch('http://localhost:8080/que/' + val, {
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
      const request = new Request('http://127.0.0.1:8080/que/');
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
            <h1 className="App-title">Delete Question</h1>
          </header>
          <div>
            <form onSubmit={this.handleSubmit}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Sno</th>
                    <th>Quiz ID</th>
                    <th>Category</th>
                    <th>Question Name</th>
                    <th>Opt1</th>
                    <th>Opt2</th>
                    <th>Opt3</th>
                    <th>Opt4</th>
                    <th>Ans1</th>
                    <th>Ans2</th>
                    <th>Ans3</th>
                    <th>Ans4</th>
                    <th>Select</th>
                  </tr>
                </thead>
                <tbody>{this.state.data.map(function (item, key) {
                  return (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{item.qid}</td>
                      <td>{item.category}</td>
                      <td>{item.qname}</td>
                      <td>{item.opt1}</td>
                      <td>{item.opt2}</td>
                      <td>{item.opt3}</td>
                      <td>{item.opt4}</td>
                      <td>{item.ans1.toString()}</td>
                      <td>{item.ans2.toString()}</td>
                      <td>{item.ans3.toString()}</td>
                      <td>{item.ans4.toString()}</td>
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

export default DeleteQuestion;
