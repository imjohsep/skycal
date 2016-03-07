var React = require('react');
var ReactDOM = require('react-dom');

var Greeting = React.createClass({
  render: function() {
    return (
      <div className="greeting">
        Hello, {this.props.name}!
      </div>
    );
  },
});

ReactDOM.render(
  <Greeting name="World"/>,
  document.getElementById('content')
);

