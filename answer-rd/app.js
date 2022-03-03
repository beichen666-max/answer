/*
 * @Author: your name
 * @Date: 2021-10-29 16:20:10
 * @LastEditTime: 2021-11-04 13:27:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \qingmeng\qingmeng-rd\app.js
 */
const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const cors = require('@koa/cors');
const config = require('./config')

// 处理跨域 可以使用但是过于简单 使用cors
// app.use(async(ctx, next) => {
//     ctx.set("Access-Control-Allow-Origin", "*")
//         // next继续执行下一个中间件
//     await next()
// })

app.use(cors());

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))


// logger
app.use(async(ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app

module.exports = app.listen(config.port, () => {
    console.log(`Listening on http://localhost:${config.port}`)
})