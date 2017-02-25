import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const PATHS = {
    app: path.resolve(__dirname, 'app'),
    build: path.resolve(__dirname, 'app/dist')
}

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'app/index_template.html'),
    filename: 'index.html',
    inject: 'body',
})

const productionPlugin = new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify('production')
    }
})

const LAUNCH_COMMAND = process.env.npm_lifecycle_event

const isProduction = LAUNCH_COMMAND === 'production'

process.env.BABEL_ENV = LAUNCH_COMMAND

const base = {
    entry: [
        PATHS.app,
    ],
    output: {
        path: PATHS.build,
        filename: "index_bundle.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader" },
            {test: /\.css$/, loader: 'style!css?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]'},
            {test: /\.scss$/, loader: 'style!css?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]!sass'},
            {test: /\.(png|svg|gif|jpg)$/, loader: 'url-loader?limit=100000' }, 
            {
                test: /\.(svg(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader'
            }, {
                test: /\.mp3$/,
                loader: 'file-loader',
            }

        ]
    },
    resolve: {
        root: path.resolve('./app'),
        extensions: ['', '.js', '.jsx', '.min.js']
    },
}

const productionConfig = {
    devtool: 'cheap-module-source-map',
    plugins: [HTMLWebpackPluginConfig, productionPlugin]
}

const devConfig = {
    devtool: 'source-map',
    devServer: {
        contentBase: PATHS.build,
        hot: true,
        inline: true,
        progress: true,
        port: 8888,
        stats: 'errors-only',
        proxy: {
            '/music': {
                target: 'localhost:3000',
                secure: false
            },
        },
    },
    plugins: [HTMLWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()]
}


export default Object.assign({}, base,
    isProduction ? productionConfig : devConfig
)
