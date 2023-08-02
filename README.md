# 切换 node 镜像源的库

## Install

```
$ npm install -g nreg
```

##### nreg list 查看目前源
npm -> https://registry.npmjs.org/  

yarn -> https://registry.yarnpkg.com/  

tencent -> https://mirrors.cloud.tencent.com/npm/ 

cnpm -> https://r.cnpmjs.org/  

taobao -> https://registry.npmmirror.com/  

npmMirror -> https://skimdb.npmjs.com/registry/  

##### nreg use 切换源

##### nreg current 查看当前源

##### nreg add 添加源

##### nreg delete [-radio/-mult]删除自定义源(单个或批量)

##### nreg rename 重命名

##### nreg edit 编辑自定义镜像地址

##### nreg ping [regName]测试镜像响应速度

# 用法 Usage

Usage: nreg [options] [command]

Options:  
  -V, --version   output the version number  
  -h, --help      display help for command  

Commands:  

  list             &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; list packages  
  use              &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Please select a registry  
  current          &emsp;&emsp;&emsp;&emsp;&emsp;current registry  
  add              &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; add registry  
  del [options]    &emsp;&emsp; delete registry  
  rename           &emsp;&emsp;&emsp;&emsp;&emsp;rename registry  
  edit             &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;edit registry  
  ping [regName]   &emsp;ping registry  
  help [command]   &emsp;display help for command  
