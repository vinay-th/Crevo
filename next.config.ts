import webpack from 'webpack';

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Print the initial config for debugging
    console.log('Webpack config before modification:', config);

    if (!isServer) {
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /ses/,
        })
      );
    }

    // Print the final config for debugging
    console.log('Webpack config after modification:', config);

    return config;
  },
};

export default nextConfig;
