const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const envMode = 'production';
const path = require('path');
const libraryName = 'Gallery'; 
const libraryFileName = libraryName.toLowerCase();

module.exports = {
	mode: envMode,
	entry: `./src/${libraryFileName}.js`,
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: `${libraryFileName}.min.js`,
		library: libraryName,
		libraryTarget: 'var',
		libraryExport: 'default',
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: `${libraryFileName}.min.css`,
		}),
	],
	module: {
		rules: [
			// SCSS/CSS configuration
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					(envMode === 'development') ? 'style-loader' : MiniCssExtractPlugin.loader,
					{ loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
					{ loader: 'sass-loader', options: { sourceMap: true } },
				],
			},
			// BABEL/ESLINT configuration
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					'babel-loader',
					{ loader: 'eslint-loader', options: { fix: true, }, },
				],
			},
		],
	}
};