
let React = require('react');

let DefaultLayout = React.createClass({
  render: function() {
    return (
      <html>
        <head>
            <title>{this.props.title}</title>
            <link rel="stylesheet" type="text/css" href="styles/styles.css" />
            <link rel="stylesheet" type="text/css" href="styles/default.css" />
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