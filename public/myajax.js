

 function myAjax(options){
    let defalutobj = {
        type:"get",
        url:'',
        data:{},
        header:{
            "Content-Type": "application/x-www-form-urlencoder"
        },
        success: function () {},
        error: function () {}
        
    }
    Object.assign(defalutobj,options)

    const xhr = new XMLHttpRequest();
    
    let {type,url,data,success,error} = defalutobj
    let params = ''
    
    for(let key in data){
       params = params+key+"="+data[key]+"&"
    }
    params = params.substr(0,params.length-1) //去掉最后一个&
    if(type == 'get') {
        if(params.length>1){
           url = url+"?"+params
        }
       
    }
   xhr.open(type,url);
   if(type == 'post'){
       
       xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
     
           // 向服务器端传递普通类型的请求参数
         //console.log(params);
           xhr.send(params);
       
       
   }
   else xhr.send();
   xhr.onreadystatechange = function(){
       if(xhr.status>=200&&xhr.status<300&&xhr.readyState==4){

           success(xhr.responseText)
       }
       if(xhr.status>400) error(xhr.responseText)
   }

   
}
