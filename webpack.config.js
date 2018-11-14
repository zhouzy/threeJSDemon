/**
 *
 * Author zhouzy
 * Date   2018/9/17
 */
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
            '@Model': path.resolve(__dirname, 'src/model/'),
        }
    },
    module:{
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            {
                test: /\.(gltf|obj)(\?\S*)?$/,
                loader: 'file-loader'
            },
        ]
    }
};
