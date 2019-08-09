<template>
  <div>
    <el-form label-suffix="：" v-if="this.data && Object.keys(this.data).length > 0">
      <component :is="getComponent" :data="data"></component>
    </el-form>
    <avue-empty v-else desc="拖拽字段进行配置" style="margin-top: 100%;"></avue-empty>
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
      getComponent() {
        const prefix = 'config-'
        const { type } = this.data
        let result = 'input'

        if (['input', 'password'].includes(type)) result = 'input'
        else if (dateArr.includes(type)) result = 'date'
        else result = type

        return prefix + result
      }
    }
  }
</script>
