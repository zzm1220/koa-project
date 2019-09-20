const fs = require('fs')
const path = require('path')

module.exports = app => {
    // 读取文件下的文件
    const files = fs.readdirSync(path.resolve(__dirname))
    // 批量注册文件
    files.forEach(file => {
        if (file !== 'index.js') {
            const router = require(`./${file}`)
            router(app)
        }
    })
}