# example

```
get('a.b.c',{a:{b:{c:1}}}) output: 1

get('a.b.c',{a:{b:{}}}) output: undefined

get('a.b.toString',{a:{b:{}}}) output: undefined

get('a.b.c',{a:{b:{c:0}}}) output: 0

get('a.__proto__',{a:{}}) output: undefined

get('a.b',{a:{b:null}}) output: null

get('a.b.c',{a:{b:[1,2,3]}}) output: [1,2,3]

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

# 代码中暴露出的问题

```
  1、代码编写简洁度 明确返回Boolean值得地方不应该出现类似!==true的逻辑 
  2、错误的默认参数会导致报错信息被掩盖
  3、在明确是String类型不需要使用字符串模板位置使用字符串模板
  4、for循环 判断中 return 和 break 使用混淆
```