const REGISTRIES = require('../registries.json');
const WHITE_LIST = ['npm', 'yarn', 'tencent', 'cnpm', 'taobao', 'npmMirror'] //白名单
const REGISTRIES_KEYS = Object.keys(REGISTRIES);


module.exports = {
	REGISTRIES,
	WHITE_LIST,
	REGISTRIES_KEYS
}