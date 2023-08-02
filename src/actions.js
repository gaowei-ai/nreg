const inquirer = require('inquirer')
const ping = require('node-http-ping')
const { REGISTRIES, REGISTRIES_KEYS } = require('./constants');
const { getCurrentRegistry, setRegistry, writeRegistriesFile, printSuccess, printError, printMessage, hasCustomRegistry, differentRegistry, validateRegName, validateRegUrl, dealPingUrl } = require('./helper')

const onList = async () => {
	const currentRegistry = await getCurrentRegistry()
	const maxLength = Math.max(...REGISTRIES_KEYS.map(v => v.length)) + 3

	REGISTRIES_KEYS.forEach(k => {
		const registry = REGISTRIES[k].registry;
		const Arr = new Array(...k);
		Arr.length = maxLength;
		const prefix = Array.from(Arr).map(v => v ? v : ' ').join('');
		const message = prefix + ' ->   ' + registry;
		if (registry == currentRegistry.trim()) {
			printMessage(message, 'green');
		} else {
			printMessage(message)
		}
	})
}

const onUse = async () => {
	inquirer.prompt([
		{
			type: "list",
			name: "sel",
			message: "请选择镜像",
			choices: REGISTRIES_KEYS
		}
	]).then(async res => {
		const reg = REGISTRIES[res.sel].registry;
		await setRegistry(reg)
		printSuccess('切换成功')
	})
}

const onCurrent = async () => {
	const currentRegistry = await getCurrentRegistry()
	const currentName = REGISTRIES_KEYS.find(k => {
		if (REGISTRIES[k].registry == currentRegistry.trim()) {
			return k
		}
	})
	let message = ''
	if (currentName) {
		message = `当前镜像: ${currentName} -> ${currentRegistry.trim()}`
	} else {
		message = `当前镜像: ${currentRegistry.trim()}`
	}
	printMessage(message, 'green')
}

const onAdd = async () => {
	inquirer.prompt([
		{
			type: 'input',
			name: 'regName',
			message: '请输入镜像名称',
			validate: validateRegName
		},
		{
			type: 'input',
			name: 'url',
			message: '请输入镜像地址',
			validate: validateRegUrl
		},
	]).then(res => {

		REGISTRIES[res.regName] = {
			home: res.url.trim(),
			registry: res.url.trim(),
			ping: dealPingUrl(res.url.trim()),
		}

		try {
			writeRegistriesFile(REGISTRIES)
			printSuccess('添加成功')
		} catch (error) {
			printError(`添加失败: ${error}`)
		}
	})
}

const onDel = async (options) => {
	const delOrigin = async (name) => {
		const current = await getCurrentRegistry();
		const selOrigin = REGISTRIES[name].registry;
		if (selOrigin.trim() == current.trim()) {
			printError(`当前镜像:${name}: ${current.trim()}  正在使用,无法删除!`)
			return
		}

		try {
			delete REGISTRIES[name]
			writeRegistriesFile(REGISTRIES)
			printSuccess('删除成功')
		} catch (error) {
			printError(`删除失败: ${error}`)
		}
	}
	if (!hasCustomRegistry()) return

	const difference = differentRegistry()
	if (options.radio) {
		inquirer.prompt([
			{
				type: "list",
				name: "sel",
				message: "请选择想要删除的自定义镜像",
				choices: difference
			}
		]).then(async res => {
			delOrigin(res.sel)
		})
	}

	if (options.mult) {
		inquirer.prompt([
			{
				type: "checkbox",
				name: "list",
				message: "请选择想要删除的自定义镜像",
				choices: difference
			}
		]).then(res => {
			if (res.list.length) {
				res.list.forEach(item => {
					delOrigin(item)
				})
			}
		})
	}
}


const onRename = async () => {
	if (!hasCustomRegistry()) return
	inquirer.prompt([
		{
			type: 'list',
			name: 'sel',
			message: '请选择要重命名的镜像',
			choices: differentRegistry(),
		},
		{
			type: 'input',
			name: 'newName',
			message: '请输入新名称',
			validate: validateRegName
		}
	]).then(res => {
		REGISTRIES[res.newName] = Object.assign({}, REGISTRIES[res.sel]);
		try {
			delete REGISTRIES[res.sel];
			writeRegistriesFile(REGISTRIES)
			printSuccess(`重命名成功: ${res.newName}`)
		} catch (error) {
			printError(`重命名失败: ${error}`)
		}
	})
}

const onEdit = async () => {
	if (!hasCustomRegistry()) return
	inquirer.prompt([
		{
			type: 'list',
			name: 'sel',
			message: '请选择要编辑的镜像',
			choices: differentRegistry()
		},
		{
			type: 'input',
			name: 'newUrl',
			message: '请输入新的镜像地址',
			validate: validateRegUrl
		}
	]).then(res => {
		REGISTRIES[res.sel] = {
			home: res.newUrl.trim(),
			registry: res.newUrl.trim(),
			ping: dealPingUrl(res.newUrl.trim()),
		}
		try {
			writeRegistriesFile(REGISTRIES);
			printSuccess(`编辑成功 ${res.sel}`)
		} catch (error) {
			printError(`编辑失败 ${error}`)
		}
	})
}


const onPing = async (regName) => {
	if (regName) {
		if (!REGISTRIES[regName]) {
			printError('镜像不存在')
			return
		}
		const url = REGISTRIES[regName].ping;
		ping(url).then((time) => {
			printMessage(`响应时间: ${time}ms`)
		}).catch(() => {
			printError(`响应超时`)
		})
	} else {
		REGISTRIES_KEYS.forEach(k => {
			const url = REGISTRIES[k].ping;
			ping(url).then((time) => {
				printMessage(`${k} 的响应时间: ${time}ms`)
			}).catch(() => {
				printMessage(`${k}响应超时`, 'red')
			})
		})
	}
}


module.exports = {
	onList,
	onUse,
	onCurrent,
	onAdd,
	onDel,
	onRename,
	onEdit,
	onPing
}