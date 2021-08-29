// const userInfo = {};
const initMoney = localStorage.getItem('money')
console.log(initMoney);
 if(initMoney==null){
     console.log(111);
    localStorage.setItem('money',100)
 }
 else{
     console.log(222);
    const nums = document.querySelector(".nums");
    nums.innerHTML=initMoney
 }

//  window.onbeforeunload = function(e) {
//     console.log('beforeunload')
//     return 1;
// };
// console.log();
// myAjax({
//     url:"http://localhost:3000/login",
//     success:res=>console.log(res)
// })