const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        environment: {
            arrowFunction: false,
            const: false
        }
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        targets: {
                                            'chrome': 58,
                                            'ie': 11
                                        },
                                        'corejs': 3,
                                        'useBuiltIns': 'usage'
                                    }
                                ]
                            ]
                        }
                    }
                    ,
                    'ts-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                        {
                                            broswer: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|webp|svg|gif|ico)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 50 * 1024,
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/public/index.html',
            favicon: path.resolve(__dirname, 'src/public/asset/favicon.ico')
        })
    ],
    resolve: { extensions: ['.ts', '.js'] }
}