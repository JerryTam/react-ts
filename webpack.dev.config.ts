import path from "path";
import webpack, { Configuration as WebpackConfiguration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from "eslint-webpack-plugin";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
    mode: "development",    //打包环境, Webpack 将自动设置process.env.NODE_ENV为"development"
    output: {
        publicPath: "/",        // Webpack 应用程序中的根路径
    },
    entry: "./src/index.tsx",       //告诉 Webpack 从哪里开始寻找要捆绑的模块
    module: {       // 告诉 Webpack 将如何处理不同的模块
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
        extensions: [".tsx", ".ts", ".js"],     //Webpack 在模块解析期间以何种顺序查找哪些文件类型
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",     // 使用在src文件夹中的index.html作为模板。
        }),
        new webpack.HotModuleReplacementPlugin(),   // 允许模块热更新
        // Webpack 进程对代码进行类型检查
        new ForkTsCheckerWebpackPlugin({
            async: false
        }),
        // 启用 Webpack 进程使用 ESLint 对代码进行检查
        new ESLintPlugin({
            extensions: ["js", "jsx", "ts", "tsx"],
        }),
    ],
    devtool: "inline-source-map",   //  Webpack 使用完整的内联源映射
    devServer: {
        contentBase: path.join(__dirname, "build"),
        historyApiFallback: true,
        port: 4000,
        open: true,
        hot: true
    },     //配置 Webpack 开发服务器
};

export default config;