# admin工程指南

这是一个admin工程，使用本工程你需要知道如下几点。

- 开发环境
- 编译打包
- 发布到cdn



## 准备工作

你需要给adimn的静态文件一个家。

**完善仓库地址**

修改package.json，添加repository配置。url必须以git@git.hipac.cn开头。例如：

```json
{
    "repository": {
    	"type": "git",
	    "url": "git@git.hipac.cn:fedmall/resource-center-static.git"
	},
    ...
}
```



**配置git钩子**

请参考http://k.yangtuojia.com/pages/viewpage.action?pageId=8674593



## 开发环境

### 根据域名切换环境

本工程根据url切换hop环境，这样的好处是：

1. 免去切环境还要打包的痛苦
2. 本地更方便的调试

执行

```bash
npm run start
```

启动工程，启动后浏览器会默认跳转到localhost:3000。你需要将域名绑到本地host。比如我将daily-ope.hipac.cn绑到本地ip。

```
127.0.0.1 daily-ope.hipac.cn
```

就可以通过daily-ope.hipac.cn:3000/xxx 访问到对应页面。test环境也是如此。



### 根据url参数切换环境

如果你只想调试单页面接口，可以直接在url中添加`debug=true&env=xxx`，`xxx`是你要访问的环境名。可以实现hop环境的切换。



## 编译打包

请遵循http://k.yangtuojia.com/display/qd/Git+to+CDN的规范命名分支。

本工程提供了2个打包命令，`build-dev`和`build-prod`。

build-dev用于测试环境（daily, test）和预发环境（pre）的打包。

build-prod用于正式环境的打包。

根据规范命名分支后，打包时提示输入的版本号就是分支名中的版本号。

你可以用jenkins帮你执行打包过程，比如 http://cd.hipac.cn/job/ope-static-build-dev/ 和 http://cd.hipac.cn/job/ope-static-build-prod/



## 内置变量

打包器能接收一些环境变量，可以在打包过程中从shell动态传入，推荐使用cross-env模块跨平台传递环境变量，如下所示:

`./node_modules/.bin/cross-env GENERATE_SOURCEMAP=false PUBLIC_URL=https://a.b.c/d/ npm run build-dev`

| 名称                 | 默认值       | 是否能在业务代码中获取到 | 解释                         |
| -------------------- | ------------ | ------------------------ | ---------------------------- |
| GENERATE_SOURCEMAP   | true         | 否                       | 生成sourcemap                |
| INLINE_RUNTIME_CHUNK | true         | 否                       | 打包webpack启动脚本          |
| PUBLIC_URL           | 根据规则生成 | 否                       | 打包后前端静态资源的路径前缀 |
| BUILD_VERSION        | 0.1.0        | 否                       | 当前打包的版本号             |





## 发布到CDN

参考：http://k.yangtuojia.com/display/qd/Git+to+CDN