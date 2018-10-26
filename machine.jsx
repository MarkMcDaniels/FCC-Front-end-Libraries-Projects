

// Redux portion:

const quotables = [{"--Albert Einstein":"Try not to become a man of success, but rather try to become a man of value."}, {"--Ozzy Osbourne":"Out of everything I've lost, I miss my mind the most."}, {"--B1 battle droid" : "Roger...Roger."}, {"--Carol S. Dweck":"Why waste time proving over and over how great you are, when you could be getting better?"}];


const quoteAction = () => {
  return {
    type:"QUOTE"
  }
};

const quoteReducer = (state ={"bob":"quote 1"}, action) => {
  switch(action.type){
    case "QUOTE":
      
      let theQuote = quotables[Math.floor(Math.random() * quotables.length)];
      
      let myKeys = Object.keys(theQuote);
      
      return {
        author: myKeys[0],
        quote: theQuote[myKeys[0]]
      };
    default:
      return {
        author: "--Albert Einstein",
        quote: "Try not to become a man of success, but rather try to become a man of value."
             };
      
  }
}

const store = Redux.createStore(quoteReducer);


// React portion:
const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

class QuoteMachine extends React.Component {
  constructor(props){
    super(props);
    
    // handlers
    this.changeQuote = this.changeQuote.bind(this);
  }
  
  changeQuote(){
    this.props.getNewQuote();
  }
  
  render(){
    
    
    
    
    
    return(
    <div id="quote-box">
        
     <div id="container-1">
        
        <h2 id="text">{this.props.quote}</h2>
        <h4 id="author">{this.props.author}</h4>
        
      </div>
      <div id="container-2">
        <a id="tweet-quote" href="https://twitter.com/intent/tweet/" ><i id="twitter-icon" className="fa fa-twitter-square fa-2x" aria-hidden="true"></i>
</a>
        <button id="new-quote" onClick={this.changeQuote}>New Quote</button>
        
      </div>
    </div>
    )
  };
  
  
}

const mapStateToProps = (state) => {
  
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNewQuote: () => {
      dispatch(quoteAction())
    }
  }
};


const Container = connect(mapStateToProps, mapDispatchToProps)(QuoteMachine);


class AppWrapper extends React.Component {
  constructor(props){
    super(props);
  }
  
  render(){
    return(
      <Provider >
        <Container store={store}/>
      </Provider>
      
    );
  }
  
};

React.render(<AppWrapper />, document.getElementById('main'));