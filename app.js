const Koa = require("koa")

const app = new Koa()

app.use((ctx, next) =>{
    ctx.body = 'hello, koa2'
})

app.listen(3000, ()=>{
    console.log("server is running at port 3000")
})