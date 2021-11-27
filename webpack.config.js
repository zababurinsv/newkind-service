module.exports = {
    mode: 'development',
    entry: {
        index: `${__dirname}/app.waves.mjs`
    },
    output: {
        path: __dirname + "/temp",
        filename: 'waves-bundle.mjs',
        chunkFilename: 'waves-bundle.mjs',
        library: 'waves'
    }
};
