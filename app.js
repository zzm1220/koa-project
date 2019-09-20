const Koa = require("koa")
const koaBody = require("koa-body")
const koaStatic = require("koa-static")
const error = require("koa-json-error")
const parameter = require("koa-parameter")
const mongoose = require('mongoose')
const path = require('path')
const app = new Koa()
const router = require('./router')
const { connectionStr } = require("./config")

mongoose.connect(connectionStr, { useNewUrlParser: true, 
    useUnifiedTopology: true }, () => {
    console.log("mongondb 链接成功")
})
mongoose.connection.on('error', console.error)
app.use(koaStatic(path.join(__dirname, 'public')))
app.use(error({
    postFormat: (e, {stack, ...rest}) => 
            process.env.NODE_ENV === 'production' ? rest : {stack, ...rest}
}))
app.use(koaBody({
    multipart: true, // 文件的type
    formidable: { //node npm包
        uploadDir: path.join(__dirname, '/public/uploads'),
        keepExtensions: true
    }
}))
app.use(parameter(app))
router(app)

app.listen(3000, ()=>{
    console.log("server is running at port 3000")
})