#运行
npm i
npm start
# react-mobx+less+antd+axios
为了识别装饰器语法，在react中需要配置的文件
```
npm i  @babel/plugin-proposal-decorators -d
```
注意一下：babel版本问题装的插件会有点问题，最好装饰器识别装两个插件
```
npm i babel-plugin-transform-decorators-legacy -d
```

mobx需要下载的插件
```
npm i mobx-react mobx -d
```
安装自定义组件并且覆盖npm命令
```
 npm install react-app-rewired --save-dev
```
![image](https://minio.choerodon.com.cn/knowledgebase-service/file_1655167357f145188c28ed99f0932742_blob.png)
安装一个别人的自定义组件customize-cra2.0版本以上
```
npm i customize-cra --save-dev
```
下载less,less-loader
```
npm i less less-loader --save-dev
```
并且配置文件config-override.js
```
const { override,addLessLoader, addDecoratorsLegacy } = require('customize-cra');
module.exports = override(
    addDecoratorsLegacy(),
    addLessLoader({
        strictMath: true,
        noIeCompat: true,
        localIdentName: "[local]--[hash:base64:5]" // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
      })
);
```
打包就能识别装饰器语法和less了
最后是被装饰器是否识别成功
在create-react-app脚手架创建的index.js直接粘贴以下代码跑下看是否有问题
```
import React from 'react'
import {Component} from 'react'
import {observer} from 'mobx-react'
import {observable,action,computed} from 'mobx'
import ReactDOM from 'react-dom'

let timerData=observable({
    secondsPassed:0
});

setInterval(()=>{
    timerData.secondsPassed++;
},1000);

@observer
class Timer extends Component{

    @action.bound reseTime(){
        this.props.timerData.secondsPassed=0;
    }
    @observable length=2;
    @computed get squared(){
        return this.length*this.length;
    }
    set squared(value){
        this.length=Math.sqrt(value);
    }
    render(){
        return (
            <div>
                <span>Seconds passed:{this.props.timerData.secondsPassed}</span>
                <br/>
                <button onClick={this.reseTime}>复位</button>
                <div>{this.squared}</div>
            </div>

        )
    }
};
ReactDOM.render(<Timer timerData={timerData}/>,document.getElementById('root'));
```
效果如下就成功识别装饰器语法。
![image](https://minio.choerodon.com.cn/knowledgebase-service/file_bf70fba4ad3d4496a18515b4a6851cd4_blob.png)
识别less是否成功，写一个less文件引入在APP.js里面，看是否能像css一样使用就行

配置antd或者猪齿鱼UI按需加载
下载按需加载的插件
```
npm i babel-plugin-import --save-dev
```
下载antd和猪齿鱼UI
```
npm install antd --save-dev
npm install choerodon-ui --save-dev
```
配置overrides里面的内容，有一个重点是可能与less配置冲突，重新配置less
那么配置文件汇总为
```
const { override,addLessLoader,fixBabelImports, addDecoratorsLegacy } = require('customize-cra');
module.exports = override(
    addDecoratorsLegacy(),
    addLessLoader({
        // strictMath: true,
        // noIeCompat: true,
        // localIdentName: "[local]--[hash:base64:5]" // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
      javascriptEnabled:true,
      modifyVars:{
        "@primary-color":"#0ff"
      }
      }),
      fixBabelImports("import",{
        "libraryName":"antd",
        "libraryDirectory":"es",
        "style":true
      })
);
```
