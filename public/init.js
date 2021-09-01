// const userInfo = {};
const initMoney = localStorage.getItem('money')
 if(initMoney==null){
     console.log(111);
    localStorage.setItem('money',100)
 }
 else{
    const nums = document.querySelector(".nums");
    nums.innerHTML=initMoney
 }
 //定义一个抽奖盒子的类
 class LuckyBox{
    constructor(){
        this.contanier = document.getElementById("lucky_contanier");
        this.arr = this.contanier.querySelectorAll('.lucky_item-selected,.lucky_item');
        this.timer = null;
        this.nums = 0;
        //设定最终停在哪里
        this.targetIndex=''
        this.delay =200;
        this.flag = false;
        this.isfanlly = false;
        //为了更新修改后的奖池数据
        this.textArr = []
        //对格子进行重新排序，没有排序的盒子显示不符预期。
        this.items = Array.from(this.arr).sort((a,b)=>a.attributes["data-index"].value-b.attributes["data-index"].value)
       
        //console.log(this.arr[0]);
    }
    init(){
        this.stop()
        this.nums =0;
        this.delay=200;
        this.flag=false;
        this.isfanlly==false;
       
    }
    firstSelect(){
        this.items[0].className = 'lucky_item-selected'
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
    //实现变速
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
    getUpdateData(){
        let newText = []
        myAjax({
            url:'http://localhost:3000/getData',
            success:res =>{
                JSON.parse(res).forEach(item=>{
                    newText.push(item.value)
                })
                this.items.forEach((element,index)=>{
                    let text = element.querySelector("span");
                    text.innerHTML=newText[index]
                    console.log(text.innerHTML);
                })
            }
        })
       
    }
    setTargetIndex(index){
        this.targetIndex=index
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
            case 5:
                console.log('加速1');
                this.updateTimer(10);
                break;
            case 100:
                console.log('加速2');
                this.updateTimer(30)
            case 150:
                console.log('减速3');
                this.updateTimer(50)
                break;
            case 165:
                console.log('减速4');
                this.updateTimer(100);
               
                break;
            case 175:
                console.log('减速5');
                this.updateTimer(300);
                
                break;
                case 183:
                    console.log('减速6');
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
            startBtn.dispatchEvent(event);
            this.init()
        }
       
    }
}
//实现中奖播报
const luckySwiper = document.querySelector('.lucky_swiper');
let offset = 17;
function swiper(){
    let timer = setInterval(()=>{
        offset=offset+1
        if(offset>=316) offset=17
        luckySwiper.style.transform=`translateY(-${offset}px)`
    },30)
}
swiper()
//实现一个方法：往页面插入新的元素(li),传入标签的内容
function createElement(content='文本节点为空！！',parentNode){
    let newLi = document.createElement('li');
    let newContent =document.createTextNode(content)
    newLi.appendChild(newContent)
    let childList = parentNode.querySelectorAll('li');
    //console.log(childList[0]);
    parentNode.insertBefore(newLi,childList[2])
}