#!/usr/bin/env node
const program = require('commander');
const actions = require('./actions')
const PKG = require('../package.json')
program.version(PKG.version);

// 查看全部镜像源
program.command('list').description('list packages').action(actions.onList)

// 切换镜像源
program.command('use').description('Please select a registry').action(actions.onUse)

// 查看当前镜像
program.command('current').description('current registry').action(actions.onCurrent)

// 添加自定义新镜像
program.command('add').description('add registry').action(actions.onAdd)

// 删除镜像(单选/多选)
program.command('del').option('-radio --radio','single delete').option('-mult --mult','multiple delete').description('delete registry').action(actions.onDel)

// 重命名镜像
program.command('rename').description('rename registry').action(actions.onRename)

// 编辑镜像源
program.command('edit').description('edit registry').action(actions.onEdit)

// 镜像源测速
program.command('ping').argument('[regName]','registry name').description('ping registry').action(actions.onPing)

program.parse(process.argv);
