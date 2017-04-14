/**
 * Created by huangling on 14/4/2017.
 */
/** * Created by hammer on 2016/3/26. * 配置的打包文件 */
var webpack = require('webpack');
//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var path = require('path');

console.log(__dirname);

module.exports = {
    //插件项
    // plugins: [
    //     //commonsPlugin,
    //     new webpack.NoErrorsPlugin()
    // ],
    //页面入口文件配置
    entry: path.resolve(__dirname, 'src/flow/index.js'),
    //入口文件输出配置
    //output: {path: __dirname+'_build_', filename: '[name].js'}
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        //加载器配置
        loaders: [
            // //.css 文件使用 style-loader 和 css-loader 来处理
            // { test: /\.css$/, loader: 'style-loader!css-loader' },
            //.js 文件使用 jsx-loader 来编译处理 jsx-loader可以添加?harmony参数使其支持ES6语法
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                } //备注：es2015用于支持ES6语法，react用于解决render()报错的问题
            },
            //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
            { test: /\.less$/, loader: 'style!css!less?sourceMap' },
            // //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            // { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
        ]
    },
    // //其它解决方案配置
    // resolve: {
    //     //查找module的话从这里开始查找
    //     //root: 'E:/github/flux-example/app', //绝对路径
    //     //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    //     extensions: ['', '.js', '.json', '.scss', '.css'],
    //     modulesDirectories: ['node_modules', 'src/js', 'src/scss']
    // },
    devServer: { inline: true, port: 8082 }
};