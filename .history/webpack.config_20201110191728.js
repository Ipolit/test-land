const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
/*const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;*/
const Path = require("path");


module.exports = (env, arg) => {
  const config = {
    entry: "./src/init.js",
    output: {
      /*path: Path.join(process.cwd(), "dist"),*/
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
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      new HtmlWebpackPlugin({
        filename: "about.html",
        template: "./src/about.html",
      }),
      new HtmlWebpackPlugin({
        filename: "team.html",
        template: "./src/team.html",
      }),
      new HtmlWebpackPlugin({
        filename: "agent-details.html",
        template: "./src/agent-details.html",
      }),
      new HtmlWebpackPlugin({
        filename: "blog.html",
        template: "./src/blog.html",
      }),
      new HtmlWebpackPlugin({
        filename: "blog-details.html",
        template: "./src/blog-details.html",
      }),
      new HtmlWebpackPlugin({
        filename: "press.html",
        template: "./src/press.html",
      }),
      new HtmlWebpackPlugin({
        filename: "testimonials.html",
        template: "./src/testimonials.html",
      }),
      new HtmlWebpackPlugin({
        filename: "developments.html",
        template: "./src/developments.html",
      }),
      new HtmlWebpackPlugin({
        filename: "development-details.html",
        template: "./src/development-details.html",
      }),
      new HtmlWebpackPlugin({
        filename: "general-styles.html",
        template: "./src/general-styles.html",
      })/*,
      new HTMLInlineCSSWebpackPlugin()*/
    ],
    devServer: {
      headers: {
        'Access-Control-Allow-Headers': '*',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      },
      port: 44606,
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
