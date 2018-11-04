const drums = {"Q": "Low Tom", "W": "Mid Tom", "E": "Cymbal", "A": "Snare", "S": "High Hat", "D": "Pop", "Z": "Bass", "X": "Cow Bell", "C":"Wood Block"};


class DrumKit extends React.Component{
  constructor(props){
    super(props);
    // state for display
    this.state = {
      display: drums["Q"]
    }
    
    
    this.setTheState = this.setTheState.bind(this);
  }
  
  
  setTheState(id, origin){
    this.setState({
      display: drums[id]
    });
  }
  
 
  
  
  componentDidMount(){
    // Manages the events, On keydown it plays the sound, on Keyup it removes a class that signified the button had been pushed. Finally on click manages button clicks to play sounds.
    window.addEventListener("keydown", event =>{
      
      let key = String.fromCharCode(event.which);if(key == "Q" || key == "W" || key == "E" || key == "A" || key == "S" || key == "D" || key == "Z" || key == "X" || key == "C"){
      
      this.setTheState(key, "key");
      let parent = document.getElementById(key).parentElement;
      // adding class to simulate :active
      parent.classList.add("pressActive");
      
      document.getElementById(key).currentTime=0;
      document.getElementById(key).play();
      
      
      }
      
      
    });
    
    window.addEventListener("keyup", event =>{
      let key = String.fromCharCode(event.which);if(key == "Q" || key == "W" || key == "E" || key == "A" || key == "S" || key == "D" || key == "Z" || key == "X" || key == "C"){
      let parent = document.getElementById(key).parentElement;
      parent.classList.remove("pressActive");
        
      }
    });
    
    document.getElementById("buttons").addEventListener("click", event=>{
      
      event.preventDefault();
      let key = String.fromCharCode(event.which);
      let theId = event.target.id;
      
      let child = null;
      if(theId == ""){
        child == "Q"
      } else {
        
        child = document.getElementById(theId).firstElementChild.id;
    
        
      }
    this.setTheState(child, "click");
    
    
    
    switch(child){
      case "Q":
        document.getElementById("Q").currentTime=0;
        document.getElementById("Q").play();
        break;
      case "W":
        document.getElementById("W").currentTime=0;
        document.getElementById("W").play();
        break;
      case "E":
        document.getElementById("E").currentTime=0;
        document.getElementById("E").play();
        break;
      case "A":
        document.getElementById("A").currentTime=0;
        document.getElementById("A").play();
        break;
      case "S":
        document.getElementById("S").currentTime=0;
        document.getElementById("S").play();
        break;
      case "D":
        document.getElementById("D").currentTime=0;
        document.getElementById("D").play();
        break;
      case "Z":
        document.getElementById("Z").currentTime=0;
        document.getElementById("Z").play();
        break;
      case "X":
        document.getElementById("X").currentTime=0;
        document.getElementById("X").play();
        break;
      case "C":
        document.getElementById("C").currentTime=0;
        document.getElementById("C").play();
        break;
      default:
        this.setState({
          display: drums["Q"]
        });
        break;
    }
    });
  }
  
  
  render(){
    
    return(
      <div id="drum-machine">
      <div id="display">
      <h1 id="display-title">Drum Kit</h1>
      <h3>{this.state.display}</h3></div>
        <Drums drumSound={this.drumSound} setTheState={this.setTheState}/>
      </div>
    
    );
    
  }
  
}

class Drums extends React.Component{
  constructor(props){
    super(props);
    
  }
  
  
  
  

  render(){
    
    return(
      
      <div id="buttons">
      
          <div id="row-1">
          <button id="qBut" className="drum-pad">Q<audio id="Q" className="clip" src="https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/ROLAND%20RHY55/46[kb]rh55-020.wav.mp3">
            </audio>
        </button>
        <button id="wBut" className="drum-pad">W<audio id="W" className="clip" src="https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/ROLAND%20RHY55/26[kb]rh55-026.wav.mp3">
            </audio></button>
        <button id="eBut" className="drum-pad">E<audio id="E" className="clip" src="https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/ROLAND%20RHY55/10[kb]rh55-010.wav.mp3">
            </audio></button>
           </div>
         <div id="row-2">
        <button id="aBut" className="drum-pad">A<audio id="A" className="clip" src="https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/ROLAND%20RHY55/37[kb]rh55-005.wav.mp3">
            </audio></button>
        <button id="sBut" className="drum-pad">S<audio id="S" className="clip" src="https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/ROLAND%20RHY55/46[kb]rh55-014.wav.mp3">
            </audio></button>
        <button id="dBut" className="drum-pad">D<audio id="D" className="clip" src="https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/ROLAND%20RHY55/2[kb]rh55-018.wav.mp3">
            </audio></button>
          </div>
      <div id="row-3">
        <button id="zBut" className="drum-pad">Z<audio id="Z" className="clip" src="https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/ROLAND%20RHY55/28[kb]rh55-001.wav.mp3">
            </audio></button>
        <button id="xBut" className="drum-pad">X<audio id="X" className="clip" src="https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/ROLAND%20RHY55/12[kb]rh55-022.wav.mp3">
            </audio></button>
        <button id="cBut" className="drum-pad">C<audio id="C" className="clip" src="https://sampleswap.org/samples-ghost/DRUMS%20(FULL%20KITS)/ROLAND%20RHY55/10[kb]rh55-023.wav.mp3">
            </audio></button>
        </div>
      </div>
    
    );
    
  }
  
}

const main = document.getElementById("main");
ReactDOM.render(<DrumKit />, main);