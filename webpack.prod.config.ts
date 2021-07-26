import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

const config: webpack.Configuration = {
    mode: "production",
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].[contenthash].js",
        publicPath: "",
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
        }),
        // Webpack 进程对代码进行类型检查
        new ForkTsCheckerWebpackPlugin({
            async: false,
        }),
        // 启用 Webpack 进程使用 ESLint 对代码进行检查
        new ESLintPlugin({
            extensions: ["js", "jsx", "ts", "tsx"],
        }),
        new CleanWebpackPlugin(),   //构建过程开始时清除构建文件夹
    ],
};

export default config;