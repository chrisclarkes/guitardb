var React = require('react');
var DefaultLayout = require('./layouts/default');
var SearchBox = require('./searchBox');

var Index = React.createClass({
  render: function() {
    return (
      <DefaultLayout title={this.props.title}>
        <div className="search-content center">
            <h1 className="center">{this.props.message}</h1>
            <SearchBox placeholderText="serial number e.g. MX123123" />
        </div>
      </DefaultLayout>
    );
  }
});

module.exports = Index;