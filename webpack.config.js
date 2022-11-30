const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
   mode: 'production',
   entry: './src/server.ts',
   target: "node",
   externals: [nodeExternals()],

   output: {
       path: path.resolve(__dirname, 'dist'),
       filename: 'server.js',
   },
   resolve: {
       extensions: ['.ts', '.js'],
   },
   module: {
       rules: [
           {
               test: /\.tsx?/,
               use: 'ts-loader',
               exclude: /node_modules/
           }
       ]
   },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'src/views'), to: path.resolve(__dirname, 'dist/views') },
            ],
        }),
    ],
}
