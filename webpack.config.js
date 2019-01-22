const path = require('path'),
    fs = require('fs'),
    webpack = require('webpack'),
    autoprefixer = require('autoprefixer'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    AssetsPlugin = require('assets-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

// 判断是否是生产环境
const isProduction = function () {
    return process.env.NODE_ENV === 'production';
};

const srcPath = './src/';
const distPath = './dist/';
const appName = __dirname.split('/').pop();

let config = {
    context: __dirname,
    entry: {
        bundle: path.resolve(__dirname, srcPath),
        vendor: ['react', 'react-dom', 'react-redux', 'react-router-dom']
    },
    output: {
        path: path.resolve(__dirname, distPath),
        filename: '[name].[chunkhash:8].js',
        chunkFilename: 'chunk.[name].[chunkhash:8].js',
        publicPath: path.join(`/${appName}`, distPath)
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react', 'stage-0'],
                plugins: [
                    'transform-decorators-legacy',
                    'syntax-dynamic-import',
                    'dynamic-import-webpack',
                    'transform-runtime',
                    'add-module-exports',
                    ['import', {
                        libraryName: 'antd',
                        style: 'css'
                    }]
                ],
                cacheDirectory: true
            }
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style","css")
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract("style", 'css!sass')
        }, {
            test: /\.(png|jpg|gif|md)$/,
            loader: 'file?limit=10000&name=[name].[ext]'
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url?limit=10000&mimetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file"
        }, {
            test: /\.json$/,
            loader: 'json'
        }]
    },
    postcss: [autoprefixer({browsers: ['> 5%']})],
    resolve: {
        alias: {   //模块别名定义，方便后续直接引用别名，无须多写长长的地址
            '@': path.resolve(__dirname, srcPath)
        },
        extensions: ['', '.js', '.json', '.scss', 'css']
    },
    plugins: [
        new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
            template: path.join(__dirname, srcPath, 'index.html'), //html模板路径
            inject: 'body', // 是否将js放在body的末尾
            hash: false
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            filename: '[name].[chunkhash:8].js'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            comments: false
        }),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),
        new AssetsPlugin({
            path: path.join(__dirname, distPath),
            filename: 'manifest.json',
            prettyPrint: true
        }),
        new ExtractTextPlugin('[name].[contenthash:8].css', {allChunks: true})
    ]
};

// 开发环境
if (!isProduction()) {

    config.entry = [
        path.resolve(__dirname, srcPath, 'index.js')
    ];

    config.output = {
        filename: 'main.js',
        publicPath: 'http://127.0.0.1:8080/'
    };

    config.devtool = 'eval-source-map';

    config.plugins = [
        new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
            template: path.join(__dirname, srcPath, 'index.html'), //html模板路径
            inject: 'body', // 是否将js放在body的末尾
            hash: false
        }),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new ExtractTextPlugin('main.css', {allChunks: true})
    ];

    config.devServer = {
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        hot: true,
        host: '127.0.0.1',
        port: 8080,
        publicPath: "/",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        }
    }
}

module.exports = config;

