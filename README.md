## react之第一次尝试

*react+react-router-dom+mobx+axios+ts+sass*

> 记一次项目实践过程。

----
### 步骤

#### 环境搭建

- 使用Create-React-App来建立TypeScript的环境：`create-react-app react-firstattempt --scripts-version=react-scripts-ts`
- 使用eject将所有内建的配置暴露出来：`yarn eject`
- 安装sass-loader和node-sass依赖：`yarn add sass-loader node-sass`
- 配置sass：在config下找到 webpack.config.dev.js 文件，在 exclude 中添加 /.scss$/，并在loaders中添加一项，如下
```javascript
{
     exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.scss$/],
     loader: require.resolve('file-loader'),
     options: {
       name: 'static/media/[name].[hash:8].[ext]',
     },
},
// load scss
{
     test: /\.scss$/,
     loaders: ['style-loader','css-loader','sass-loader'],
}
```
至此，sass 就配置好了。（**注意，我们只是修改了 webpack.config.dev.js ,如果要在生产环境中生效，需要在webpack.config.prod.js做同样的配置。）**
- 把所有的.css改成.scss，执行：`yarn start`
- 安装react-router-dom：`yarn add react-router-dom`
- 安装支持装饰器所需依赖：`yarn add babel-plugin-transform-decorators-legacy`
- 安装 @babel/plugin-proposal-decorators：`yarn add @babel/plugin-proposal-decorators`
- 安装 mobx 和 mobx-react 和 mobx-react-router：`yarn add mobx mobx-react mobx-react-router`
- 配置babel：找到package.json中的babel，做如下配置
```javascript
"babel": {
    "plugins": [
      [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ],
      [
        "@babel-plugin-proposal-class-properties",
        {
          "loose": true
        }
      ]
    ],
    "presets": [
      "react-app"
    ]
  }
```
- 安装axios：`yarn add axios`

#### 目录结构

```javascript
src
├── assets          所有的资源文件（字体、图片、样式）
├── components      编写的可复用组件
├── constants       常量编写
├── layouts         布局外框
├── pages           所有页面
├── services        所有服务
├── index.scss      全局样式
├── index.tsx       页面入口
types
```
