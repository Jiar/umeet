const fs = require('fs')
const getSqlMap = require('./get-sql-map')

let sqlContentMap = {}

/**
 * 读取sql文件内容
 * @param  {String} fileName 文件名字
 * @param  {String} path     文件所在的路径
 * @return {String}          脚本文件内容
 */
function getSqlContent(fileName, path) {
    let content = fs.readFileSync(path, 'binary')
    sqlContentMap[fileName] = content
}

function getSqlContentMap() {
    let sqlMap = getSqlMap()
    for(let key in sqlMap) {
        getSqlContent(key, sqlMap[key])
    }
    return sqlContentMap
}

module.exports = getSqlContentMap