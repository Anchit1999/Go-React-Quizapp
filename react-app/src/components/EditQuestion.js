import React, { Component } from 'react';
import './ViewPeople.css';

class EditQuestion extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      edit: false,
      quedata: [],
      notadmin: false,
      CategoryList: [],
    }
    this.handleEdit = this.handleEdit.bind(this);
    this.handleQnoChange = this.handleQnoChange.bind(this);
    this.handleQChange = this.handleQChange.bind(this);
    this.handleo1Change = this.handleo1Change.bind(this);
    this.handleo2Change = this.handleo2Change.bind(this);
    this.handleo3Change = this.handleo3Change.bind(this);
    this.handleo4Change = this.handleo4Change.bind(this);
    this.handleCChange = this.handleCChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    var chk = JSON.parse(window.localStorage.getItem('chk'));
    // console.log(chk);
    if (chk.isadmin == false) {
      this.setState({ notadmin: true })
    }
    else{
    const request = new Request('http://127.0.0.1:8080/que/');
    fetch(request)
      .then(response => response.json())
      .then(data => this.setState({ data: data }));
    }
  }

  handleEdit(event) {
    console.log(event.target.value),
      fetch('http://127.0.0.1:8080/oneque/' + event.target.value)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.setState({ quedata: data })
          document.getElementById("1").checked = this.state.quedata.ans1;
          document.getElementById("2").checked = this.state.quedata.ans2;
          document.getElementById("3").checked = this.state.quedata.ans3;
          document.getElementById("4").checked = this.state.quedata.ans4;
          // console.log(document.getElementById("1"))
          if(data.category === "Sports"){
            this.setState({CategoryList: ['Sports', 'Movies', 'General Knowledge']})
          }
          else if(data.category === "Movies"){
            this.setState({CategoryList: ['Movies','Sports','General Knowledge']})
          }
          else if(data.category === "General Knowledge"){
            this.setState({CategoryList: ['General Knowledge','Movies','Sports']})
          }
        });
    this.setState({ edit: true })
  }

  handleQnoChange(event) {
    this.state.quedata.qid = event.target.value;
    this.setState({ quedata: this.state.quedata })
  }
  handleQChange(event) {
    this.state.quedata.qname = event.target.value;
    this.setState({ quedata: this.state.quedata })
  }
  handleo1Change(event) {
    this.state.quedata.opt1 = event.target.value;
    this.setState({ quedata: this.state.quedata })
  }
  handleo2Change(event) {
    this.state.quedata.opt2 = event.target.value;
    this.setState({ quedata: this.state.quedata })
  }
  handleo3Change(event) {
    this.state.quedata.opt3 = event.target.value;
    this.setState({ quedata: this.state.quedata })
  }
  handleo4Change(event) {
    this.state.quedata.opt4 = event.target.value;
    this.setState({ quedata: this.state.quedata })
  }
  handleCChange(event) {
    this.state.quedata.category = event.target.value;
    this.setState({ quedata: this.state.quedata })
  }
  handleSubmit(event) {
    this.state.quedata.ans1 = false;
    this.state.quedata.ans2 = false;
    this.state.quedata.ans3 = false;
    this.state.quedata.ans4 = false;
    if (document.querySelector('input[name="opt1"]:checked')) {
      this.state.quedata.ans1 = true
    }
    if (document.querySelector('input[name="opt2"]:checked')) {
      this.state.quedata.ans2 = true
    }
    if (document.querySelector('input[name="opt3"]:checked')) {
      this.state.quedata.ans3 = true
    }
    if (document.querySelector('input[name="opt4"]:checked')) {
      this.state.quedata.ans4 = true
    }
    this.setState({quedata: this.state.quedata})
    console.log("submit");
    console.log(this.state.quedata.id)
    console.log(JSON.stringify(this.state.quedata))
    fetch('http://127.0.0.1:8080/que/' + this.state.quedata.id, {
      method: 'PUT',
      body: JSON.stringify(this.state.quedata),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
    window.location.reload()
  }
  render() {
    if (this.state.notadmin) {
      return (
        <h2>You are not an Admin</h2>
      )
    }
    else if (!this.state.edit) {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Edit Questions</h1>
          </header>

          <table className="table-hover">
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
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>{this.state.data.map(function (item, key) {
              return (
                <tr key={key}>
                  <td>{key+1}</td>
                  <td>{item.qid}</td>
                  <td>{item.category}</td>
                  <td>{item.qname}</td>
                  <td>{item.opt1}</td>
                  <td>{item.opt2}</td>
                  <td>{item.opt3}</td>
                  <td>{item.opt4}</td>
                  <td>{item.ans1.toString()} </td>
                  <td>{item.ans2.toString()}</td>
                  <td>{item.ans3.toString()}</td>
                  <td>{item.ans4.toString()}</td>
                  <td><button type="submit" onClick={this.handleEdit} className="btn btn-success" value={item.id}>Edit</button></td>
                </tr>
              )
            }, this)}
            </tbody>
          </table>
        </div>
      );
    }
    else {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Change Question</h1>
          </header>
          <br /><br />
          <div className="formContainer">
            <div className="form-group">
              <h3>Quiz Number</h3>
              <input type="text" className="form-control" value={this.state.quedata.qid} onChange={this.handleQnoChange} />
              <br></br>
              <h3>Question</h3>
              <input type="text" className="form-control" value={this.state.quedata.qname} onChange={this.handleQChange} />
            </div>
            <div className="form-group">
              <h3>Opt1</h3>
              <input type="text" className="form-control" value={this.state.quedata.opt1} onChange={this.handleo1Change} />
              <br></br>
              <h3>Opt2</h3>
              <input type="text" className="form-control" value={this.state.quedata.opt2} onChange={this.handleo2Change} />
              <br></br>
              <h3>Opt3</h3>
              <input type="text" className="form-control" value={this.state.quedata.opt3} onChange={this.handleo3Change} />
              <br></br>
              <h3>Opt4</h3>
              <input type="text" className="form-control" value={this.state.quedata.opt4} onChange={this.handleo4Change} />
            </div>
            <div>
              <h3>Answer</h3>
              <ul>
                <li><h4><input type="checkbox" name="opt1" id="1" />Opt1</h4></li>
                <li><h4><input type="checkbox" name="opt2" id="2" />Opt2</h4></li>
                <li><h4><input type="checkbox" name="opt3" id="3" />Opt3</h4></li>
                <li><h4><input type="checkbox" name="opt4" id="4" />Opt4</h4></li>
              </ul>
            </div>
            <div>
              <h3>Choose Category:</h3>
              <select onChange={this.handleCChange} className="form-control">
                {this.state.CategoryList.map(function (cat, key) {
                  return (<option key={key} value={cat}>{cat}</option>)
                })}
              </select>
            </div>
            <button type="submit" className="btn btn-default" onClick={this.handleSubmit}>Submit</button>
          </div>
        </div>);
    }
  }
}

export default EditQuestion;
