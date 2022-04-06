import { getCurrentInstance } from 'vue'
import { validatenull } from '../../utils/index.js'

export default function () {
  const { proxy } = getCurrentInstance()
  const { deepClone } = proxy
  return {
    // 表单设计器配置项 转化为 Avue配置项
    transformToAvueOptions: (obj, isPreview = false) => {
      return new Promise((resolve, reject) => {
        try {
          const data = deepClone(obj)
          for (let key in data) {
            if (validatenull(data[key])) delete data[key]
          }
          for (let i = 0; i < data.column.length; i++) {
            const col = data.column[i]

            if (isPreview) { // 预览调整事件中的this指向
              let event = ['change', 'blur', 'click', 'focus']
              event.forEach(e => {
                if (col[e]) col[e] = eval((col[e] + '').replace(/this/g, 'proxy'))
              })
              if (col.event) Object.keys(col.event).forEach(key => col.event[key] = eval((col.event[key] + '').replace(/this/g, 'proxy')))
            }

            if (col.type == 'dynamic' && col.children && col.children.column && col.children.column.length > 0) {
              const c = col.children.column;
              c.forEach(item => {
                delete item.subfield
              })
              proxy.transformToAvueOptions(col.children, isPreview).then(res => {
                col.children = res
              })
            } else if (col.type == 'group') {
              if (!data.group) data.group = []

              const group = {
                label: col.label,
                icon: col.icon,
                prop: col.prop,
                arrow: col.arrow,
                collapse: col.collapse,
                display: col.display
              }
              proxy.transformToAvueOptions(col.children, isPreview).then(res => {
                group.column = res.column
                data.group.push(group)
              })
              data.column.splice(i, 1)
              i--
            } else if (['checkbox', 'radio', 'tree', 'cascader', 'select'].includes(col.type)) {
              if (col.dicOption == 'static') {
                delete col.dicUrl
                delete col.dicMethod
                delete col.dicQuery
                delete col.dicQueryConfig
                const { label, value, desc } = col.props
                col.dicData.forEach(d => {
                  if (d.label) {
                    const val = d.label
                    delete d.label
                    d[label] = val
                  }
                  if (d.value) {
                    const val = d.value
                    delete d.value
                    d[value] = val
                  }
                  if (d.desc) {
                    const val = d.desc
                    delete d.desc
                    d[desc] = val
                  }
                })
              } else if (col.dicOption == 'remote') {
                delete col.dicData
                if (col.dicQueryConfig && col.dicQueryConfig.length > 0) {
                  const query = {}
                  col.dicQueryConfig.forEach(q => {
                    if (q.key && q.value) query[q.key] = q.value
                  })
                  col.dicQuery = query
                  delete col.dicQueryConfig
                } else delete col.dicQueryConfig
              }
              delete col.dicOption
            } else if (['upload'].includes(col.type)) {
              if (col.headersConfig && col.headersConfig.length > 0) {
                const headers = {}
                col.headersConfig.forEach(h => {
                  if (h.key && h.value) headers[h.key] = h.value
                })
                col.headers = headers
              } else delete col.headers
              delete col.headersConfig

              if (col.dataConfig && col.dataConfig.length > 0) {
                const data = {}
                col.dataConfig.forEach(h => {
                  if (h.key && h.value) data[h.key] = h.value
                })
                col.data = data
              } else delete col.data
              delete col.dataConfig
            }
            for (let key in col) {
              if (validatenull(col[key])) delete col[key]
            }
          }
          resolve(data)
        } catch (e) {
          reject(e)
        }
      })
    },
    // Avue配置项 转化为 表单设计器配置项
    transAvueOptionsToFormDesigner: (obj) => {
      if (typeof obj == 'string') obj = eval('(' + obj + ')')
      const data = deepClone(obj)
      return new Promise((resolve, reject) => {
        try {
          if (data.column && data.column.length > 0) {
            data.column.forEach(col => {
              if (col.type == 'dynamic' && col.children && col.children.column && col.children.column.length > 0) {
                const c = col.children.column;
                c.forEach(item => {
                  item.subfield = true
                })
                transAvueOptionsToFormDesigner(col.children).then(res => {
                  col.children = res
                })
              } else if (['checkbox', 'radio', 'tree', 'cascader', 'select'].includes(col.type)) {
                if (!col.dicData && col.dicQuery && typeof col.dicQuery == 'object') {
                  const arr = []
                  for (let key in col.dicQuery) {
                    arr.push({
                      key,
                      value: col.dicQuery[key],
                      $cellEdit: true
                    })
                  }
                  col.dicQueryConfig = arr
                }
                if (col.dicUrl) col.dicOption = 'remote'
                else col.dicOption = 'static'
                if (!col.dicData) col.dicData = []
                else if (col.props) {
                  col.dicData.forEach(d => {
                    const { label, value, desc } = col.props
                    if (label) {
                      const val = d[label]
                      delete d[label]
                      d.label = val
                    }
                    if (value) {
                      const val = d[value]
                      delete d[value]
                      d.value = val
                    }
                    if (desc) {
                      const val = d[desc]
                      delete d[desc]
                      d.desc = val
                    }
                  })
                }

              } else if (['upload'].includes(col.type)) {
                if (col.headers && typeof col.headers == 'object') {
                  const arr = []
                  for (let key in col.headers) {
                    arr.push({
                      key,
                      value: col.headers[key],
                      $cellEdit: true
                    })
                  }
                  col.headersConfig = arr
                } else col.headersConfig = []

                if (col.data && typeof col.data == 'object') {
                  const arr = []
                  for (let key in col.data) {
                    arr.push({
                      key,
                      value: col.data[key],
                      $cellEdit: true
                    })
                  }
                  col.dataConfig = arr
                } else col.dataConfig = []
              }
            })
          }
          if (data.group && data.group.length > 0) {
            for (let i = 0; i < data.group.length; i++) {
              if (!data.column) data.column = []
              const col = data.group[i]

              const group = {
                type: 'group',
                label: col.label,
                icon: col.icon,
                prop: col.prop,
                arrow: col.arrow,
                collapse: col.collapse,
                display: col.display
              }
              transAvueOptionsToFormDesigner(col).then(res => {
                group.children = res
                data.column.push(group)
              })
            }
            delete data.group
          }
          resolve(data)
        } catch (e) {
          reject(e)
        }
      })
    }
  }
}