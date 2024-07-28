// @ts-nocheck

export const analyse = function(variate) {
    // console.log(variate);
    //对象，键是对应id，值是要分析的数据
    let visual_obj = {};
    let visual_type = 0;
    //最后返回的结果
    let final_result = [[],  {}];
    //记录画布的值
    let layouterName = '';
    for (let i in variate) {
        //找出需要可视化的数据
        if (variate[i]['visualization']) {
            if (variate[i].visualization.methods.length !== 0) {
                visual_type = variate[i].visualization.methods[0].id;
                if(visual_obj['' + visual_type]){
                    visual_obj['' + visual_type].push(variate[i]['variate']);
                }else{
                    visual_obj['' + visual_type]=[variate[i]['variate']];
                }
            }
        }
    }
    // console.log(JSON.stringify(final_result));
    return final_result;
}