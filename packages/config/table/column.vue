<template>
  <el-drawer :visible.sync="visible" size="80%" append-to-body>
    <el-table :data="list" border>
      <el-table-column align="center" width="60">
        <template #header>
          <el-button icon="el-icon-plus" type="primary" circle size="mini" @click="list.push({})"></el-button>
        </template>
        <template #default="{ $index }">
          <el-button
            icon="el-icon-minus"
            type="danger"
            circle
            size="mini"
            @click="list.splice($index, 1)"
          ></el-button>
        </template>
      </el-table-column>
      <el-table-column label="字段名" prop="label" align="center">
        <template #default="{ row }">
          <el-input v-model="row.label" placeholder="请输入 字段名"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="Prop" prop="prop" align="center">
        <template #default="{ row }">
          <el-input v-model="row.prop" placeholder="请输入 prop"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="类型" prop="type" align="center">
        <template #default="{ row }">
          <el-select style="width: 100%;" v-model="row.type" placeholder="请选择 类型" filterable>
            <el-option
              v-for="item in fields"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="搜索" prop="search" align="center">
        <template #default="{ row }">
          <el-switch v-model="row.search"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <template v-if="['select', 'cascader', 'tree', 'radio', 'checkbox'].includes(row.type)">
            <el-button type="text" @click="handleDic(row)">字典配置</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <span class="afd-drawer-foot">
      <el-button @click="handleSubmit" type="primary">确定</el-button>
      <el-button @click="visible = false">取消</el-button>
    </span>
  </el-drawer>
</template>
<script>
import fields from './field.js'

export default {
  name: 'column',
  props: {
    column: []
  },
  emits: ['submit'],
  watch: {
    column: {
      handler(val) {
        this.list = val
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      fields,
      visible: false,
      list: []
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.deepClone(this.list))
      this.visible = false
    },
    handleDic(row) {
      console.log(row)
      this.$message.error('暂未实现')
    }
  }
}
</script>