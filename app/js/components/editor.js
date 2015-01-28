var React = require('react');
var CodeStore = require('../stores/editor');
var EditorActions = require('../actions/editor');

module.exports = React.createClass({  
  getInitialState: function() {
    return {
      value: '',
      result: ''
    };
  },
  componentDidMount: function() {
    CodeStore.addChangeListener(this.handleChange);
  },
  componentWillUnmount: function() {
    CodeStore.removeChangeListener(this.handleChange);
  },
  handleChange: function(event) {
    var value = CodeStore.get().source;
    var result = CodeStore.get().result;
    this.setState({
      value: value,
      result: result
    });
  },
  render: function() {
    var value = this.state.value;
    var result = this.state.result;
    this.textarea = <textarea placeholder="Enter code here" onChange={this.evaluateCode} value={value} />;
    return (
      <div class="wrap">
        {this.textarea}
        <div id="result">{result}</div>
      </div>
    );
  },
  evaluateCode: function(event) {
    var source = event.target.value;
    EditorActions.evaluateCode(source);
  }
});
