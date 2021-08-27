const express = require('express');
const app = express();
const path = require("path");
const {getPrize} = require("./tools/getPrize");
let testData = [{
    value:'华为手机1',
    chance:0.1
},{
    value:'华为手机2',
    chance:0.1
},{
    value:'华为手机3',
    chance:0.1
},{
    value:'华为手机5',
    chance:0.1
},{
    value:'华为手机8',
    chance:0.1
},{
    value:'华为手机7',
    chance:0.2
},{
    value:'华为手机6',
    chance:0.2
},{
    value:'华为手机4',
    chance:0.1
},]
app.use(express.static(path.join(__dirname,'public')));
app.get('/index',(req,res)=>{
    let luckyObj = getPrize(testData)  
    res.send(luckyObj)
})
app.listen(3000);
console.log('服务器开启');