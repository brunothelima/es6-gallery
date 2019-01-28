const path = require('path');

module.exports = {
	mode: 'production',
	optimization: {
		usedExports: true,
	},
  entry: './src/gallery.js',
  output: {
    filename: 'gallery.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'Gallery',
    libraryTarget: 'var',
    libraryExport: 'default',
  },
	module: {
		rules: [
			// SCSS/CSS configuration
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
              file: './src/style.scss',
              outFile: './src/style.css',
              outputStyle: 'compressed',
              sourceMap: true,
          	},
          },
		    ],
		  },
		  // BABEL/ESLINT configuration
		  {
		  	test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
        	'babel-loader',
        	{
        		loader: 'eslint-loader',
        		options: {
        			fix: true,
        			failOnError: false,
        		},
        	},
	      ],
		  },
		],
	}
};