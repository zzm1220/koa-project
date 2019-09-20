const path = require("path")

class HomeCtl {
    index(ctx, next) {
      ctx.body = '<h1>this is home page</h1>'  
    }
    upload(ctx, next) {
      const file = ctx.request.files.file
      const basename = path.basename(file.path)

      ctx.body = {
        url: `${ctx.origin}/uploads/${basename}`
      }
    }
}

module.exports = new HomeCtl()