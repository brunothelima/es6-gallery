const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
	module: {
		rules: [
		  {
		    test: /\.scss$/,
		    use: [
		      'style-loader',
          { 
          	loader: 'css-loader',
						options: {
							import: true,
							sourceMap: true,
						},
          },
          { 
          	loader: 'sass-loader', 
          	options: { 
          		outputStyle: 'compressed',
							sourceMap: true,
          	},
          },
		    ],
		  },
		],
	}
};