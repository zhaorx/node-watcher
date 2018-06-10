var chokidar = require('chokidar')
var path = require('path')
var fs = require('fs')
var config = require('./config')

//监听watchPath目录的文件change事件
chokidar
  .watch(config.watchPath, { ignored: /(^|[\/\\])\../ })
  .on('change', filePath => {
    let fileName = path.basename(filePath)
    let sourceFile = path.join(config.watchPath, fileName)
    let destPath = path.join(config.outPath, fileName)

    let readStream = fs.createReadStream(sourceFile)
    let writeStream = fs.createWriteStream(destPath)
    readStream.pipe(writeStream)
    console.log(`${fileName} 同步完成--${new Date().toLocaleTimeString()}`)
  })

console.log(`
  开始监听：${config.watchPath}
  同步目录：${config.outPath}
`)
