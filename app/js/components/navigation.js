var React = require('react');
var ExampleListItem = require('./example-link');
var EditorActions = require('../actions/editor');

var examples = [{
  name: 'hello',
  code: '<?php\n  echo("Hello world!");\n?>'
},{
  name: 'printf',
  code: '<?php\n  printf("php is number %d", "1");\n?>'
},{
  name: 'loop',
  code: '<?php\n  for ($i = 1; $i <= 10; $i++) { \n    echo $i; \n  }\n?>'
}];

module.exports = React.createClass({
  render: function() {
    var exampleListItems = examples.map(function(example) {
      return (
        <ExampleListItem
          name={example.name}
          code={example.code}
        />
      );
    }, this);
    return (
      <ul id="nav">
        <li id="examples"><a href="#">Examples</a><ul>{exampleListItems}</ul></li>
        <li id="save"><a href="#" onClick={this.save}>Save</a></li>
      </ul>
    );
  },
  save: function(e){
    e.preventDefault();
    EditorActions.saveCode();
  }
});
