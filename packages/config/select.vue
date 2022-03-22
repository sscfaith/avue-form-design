<template>
  <div>
    <el-form-item v-if="data.type == 'select'"
                  label="占位内容">
      <el-input v-model="data.placeholder"
                clearable
                placeholder="占位内容"></el-input>
    </el-form-item>
    <div class="el-form-item el-form-item--small el-form--label-top">
      <label class="el-form-item__label"
             style="padding: 0;">字典配置：</label>
      <div class="el-form-item__content">
        <el-tabs v-model="data.dicOption"
                 stretch
                 @tab-click="handleTabClick">
          <el-tab-pane label="静态数据"
                       name="static">
            <draggable tag="ul"
                       :list="data.dicData"
                       :group="{ name: 'dic' }"
                       ghost-class="ghost"
                       handle=".drag-item">
              <li v-for="(item, index) in data.dicData"
                  :key="index">
                <i class="drag-item el-icon-s-operation"
                   style="font-size: 16px; margin: 0 5px; cursor: move;"></i>
                <el-input style="margin-right: 5px;"
                          size="mini"
                          clearable
                          v-model="item.label"
                          placeholder="label"></el-input>
                <el-input :style="{'margin-right': data.type == 'select'? '5px': '0'}"
                          size="mini"
                          clearable
                          v-model="item.value"
                          placeholder="value"></el-input>
                <el-input v-if="data.type == 'select'"
                          size="mini"
                          clearable
                          v-model="item.desc"
                          placeholder="描述"></el-input>
                <el-button @click="handleRemoveFields(index)"
                           circle
                           plain
                           type="danger"
                           size="mini"
                           icon="el-icon-minus"
                           style="padding: 4px;margin-left: 5px;"></el-button>
              </li>
            </draggable>
            <div style="margin-left: 22px;">
              <el-button type="text"
                         @click="handleAddFields">添加列
              </el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="远端数据"
                       name="remote">
            网址
            <el-input v-model="data.dicUrl"
                      size="small"
                      placeholder="远端数据字典网址"></el-input>
            远程搜索
            <el-switch v-model="data.remote"></el-switch><br>
            请求方法
            <el-select v-model="data.dicMethod"
                       placeholder="请求方法"
                       size="small"
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
            <p v-if="data.dicUrl">
              返回结构
              <monaco-editor v-model="dicFormatter"
                             height="80"
                             :keyIndex="`dict-formatter-${data.prop}`"
                             :options="options"></monaco-editor>
            </p>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="el-form-item el-form-item--small el-form--label-top">
      <label class="el-form-item__label"
             style="padding: 0;">字典key配置：</label>
      <div class="el-form-item__content">
        <ul>
          <li v-for="(value, key) in data.props"
              :key="key">
            <span style="width: 50px">{{ key }}</span>
            <el-input size="mini"
                      v-model="data.props[key]"
                      clearable
                      placeholder="key配置"></el-input>
          </li>
        </ul>
      </div>
    </div>
    <el-form-item v-if="data.dicOption == 'remote'"
                  label="重新请求字典(crud)"
                  label-width="150px">
      <el-switch v-model="data.dicFlag"></el-switch>
    </el-form-item>
    <template v-if="data.type == 'select'">
      <el-form-item label="是否多选">
        <el-switch v-model="data.multiple"></el-switch>
      </el-form-item>
      <el-form-item label="是否可拖拽"
                    label-width="110px"
                    v-if="data.multiple">
        <template slot="label">
          <el-link :underline="false"
                   href="https://avuejs.com/form/form-select.html#%E6%8B%96%E6%8B%BD"
                   target="_blank">是否可拖拽 <i class="el-icon-question"></i></el-link>
        </template>
        <el-switch v-model="data.drag"></el-switch>
      </el-form-item>
      <el-form-item label="多选数量限制"
                    label-width="110px"
                    v-if="data.multiple">
        <el-input-number v-model="data.limit"
                         controls-position="right"
                         placeholder="多选限制"
                         :min="0"
                         :max="data.dicData.length"></el-input-number>
      </el-form-item>
      <div class="el-form-item el-form-item--small el-form--label-top">
        <label class="el-form-item__label"
               style="padding: 0;">级联配置：</label>
        <div class="el-form-item__content">
          <draggable tag="ul"
                     :list="data.cascaderItem || data.cascader"
                     :group="{ name: 'cascaderItem' }"
                     ghost-class="ghost"
                     handle=".drag-item">
            <li v-for="(item, index) in data.cascaderItem || data.cascader"
                :key="index">
              <i class="drag-item el-icon-s-operation"
                 style="font-size: 16px; margin: 0 5px; cursor: move;"></i>
              <el-input v-if="avueVersion('2.9.0')"
                        size="mini"
                        v-model="data.cascaderItem[index]"
                        clearable
                        placeholder="级联属性值"></el-input>
              <el-input v-else
                        size="mini"
                        v-model="data.cascader[index]"
                        clearable
                        placeholder="级联属性值"></el-input>
              <el-button @click="handleRemoveCascaderItemFields(index)"
                         circle
                         plain
                         type="danger"
                         size="mini"
                         icon="el-icon-minus"
                         style="padding: 4px; margin-left: 5px;">
              </el-button>
            </li>
          </draggable>
          <div style="margin-left: 22px;">
            <el-button type="text"
                       @click="handleAddCascaderItemFields">添加列</el-button>
          </div>
        </div>
      </div>
      <el-form-item v-if="(data.cascaderItem || data.cascader) && (data.cascaderItem || data.cascader).length > 0"
                    label="级联默认选中"
                    label-width="110px">
        <el-input-number v-model="data.cascaderIndex"
                         controls-position="right"
                         placeholder="级联默认选中"
                         :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="是否可清空"
                    label-width="110px">
        <el-switch v-model="data.clearable"></el-switch>
      </el-form-item>
      <el-form-item label="是否可搜索"
                    label-width="110px">
        <el-switch v-model="data.filterable"></el-switch>
      </el-form-item>
    </template>
    <template v-if="['radio','checkbox'].includes(data.type)">
      <el-form-item label="边框"
                    v-if="!data.button">
        <el-switch v-model="data.border"></el-switch>
      </el-form-item>
      <el-form-item label="按钮"
                    v-if="!data.border">
        <el-switch v-model="data.button"></el-switch>
      </el-form-item>
    </template>
    <el-form-item label="尺寸"
                  v-if="data.border || data.button">
      <el-radio-group v-model="data.size"
                      size="mini">
        <el-radio-button label="medium">正常</el-radio-button>
        <el-radio-button label="small">小</el-radio-button>
        <el-radio-button label="mini">超小</el-radio-button>
      </el-radio-group>
    </el-form-item>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import MonacoEditor from '@utils/monaco-editor'

