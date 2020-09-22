<template>
  <div class="widget-config">
    <el-form label-suffix="："
             v-if="this.data && Object.keys(this.data).length > 0"
             size="small">
      <el-collapse v-model="collapse">
        <el-collapse-item name="1"
                          title="基本属性">
          <el-form-item label="类型"
                        v-if="data.type && !data.component">
            <el-select v-model="data.type"
                       placeholder="请选择类型"
                       @change="handleChangeType">
              <el-option-group v-for="group in fields"
                               :key="group.title"
                               :label="group.title">
                <el-option v-for="item in group.list"
                           :key="item.type"
                           :label="item.label"
                           :value="item.type">
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item label="属性值">
            <el-input v-model="data.prop"
                      clearable
                      placeholder="属性值"></el-input>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="data.label"
                      clearable
                      placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item label="宽度"
                        v-if="data.subfield">
            <el-input-number v-model="data.width"
                             controls-position="right"
                             placeholder="宽度"
                             :min="100"></el-input-number>
          </el-form-item>
          <el-form-item label="表单栅格"
                        v-if="!data.subfield && !['group'].includes(data.type)">
            <el-input-number v-model="data.span"
                             controls-position="right"
                             placeholder="表单栅格"
                             :min="8"
                             :max="24"></el-input-number>
          </el-form-item>
          <el-form-item label="数据类型"
                        v-if="['cascader','checkbox','upload','img','array'].includes(data.type)">
            <el-select v-model="data.dataType"
                       placeholder="数据类型"
                       clearable>
              <el-option label="String"
                         value="string"></el-option>
              <el-option label="Number"
                         value="number"></el-option>
            </el-select>
            &nbsp;<a href="https://avuejs.com/doc/dataType"
               target="_blank"
               style="color: #409EFF;">详情</a><br>
          </el-form-item>
          <el-form-item label="深结构"
                        v-if="data.type && !data.component">
            <a href="https://avuejs.com/doc/form/form-bind"
               target="_blank"
               style="color: #409EFF;">详情</a><br>
            <el-input v-model="data.bind"
                      placeholder="深结构"></el-input>
          </el-form-item>
          <component :is="getComponent"
                     :data="data"></component>
        </el-collapse-item>
        <el-collapse-item name="2"
                          title="事件属性"
                          v-if="!['group', 'dynamic'].includes(data.type)">
          <el-form-item label="change">
            <avue-input v-model="data.change"
                        type="textarea"
                        placeholder="改变事件"
                        rows="5"
                        clearable></avue-input>
          </el-form-item>
          <el-form-item label="click">
            <el-input v-model="data.click"
                      type="textarea"
                      placeholder="点击事件"
                      rows="5"></el-input>
          </el-form-item>
          <el-form-item label="focus">
            <el-input v-model="data.focus"
                      type="textarea"
                      placeholder="获取焦点事件"
                      rows="5"></el-input>
          </el-form-item>
          <el-form-item label="blur">
            <el-input v-model="data.blur"
                      type="textarea"
                      placeholder="失去焦点事件"
                      rows="5"></el-input>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
    </el-form>
    <avue-empty v-else
                desc="拖拽字段进行配置"
                style="margin-top: 100%;"></avue-empty>
  </div>
</template>

<script>
import fields from './fieldsConfig.js'

const dateArr = [
  'year', 'month', 'week', 'date', 'datetime', 'time', 'daterange', 'timerange', 'datetimerange', 'dates'
]

export default {
  name: 'widget-config',
  props: ['data'],
  computed: {
    getComponent() {
      const prefix = 'config-'
      const { type, component } = this.data
      if (!type || component) return prefix + 'custom'
      let result = 'input'

      if ([undefined, 'input', 'password', 'url'].includes(type)) result = 'input'
      else if (dateArr.includes(type)) result = 'date'
      else if (['array', 'img'].includes(type)) result = 'array'
      else result = type

      return prefix + result
    }
  },
  data() {
    return {
      fields,
      collapse: "1"
    }
  },
  methods: {
    async handleChangeType(type) {
      if (type) {
        const config = await this.getConfigByType(type);
        config.prop = this.data.prop;
        for (let key in config) {
          if (config && Object.prototype.hasOwnProperty.call(config, key) && !['icon', 'label', 'span'].includes(key)) {
            const val = config[key]
            this.$set(this.data, key, val);
          }
        }
      }
    },
    getConfigByType(type) {
      return new Promise((resolve, reject) => {
        fields.forEach(field => {
          field.list.forEach(config => {
            if (config.type == type) resolve(config)
          })
        })
        reject()
      })
    }
  }
}
</script>
