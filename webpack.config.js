const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: 'dist'
    },
    // devServer: {
    //     contentBase: path.resolve(__dirname, 'dist'),
    //     port: 3000
    // }
}