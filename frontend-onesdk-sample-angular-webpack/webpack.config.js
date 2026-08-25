module.exports = (config) => {
	// @frankieone/one-sdk's ESM build imports .css and .svg files directly from
	// node_modules. Angular's own style rules are scoped to the app's `styles`
	// option and component styles, so nothing matches these and webpack errors
	// with "no loaders are configured to process this file".
	//
	// Prepending (rather than appending) matters: Angular groups its style
	// handling under `oneOf`, and these rules have to be reachable before that.
	config.module.rules.unshift(
		{
			test: /\.css$/,
			include: /node_modules[\\/]@frankieone[\\/]one-sdk/,
			use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
		},
		{
			test: /\.(svg|woff2?)$/,
			include: /node_modules[\\/]@frankieone[\\/]one-sdk/,
			type: 'asset/resource',
			generator: { filename: 'assets/[name].[hash:8][ext]' },
		},
	);
	return config;
};
