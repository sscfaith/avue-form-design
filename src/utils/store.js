const keyName = 'form-designer-';

export const setStore = (key, content, type = false) => {
  key = keyName + key
  if (type) window.sessionStorage.setItem(key, JSON.stringify({ content }))
  else window.localStorage.setItem(key, JSON.stringify({ content }))
}

export const getStore = (key, type = false) => {
  key = keyName + key
  let obj = undefined
  if (type) obj = window.sessionStorage.getItem(key)
  else obj = window.localStorage.getItem(key)

  if (obj) {
    try {
      obj = JSON.parse(obj)
    } catch {
      return obj
    }
  } else {
    if (type) obj = window.localStorage.getItem(key)
    else obj = window.sessionStorage.getItem(key)

    if (obj) {
      try {
        obj = JSON.parse(obj)
      } catch {
        return obj
      }
    } else obj = {}
  }
  return obj.content;
}

export const removeStore = (key, type = false) => {
  key = keyName + key
  if (type) window.sessionStorage.removeItem(key)
  else window.localStorage.removeItem(key)
}
