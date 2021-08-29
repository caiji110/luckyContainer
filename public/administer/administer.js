
const updateBtn = document.querySelector(".update");
const ipt = document.querySelectorAll('.ipt');

const newObj = {}
console.log(ipt);
updateBtn.addEventListener('click',async()=>{
    //console.log(newObj);
    renderData('.update_data','/updateData',newObj,'post');

    
}) 
for(let i = 0;i<ipt.length;i++){
    ipt[i].addEventListener('blur',(e)=>{
        newObj[e.target.name] = e.target.value
    })
}
