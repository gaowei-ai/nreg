const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path');
const chalk = require('chalk')
const { REGISTRIES_KEYS, WHITE_LIST, REGISTRIES } = require('./constants')

const getCurrentRegistry = async () => {
	return await execSync('npm get registry', { encoding: 'utf8' })
}

const setRegistry = async (reg) => {
	return await execSync(`npm config set registry ${reg}`)
}

const writeRegistriesFile = (registries) => {
	fs.writeFileSync(path.resolve(__dirname, '../registries.json'), JSON.stringify(registries, null, 4))
}

const printSuccess = (message) => {
	console.log(chalk.green(`SUCCESS:  ${message}`));
}

const printError = (message) => {
	console.log(chalk.red(`ERROR:  ${message}`));
}

const printMessage = (message, color = 'blue') => {
	console.log(chalk[color](`${message}`));
}


const hasCustomRegistry = () => {
	if (REGISTRIES_KEYS.length === WHITE_LIST.length) {
		printError('当前无自定义镜像可以删除')
		return false
	}
	return true
}

const differentRegistry = () => {
	return REGISTRIES_KEYS.filter(k => !WHITE_LIST.includes(k))
}

const validateRegName = (value) => {
	const trimmedValue = value.trim();
	if (trimmedValue === '') {
		return '镜像名称不能为空';
	}
	if (REGISTRIES_KEYS.includes(trimmedValue)) {
		return '镜像名称已存在';
	}
	return true;
}

const validateRegUrl = (url) => {
	if (url.trim() === '') {
		return '镜像地址不能为空';
	}
	const hasUrl = REGISTRIES_KEYS.some(k => REGISTRIES[k].registry.trim() == url.trim())
	if (hasUrl) {
		return '镜像地址已存在';
	}
	return true;
}

const dealPingUrl = (url) => {
	const arr = url.split('');
	return arr[arr.length - 1] == '/' ? arr.pop() && arr.join('') : arr.join('')
}
module.exports = {
	getCurrentRegistry,
	setRegistry,
	writeRegistriesFile,
	printSuccess,
	printError,
	printMessage,
	hasCustomRegistry,
	differentRegistry,
	validateRegName,
	validateRegUrl,
	dealPingUrl
}