/**
 * prizeList :[{}] 数组对象
 * prizeList[index].value:String 奖品名称
 *  prizeList[index].chance:中将概率
 */

const getPrize = (prizeList)=>{

    let chanceList = prizeList.map(item => item.chance*10);
    let sum = 0;
    let luckyIndex = ''
    //抽奖逻辑，取随机数的第一位小数为中奖号码。例如为7,即chancelist数组前n项和为大于等于7的项为中奖礼品。
    const nums = Math.random().toFixed(1)*10
    for(let i =0;i<chanceList.length;i++){
        sum=sum+chanceList[i]
        if(sum>=nums) {
            luckyIndex=i;
            break;
        }
    }
    //console.log(luckyIndex);
    return {
       value: prizeList[luckyIndex].value,
       index:luckyIndex
    }
}
module.exports={getPrize}