const production = false;

module.exports = {
    entry: './app/emitter.js',
    devtool: production ? false : "inline-sourcemap",
    output: {
        path: __dirname + "/dist",
        filename: 'main.bundle.js'
    }
};