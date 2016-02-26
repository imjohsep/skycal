var SkyBox = React.createClass({
  loadCalendarFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
      this.loadCalendarFromServer();
      setInterval(this.loadCalendarFromServer, this.props.pollInterval);
   },
  render: function() {
      return (
        <div className="skyBox">
          <h1>Events</h1>
          <EventList data={this.state.data}/>
        </div>
      );
    }
});

var EventList = React.createClass({
  render: function() {
    var eventNodes = this.props.data.map(function(event) {
      return (
        <div>{event.date} {event.event}</div>
      );
    });
    return (
      <div className="commentList">
        {eventNodes}
      </div>
    );
  }
});

ReactDOM.render(
  <SkyBox url="/api/calendar/upcoming" pollInterval={2000}/>,
  document.getElementById('content')
);