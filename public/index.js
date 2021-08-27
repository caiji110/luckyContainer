const startBtn = document.querySelector(".start");
const luckyObj = {}
const tipsBox = document.querySelector(".tips_container");
const messageBox = document.querySelector(".tips_container-message");
const correctBtn = document.querySelector('.tips_container-correct')
class LuckyBox{
    constructor(targetIndex=3){
        this.contanier = document.getElementById("lucky_contanier");
        this.arr = this.contanier.querySelectorAll('.lucky_item-selected,.lucky_item');
        this.timer = null;
        this.nums = 0;
        this.delay =200;
        this.flag = false;
        this.targetIndex = targetIndex;
        this.isfanlly = false;
        //对格子进行重新排序，没有排序的盒子显示不符预期。
        this.items = Array.from(this.arr).sort((a,b)=>a.attributes["data-index"].value-b.attributes["data-index"].value)
   
    }
    start(){
        this.timer = setInterval(()=>{
            this.nums++
            this.nextItem();
        },this.delay)
    }
    stop(){
        clearInterval(this.timer)
    }
    updateTimer(delay){
        this.stop();
        this.delay =delay; 
        this.start()
    }
    getSelectedItem(){
        const SelectedItem = this.contanier.querySelector(".lucky_item-selected");
        return SelectedItem
    }
    getSelectedIndex(){
        const selectItem = this.getSelectedItem();
        const index = Array.from(this.items).indexOf(selectItem)
        return index
    }
    nextItem(){
        let index = this.getSelectedIndex();
        if(this.flag==true&&this.isfanlly==false&&this.targetIndex-index<3&&this.targetIndex-index>0){
            this.isfanlly = true
            console.log('减速5');
            this.updateTimer(1000)
        }
        const nums = this.nums;
        switch (nums) {
            case 20:
                console.log('减速1');
                this.updateTimer(250);
                break;
            case 24:
                console.log('减速2');
                this.updateTimer(300)
            case 26:
                console.log('减速3');
                this.updateTimer(400)
                break;
            case 28:
                console.log('减速4');
                this.updateTimer(500);
                this.flag = true
                break;
            default:
                break;
        }
        if(index!=-1){
            this.items[index].className = 'lucky_item';
            index = index+1>this.items.length-1?0:index+1
            this.items[index].className = 'lucky_item-selected'
        }
        if(index==this.targetIndex&&this.flag==true){
            //到达目标位置
            console.log(this.items[index]);
            const event = new CustomEvent("success",{bubbles:true,detail:{value:this.items[index]}});
            startBtn.dispatchEvent(event)
            this.stop()
        }
       
    }
}

startBtn.addEventListener('click',()=>{
    startBtn.innerHTML='抽奖中'
    const xhr = new XMLHttpRequest();
    xhr.open('GET','http://localhost:3000/index');
    xhr.send();
    xhr.onreadystatechange = function(){
        if(xhr.status>=200&&xhr.status<300&&xhr.readyState==4){
            Object.assign(luckyObj,JSON.parse(xhr.responseText))
            console.log(luckyObj);
            const luckybox = new LuckyBox(luckyObj.index);
            luckybox.start()

        }
        if(xhr.status>400) error(xhr.responseText)
    }
   
})
startBtn.addEventListener("success",(e)=>{
    startBtn.innerHTML='再来一次'
    tipsBox.className= 'tips_container isshow'
    messageBox.innerHTML=`恭喜你抽中${e.detail.value.innerHTML}!`
})
correctBtn.addEventListener('click',()=>{
    tipsBox.className='tips_container'
})
