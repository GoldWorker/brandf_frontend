var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
// var os = require('os');
var CompressionPlugin = require("compression-webpack-plugin");
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var extractCSS = new ExtractTextPlugin('bundle.css');
var extractSCSS = new ExtractTextPlugin('slucky.css');
//var extractCSS = new ExtractTextPlugin('stylesheets/[name]-one.css');

module.exports = {
	devtool: "eval-source-map",
	entry: {
		bundle: [__dirname + '/app/index.js'],
		vendor: ['react', 'react-dom', 'redux', 'react-redux', 'react-router', 'redux-thunk', 'babel-polyfill', 'isomorphic-fetch', 'redux-logger']
	},
	output: {
		path: __dirname + '/build',
		// filename: 'bundle.js',
		filename: '[name].js',
		// publicPath: '/assets',
		chunkFilename: '[name].[chunkhash:8].chunk.js'
	},
	module: {
		//loaders加载器
		loaders: [{
				test: /\.(js|jsx)$/, //一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
				exclude: /node_modules/, //屏蔽不需要处理的文件（文件夹）（可选）
				loader: 'babel-loader' //loader的名称（必须）
			}, {
				test: /\.css$/,
				exclude: /node_modules/,
				loader: extractCSS.extract({
					fallback: "style-loader",
					use: ['css-loader', 'postcss-loader']
				})
			}, {
				test: /\.scss$/,
				exclude: /node_modules/,
				loader: extractSCSS.extract({
					fallback: "style-loader",
					use: ['css-loader', 'postcss-loader', 'sass-loader']
				})
			}, {
				test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
				loader: "url-loader?limit=8192&name=images/[name].[ext]"
			}
			// , {
			// 	test: /\.js$/,
			// 	loader: 'html-withimg-loader'
			// }
			// , {
			// 	test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
			// 	loader: 'file-loader?name=img/[name].[ext]'
			// }
		]
	},
	plugins: [
		extractCSS,
		extractSCSS,
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		// new HtmlWebpackPlugin({
		// 	title: 'Example',
		// 	template: './app/index.html'
		// }),
		// new webpack.HotModuleReplacementPlugin() //热模块替换插件
	],
	//webpack-dev-server配置
	devServer: {
		contentBase: './build', //默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到"build"目录）
		// colors: true, //在cmd终端中输出彩色日志
		historyApiFallback: true, //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
		// inline: true, //设置为true，当源文件改变时会自动刷新页面
		// hot: true,
		port: 80, //设置默认监听端口，如果省略，默认为"8080"
		// process: true, //显示合并代码进度
		disableHostCheck: true,
		proxy: {
			'/api': {
				target: 'https://www.brandf.cn',
				pathRewrite: {
					'^/api': ''
				},
				ignorePath: true,
				changeOrigin: true,
				secure: false
			}
		}
	}
}