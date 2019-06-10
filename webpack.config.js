const path = require('path');

module.exports = {
    mode: 'development',
    entry: './client/index.js',
    output: {
        path: path.join(__dirname, 'web_service/static'),
        filename: 'client_bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$|/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use: [
                    // {loader: 'style-loader'},
                    {loader: 'css-loader'},
                ],
            },
        ],
    },
};
