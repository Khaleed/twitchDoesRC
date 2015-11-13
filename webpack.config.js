var path = require('path')

module.exports = {
    
    devtool: 'source-map',
    
    entry: {
        // main app
        path.resolve(__dirname, 'app', 'server.js')
    },

    devServer: {
        contentBase: "public/"
    },

    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: '/',
        filename: 'bundle.js'
    },

    module: {
        // loaders transform other resources into JS
        loaders: [
            // Babel loader
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel?optional[]=runtime'
            },

            {
                test: /\.json$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'json'
            }
        ]
    },

    resolve: {
        modulesDirectories: [
            'node_modules', // don't bundle anything from node modules
            'app'
        ]
    },

};