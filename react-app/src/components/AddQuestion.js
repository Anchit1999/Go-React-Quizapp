import React, { Component } from 'react';
import './AddQuestion.css';

class Addquestion extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        qname: "",
        opt1: "",
        opt2: "",
        opt3: "",
        opt4: "",
        ans1: false,
        ans2: false,
        ans3: false,
        ans4: false,
        qid: "",
        category: 'Sports',
      },
      notadmin: false,
      CategoryList: ['Sports', 'Movies', 'General Knowledge'],
      submitted: false,
      Err: false,
    }
    this.handleQnoChange = this.handleQnoChange.bind(this);
    this.handleQChange = this.handleQChange.bind(this);
    this.handleo1Change = this.handleo1Change.bind(this);
    this.handleo2Change = this.handleo2Change.bind(this);
    this.handleo3Change = this.handleo3Change.bind(this);
    this.handleo4Change = this.handleo4Change.bind(this);
    this.handleCChange = this.handleCChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    var chk = JSON.parse(window.localStorage.getItem('chk'));
    // console.log(chk);
    if (chk.isadmin == false) {
      this.setState({ notadmin: true })
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.formData.qid)
    var c = 0;
    if (document.querySelector('input[name="opt1"]:checked')) {
      c = c + 1
      this.state.formData.ans1 = true
    }
    if (document.querySelector('input[name="opt2"]:checked')) {
      c = c + 1
      this.state.formData.ans2 = true
    }
    if (document.querySelector('input[name="opt3"]:checked')) {
      c = c + 1
      this.state.formData.ans3 = true
    }
    if (document.querySelector('input[name="opt4"]:checked')) {
      c = c + 1
      this.state.formData.ans4 = true
    }
    var a = this.state.formData
    if (a.qid.length > 0 && a.qname.length > 0 && a.opt1.length > 0 && a.opt2.length > 0 && a.opt3.length > 0 && a.opt4.length > 0 && c > 0) {
      fetch('http://localhost:8080/que', {
        method: 'POST',
        body: JSON.stringify(this.state.formData),
      })
        .then(response => {
          console.log(response)
          if (response.status >= 200 && response.status < 300)
            this.setState({ submitted: true });
          this.setState({ Err: false });
        });
    }
    else {
      this.setState({ Err: true })
    }
  }

  handleQnoChange(event) {
    this.state.formData.qid = event.target.value;
  }
  handleQChange(event) {
    this.state.formData.qname = event.target.value;
  }
  handleo1Change(event) {
    this.state.formData.opt1 = event.target.value;
  }
  handleo2Change(event) {
    this.state.formData.opt2 = event.target.value;
  }
  handleo3Change(event) {
    this.state.formData.opt3 = event.target.value;
  }
  handleo4Change(event) {
    this.state.formData.opt4 = event.target.value;
  }
  handleCChange(event) {
    this.state.formData.category = event.target.value;
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
            <h1 className="App-title">Add Question</h1>
          </header>
          <br /><br />
          <div className="formContainer">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <h3>Quiz Number</h3>
                <input type="text" className="form-control" value={this.state.qid} onChange={this.handleQnoChange} />
                <br></br>
                <h3>Question</h3>
                <input type="text" className="form-control" value={this.state.qname} onChange={this.handleQChange} />
              </div>
              <div className="form-group">
                <h3>Opt1</h3>
                <input type="text" className="form-control" value={this.state.opt1} onChange={this.handleo1Change} />
                <br></br>
                <h3>Opt2</h3>
                <input type="text" className="form-control" value={this.state.opt2} onChange={this.handleo2Change} />
                <br></br>
                <h3>Opt3</h3>
                <input type="text" className="form-control" value={this.state.opt3} onChange={this.handleo3Change} />
                <br></br>
                <h3>Opt4</h3>
                <input type="text" className="form-control" value={this.state.opt4} onChange={this.handleo4Change} />
              </div>
              <div>
                <h3>Answer</h3>
                <ul>
                  <li><h4><input type="checkbox" name="opt1" />Opt1</h4></li>
                  <li><h4><input type="checkbox" name="opt2" />Opt2</h4></li>
                  <li><h4><input type="checkbox" name="opt3" />Opt3</h4></li>
                  <li><h4><input type="checkbox" name="opt4" />Opt4</h4></li>
                </ul>
              </div>
              <div>
                <h3>Choose Category:</h3>
                <select onChange={this.handleCChange} className="form-control" id="aq">
                  {this.state.CategoryList.map(function (cat, key) {
                    return (<option key={key} value={cat}>{cat}</option>)
                  })}
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>

          {this.state.submitted &&
            <div>
              <h2>
                New Question successfully added.
            </h2>
            </div>
          }
          {this.state.Err &&
            <div>
              <h2>
                Please check the details again.
            </h2>
            </div>
          }
        </div>
      );
    }
  }
}

export default Addquestion;
