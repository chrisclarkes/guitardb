var React = require('react');

var SearchBox = React.createClass({
  render: function() {
    return (
        <div>
            <input className="search-box" placeholder={this.props.placeholderText}></input>
            <button className="button">Search</button>
        </div>
    );
  }
});

module.exports = SearchBox;