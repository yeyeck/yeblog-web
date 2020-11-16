# Yeblog (yeblog-page)

YeBlog 前台展示页面 基于 Vue + Vue-ssr + Quasar  
博客后端：[yeblog-backend](https://github.com/yeyeck/yeblog-backend)  
后台管理：[yeblog-admin](https://github.com/yeyeck/yeblog-admin)  
示例：[www.yeyeck.com](https://yeyeck.com/)  

## 1. 开发环境
- Node.js
- Yarn
- Quasar cli
### 1.1 安装 Quasar cli
```bash
$ yarn global add @quasar/cli
# 或者
$ npm install -g @quasar/cli
```
### 1.2 下载依赖
```bash
yarn
```
### 1.3 以开发模式运行
```bash
quasar dev  # spa
quasar dev -m ssr    # ssr
```
### 1.4 打包
```bash
quasar build    # spa
quasar build -m ssr    # ssr
```
### 1.5 配置
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
