var React = require('react');
var DefaultLayout = require('./layouts/default');

var Index = React.createClass({
  render: function() {
    return (
      <DefaultLayout title={this.props.title}>
        <div className="search-content center">
            <h1 className="center">{this.props.message}</h1>
            <input className="search-box" placeholder="serial number e.g. MX123123"></input>
            <button className="button">Search</button>
        </div>
      </DefaultLayout>
    );
  }
});

module.exports = Index;