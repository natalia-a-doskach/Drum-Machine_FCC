import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {sounds} from './sounds.js';



class App extends React.Component {
constructor(props){
super(props);
this.state = {
sounds: sounds,
on: false,
mode: "",
displayMessage: "",
audioURL: ""
};
this.changeMessage = this.changeMessage.bind(this);
this.onToggle = this.onToggle.bind(this);
this.changeMode = this.changeMode.bind(this);
}
changeMode(mode) {this.setState({mode: mode});
this.setState({displayMessage: mode})};

changeMessage(message) {
  this.setState({displayMessage: message});

  };

onToggle() {
if (!this.state.on){
this.setState({displayMessage: "choose mode"});
}
else{this.setState({displayMessage: ""})}
this.setState({on: !this.state.on});
this.setState({mode: ""});
};



render(){return(
  <div id="container">
<OnBtn onToggle={this.onToggle}/>
    <hr />
    <div id="lower">
<Display displayMessage={this.state.displayMessage}/>
< RadioBtns mode={this.state.mode} changeMode={this.changeMode}/>
<DrumPads on={this.state.on} sounds={this.state.sounds} mode={this.state.mode} changeMessage={this.changeMessage} playSound={this.playSound}/>
      <h1>DRUMY ANALOG</h1>
    </div>
  </div>
)}
}
class DrumPads extends React.Component {
constructor(props){
super(props);
this.handleClick = this.handleClick.bind(this)
}
componentWillMount(){
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    //document.addEventListener("click", this.handleClick, false);
}
componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown.bind(this));
    //document.removeEventListener("click", this.handleClick, false);
}
handleKeyDown(event){
  switch(event.keyCode){
    case 81: this.handleKeyPress("Q");
    break;
    case 87: this.handleKeyPress("W");
    break;
    case 69: this.handleKeyPress("E");
    break;
    case 65: this.handleKeyPress("A");
    break;
    case 83: this.handleKeyPress("S");
    break;
    case 68: this.handleKeyPress("D");
    break;
    case 90: this.handleKeyPress("Z");
    break;
    case 88: this.handleKeyPress("X");
    break;
    case 67: this.handleKeyPress("C");
    break;
    default:
  }
}
handleClick(event){
if (this.props.on && this.props.mode!==""){
  //display pad you are pressing on
  let messageDisplayed = this.props.sounds[event.target.id][this.props.mode === "piano" | 0][0];
  this.props.changeMessage(messageDisplayed);
  let audio = document.getElementById("aud"+event.target.id);
  audio.currentTime = 0;
  audio.play();
}
}
handleKeyPress(event){
if (this.props.on && this.props.mode!==""){
  //display pad you are pressing on
  let messageDisplayed = this.props.sounds[event][this.props.mode === "piano" | 0][0];
  this.props.changeMessage(messageDisplayed);
  let audio = document.getElementById("aud"+event);
  audio.currentTime = 0;
  audio.play();
}
}
  render(){return(
  <div id="drumPads">
        <button className="btn drumPad"  key="Q" id="Q" onClick={this.handleClick}>Q<audio id="audQ" src={this.props.sounds["Q"][this.props.mode === "piano" | 0][1]}></audio></button>
        <button className="btn drumPad"  key="W" id="W"  onClick={this.handleClick}>W<audio id="audW" src={this.props.sounds["W"][this.props.mode === "piano" | 0][1]}></audio></button>
        <button className="btn drumPad"  key="E" id="E"  onClick={this.handleClick}>E<audio id="audE" src={this.props.sounds["E"][this.props.mode === "piano" | 0][1]}></audio></button>
        <p className="drumPadText">HEATER1/ CHORD1</p>
        <p className="drumPadText">HEATER2/ CHORD2</p>
        <p className="drumPadText">HEATER3/ CHORD3</p>
        <button className="btn drumPad"  key="A" id="A"  onClick={this.handleClick}>A<audio id="audA" src={this.props.sounds["A"][this.props.mode === "piano" | 0][1]}></audio></button>
        <button className="btn drumPad"  key="S" id="S"  onClick={this.handleClick}>S<audio id="audS" src={this.props.sounds["S"][this.props.mode === "piano" | 0][1]}></audio></button>
        <button className="btn drumPad"  key="D" id="D"  onClick={this.handleClick}>D<audio id="audD" src={this.props.sounds["D"][this.props.mode === "piano" | 0][1]}></audio></button>
        <p className="drumPadText">HEATER4/ SHAKER</p>
        <p className="drumPadText">CLAP/ SIDE STICK</p>
        <p className="drumPadText">OPEN HH</p>
        <button className="btn drumPad"  key="Z" id="Z"  onClick={this.handleClick}>Z<audio id="audZ" src={this.props.sounds["Z"][this.props.mode === "piano" | 0][1]}></audio></button>
        <button className="btn drumPad"  key="X" id="X"  onClick={this.handleClick}>X<audio id="audX" src={this.props.sounds["X"][this.props.mode === "piano" | 0][1]}></audio></button>
        <button className="btn drumPad"  key="C" id="C"  onClick={this.handleClick}>C<audio id="audC" src={this.props.sounds["C"][this.props.mode === "piano" | 0][1]}></audio></button>
        <p className="drumPadText">KICK’n’HAT/ SNARE</p>
        <p className="drumPadText">KICK</p>
        <p className="drumPadText">CLOSED HH</p>
  </div>
  )}
}
class OnBtn extends React.Component {
constructor(props){
super(props);
this.handleClick = this.handleClick.bind(this);
}
handleClick(){
this.props.onToggle();
}
  render(){return(
    <div id="upper">
      <button id="onBtn" onClick={this.handleClick}></button>
      <div className="nest"></div>
      <div className="nest"></div>
      <div className="nest"></div>
    </div>
  )}
}

class RadioBtns extends React.Component {
  constructor(props){
  super(props);
  this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event){
  let mode = event.target.value;
  this.props.changeMode(mode)
  }
  render(){return(
    <div id="radioDiv">
      <div className="indivRadio">
        <input type="radio" id="heater" name="mode" value="heater" checked={this.props.mode === 'heater'} onChange={this.handleChange}/>
        <label htmlFor="heater"><span className="checkbox"></span>HEATER</label>
      </div>
      <div className="indivRadio">
        <input type="radio" id="piano" name="mode" value="piano"  checked={this.props.mode === 'piano'}  onChange={this.handleChange}/>
        <label htmlFor="piano"><span className="checkbox"></span>SMOOTH PIANO</label>
      </div>
    </div>
  )}
}

class Display extends React.Component {
  render(){return(
<div id="screen"><p id="screenText">{this.props.displayMessage}</p></div>
  )}
}










ReactDOM.render(<App / > ,  document.getElementById('root'));
