import React, { Component } from 'react';
import DeletePerson from './DeletePerson';
import ViewPeople from './ViewPeople';
// import EditPerson from './EditPerson';
import NewPerson from './NewPerson';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import Addquestion from './AddQuestion'
import DeleteQuestion from './DeleteQuestion'
import Sports from './Sports'
import GK from './GK'
import Movies from './Movie'
import NoMatch from './NoMatch'
import Leaderboard from './Leaderboard'
import DeleteQuiz from './DeleteQuiz'
import EditQuestion from './EditQuestion'
import Myscore from './Myscore'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    var chk = JSON.parse(window.localStorage.getItem('chk'));
    console.log(chk);
    console.log("app.js")
    if(chk.islogin && chk.isadmin){
      return(
        <div>
          <Router>
            <div>
              <nav className="navbar navbar-default">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <Link className="navbar-brand" to={'/'}>React App</Link>
                  </div>
                  <ul className="nav navbar-nav">
                    <li><Link to={'/'}>{chk.uname}</Link></li>
                    <li><Link to={'/Logout'}>Logout</Link></li>
                    <li><Link to={'/Leaderboard'}>Leaderboard </Link></li>
                    <li><Link to={'/ViewPeople'}>View People</Link></li>
                    <li><Link to={'/DeletePerson'}>Delete Person</Link></li>
                    <li><Link to={'/Addquestion'}>Add Question</Link></li>
                    <li><Link to={'/ViewQuestion'}>ViewQuestion </Link></li>
                    <li><Link to={'/DeleteQuestion'}>Delete Question</Link></li>
                    <li><Link to={'/DeleteQuiz'}>DeleteQuiz </Link></li>
                  </ul>
                </div>
              </nav>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/Logout' component={Logout} />
                <Route exact path='/DeletePerson' component={DeletePerson} />
                <Route exact path='/ViewPeople' component={ViewPeople} />
                <Route exact path='/Addquestion' component={Addquestion}/>
                <Route exact path='/ViewQuestion' component={EditQuestion}/>
                <Route exact path='/DeleteQuestion' component={DeleteQuestion}/>
                <Route exact path='/Leaderboard' component={Leaderboard}/>
                <Route exact path='/DeleteQuiz' component={DeleteQuiz}/>
                <Route component={NoMatch} />
              </Switch>
            </div>
          </Router>
        </div>
      );
    }
    else if (chk.islogin) {
      return (
        <div>
          <Router>
            <div>
              <nav className="navbar navbar-default">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <Link className="navbar-brand" to={'/'}>React App</Link>
                  </div>
                  <ul className="nav navbar-nav">
                    <li><Link to={'/'}>{chk.uname}</Link></li>
                    <li><Link to={'/Logout'}>Logout</Link></li>
                    <li><Link to={'/Myscore'}>Myscore</Link></li>
                    <li><Link to={'/Leaderboard'}>Leaderboard </Link></li>
                    <li><Link to={'/Sports'}>Sports</Link></li>
                    <li><Link to={'/GK'}>GK</Link></li>
                    <li><Link to={'/Movies'}>Movies</Link></li>
                  </ul>
                </div>
              </nav>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/Logout' component={Logout} />
                <Route exact path='/Myscore' component={Myscore} />
                <Route exact path='/Sports' component={Sports} />
                <Route exact path='/GK' component={GK} />
                <Route exact path='/Movies' component={Movies} />
                <Route exact path='/Leaderboard' component={Leaderboard}/>
                <Route exact path='/DeletePerson' component={DeletePerson} />
                <Route exact path='/ViewPeople' component={ViewPeople} />
                <Route exact path='/Addquestion' component={Addquestion}/>
                <Route exact path='/ViewQuestion' component={EditQuestion}/>
                <Route exact path='/DeleteQuestion' component={DeleteQuestion}/>
                <Route exact path='/DeleteQuiz' component={DeleteQuiz}/>
                <Route component={NoMatch} />
              </Switch>
            </div>
          </Router>
        </div>
      );
    }
    else{
      return (
        <div>
          <Router>
            <div>
              <nav className="navbar navbar-default">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <Link className="navbar-brand" to={'/'}>React App</Link>
                  </div>
                  <ul className="nav navbar-nav">
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/Login'}>Login</Link></li>
                    <li><Link to={'/NewPerson'}>Register</Link></li>
                    <li><Link to={'/Leaderboard'}>Leaderboard </Link></li>
                  </ul>
                </div>
              </nav>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/Login' component={Login} />
                <Route exact path='/Sports' component={Sports} />
                <Route exact path='/GK' component={GK} />
                <Route exact path='/Movies' component={Movies} />
                <Route exact path='/NewPerson' component={NewPerson} />
                <Route exact path='/Leaderboard' component={Leaderboard}/>
                <Route exact path='/DeletePerson' component={DeletePerson} />
                <Route exact path='/ViewPeople' component={ViewPeople} />
                <Route exact path='/Addquestion' component={Addquestion}/>
                <Route exact path='/ViewQuestion' component={EditQuestion}/>
                <Route exact path='/DeleteQuestion' component={DeleteQuestion}/>
                <Route exact path='/DeleteQuiz' component={DeleteQuiz}/>
                <Route component={NoMatch} />
              </Switch>
            </div>
          </Router>
        </div>
      );
    }
  }
}

export default App;
