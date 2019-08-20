<template>
  <div class="widget-config">
    <el-form label-suffix="："
             v-if="this.data && Object.keys(this.data).length > 0">
      <el-form-item label="类型">
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
      <component :is="getComponent"
                 :data="data"></component>
    </el-form>
    <avue-empty v-else
                desc="拖拽字段进行配置"
                style="margin-top: 100%;"></avue-empty>
  </div>
</template>

<script>
const dateArr = [
  'year', 'month', 'week', 'date', 'datetime', 'time', 'daterange', 'timerange', 'datetimerange', 'dates'
]

export default {
  name: 'widget-config',
  props: ['data'],
  computed: {
    getComponent () {
      const prefix = 'config-'
      const { type } = this.data
      let result = 'input'

      if ([undefined, 'input', 'password'].includes(type)) result = 'input'
      else if (dateArr.includes(type)) result = 'date'
      else result = type

      return prefix + result
    }
  },
  methods: {
    async handleChangeType (type) {
      if (type) {
        const config = await this.getConfigByType(type);
        config.prop = this.data.prop;
        for (let key in config) {
          if (config.hasOwnProperty(key) && !['icon', 'label'].includes(key)) {
            const val = config[key]
            this.$set(this.data, key, val);
          }
        }
      }
    }
  }
}
</script>
