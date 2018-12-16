import React, { Component } from 'react';
import './Sports.css';

class Sports extends Component {
    constructor() {
        super();
        this.state = {
            sports: [],
            data: [],
            data1: [],
            val: "",
            score: 0,
            notloggedin: false,
            submitted: false,
            quizsubmitted: false,
            quizdone: false,
            qscore: "",
            pu1: false,
            pu2: false,
        }
        this.handleCChange = this.handleCChange.bind(this);
        this.handleApply = this.handleApply.bind(this);
        this.handleSubmitquiz = this.handleSubmitquiz.bind(this);
        this.reveal = this.reveal.bind(this);
        this.ans = this.ans.bind(this);
    }
    // Lifecycle hook, runs after component has mounted onto the DOM structure
    componentDidMount() {
        var chk = JSON.parse(window.localStorage.getItem('chk'));
        // console.log(chk);
        if (chk.islogin == false) {
            this.setState({ notloggedin: true })
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
                        // console.log(data[i].qid)   
                    }
                    // console.log(this.state.sports)
                    this.setState({ data: this.state.sports })
                    this.setState({ val: this.state.sports[0] })
                });
        }
    }
    handleCChange(event) {
        // this.state.val = event.target.value;
        this.setState({ val: event.target.value })
        // console.log(this.state.val)
    }

    reveal(event){
        console.log(event.target.value);
        var a = event.target.value;
        console.log(this.state.data1[a-1])
        var c = 0;
        if(this.state.data1[a-1].ans1 === true) c = c+1;
        if(this.state.data1[a-1].ans2 === true) c = c+1;
        if(this.state.data1[a-1].ans3 === true) c = c+1;
        if(this.state.data1[a-1].ans4 === true) c = c+1;
        document.getElementById(a).innerHTML = c;
        if(!this.state.quizdone)
            this.setState({pu1: true})
    }
    ans(event){
        var a = event.target.value;
        var x = document.getElementsByName(this.state.data1[a-1].id);
        // console.log(this.state.data1.ans1)
        x[0].checked = this.state.data1[a-1].ans1;
        x[1].checked = this.state.data1[a-1].ans2;
        x[2].checked = this.state.data1[a-1].ans3;
        x[3].checked = this.state.data1[a-1].ans4;
        if(!this.state.quizdone)
            this.setState({pu2: true})
    }
    handleApply(event) {
        // console.log(this.state.val)
        this.setState({pu1: false});
        this.setState({pu2: false});
        var i;
        for(i=0;i<this.state.data1.length;i++){
            document.getElementById(i+1).innerHTML = ""
        }
        for (i = 0; i < this.state.data1.length; i++) {
            var x = document.getElementsByName(this.state.data1[i].id);
            x[0].checked = false; x[1].checked = false; x[2].checked = false; x[3].checked = false
        }
        this.state.quizdone = false;
        this.state.score = 0;
        this.state.quizsubmitted = false;
        fetch('http://localhost:8080/cat/Sports/' + this.state.val)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                this.state.submitted = true
                this.setState({ data1: data })
                var i;
                var dat = this.state.data1;
                for (i = 0; i < dat.length; i++) {
                    var x = document.getElementsByName(dat[i].id);
                    var c = 0;
                    if(dat[i].ans1 === true) c = c + 1;
                    if(dat[i].ans2 === true) c = c + 1;
                    if(dat[i].ans3 === true) c = c + 1;
                    if(dat[i].ans4 === true) c = c + 1;
                    if(c===1){
                        x[0].type = "radio"; x[1].type = "radio"; x[2].type = "radio"; x[3].type = "radio"
                    }
                    else{
                        x[0].type = "checkbox"; x[1].type = "checkbox"; x[2].type = "checkbox"; x[3].type = "checkbox"
                    }
                    x[0].checked = false; x[1].checked = false; x[2].checked = false; x[3].checked = false
                }
            })
        var chk = JSON.parse(window.localStorage.getItem('chk'));
        fetch('http://localhost:8080/userquiz/' + chk.uname + '/Sports' + '/' + this.state.val)
            .then(response => response.json())
            .then(data => {
                // console.log("userquiz");
                if (data.username === chk.uname) {
                    this.setState({qscore: data.score})
                    this.setState({ quizdone: true })
                }
            })
    }
    handleSubmitquiz(event) {
        var i;
        var dat = this.state.data1;
        for (i = 0; i < dat.length; i++) {
            var x = document.getElementsByName(dat[i].id);
            if (dat[i].ans1 == x[0].checked && dat[i].ans2 == x[1].checked && dat[i].ans3 == x[2].checked && dat[i].ans4 == x[3].checked) {
                this.state.score = this.state.score + 1;
            }
            //   console.log(dat[i].ans1 == x[0].checked)        
            //   console.log(x[0].checked)
        }
        // console.log(this.state.score),this
        this.setState({ quizsubmitted: true })
        var chk = JSON.parse(window.localStorage.getItem('chk'));
        const request = new Request('http://127.0.0.1:8080/people/' + chk.uname);
        fetch(request)
            .then(response => response.json())
            .then(data => {
                data.sportsscore = String(Number(data.sportsscore) + this.state.score)
                data.totalscore = String(Number(data.totalscore) + this.state.score)
                fetch('http://localhost:8080/people/' + data.id, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                    })
                // console.log("i am here")
                // console.log(JSON.stringify({ "username": chk.uname, "category": "Sports", "quizno": String(this.state.val), "score": String(this.state.score) }))
                fetch('http://localhost:8080/userquiz', {
                    method: 'POST',
                    body: JSON.stringify({ "username": chk.uname, "category": "Sports", "quizno": String(this.state.val), "score": String(this.state.score) }),
                })
            });
        this.setState({ quizdone: true })
    }
    render() {
        if (this.state.notloggedin) {
            return (
                <h2>You are not logged in</h2>
            )
        }
        else {
            return (
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Sports Quiz</h1>
                    </header>
                    <div>
                        <h3>Select Quiz number</h3>
                        <select value={this.state.val} onChange={this.handleCChange}>
                            {this.state.data.map(function (cat, key) {
                                return (<option key={key} value={cat}>{cat}</option>)
                            })}
                        </select>
                        <button type="submit" className="btn btn-default" onClick={this.handleApply}>Apply</button>
                    </div>
                    {this.state.submitted &&
                        <div>
                            <h2> Quiz {this.state.data1[0].qid}</h2>
                        </div>
                    }
                    {this.state.submitted &&
                        this.state.data1.map(function (item, key) {
                            return (
                                <div key={key}>
                                    <h2>{key + 1}. {item.qname}</h2>
                                    <div>
                                        <ul>
                                            <li><label><input name={item.id} />{item.opt1}</label></li>
                                            <li><label><input name={item.id} />{item.opt2}</label></li>
                                            <li><label><input name={item.id} />{item.opt3}</label></li>
                                            <li><label><input name={item.id} />{item.opt4}</label></li>
                                        </ul>
                                        <h3 id={key+1}></h3>
                                        <button type="submit" disabled={this.state.pu1} className="btn btn-success" onClick={this.reveal} value={key+1}>Number of Correct Ans</button>
                                        <button type="submit" disabled={this.state.pu2} className="btn btn-warning" onClick={this.ans} value={key+1}>Reveal ans</button>
                                    </div>
                                </div>)
                        },this)
                    }
                    {this.state.submitted &&
                        <button type="submit" disabled={this.state.quizdone} className="btn btn-primary" onClick={this.handleSubmitquiz}>Submit</button>
                    }
                    {this.state.quizsubmitted &&
                        <h3>Your Score is {this.state.score}</h3>
                    }
                    {this.state.quizdone && !this.state.quizsubmitted &&
                        <div>
                            <h3>You Have Already Attempted this Quiz</h3>
                            <h4>Your Score is {this.state.qscore}</h4>
                        </div>

                    }
                    {/* {console.log("this.state.val"+this.state.val)}
        {this.state.val == 1 && this.state.data.map(function (item,key) {
            return (<label>{item.category} <input type="checkbox" name={item.id}>{item.qname}</input></label>)
        })} */}

                </div>

            );
        }
    }
}

export default Sports;
