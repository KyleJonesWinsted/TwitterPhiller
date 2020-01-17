const express = require('express')
const path = require('path')
const app = express()
const router = express.Router()

app.use('/static', express.static('static'))

app.use((req, res, next) => {
    const info = [req.method, req.path]
    res.on("finish", () => {
        info.push(res.statusCode)
        console.log(info.join(" "))
    })
    next()
})

app.route('/').get((req, res) => {
    res.sendFile(path.join(__dirname + '/static/index.html'))
})

app.use((req, res, next) => {
    res.sendStatus(404)
})

app.listen(4000, () => {
    console.log('Listening on port 4000')
})