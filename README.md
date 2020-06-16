# example

```
get('a.b.c',{a:{b:{c:1}}}) output: 1

get('a.b.c',{a:{b:{}}}) output: undefined

get('a.b.toString',{a:{b:{}}}) output: undefined

get('a.b.c',{a:{b:{c:0}}}) output: 0

get('a.__proto__',{a:{}}) output: undefined

get('a.b',{a:{b:null}}) output: null

```

# 解题

```javascript
 /**
 * @param {String} key 
 * @param {Object} obj 
 * @return {any} 
 */

 function get(key, obj){

    // 判断key和obj类型
    if(typeof key !== 'string' || isObject(obj) !== true){return undefined}

    // 字符串转数组
    const keyArr = key.split('.');

    // 循环获取object深层对象
    // 这里循环没有用for...in原则上不会查找原型链中的属性,但还需要过滤__proto__
    for(let i = 0; i < keyArr.length; i++){
      if (!isObject(obj)) return
      let currentKey = keyArr[i];
      obj = inOwnProperty(obj,currentKey) ? obj[currentKey] : undefined
    }
    return obj

 }

// utils
const _toString = Object.prototype.toString

function isObject(obj){
    return _toString.call(obj) === `[object Object]`
}

function inOwnProperty(obj={},key){
    return obj.hasOwnProperty(`${key}`)
}

```