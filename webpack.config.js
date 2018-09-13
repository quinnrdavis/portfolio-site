const path = require('path')

module.exports = {
    entry: {
        index: ['babel-polyfill', './src/index.js'],
        notesIndex: ['babel-polyfill', './src/notes-app/notes-index.js'],
        notesEdit: ['babel-polyfill', './src/notes-app/edit.js'],
        todo: ['babel-polyfill', './src/todo-app/todo-index.js'],
        hangman: ['babel-polyfill', './src/hangman/hangman-index.js']
    },
    output: {
        path: path.resolve(__dirname, 'public/scripts'),
        filename: '[name]-bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env'],
                    plugins: ['transform-object-rest-spread']
                }
            }
        }, {
            test: /\.css$/,
            use: 'css-loader'
        }]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        publicPath: '/scripts/'
    },
    devtool: 'source-map'
}