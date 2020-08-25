<template>
  <div>
    <el-form-item label="占位内容">
      <el-input v-model="data.placeholder"
                placeholder="占位内容"></el-input>
    </el-form-item>
    <el-form-item label="默认值">
      <el-input v-model="data.value"
                placeholder="默认值"></el-input>
    </el-form-item>
    <el-form-item label="字典配置"><br>
      <el-tabs v-model="data.dicOption"
               stretch
               @tab-click="handleTabClick">
        <el-tab-pane label="静态数据"
                     name="static">
          <el-tree ref="tree"
                   :data="data.dicData"
                   default-expand-all
                   draggable
                   node-key="value"
                   :expand-on-click-node="false">
            <span class="custom-tree-node"
                  slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-button type="text"
                           size="mini"
                           icon="el-icon-plus"
                           @click="handleNodeAdd(data)"></el-button>
                <!--                <el-button class="warning" type="text" size="mini" icon="el-icon-edit"-->
                <!--                           @click="handleNodeEdit(data)"></el-button>-->
                <el-button class="danger"
                           type="text"
                           size="mini"
                           icon="el-icon-delete"
                           @click="handleNodeRemove(node, data)"></el-button>
              </span>
            </span>
          </el-tree>
          <div style="margin-left: 22px;">
            <el-button type="text"
                       @click="handleParentNodeAdd">添加父级
            </el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="远端数据"
                     name="remote">
          网址
          <el-input v-model="data.dicUrl"
                    placeholder="远端数据字典网址"></el-input>
          请求方法
          <el-select v-model="data.dicMethod"
                     placeholder="请求方法"
                     style="width: 100%;">
            <el-option label="POST"
                       value="post"></el-option>
            <el-option label="GET"
                       value="get"></el-option>
          </el-select>
          <p v-if="data.dicMethod == 'post'">
            请求参数
            <avue-dynamic v-model="data.dicQueryConfig"
                          :children="option"></avue-dynamic>
          </p>
        </el-tab-pane>
      </el-tabs>
    </el-form-item>
    <el-form-item label="字典key配置">
      <ul>
        <li v-for="(value, key) in data.props"
            :key="key">
          <span style="width: 50px">{{ key }}</span>
          <el-input size="mini"
                    v-model="data.props[key]"
                    placeholder="key配置"></el-input>
        </li>
      </ul>
    </el-form-item>
    <el-form-item label="选项分隔符">
      <el-input v-model="data.separator"
                placeholder="选项分隔符"></el-input>
    </el-form-item>
    <el-form-item label="是否显示选中值的完整路径">
      <el-switch v-model="data.showAllLevels"></el-switch>
    </el-form-item>
    <el-form-item label="是否可清空">
      <el-switch v-model="data.clearable"></el-switch>
    </el-form-item>
    <el-form-item label="是否可搜索">
      <el-switch v-model="data.filterable"></el-switch>
    </el-form-item>
    <el-form-item label="是否禁用">
      <el-switch v-model="data.disabled"></el-switch>
    </el-form-item>
    <el-form-item label="是否可见">
      <el-switch v-model="data.display"></el-switch>
    </el-form-item>
    <el-form-item label="是否必填">
      <el-switch v-model="data.required"></el-switch>
    </el-form-item>

    <el-dialog :visible.sync="dialogVisible"
               :rules="dialogRules"
               :before-close="beforeClose">
      <el-form ref="dialogForm"
               :model="dialogForm"
               label-width="80px">
        <el-form-item label="label">
          <el-input v-model="dialogForm.label"
                    placeholder="label"></el-input>
        </el-form-item>
        <el-form-item label="value">
          <el-input v-model="dialogForm.value"
                    placeholder="value"
                    :type="this.dialogInputType">
            <el-select v-model="dialogInputType"
                       slot="append"
                       placeholder="数据类型"
                       style="width: 100px">
              <el-option label="String"
                         value="text"></el-option>
              <el-option label="Number"
                         value="number"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="handleDialogAdd"
                   v-if="dialogStatus == 'add'">确 定</el-button>
        <!--        <el-button type="primary" @click="handleDialogUpdate" v-else>确 定</el-button>-->
      </span>
    </el-dialog>
  </div>
</template>
<script>

export default {
  name: "config-cascader",
  props: ['data'],
  data() {
    return {
      validator: {
        type: null,
        required: null,
        pattern: null,
        length: null
      },
      dialogForm: {},
      dialogVisible: false,
      dialogRules: {
        label: { required: true, message: '请输入label' },
        value: { required: true, message: '请输入value' },
      },
      dialogStatus: 'add',
      selectData: undefined,
      dialogInputType: 'text',
      option: {
        column: [{
          type: 'input',
          prop: 'key',
          label: 'key'
        }, {
          type: 'input',
          prop: 'value',
          label: 'value'
        }]
      },
    }
  },
  methods: {
    generateRule() {
      const rules = [];
      Object.keys(this.validator).forEach(key => {
        if (this.validator[key]) rules.push(this.validator[key])
      })
      this.data.rules = rules
    },
    handleTabClick({ name }) {
      if (name == 'remote' && !this.data.dicQueryConfig) this.data.dicQueryConfig = []
    },
    handleParentNodeAdd() {
      this.selectData = undefined
      this.dialogStatus = 'add';
      this.dialogVisible = true;
    },
    handleNodeAdd(data) {
      this.selectData = data;
      this.dialogStatus = 'add';
      this.dialogVisible = true;
    },
    handleNodeRemove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    handleDialogAdd() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          const { label, value } = this.dialogForm;
          const node = this.$refs.tree.getNode(value)
          if (node) this.$message.error("value重复")
          else {
            const data = this.selectData
            const newNode = {
              label,
              value: this.dialogInputType == 'number' ? Number(value) : value,
            }
            if (data) {
              if (!data.children) this.$set(data, 'children', [])
              data.children.push(newNode)
            } else {
              this.$set(this.data.dicData, this.data.dicData.length, newNode)
            }
            this.beforeClose()
          }
        }
      })
    },
    beforeClose() {
      this.$refs.dialogForm.clearValidate()
      this.dialogForm = {}
      this.dialogVisible = false
    }
  },
  watch: {
    'data.required': function (val) {
      if (val) this.validator.required = { required: true, message: `请选择${this.data.label}`, trigger: 'change' }
      else this.validator.required = null

      this.generateRule()
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
