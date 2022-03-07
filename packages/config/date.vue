<template>
  <div>
    <template v-if="data.type.indexOf('range') != -1">
      <el-form-item label="开始占位内容"
                    label-width="110px">
        <el-input v-model="data.startPlaceholder"
                  clearable
                  placeholder="开始占位内容"></el-input>
      </el-form-item>
      <el-form-item label="结束占位内容"
                    label-width="110px">
        <el-input v-model="data.endPlaceholder"
                  clearable
                  placeholder="结束占位内容"></el-input>
      </el-form-item>
    </template>
    <el-form-item label="占位内容"
                  v-else>
      <el-input v-model="data.placeholder"
                clearable
                placeholder="占位内容"></el-input>
    </el-form-item>
    <el-form-item label="显示格式化"
                  label-width="100px">
      <el-input v-model="data.format"
                clearable
                placeholder="显示格式化"></el-input>
    </el-form-item>
    <el-form-item label="值格式化">
      <el-input v-model="data.valueFormat"
                clearable
                placeholder="值格式化"></el-input>
    </el-form-item>
    <el-form-item label="取消范围联动"
                  label-width="110px"
                  v-if="['timerange', 'daterange', 'datetimerange'].includes(data.type)">
      <el-switch v-model="data.unlinkPanels"></el-switch>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "config-date",
  props: ['data'],
}
</script>
