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
this.playSound = this.playSound.bind(this);
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

playSound(sound) {
this.setState({audioURL: sound});
let audio = document.getElementById("aud");
audio.currentTime = 0;
audio.play()};

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
<Audio url={this.state.audioURL}/>
  </div>
)}
}
class DrumPads extends React.Component {
constructor(props){
super(props);
this.handleClick = this.handleClick.bind(this)
}
handleClick(event){
if (this.props.on && this.props.mode!==""){
  //display pad you are pressing on
  let messageDisplayed = this.props.sounds[event.target.id][this.props.mode === "piano" | 0][0];
  let audioURL = this.props.sounds[event.target.id][this.props.mode === "piano" | 0][1];
  this.props.playSound(audioURL);
  this.props.changeMessage(messageDisplayed);
}
}
  render(){return(
  <div id="drumPads">
        <button class="btn drumPad" accesskey="q" key="Q" id="Q" onClick={this.handleClick}>Q</button>
        <button class="btn drumPad" accesskey="w" key="W" id="W"  onClick={this.handleClick}>W</button>
        <button class="btn drumPad" accesskey="e" key="E" id="E"  onClick={this.handleClick}>E</button>
        <p class="drumPadText">HEATER1/ CHORD1</p>
        <p class="drumPadText">HEATER2/ CHORD2</p>
        <p class="drumPadText">HEATER3/ CHORD3</p>
        <button class="btn drumPad" accesskey="a" key="A" id="A"  onClick={this.handleClick}>A</button>
        <button class="btn drumPad" accesskey="s" key="S" id="S"  onClick={this.handleClick}>S</button>
        <button class="btn drumPad" accesskey="d" key="D" id="D"  onClick={this.handleClick}>D</button>
        <p class="drumPadText">HEATER4/ SHAKER</p>
        <p class="drumPadText">CLAP/ SIDE STICK</p>
        <p class="drumPadText">OPEN HH</p>
        <button class="btn drumPad" accesskey="z" key="Z" id="Z"  onClick={this.handleClick}>Z</button>
        <button class="btn drumPad" accesskey="x" key="X" id="X"  onClick={this.handleClick}>X</button>
        <button class="btn drumPad" accesskey="c" key="C" id="C"  onClick={this.handleClick}>C</button>
        <p class="drumPadText">KICK’n’HAT/ SNARE</p>
        <p class="drumPadText">KICK</p>
        <p class="drumPadText">CLOSED HH</p>
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
      <div class="nest"></div>
      <div class="nest"></div>
      <div class="nest"></div>
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
      <div class="indivRadio">
        <input type="radio" id="heater" name="mode" value="heater" checked={this.props.mode === 'heater'} onChange={this.handleChange}/>
        <label for="heater"><span class="checkbox"></span>HEATER</label>
      </div>
      <div class="indivRadio">
        <input type="radio" id="piano" name="mode" value="piano"  checked={this.props.mode === 'piano'}  onChange={this.handleChange}/>
        <label for="piano"><span class="checkbox"></span>SMOOTH PIANO</label>
      </div>
    </div>
  )}
}

class Display extends React.Component {
  render(){return(
<div id="screen"><p id="screenText">{this.props.displayMessage}</p></div>
  )}
}

class Audio extends React.Component{
render(){
return <audio src={this.props.url} type="audio/mpeg" id="aud"></audio>
}
}









ReactDOM.render(<App / > ,  document.getElementById('root'));
