const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require("path");
const {getPrize} = require("./tools/getPrize");
// const fs = require('fs')
let numsMust = -1;
let currentNums=0;
let indexMust = -1;
let testData = [{
    value:'矿石',
    count:100,index:0,
    chance:0.1
},{
    value:'BUG',count:100,index:1,
    chance:0.1
},{
    value:'掘金马克杯',count:100,index:2,
    chance:0.1
},{
    value:'Yoyo抱枕',count:100,index:3,
    chance:0.1
},{
    value:'SwitCH',count:100,index:4,
    chance:0.1
},{
    value:'乐高海洋拼图',count:100,index:5,
    chance:0.2
},{
    value:'掘金衬衫',count:100,index:6,
    chance:0.2
},{
    value:'随机限量徽章',count:100,index:7,
    chance:0.1
},]
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/login',(req,res)=>{
    // fs.appendFile('message.txt', 'data to append', 'utf8', (err)=>{
    //     if(err) throw err;
    //     console.log('success');
    // });
    // console.log(111);
    res.send('初次登录')
})
app.get('/index',(req,res)=>{
    console.log(111);
    if(numsMust!=-1)  currentNums=currentNums+1
    if(currentNums>=numsMust&&numsMust!=-1){
        console.log(11);
        currentNums=0
        res.send(testData[indexMust])
    }
    else{
        let luckyObj = getPrize(testData)
        console.log(luckyObj);
        res.send(luckyObj)
    }  
   
})
app.get('/getData',(req,res)=>{
    res.send(testData)
})
app.post('/updateData',(req,res)=>{
    const {index,value,chance} = req.body;
    let chances = 0
    if(index>=0&&index<=7&&chance<1){
        testData[index].chance=chance.trim()?chance:testData[index].chance;
        testData[index].value = value.trim()?value:testData[index].value;
        testData.forEach(item=>{
           item.chance = item.chance-0
            chances=chances+item.chance
        })
        res.send({
            testData,totalChance:chances
        })
    }
    else{
        res.send('error')
    }
    
})
app.post('/setMustItem',(req,res)=>{
    const {index,nums} = req.body;
    console.log(index,nums);
    if(index>=0&&index<=7&&nums.trim()){
        indexMust=index;
        numsMust=nums;

        res.send('success')
    }
    else{
        res.send('error')
    }
    
})
app.listen(3000);
console.log('服务器开启');