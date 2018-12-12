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

// if (production) {
// 	plugins = plugins.concat([
// 		new webpack.optimize.OccurrenceOrderPlugin(),
// 		new webpack.optimize.UglifyJsPlugin(),
// 	]);
// }
// console.log(production)

module.exports = {
	devtool: "cheap-module-source-map",
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
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		// new webpack.optimize.UglifyJsPlugin({
		// 	compress: {
		// 		warnings: false
		// 	},
		// 	sourceMap: true,
		// 	// // 清除注释
		// 	// output: {
		// 	// 	comments: false
		// 	// },
		// 	// minimize: true,

		// 	// mangle: true
		// }),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [autoprefixer]
			}
		}),
		new CompressionPlugin({
			asset: "[path].gz[query]",
			algorithm: "gzip",
			test: /.(js|html)$/,
			threshold: 10240,
			minRatio: 0.8
		})
		// new HtmlWebpackPlugin({
		// 	title: 'Example',
		// 	template: './app/index.html'
		// })
	]
}