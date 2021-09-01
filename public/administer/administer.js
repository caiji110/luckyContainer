
const updateBtn = document.querySelector(".update");
const ipt = document.querySelectorAll('.ipt');
const mustGetIpt = document.querySelectorAll(".must_get")
const MustBtn = document.querySelector(".SetMustBtn")
const newObj = {} //存放更新的奖池项目
const mustGetItem ={} //存放必中的项目下标和次数
console.log(ipt);
updateBtn.addEventListener('click',async()=>{
    renderData('.update_data','/updateData',newObj,'post');
})
MustBtn.addEventListener("click",()=>{
    myAjax({
        type:'post',
        data:mustGetItem,
        url:'http://localhost:3000/setMustItem',
        success:res=>{
            console.log(res);
        }
    },)
})
for(let i = 0;i<ipt.length;i++){
    ipt[i].addEventListener('blur',(e)=>{
        newObj[e.target.name] = e.target.value
    })
}
for(let i = 0;i<mustGetIpt.length;i++){
    mustGetIpt[i].addEventListener("blur",(e)=>{
        mustGetItem[e.target.name] = e.target.value
    })
}