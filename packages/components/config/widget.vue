<template>
  <div class="widget-config">
    <el-form
      label-suffix="："
      v-if="this.data && Object.keys(this.data).length > 0"
      labelPosition="left"
      labelWidth="90px"
    >
      <el-collapse v-model="collapse">
        <el-collapse-item name="1" title="基本属性">
          <el-form-item label="类型" v-if="data.type && !data.component">
            <el-select
              v-model="data.type"
              style="width:100%;"
              placeholder="请选择类型"
              @change="handleChangeType"
            >
              <el-option-group v-for="group in fields" :key="group.title" :label="group.title">
                <el-option
                  v-for="item in group.list"
                  :key="item.type"
                  :label="item.label"
                  :value="item.type"
                ></el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item label="属性值">
            <el-input v-model="data.prop" clearable placeholder="属性值"></el-input>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="data.label" clearable placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item label="标签宽度" v-if="!['group', 'dynamic', 'title'].includes(data.type)">
            <el-input-number
              v-model="data.labelWidth"
              :min="90"
              :step="10"
              controls-position="right"
              placeholder="标签宽度"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="标签位置" v-if="!data.subfield">
            <el-select v-model="data.labelPosition" placeholder="标签位置" clearable>
              <el-option label="上" value="top"></el-option>
              <el-option label="左" value="left"></el-option>
              <el-option label="右" value="right"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="宽度" v-if="data.subfield">
            <el-input-number
              style="width:100%;"
              v-model="data.width"
              controls-position="right"
              placeholder="宽度"
              :min="100"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="表单栅格" v-if="!data.subfield && !['group'].includes(data.type)">
            <el-input-number
              style="width:100%;"
              v-model="data.span"
              controls-position="right"
              placeholder="表单栅格"
              :min="8"
              :max="24"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            label="数据类型"
            v-if="['cascader', 'checkbox', 'radio', 'select', 'tree', 'upload', 'img', 'array', 'slider', 'timerange', 'daterange', 'datetimerange'].includes(data.type)"
          >
            <template slot="label">
              <el-link :underline="false" href="https://avuejs.com/doc/dataType" target="_blank">
                数据类型
                <i class="el-icon-question"></i>
              </el-link>
            </template>
            <el-select v-model="data.dataType" placeholder="数据类型" clearable>
              <el-option label="String" value="string"></el-option>
              <el-option label="Number" value="number"></el-option>
              <el-option label="Array" value="array"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="字段提示">
            <template slot="label">
              <el-link
                :underline="false"
                href="https://avuejs.com/doc/form/form-tip"
                target="_blank"
              >
                字段提示
                <i class="el-icon-question"></i>
              </el-link>
            </template>
            <el-input v-model="data.tip" clearable placeholder="字段提示"></el-input>
          </el-form-item>
          <el-form-item
            v-if="data.tip && !['upload'].includes(data.type)"
            label="字段提示位置"
            label-width="110px"
          >
            <el-select v-model="data.tipPlacement" placeholder="字段提示位置" clearable>
              <el-option label="上" value="top"></el-option>
              <el-option label="下" value="bottom"></el-option>
              <el-option label="左" value="left"></el-option>
              <el-option label="右" value="right"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题提示">
            <template slot="label">
              <el-link
                :underline="false"
                href="https://avuejs.com/doc/form/form-tip"
                target="_blank"
              >
                标题提示
                <i class="el-icon-question"></i>
              </el-link>
            </template>
            <el-input v-model="data.labelTip" clearable placeholder="标题提示"></el-input>
          </el-form-item>
          <el-form-item
            v-if="data.labelTip && !['upload'].includes(data.type)"
            label="标题提示位置"
            label-width="110px"
          >
            <el-select v-model="data.labelTipPlacement" placeholder="标题提示位置" clearable>
              <el-option label="上" value="top"></el-option>
              <el-option label="下" value="bottom"></el-option>
              <el-option label="左" value="left"></el-option>
              <el-option label="右" value="right"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="!['color', 'dynamic', 'group', 'ueditor', 'upload', 'map'].includes(data.type)"
            label="默认值"
          >
            <template v-if="defaultValues && defaultValues[data.type]">
              <el-select v-model="data.value" allow-create clearable filterable placeholder="默认值">
                <el-option
                  v-for="item in defaultValues[data.type]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
            <template v-else>
              <el-input v-model="data.value" clearable placeholder="默认值"></el-input>
            </template>
          </el-form-item>
          <el-form-item label="详情模式">
            <el-switch v-model="data.detail"></el-switch>
          </el-form-item>
          <el-form-item label="是否只读">
            <el-switch v-model="data.readonly"></el-switch>
          </el-form-item>
          <el-form-item label="是否禁用">
            <el-switch v-model="data.disabled"></el-switch>
          </el-form-item>
          <el-form-item label="是否可见">
            <el-switch v-model="data.display"></el-switch>
          </el-form-item>
          <el-form-item label="是否必填">
            <el-switch v-model="data.required"></el-switch>
            <el-input v-if="data.required" v-model.lazy="data.pattern" placeholder="正则表达式"></el-input>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item name="2" title="组件属性">
          <component :is="getComponent" :data="data"></component>
        </el-collapse-item>
        <el-collapse-item name="3" title="事件属性" v-if="!['group'].includes(data.type)">
          <afd-config-event :data="data"></afd-config-event>
        </el-collapse-item>
      </el-collapse>
    </el-form>
    <el-empty v-else description="拖拽字段进行配置" style="margin-top: 90%;"></el-empty>
  </div>
</template>

<script>
import fields from '../field/index'
import props from './mixins/props'

export default {
  name: 'widget-config',
  mixins: [props],
  props: ['defaultValues'],
  computed: {
    getComponent() {
      const prefix = 'afd-config-'
      const { type, component } = this.data
      if ((!type || component) && type != 'ueditor') return prefix + 'custom'
      let result = 'input'

      if ([undefined, 'input', 'password', 'url'].includes(type)) result = 'input'
      else if ([
        'year', 'month', 'week', 'date', 'datetime', 'time', 'daterange', 'timerange', 'datetimerange', 'dates'
      ].includes(type)) result = 'date'
      else if (['array', 'img'].includes(type)) result = 'array'
      else if (['tree', 'cascader'].includes(type)) result = 'tree'
      else if (['radio', 'checkbox', 'select'].includes(type)) result = 'select'
      else result = type

      return prefix + result
    }
  },
  data() {
    return {
      fields,
      collapse: ['1', '2', '3']
    }
  },
  methods: {
    handleChangeType(type) {
      if (!type) return
      const config = this.fields.find(f => f.list.find(l => l.type == type))
      if (!config) return
      for (let key in config) {
        if (config && Object.prototype.hasOwnProperty.call(config, key) && !['icon', 'label', 'span'].includes(key)) this.data[key] = config[key]
      }
    }
  }
}
</script>