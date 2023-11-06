const https=require('http');

const routes=require('./routes.js')

//console.log(routes.someText);


const server=https.createServer(routes)

server.listen(4000);