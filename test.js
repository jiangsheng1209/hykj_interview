/**
 * @param {String} key 
 * @param {Object} obj 
 * @return {any} 
 */

function get(key, obj){
    
    // 判断key和obj类型
    if(typeof key !== 'string' || !key || !isObject(obj)){return undefined}

    // 字符串转数组
    const keyArr = key.split('.')

    // 循环获取object深层对象
    // 需要注意原型链中的属性
    for(let i = 0, currentKey; currentKey = keyArr[i++];){

      if(inOwnProperty(obj,currentKey)){
        obj = obj[currentKey]
      }else{
        return undefined
      }

      if (!isObject(obj)) return obj

    }
 }

// utils
const _toString = Object.prototype.toString

function isObject(obj){
    return _toString.call(obj) === '[object Object]'
}

function inOwnProperty(obj,key){
    return obj.hasOwnProperty(key)
}


console.log("get('a.b.c',{a:{b:{c:1}}})")
console.log('output',get('a.b.c',{a:{b:{c:1}}}))

console.log("get('a.b.c',{a:{b:{}}})")
console.log('output',get('a.b.c',{a:{b:{}}}))

console.log("get('a.b.toString',{a:{b:{}}})")
console.log('output',get('a.b.toString',{a:{b:{}}}))

console.log("get('a.b.c',{a:{b:{c:0}}})")
console.log('output',get('a.b.c',{a:{b:{c:0}}}))

console.log("get('a.__proto__',{a:{}})")
console.log('output',get('a.__proto__',{a:{}}))

console.log("get('a.b.c',{a:{b:[1,2,3]}})")
console.log('output',get('a.b.c',{a:{b:[1,2,3]}}))

console.log("get('a.b.c',{})")
console.log('output',get('a.b.c',{}))

console.log("get('',{})")
console.log('output',get('',{}))

