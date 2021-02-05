const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Path = require("path");


module.exports = (env, arg) => {
  const config = {
    entry: "./src/init.js",
    output: {
      path: Path.resolve(__dirname, 'dist'),
      filename: "[name].js",
      crossOriginLoading: false
    },
    resolve: {
      extensions: [".js"]
    },
    module: {
      rules: [{
        test: /\.(png|jpe?g|svg)$/,
        loader: "file-loader"
      }, {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                require("autoprefixer")({
                  grid: "autoplace"
                }),
                require("cssnano")()
              ]
            }
          },
          "sass-loader"
        ]
      }]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      }),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
    ],
    devServer: {
      headers: {
        'Access-Control-Allow-Headers': '*',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      },
      port: 4466,
      historyApiFallback: true,
    },
  };

  if (arg.mode === "production") {
    config.plugins = config.plugins.concat([
      new CleanWebpackPlugin()
    ]);
  }

  return config;
};
