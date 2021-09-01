
const startBtn = document.querySelector(".start");
const luckyObj = {}
const tipsBox = document.querySelector(".tips_container");
const messageBox = document.querySelector(".tips_container-message");
const correctBtn = document.querySelector('.tips_container-correct')
const luckySwiperContanier = document.querySelector
const luckybox = new LuckyBox()
luckybox.getUpdateData()
startBtn.addEventListener('click',()=>{
    const chanceTimes = document.querySelector(".nums")
    if(parseInt(chanceTimes.innerHTML)<20) {
        alert('你的钻石不够~请攒够钻石再来~')
        return
    }
    else{
        if(!luckyObj.index){
            luckybox.firstSelect()
        }
        myAjax({
            url:"http://localhost:3000/index",
            success:res=>{
             chanceTimes.innerHTML=chanceTimes.innerHTML-20
             localStorage.setItem('money',parseInt( chanceTimes.innerHTML))
             Object.assign(luckyObj,JSON.parse(res))
             luckybox.setTargetIndex(luckyObj.index)
             luckybox.start();
            }
        })
    }
   
   
})
startBtn.addEventListener("success",(e)=>{
    startBtn.innerHTML='再来一次'
    tipsBox.className= 'tips_container isshow'
    messageBox.innerHTML=`恭喜你抽中${e.detail.value.innerHTML}!`
})
correctBtn.addEventListener('click',()=>{
    
    tipsBox.className='tips_container';
    let newLiText = `恭喜你抽中了${luckyObj.value}!!!`
             createElement(newLiText,luckySwiper)
})

