var React = require('react');
var EditorActions = require('../actions/editor');

module.exports = React.createClass({
 getInitialState: function() {
    return {
      name: '',
      code: ''
    };
  },
  showExample: function(e){
    e.preventDefault();
    var code = this.props.code;
    EditorActions.evaluateCode(code);
  },
  render: function(){
    return (
      <li>
        <a href="#" onClick={this.showExample}>{this.props.name}</a>
      </li>
    );
  }
});
