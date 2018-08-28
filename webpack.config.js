const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    BundleTracker = require('webpack-bundle-tracker'),
    Uglify = require("uglifyjs-webpack-plugin"),
    ManifestPlugin = require('webpack-manifest-plugin'),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    WebpackMd5Hash = require('webpack-md5-hash');

// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

var providePlugin = new webpack.ProvidePlugin({});


module.exports = {
    mode: IS_PRODUCTION ? 'production' : 'development',
    entry: {
        vendor: [
            'react',
            'bootstrap',
        ],
        main: './assets/src/main.jsx',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        providePlugin,
        new BundleTracker({filename: './webpack-stats.json'}),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new ManifestPlugin({
            fileName: 'manifest.json'
        }),
        new WebpackMd5Hash()
    ],
    output: {
        path: path.resolve(__dirname, './assets/bundles/'),
        filename: '[name].js',
        publicPath: 'http://localhost:1988/assets/bundles/'
    },

    module: {
        rules: [
            {
                test: /\.(jpe?g|gif|png|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: {
                    loader: 'file-loader?emitFile=false&name=[path][name].[ext]'
                }
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: {
                    loader: "url-loader?limit=10000&mimetype=application/font-woff"
                }
            },
            {
                test: /\.j(s|sx)$/,
                include: path.join(__dirname, 'assets/src'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        'presets': [

                            ["@babel/preset-env",
                                {
                                    "targets": "> 1%, not dead"
                                }],
                            "@babel/preset-react",
                        ],
                        'plugins': [
                            "@babel/plugin-proposal-export-default-from",
                            ["@babel/plugin-proposal-decorators", {"legacy": true}],
                        ]
                    }
                }
            },
            {
                test: /\.(s)?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]

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


