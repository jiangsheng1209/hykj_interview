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
    if(typeof key !== 'string' || key.length <= 0 || !isObject(obj)){return undefined}

    // 字符串转数组
    const keyArr = key.split('.');

    // 循环获取object深层对象
    // 需要注意原型链中的属性
    for(let i = 0; i < keyArr.length; i++){
      if (!isObject(obj)) break
      let currentKey = keyArr[i];
      if(inOwnProperty(obj,currentKey)){
        obj = obj[currentKey]
      }else{
        return undefined
      }
    }
    return obj

 }

// utils
const _toString = Object.prototype.toString

function isObject(obj){
    return _toString.call(obj) === '[object Object]'
}

function inOwnProperty(obj,key){
    return obj.hasOwnProperty(key)
}

```