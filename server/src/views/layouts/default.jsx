
let React = require('react');

let DefaultLayout = React.createClass({
  render: function() {
    return (
      <html>
        <head>
            <title>{this.props.title}</title>
            <link rel="stylesheet" type="text/css" href="styles/default.css" />
            <link rel="stylesheet" type="text/css" href="styles/searchBox.css" />
        </head>
        <body>
        <div className="main">
          {this.props.children}
        </div>
        </body>
      </html>
    );
  }
});

module.exports = DefaultLayout;