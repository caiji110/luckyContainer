/**
 * classname:要存放渲染出来数据的类名。
 * url：拿到渲染数据
 * dataObj:post请求时传递的数据
 */
function renderData(classname='.current_data',url='/getData',dataObj={},type='get'){
    const currentData = document.querySelector(classname)
    let newData = []
myAjax({
    url:`http://localhost:3000${url}`,
    data:dataObj,
    type:type,
    success:res=>{
      //  console.log('dawdwdwa');
      if(type=='post'){
        const administerTips = document.querySelector('.administer_tips')
        console.log(res);
        let newObj=JSON.parse(res)
        newData = newObj.testData
        administerTips.innerHTML = `目前概率之和为${newObj.totalChance},如果超过1会使表现不及预期`
      }
      else{
        console.log(res);
        newData=JSON.parse(res)
        console.log(newData);
      }
     
        currentData.innerHTML=render(newData)
      //  console.log(JSON.parse(res));
    }
})

function render(array){
 let result = ''
 for(let i=0;i<array.length;i++){
     result=result+`<li>礼品名：${array[i].value},  得奖概率：${array[i].chance},  下标：${i},剩余数量：${array[i].count}  </li>`
 }
 return `<ul class='box'>`+result+`</ul>`
}
}
renderData()