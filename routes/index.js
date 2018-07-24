var express = require('express');
var router = express.Router();
var path = require('path')
const walk = require('../read')
const formidable = require('formidable')
const fs = require('fs')
/* GET home page. */

router.get('/', function (req, res, next) {
    walk.walkDir(path.normalize(path.join(__dirname, '../public', '/images')), (dirArr) => {
        res.render('index', {title: '这是一个ejs创建的express', dirArr: dirArr});
    })
});
router.get('/img/:name', function (req, res) {
    let dirName = req.params.name
    console.log(dirName);
    walk.walkFile(path.normalize(path.join(__dirname, '../public', '/images', dirName)), (fileArr) => {
        res.render('second', {title: 'this is my second', fileArr: fileArr, userName: dirName})
    })
})
router.get('/updata', function (req, res) {
    walk.walkDir(path.normalize(path.join(__dirname, '../public', 'images')), (dirArr) => {
        res.render('updata', {title: '上传文件', dirArr: dirArr})
    })
})
router.get('/make',function (req,res) {
        res.render('make',{title:'创建文件夹'})
    })

router.post('/makedir',function (req,res) {
    let newDirName = req.body.dirname
    let filePath = path.normalize(path.join(__dirname,'../public','images'))
    console.log(newDirName);
    walk.walkDir(filePath,(dirArr)=>{
        walk.mkDir(filePath+'/'+newDirName,(err,res)=>{
            if(err){
                console.log(err+'创建失败');
            }
        })
    })
    res.end('创建成功')
})

router.post('/images',(req,res)=>{
    let form = new formidable.IncomingForm()
    let picPath = path.join(__dirname,'../public','/images','窝科')
     form.uploadDir = picPath
        form.parse(req,(err,fields,files)=>{
            if(err){
                console.log(err);
                return
            }
            console.log(files);
            console.log(picPath);
            let oldPath = files.file.path
            let extName = path.extname(files.file.name)
            console.log(fields.cars);
            let newPath=path.join(__dirname,'../public','images',fields.cars,fields.imageName+extName)
            fs.rename(oldPath,newPath,()=>{
                if(err){
                    console.log(err);
                    return
                }
                res.send('文件上传成功')
            })
        })
})

module.exports = router;
