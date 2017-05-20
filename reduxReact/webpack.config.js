module.exports = {
    entry: "./src/index.js",  //náš vstupní bod aplikace
    output: {
        filename: "bundle.js"   //výstupní balík všech zdrojových kódù
    },
    module: {
    loaders: [
          {
              test: /\.js?/,    //Všechny soubory s koncovkou js...
              exclude: /(node_modules)/,
              loader: 'babel-loader',  //prožeò babel-loaderem (integrace babelu a webpacku)
              query: {
                  presets: ['react', 'es2015'], //vybrané babel presety: https://babeljs.io/docs/plugins/#presets
                  plugins: ["transform-class-properties"] //vybrané pluginy https://babeljs.io/docs/plugins/#transform-plugins
              }
          }
    ]
    }
};