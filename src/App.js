import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import logo from './images/nlp.png';
import './App.css';
var nlp = require('compromise');

class App extends Component {
  state = {
    timesProcessed: 0,
    verbs: []
  }
  processAgain = (event) => {
    console.log("newText: " + event.target.value)
    let doc = nlp(event.target.value)
    const verbs = doc.verbs().out('frequency')
    console.log("verbs is now: ", verbs)
    this.setState({
      timesProcessed: this.state.timesProcessed + 1,
      verbs
    })
  }
  render() {
    const {verbs} = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to NLP-as-you-go</h1>
        </header>
        <div className="mainPart">
          <div className="innerDiv editor">
            <h1>Editor</h1>
            <TextField
              multiline
              rows={20}
              onChange={this.processAgain}
              placeholder="Start typing here"
            />
          </div>
          <div className="innerDiv output">
            <h1>Output</h1>
            <p>Times processed: {this.state.timesProcessed}</p>
            <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
              <h3>The verb phrases you're using:</h3>
              <ul>
                {verbs.map(verb => {
                  const {normal, count} = verb
                  return (
                    <li key={normal} style={{textAlign: 'left'}}>{normal} {count > 1 && `(x${count})`}</li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
