module.exports = {
	module: {
		rules: [
			{
				test: /\.svg$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'assets/[name].[hash:8].[ext]'
						}
					}
				]
			},
			{
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' }
				],
				exclude: /src/
			}
		]
	}
}