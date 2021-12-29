const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

const app = express()

app.use('/', serveStatic(path.join(__dirname, '/dist')))
app.use('/login', serveStatic(path.join(__dirname, '/dist')))
app.use('/register', serveStatic(path.join(__dirname, '/dist')))
app.use('/reservation', serveStatic(path.join(__dirname, '/dist')))
app.use('/admin', serveStatic(path.join(__dirname, '/dist')))
app.use('/admin/dashboard', serveStatic(path.join(__dirname, '/dist')))
app.use('/admin/clients', serveStatic(path.join(__dirname, '/dist')))
app.use('/admin/branch', serveStatic(path.join(__dirname, '/dist')))
app.use('/admin/cars', serveStatic(path.join(__dirname, '/dist')))
app.use('/admin/inquiries', serveStatic(path.join(__dirname, '/dist')))
app.use('/admin/rentals', serveStatic(path.join(__dirname, '/dist')))
app.use('/user', serveStatic(path.join(__dirname, '/dist')))
app.use('/user/rentals', serveStatic(path.join(__dirname, '/dist')))
app.use('/user/rents', serveStatic(path.join(__dirname, '/dist')))
app.use('/user/cars', serveStatic(path.join(__dirname, '/dist')))

const port = process.env.PORT || 8080
app.listen(port)

