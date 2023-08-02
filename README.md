# 切换 node 镜像源的库

## Install

```
$ npm install -g nrm
```

##### nrs list 查看目前源

npm -> https://registry.npmjs.org/
yarn -> https://registry.yarnpkg.com/
tencent -> https://mirrors.cloud.tencent.com/npm/
cnpm -> https://r.cnpmjs.org/
taobao -> https://registry.npmmirror.com/
npmMirror -> https://skimdb.npmjs.com/registry/

##### nrs use 切换源

##### nrs current 查看当前源

##### nrs add 添加源

##### nrs delete [-radio/-mult]删除自定义源(单个或批量)

##### nrs rename 重命名

##### nrs edit 编辑自定义镜像地址

##### nrs ping [regName]测试镜像响应速度

# 用法 Usage

Usage: nrs [options] [command]

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  list            list packages
  use             Please select a registry
  current         current registry
  add             add registry
  del [options]   delete registry
  rename          rename registry
  edit            edit registry
  ping [regName]  ping registry
  help [command]  display help for command
