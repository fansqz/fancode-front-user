// @ts-nocheck

/*
 * @Author: your name
 * @Date: 2021-09-13 21:32:57
 * @LastEditTime: 2021-09-17 00:29:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \meishi1c:\Users\86150\Desktop\最近的前端文件\aqv-coding-s2\froend_student\src\pages\student\assets\js\dataStructAnalyse\tools.js
 */
const raiseObject = function(Array, key, valueArray) {
    let result = []
    for (let i = 0; i < valueArray.length; i++) {
        let value = valueArray[i]
        for (let i in Array) {
            if (Array[i][key] === value) {
                result.push(Array[i])
                delete Array[i]
            }
        }
    }
    for (let i in Array) {
        if (Array[i] != undefined) {
            result.push(Array[i])
        }
    }
    return result
}

function isFreed(value) {
    return /\(freed\)/.test(value)
};

// 获取data值
function getData(value) {
    return value[value.length - 2]
}

//判断当前id值在之前的链条上是否存在：有回型的情况
function isPreId(nowId, preIdSum) {
    let re = new RegExp("" + nowId);
    return re.test(preIdSum);
}

/**
 * 去掉value中的freed字量
 */
function freedName(str) {
    //value里值的左引号索引
    let firstIndex = str.indexOf("(");
    if (firstIndex == -1) return str;
    //截取从first+1到second(不包括)的字符串
    let sliced = str.slice(0, firstIndex);
    //返回所需的data值
    return sliced;
}

/**
 * 深拷贝
 */
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 *  十六进制的加法
 * str：16进制数 
 * num：十进制数
 */
function hexPlus(str, num) {
    let dStr = parseInt(str, 16); //把十六进制字符串转换为十进制
    let result = dStr + num;

    return "0x" + result.toString(16);
}

/**
 * 从类似"76 'A'"的字符串中获取value值
 */
function valueToData(str) {
    // 如果是数字就不需要截取了
    if (Number.isFinite(+str)) return str;
    //value里值的左引号索引
    let firstIndex = str.indexOf("'");
    //value里值的右引号索引
    let secondIndex = str.indexOf("'", firstIndex + 1);
    //截取从first+1到second(不包括)的字符串
    let sliced = str.slice(firstIndex + 1, secondIndex);
    //返回所需的data值
    return sliced;
}

export { raiseObject, isFreed, getData, isPreId, freedName, deepClone, valueToData, hexPlus }