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
    if(req.url.includes('app') || req.url.includes('components')){
        if(req.url.endsWith('.css')){
            console.log(1, req.url)
            serveFile(req.url, 'text/css', res)
        }else if(req.url.includes('.js')){
            console.log(2, req.url)

            const newUrl = url.parse(req.url, true).pathname
            serveFile(newUrl,'application/javascript', res)
        }else {
            console.log(3, req.url)
            serveFile(req.url , 'text/html', res)
        }
    }
    else {

        if(req.url === '/' ) {
            console.log(4, req.url)
            serveFile('index.html', 'text/html', res)
        }else if(req.url === '/style.css') {
            console.log(5, req.url)
            serveFile('style.css', 'text/css', res)
        }else if(req.url.includes('/script.js')) {
            console.log(6, req.url)
            serveFile('script.js', 'application/javascript', res)
        }else {
            console.log(7, req.url)
            serveFile('index.html', 'text/html', res)
        }
    }
})


server.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})
