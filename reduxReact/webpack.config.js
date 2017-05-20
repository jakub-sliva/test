module.exports = {
    entry: "./src/index.js",  //n� vstupn� bod aplikace
    output: {
        filename: "bundle.js"   //v�stupn� bal�k v�ech zdrojov�ch k�d�
    },
    module: {
    loaders: [
          {
              test: /\.js?/,    //V�echny soubory s koncovkou js...
              exclude: /(node_modules)/,
              loader: 'babel-loader',  //pro�e� babel-loaderem (integrace babelu a webpacku)
              query: {
                  presets: ['react', 'es2015'], //vybran� babel presety: https://babeljs.io/docs/plugins/#presets
                  plugins: ["transform-class-properties"] //vybran� pluginy https://babeljs.io/docs/plugins/#transform-plugins
              }
          }
    ]
    }
};