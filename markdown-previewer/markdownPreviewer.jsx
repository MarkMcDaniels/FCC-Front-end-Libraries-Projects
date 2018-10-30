class MarkdownPreviewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "\n# This is a markdown previewer\n## It's uses the marked.js library.\n\nHere's a link to the documentation, [links](https://marked.js.org/#/README.md#README.md).\n\n\n\n\n\n\n\n>You can bock quotes.\n\n\n\n\n\n- Or make lists\n\n - They come in all the best **decorations**\n\n\n\n\n\n```\nfunction getIt(){\n\treturn 'that thing';\n}```\n\n\n\n\n\n\n\n# Have a Hedgehog!!\n\n\n\n\n\n\n\n![A hedghog](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkaE8ENrEZ_S5BQtqRiADhbgf-bfOt1an3Q4F_AkUox3FgszHt5w)\n\n\nInline code to finish it off, `<span>Huzzah!</span>`\n\n\n\n## test"
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  
  render() {
    return (
      <div id="container">
      <div id="titles">
        <h1 id="ed-title">EDITOR:</h1>
        <h1 id="pre-title">PREVIEW:</h1>
      </div>
      <div id="content">
          <textarea id="editor" value={this.state.input} onChange={this.handleChange}/>
        
          <Previewer marked={this.state.input} />
        </div>
      </div>
    );
  }
};

class Previewer extends React.Component {
  constructor(props){
    super(props);
    this.markedUpdater = this.markedUpdater.bind(this);
  }
  markedUpdater() {
    return { __html: marked(this.props.marked) }
  }
  
  render() {
    return (
      <div id="preview" dangerouslySetInnerHTML={this.markedUpdater()}>
      </div>
    );
  }
};

ReactDOM.render(<MarkdownPreviewer />, document.getElementById('main'));