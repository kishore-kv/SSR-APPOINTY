const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

/*-------------------------------------------------*/

module.exports = {
    // webpack optimization mode
    mode: ( 'development' === process.env.NODE_ENV ? 'development' : 'production' ),
    
    devtool: 'development' === process.env.NODE_ENV ? "source-map" : "hidden-source-map",

    // entry files
    entry: 'development' === process.env.NODE_ENV ? [
        './src/index.dev.js', // in development
    ] : [
        './src/index.prod.js', // in production
    ],

    // output files and chunks
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'build/[name].js',
        publicPath: '/'
    },

    // module/loaders configuration
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
            },
            {
                test: /\.scss$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
            {
                test: /\.(png|jpg|jpeg|gif|webp)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192, // Files smaller than 8KB will be inlined as Base64
                            name: '[name].[hash].[ext]',
                            outputPath: 'assets/images/',
                            esModule: false, // Important for React to properly handle image imports
                        }
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name].[hash][ext]', // Outputs to dist/fonts
                },
            },
        ]
    },

    // webpack plugins
    plugins: [
        new Dotenv(),
        new MiniCssExtractPlugin({
            filename: 'build/styles.css'
        }),
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/index.html'),
            minify: false,
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets'),
                    to: path.resolve(__dirname, 'dist/assets')
                }
            ]
        }),
    ],

    // resolve files configuration
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css'],
        alias: {
            src: path.resolve(__dirname, 'src'),
            '@components': path.resolve(__dirname, 'src/components/'),
            '@views': path.resolve(__dirname, 'src/views/'),
            '@layout': path.resolve(__dirname, 'src/layout/'),
            'react-router-dom': path.resolve('./node_modules/react-router-dom')
        },
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
                vendor: {
                    chunks: 'all',
                    name: 'vendor',
                    test: /node_modules/,
                }
            }
        }
    },

    devServer: {
        port: 8088,
        historyApiFallback: true,
    },

    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
};
