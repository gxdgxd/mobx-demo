# 接口自动化平台

前端工程地址：http://git.hipac.cn/automation/api_automation_static
服务端工程地址：http://git.hipac.cn/biztoc/gotest﻿


## 运行环境

环境安装参考：http://k.yangtuojia.com/pages/viewpage.action?pageId=19757455

## 安装依赖
```bash
npm i mobx --save
npm i mobx-react --save
```

## 运行
```bash
npm start
```
运行过程中如果有出现Error：Cannot find module ‘immutable’时，直接安装依赖即可，命令如：

```bash
npm i xxx模块 —save
```

启动工程，启动后浏览器会默认跳转到localhost:3000。你需要将域名绑到本地host。比如我将test-apiauto.yangtuojia.com绑到本地ip。

```
127.0.0.1 test-apiauto.yangtuojia.com
```

## 代码工程

src/config/env.js 本地调试时配置hione环境
```
const localhostEnv = '20200318-buildup-baize';
```

src/config/router.js 配置界面路由地址

src/container/ 页面组建类

src/stores/ 数据存储类

开发过程主要围绕container和stores编程

## 构建打包
访问连接：https://feci.yangtuojia.com/view/repo/automation/api_automation_static
 

 
 