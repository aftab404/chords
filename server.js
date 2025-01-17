const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000

function serveFile(file, contentType, res){
    console.log(file)
    const filePath = path.join(__dirname, file)
    fs.readFile(filePath, (err, data) => {
        if(err){
            res.writeHead(500, {'Content-Type' : 'text/plain'})
            res.end('Internal Server Error')
        }else {
            res.writeHead(200, {'Content-Type' : contentType})
            res.end(data)
        }
    })
}

const server = http.createServer((req, res) => {
    console.log(req.url)
    if(req.url.includes('app')){
        if(req.url.endsWith('.css')){
            serveFile(req.url, 'text/css', res)
        }else if(req.url.includes('.js')){

            const newUrl = url.parse(req.url, true).pathname
            serveFile(newUrl,'text/javascript', res)
        }else {
            serveFile(req.url , 'text/html', res)
        }
    }else {
        if(req.url === '/' ) {
            serveFile('index.html', 'text/html', res)
        }else if(req.url === '/style.css') {
            serveFile('style.css', 'text/css', res)
        }else if(req.url === '/script.js') {
            serveFile('script.js', 'text/javascript', res)
        }else {
            serveFile('index.html', 'text/html', res)
        }
    }
})


server.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})
