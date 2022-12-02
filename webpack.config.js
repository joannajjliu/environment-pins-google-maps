const path = require('path')

module.exports = {
    "mode": "none",
    "maxEntrySize": 200,
    "optimization": {
        "splitChunks": true,
        "maxEntrypointSize": 204800 //in bytes
    },
    "entry": "./src/index.js",
    "output": {
        "path": path.join(__dirname, 'dist'),
        "filename": "bundle.js"
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist')
    },
    "module": {
        "rules": [{
            "test": /\.css$/,
            "use": ["style-loader", "css-loader"]
        },
        {
            "test": /\.js$/,
            "exclude": /node_modules/,
            "use": {
                "loader": "babel-loader",
                "options": {
                    "presets": ["@babel/preset-env"]
                }
            }
        }
    ]
    }
}