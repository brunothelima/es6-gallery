const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
	module: {
		rules: [
			// SCSS/CSS Configurations
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
		  // Babel configuration
		  {
		  	test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
        	'babel-loader',
        	'eslint-loader',
	      ],
		  },
		],
	}
};