export default {
  name: "config-select",
  props: ['data'],
  components: { Draggable, MonacoEditor },
  data() {
    return {
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
      options: {
        fullScreen: true,
        minimap: {
          enabled: false,
        },
      },
      dicFormatter: '',
    }
  },
  watch: {
    'data.prop': {
      handler() {
        if (!this.avueVersion('2.9.0') && this.data.cascaderItem) {
          this.$set(this.data, 'cascader', this.data.cascaderItem)
          this.$delete(this.data, 'cascaderItem')
        }
        const { dicFormatter } = this.data
        this.dicFormatter = dicFormatter ? dicFormatter + '' : '(res) => {\r\n  return res.data\r\n}'
      },
      immediate: true
    },
    dicFormatter: {
      handler(val) {
        try {
          this.data.dicFormatter = eval(val)
        } catch (e) {
          // console.error(e)
        }
      }
    }
  },
  methods: {
    handleRemoveFields(index) {
      this.data.dicData.splice(index, 1)
    },
    handleAddFields() {
      const i = Math.ceil(Math.random() * 99999)
      this.data.dicData.push({ label: `字段${i}`, value: `col_${i}` })
    },
    handleRemoveCascaderItemFields(index) {
      if (this.avueVersion('2.9.0')) this.data.cascaderItem.splice(index, 1)
      else this.data.cascader.splice(index, 1)
    },
    handleAddCascaderItemFields() {
      if (this.avueVersion('2.9.0')) {
        if (!this.data.cascaderItem) {
          this.$set(this.data, 'cascaderItem', [])
        }
        this.data.cascaderItem.push('')
      } else {
        if (!this.data.cascader) {
          this.$set(this.data, 'cascader', [])
          delete this.data.cascaderItem
        }
        this.data.cascader.push('')
      }
    },
    handleTabClick({ name }) {
      if (name == 'remote' && !this.data.dicQueryConfig) this.data.dicQueryConfig = []
    }
  },
}
</script>
