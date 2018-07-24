//TODO:formidable第三方模块=》提交表单上传的文件


var formidable = require('formidable')
var http = require('http')
var path = require('path')
var fs = require('fs')

http.createServer((req, res) => {
    if (req.url == 'favicon.ico') {
        return
    }
    if (req.url == '/upload') {
        console.log(formidable)
        var form = new formidable.IncomingForm()
        form.uploadDir = __dirname + '/upload'
        form.parse(req, function (err, fields, files) {
            if (err) {
                console.log(err)
                return
            }
            console.log(fields)
            res.end()
        })
    }

    res.writeHead(200, {'content-type': 'text/html;charset=utf-8'})
    res.write(
        '<form action="/upload" method="post" enctype="multipart/form-data">' +
        '<input type="text" name="picName" placeholder="名称">' +
        '<input type="file" name="password" placeholder="密码">' +
        '<input type="submit" value="提交">' +
        '</form>'
    )
}).listen(3000, () => {
    console.log('server at 3000')
})