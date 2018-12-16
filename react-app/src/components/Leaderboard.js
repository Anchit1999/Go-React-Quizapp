import React, { Component } from 'react';
import './ViewPeople.css';

class Leaderboard extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      category: "",
      CategoryList: ['TotalScore', 'Sports', 'Movies', 'General Knowledge'],
    }
    this.handleCChange = this.handleCChange.bind(this);
    this.handleApply = this.handleApply.bind(this);
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/people/');
    fetch(request)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        data.sort(function (a, b) {
          return Number(b.totalscore) > Number(a.totalscore)
        });
        this.setState({ data: data })
      });
    this.setState({category: this.state.CategoryList[0]})
  }

  handleApply() {
    if (this.state.category === "TotalScore") {
      this.state.data.sort(function (a, b) {
        return Number(b.totalscore) > Number(a.totalscore)
      })
    }
    else if(this.state.category === "Sports") {
      this.state.data.sort(function (a, b) {
        return Number(b.sportsscore) > Number(a.sportsscore)
      })
    }
    else if(this.state.category === "Movies") {
      this.state.data.sort(function (a, b) {
        return Number(b.moviesscore) > Number(a.moviesscore)
      })
    }
    else if(this.state.category === "General Knowledge") {
      this.state.data.sort(function (a, b) {
        return Number(b.gkscore) > Number(a.gkscore)
      })
    }
    this.setState({data: this.state.data})
  }
  handleCChange(event) {
    this.setState({ category: event.target.value })
    // this.state.category = event.target.value;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All Questions</h1>
        </header>

        <div className="formContainer">
          <h1 className="App-title">Choose Category:</h1>
          <select onChange={this.handleCChange} className="form-control">
            {this.state.CategoryList.map(function (cat, key) {
              return (<option key={key} value={cat}>{cat}</option>)
            })}
          </select>
          <button type="submit" className="btn btn-info" onClick={this.handleApply}>Apply</button>
        </div>
        <table className="table-hover">
          <thead>
            <tr>
              <th>Sno</th>
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
                <td>{key+1}</td>
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

export default Leaderboard;
