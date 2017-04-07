const fs = require('fs')
const getSqlContentMap = require('./util/get-sql-content-map')
const { query } = require('./util/db')

const eventLog = function(err, sqlFile, index) {
    if(err) {
        console.log(`[ERROR] sql脚本文件: ${sqlFile} 第${index + 1}条脚本 执行失败！`)
    } else {
        console.log(`[SUCCESS] sql脚本文件: ${sqlFile} 第${index + 1}条脚本 执行成功`)
    }
}

// 获取所有sql脚本内容
let sqlContentMap = getSqlContentMap()

// 执行建表sql脚本
const createAllTables = async () => {
    for(let key in sqlContentMap) {
        let sqlShell = sqlContentMap[key]
        let sqlShellList = sqlShell.split(';')
        for(let [i, shell] of sqlShellList.entries()) {
            if(shell.trim()) {
                let result = await query(shell)
                if(result.serverStatus*1 === 2) {
                    eventLog(null, key, i)
                } else {
                    eventLog(true, key ,i)
                }
            }
        }
    }
}

createAllTables()