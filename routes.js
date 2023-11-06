const fs=require('fs');



function requestHandler(req,res){
    const url=req.url;
    const method=req.method;

    if(url==="/"){
        fs.readFile('message.txt','utf8'/*{encoding:'utf-8'}*/,(err,data)=>{
            if(data===undefined){
                data="";
            }
            res.write('<html>')
            res.write('<head><title>MY Page</title></head>')
            res.write(`<body>`)
            res.write(`${data}`)
            res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>')
            res.write('</body>')
            res.write('</html>')
            return res.end()

        })
        
    }
    if(url==="/message" && method==="POST"){
        const body=[];
        req.on('data',(chunks)=>{
            body.push(chunks)
        })
        return req.on('end',()=>{
            const parsebody=Buffer.concat(body).toString();
            const message=parsebody.split("=")[1];
            const mes=message.split("+");
            let str="";
            for(let i of mes){
                str=str+i+" ";
            }

            fs.writeFile('message.txt',str,(err)=>{
                res.statusCode=302;
                res.setHeader('Location','/');
                return res.end();
            })
        })
    }

}
//1st Method
module.exports=requestHandler;

/*
2nd Method
module.exports={
    handler:requestHandler,
    someText:'Some Hard Coded Text'
};

In 011.0Ex-NodeModuleSystem.js

make the following change

const server=https.createServer(routes.handler)

*/

/*
3rd Method
module.exports.handler=requestHandler
module.exports.someText='Some Hard Coded Text'

In 011.0Ex-NodeModuleSystem.js

make the following change

const server=https.createServer(routes.handler)


SHORTCUT
exports.handler=requestHandler
exports.someText='Some Hard Coded Text'
*/



    