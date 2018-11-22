// Redux portion:

const calcAction = (update) => {
  
  return {
    type:"CALCULATE", update
    
  }
};

const allClearAction = () => {
  return {
    type:"ALL_CLEAR"
  }
};

const calcReducer = (state = {output: "0", input: "0"}, action) =>{
  let stateCheck = state["output"];
  
  switch(action.type){
    case "CALCULATE":
      return {
        output: action.update[0],
        input: action.update[1]
        
      };
      
    default:
      return {
        output: "0",
        input: "0"
      };
  }
  
};

const store = Redux.createStore(calcReducer);
let testState = store.getState();




// React portion:
const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

class Calculator extends React.Component{
  constructor(props){
    super(props);
    
    this.clickHandler = this.clickHandler.bind(this);
   
  }

  
  
  clickHandler(event){
    // Managing all the logic here instead of in the reducer.
    // Need to find out what the best practices are.
    // This seems like the right place because Redux store is like
    // a state repository. <--- right?
    let current = document.getElementById(event.target.id).innerText;
    let input;
    let output;
    let update = [];
    let operator;
    
    
    
    
    
    
    if(current == "AC"){
      // clears input, and output to zeroes 
      this.props.allClearAction();
      
      
    } else if(current == "="){
      // Evaluates the total output, and sets input-output to the same result.
      
      
        // looks for an expression ending in an operator, and removes it.
        let ending = this.props.output.slice(-1);

        // If it's an operator it checks for multiple operators at the end
        // of the output and replaces it with the new one. If it's just adding
        // a new operator it updates the output with the new operator.
        if(ending == "/" || ending == "x" || ending == "+" || ending == "-"){
          output = this.props.output.substring(0, this.props.output.length - 1);

        } else {
          output = this.props.output;
        }
      
      // Checks for more than one decimal, and multiple zeroes to start. Makes input zero, but maintains current calculation.
      
        if(current.match(/^0*/g)){


          update.push(String(eval(output)));
          update.push("0");
          this.props.calcAction(update);


        } 
        
      } else if(current == "/" || current == "x" || current == "+" || current == "-") {
        
        
        if(current == "x"){
          current = "*";
        }
      
        // looks for an expression ending in an operator, and removes it.
        let ending = this.props.output.slice(-1);
        

        // If it's an operator it checks for multiple operators at the end
        // of the output and replaces it with the new one. If it's just adding
        // a new operator it updates the output with the new operator.
        if(ending == "/" || ending == "*" || ending == "+" || ending == "-"){
          input = "0";
          output = this.props.output.substring(0, this.props.output.length - 1) + current;

        } else {
        
          input = "0";
          output = this.props.output + current;
        }
        
        update.push(output);
        update.push(input);
        
        this.props.calcAction(update);
      } else {
        
        // Checks for new input or appends current input.
        if(this.props.output > 0 && this.props.input == "0"){
          
          output = current;
          input = current;
        } else {
          
          output = this.props.output;


          if(this.props.input == "0"){
            input = current;
          } else {
            
            /* checks if input already contains a decimal, if it does it modifies
               input-output-current with an empty string to ignore the extra decimal */
            if(this.props.input.match(/\./) && current == "."){
              
              output = this.props.output + "";
              input = this.props.input + "";
              current = "";
            } else {
            input = this.props.input + current;
            
            }
            
          }


          if(output == "0"){
            output = current;
          } else {
            
            output = output + current;
          }
       
        }
        
        
        update.push(output);
        update.push(input);
      
      
        this.props.calcAction(update);
      }
      
      
      
      
    
    
  }
  
  render(){
    return(
      <div id="calc">
        <div id="display-block">
          <div id="display">
            {this.props.output}
          </div>
          <div id="input">
            {this.props.input}
          </div>
        </div>
        <div id="keys">
          
          <button id="clear" onClick={this.clickHandler}>AC</button>
          <button id="multiply" onClick={this.clickHandler}>x</button>
          <button id="divide" onClick={this.clickHandler}>/</button>
          <button id="seven" onClick={this.clickHandler}>7</button>
          <button id="eight" onClick={this.clickHandler}>8</button>
          <button id="nine" onClick={this.clickHandler}>9</button>
          <button id="add" onClick={this.clickHandler}>+</button>
          <button id="four" onClick={this.clickHandler}>4</button>
          <button id="five" onClick={this.clickHandler}>5</button>
          <button id="six" onClick={this.clickHandler}>6</button>
          <button id="subtract" onClick={this.clickHandler}>-</button>
          <button id="one" onClick={this.clickHandler}>1</button>
          <button id="two" onClick={this.clickHandler}>2</button>
          <button id="three" onClick={this.clickHandler}>3</button>
          <button id="equals" onClick={this.clickHandler}>=</button>
          <button id="zero" onClick={this.clickHandler}>0</button>
          <button id="decimal" onClick={this.clickHandler}>.</button>

         
        </div>
      
      </div>
    
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return{
    calcAction: (update) =>{
      dispatch(calcAction(update))
    },
    allClearAction: () => {
      dispatch(allClearAction())
    }
  }
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Calculator);
// Wrapper to add a Provider to this app, and connect the store.
class AppWrapper extends React.Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return(
      <Provider>
        <Container store={store} />
      </Provider>
    );
  }
}

ReactDOM.render(<AppWrapper />, document.getElementById("main"));