const Koa = require("koa")
const app = new Koa()
const router = require('./router')

router(app)

app.listen(3000, ()=>{
    console.log("server is running at port 3000")
})