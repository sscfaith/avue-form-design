export function getAsVal(obj, bind = '') {
  let result = deepClone(obj)
  if (validatenull(bind)) return result
  bind.split('.').forEach(ele => {
    if (!validatenull(result[ele])) {
      result = result[ele]
    } else {
      result = ''
    }
  });
  return result
}

export function validatenull(val) {
  if (val instanceof Date || typeof val === 'boolean' || typeof val === 'number' || val instanceof Array) return false;
  else if (val instanceof Function) {
    const fun = val.toString().replace(/\s+/g,'')
    const arr = ['({value})=>{}', '(res,cb)=>{}', '(res)=>{}', '()=>{}']
    if (arr.includes(fun)) return true
    else return false
  } else if (val instanceof Object) {
    for (var o in val) {
      return false;
    }
    return true;
  } else {
    if (
      val === 'null' ||
      val == null ||
      val === 'undefined' ||
      val === undefined ||
      val === ''
    ) {
      return true;
    }
    return false;
  }
}

export const deepClone = data => {
  var type = getObjType(data);
  var obj;
  if (type === 'array') obj = [];
  else if (type === 'object') obj = {};
  else return data;
  if (type === 'array') {
    for (var i = 0, len = data.length; i < len; i++) {
      data[i] = (() => {
        if (data[i] === 0) {
          return data[i];
        }
        return data[i];
      })();
      if (data[i]) {
        delete data[i].$parent;
      }
      obj.push(deepClone(data[i]));
    }
  } else if (type === 'object') {
    for (var key in data) {
      if (data) {
        delete data.$parent;
      }
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
};

export const getObjType = obj => {
  var toString = Object.prototype.toString;
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  if (obj instanceof Element) {
    return 'element';
  }
  return map[toString.call(obj)];
};

/**
 * 是否小于等于某个Avue版本
 * Avue:2.8.27 v2:2.8.27 -> true
 * Avue:2.9.1 v2:2.9.0 -> false
 */
export const avueVersion = (v2) => {
  if (!window.AVUE) return
  let v1 = window.AVUE.version.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)

  // 调整两个版本号位数相同
  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  // 循环判断每位数的大小
  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i])
    const num2 = parseInt(v2[i])

    if (num1 > num2) {
      return false
    } else if (num1 < num2) {
      return true
    }
  }

  return true
}