var path = require('path');
var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin'); // plugin of minimization
module.exports = {
    entry: {
        'polyfills': './ClientApp/polyfills.ts',
        'app': './ClientApp/main.ts'
    },
    output: {
        path: path.resolve(__dirname, './wwwroot/dist'),     // path to outputfolder - public
        publicPath: '/dist/',
        filename: "[name].js"       // name of created file
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [   //loader for ts
            {
                test: /\.ts$/, // check types of files
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: { configFileName: path.resolve(__dirname, 'tsconfig.json') }
                    },
                    'angular2-template-loader'
                ]
            }, {
                test: /\.html$/,
                loader: 'html-loader'
            }, {
                test: /\.css$/,
                include: path.resolve(__dirname, 'ClientApp/app'),
                loader: 'raw-loader'
            }
        ]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core/,
            path.resolve(__dirname, 'ClientApp'), // catalog with source files
            {} // map of routes
        ),
        new UglifyJSPlugin()
    ]
}