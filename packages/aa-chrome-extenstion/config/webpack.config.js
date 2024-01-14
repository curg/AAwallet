const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const PATHS = require('./paths');

// Merge webpack configuration files
const config = (env, argv) =>
    merge(common, {
        entry: {
            popup: PATHS.src + '/index.js',
            contentScript: PATHS.src + '/chrome/contentScript.js',
            background: PATHS.src + '/chrome/background.js',
        },
        devtool: argv.mode === 'production' ? false : 'source-map',
    });

module.exports = config;
