const path = require('path')
const fs = require('fs')

    var walkFile = function (fileUrl,callback) {
        let fileArr=[]
        fs.readdirSync(fileUrl).forEach(function (file) {
            let stats = fs.statSync(path.join(fileUrl,file))
            if(stats.isFile()){
                fileArr.push(file)
            }
        })
        callback(fileArr)
    }
    var walkDir = function (fileUrl,callback) {
        let dirArr =[]
        fs.readdirSync(fileUrl).forEach(function (file) {
            let stats = fs.statSync(path.join(fileUrl,file))
            if(stats.isDirectory()){
                dirArr.push(file)
            }
        })
        callback(dirArr)
    }
    var mkDir = function (fileUrl,callback) {
        fs.mkdir(fileUrl,(err)=>{
            if(err){
                callback(err,null)
                console.log(err);
                return
            }
            callback(null,'mkdir is success')
        })
        }
    exports.walkDir = walkDir
    exports.walkFile = walkFile
    exports.mkDir = mkDir