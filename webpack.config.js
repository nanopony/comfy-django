var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var BundleTracker = require('webpack-bundle-tracker');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var Uglify = require("uglifyjs-webpack-plugin");
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var providePlugin = new webpack.ProvidePlugin({
    $: 'jquery',
    '_': 'lodash',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
});


module.exports = {
    entry: {
        vendor: [
            'react',
            'bootstrap',
            'jquery',
            'jquery.cookie'
        ],
        main: './assets/src/main.jsx',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        providePlugin,
        new BundleTracker({filename: './webpack-stats.json'}),
        new ExtractTextPlugin("styles.css")
    ],
    output: {
        path: path.resolve(__dirname, './assets/bundles/'),
        // publicPath: '/dist/',
        filename: '[name].js',
        publicPath: 'http://localhost:1988/assets/bundles/'
    },

    module: {
        loaders: [
            {
                test: /\.(jpe?g|gif|png)$/,
                loader: 'file-loader?emitFile=false&name=[path][name].[ext]'
            },
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"},
            {
                test: /\.js$/,
                include: path.join(__dirname, 'assets/src'),
                loader: 'babel-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'assets/src')
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: "css-loader!autoprefixer-loader!less-loader"
                })

            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: "css-loader!autoprefixer-loader!sass-loader"
                })

            }
        ]
    },
    devServer: {
        port: 1988,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }

};

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = 'cheap-module-source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new Uglify()
    ])
}
