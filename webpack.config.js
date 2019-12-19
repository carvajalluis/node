const path = require('path');

module.exports = {
  entry: './app.js',
  externals: ['pg', 'sqlite3', 'tedious', 'pg-hstore'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'mvc.bundle.js'
  },
  target: 'node'
};