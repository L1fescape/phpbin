var React = require('react');
var Navigation = require('./navigation');

module.exports = React.createClass({  
  render: function() {
    var nav = <Navigation />;
    return (
      <div class="wrap">
        <a class="site-title" href="/">phpbin</a>
        {nav}
      </div>
    );
  }
});
