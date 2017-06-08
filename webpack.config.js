const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './index.html',
    filename: 'index.html',
    inject: 'body'
})
module.exports = {
    entry: [
        'react-hot-loader/patch',// activate HMR for React
        'webpack-dev-server/client?http://localhost:8989',
        // 指定链接socket的地址或端口
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        './index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        // necessary for HMR to know where to load the hot update chunks
        filename: 'bundle.js'
    },
    context: path.resolve(__dirname, 'src'),
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        // enable HMR on the server

        // contentBase: path.resolve(__dirname, 'dist'),
        // match the output path

        // publicPath: '/'
        // match the output `publicPath`
    },
    resolve: {
        extensions: [' ', '.js', '.jsx', '.json', '.scss', '.css'] // 配置可以省略掉后缀名
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
            {test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/},
            // {test: /\.css$/,
            //     use: [
            //         'style-loader',
            //         'css-loader?modules',
            //         'postcss-loader',
            //     ],
            //     exclude: /node_modules/
            // },
            {test: /\.css$/, loader: 'style-loader!css-loader', exclude: /node_modules/},
        ]
    },
    plugins: [
        HtmlWebpackPluginConfig,
        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally
        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates
    ]
}