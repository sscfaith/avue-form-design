<template>
  <div class="form-designer">
    <el-container>
      <!-- 左侧字段 -->
      <el-aside :width="leftWidth">
        <div class="fields-list">
          <div v-for="(field, index) in fields"
               :key="index">
            <div v-if="!field.disabled">
              <div class="field-title">{{field.title}}</div>
              <draggable tag="ul"
                         :list="field.list"
                         :group="{ name: 'form', pull: 'clone', put: false }"
                         ghost-class="ghost"
                         :sort="false">
                <li class="field-label"
                    v-for="(item, index) in field.list"
                    :key="index">
                  <a>
                    <i class="icon iconfont"
                       :class="item.icon"></i>
                    <span>{{item.label}}</span>
                  </a>
                </li>
              </draggable>
            </div>
            <div v-else>
              <div class="field-title">{{field.title}}
                <span class="danger">（开发中）</span>
              </div>
              <ul>
                <li class="field-label-disabled"
                    v-for="(item, index) in field.list"
                    :key="index">
                  <a>
                    <i class="icon iconfont"
                       :class="item.icon"></i>
                    <span>{{item.label}}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-aside>
      <!-- 中间主布局 -->
      <el-container class="widget-container"
                    direction="vertical">
        <el-header class="widget-container-header">
          <el-button type="text"
                     size="medium"
                     icon="el-icon-document"
                     @click="handleAvueDoc">Avue文档</el-button>
          <el-button type="text"
                     size="medium"
                     icon="el-icon-upload2"
                     @click="importJsonVisible = true">导入JSON</el-button>
          <el-button type="text"
                     size="medium"
                     icon="el-icon-download"
                     @click="handleGenerateJson">生成JSON</el-button>
          <el-button type="text"
                     size="medium"
                     icon="el-icon-view"
                     @click="handlePreview">预览</el-button>
          <el-button class="danger"
                     type="text"
                     size="medium"
                     icon="el-icon-delete"
                     @click="handleClear">清空</el-button>
        </el-header>
        <el-main :style="{background: widgetForm.column.length == 0 ? `url(${widgetEmpty}) no-repeat 50%`: ''}">
          <widget-form ref="widgetForm"
                       :data="widgetForm"
                       :select.sync="widgetFormSelect"></widget-form>
        </el-main>
      </el-container>
      <!-- 右侧配置 -->
      <el-aside class="widget-config-container"
                :width="asideRightWidth">
        <el-tabs v-model="configTab"
                 stretch>
          <el-tab-pane label="字段属性"
                       name="widget"
                       style="padding: 0 10px;">
            <widget-config :data="widgetFormSelect"></widget-config>
          </el-tab-pane>
          <el-tab-pane label="表单属性"
                       name="form"
                       lazy
                       style="padding: 0 10px;">
            <form-config :data="widgetForm"></form-config>
          </el-tab-pane>
        </el-tabs>
      </el-aside>
      <!-- 弹窗 -->
      <!-- 导入JSON -->
      <el-drawer title="导入JSON"
                 :visible.sync="importJsonVisible"
                 size="50%"
                 destroy-on-close>
        <v-json-editor v-model="importJson"
                       height="82vh"></v-json-editor>
        <div class="drawer-foot">
          <el-button size="medium"
                     type="primary"
                     @click="handleImportJsonSubmit">确定</el-button>
          <el-button size="medium"
                     type="danger"
                     @click="importJsonVisible = false">取消</el-button>
        </div>
      </el-drawer>
      <!-- 生成JSON -->
      <el-drawer title="生成JSON"
                 :visible.sync="generateJsonVisible"
                 size="50%"
                 destroy-on-close>
        <v-json-editor v-model="widgetFormPreview"
                       height="82vh"></v-json-editor>
        <div class="drawer-foot">
          <el-button size="medium"
                     type="primary"
                     @click="handleGenerate">生成</el-button>
          <el-button size="medium"
                     type="primary"
                     @click="handleCopy">复制</el-button>
        </div>
      </el-drawer>
      <!-- 预览 -->
      <el-drawer title="预览"
                 :visible.sync="previewVisible"
                 size="50%"
                 :before-close="handleBeforeClose">
        <avue-form v-if="previewVisible"
                   ref="form"
                   class="preview-form"
                   :option="widgetFormPreview"
                   v-model="widgetModels"></avue-form>
        <div class="drawer-foot">
          <el-button size="medium"
                     type="primary"
                     @click="handlePreviewSubmit">确定</el-button>
          <el-button size="medium"
                     type="danger"
                     @click="handleBeforeClose">取消</el-button>
        </div>
      </el-drawer>
    </el-container>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import VJsonEditor from 'v-jsoneditor'
import fields from './fieldsConfig.js'
import WidgetForm from './WidgetForm'
import FormConfig from './FormConfig'
import WidgetConfig from './WidgetConfig'
import widgetEmpty from './assets/widget-empty.png'

export default {
  name: "FormDesign",
  components: { Draggable, VJsonEditor, WidgetForm, FormConfig, WidgetConfig },
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          column: []
        }
      }
    },
    storage: {
      type: Boolean,
      default: false
    },
    asideLeftWidth: {
      type: [String, Number],
      default: '270px'
    },
    asideRightWidth: {
      type: [String, Number],
      default: '380px'
    }
  },
  watch: {
    widgetForm: {
      handler (val) {
        if (this.storage) {
          if (val.column && val.column.length > 0) localStorage.setItem('avue-form', JSON.stringify(val))
          else localStorage.removeItem('avue-form')
        }
      },
      deep: true
    }
  },
  computed: {
    leftWidth () {
      if (typeof this.asideLeftWidth == 'string') {
        return this.asideLeftWidth
      } else {
        return `${this.asideLeftWidth}px`
      }
    },
    rightWidth () {
      if (typeof this.asideRightWidth == 'string') {
        return this.asideRightWidth
      } else {
        return `${this.asideRightWidth}px`
      }
    }
  },
  data () {
    return {
      widgetEmpty: widgetEmpty,
      fields,
      widgetForm: {
        column: [],
        labelPosition: 'left',
        labelWidth: 120,
        gutter: 0,
        menuBtn: false,
        submitBtn: false,
        submitSize: 'medium',
        submitText: '提交',
        emptyBtn: false,
        emptySize: 'medium',
        emptyText: '清空',
        menuPosition: 'center'
      },
      widgetFormPreview: {},
      configTab: 'widget',
      widgetFormSelect: {},
      previewVisible: false,
      generateJsonVisible: false,
      importJsonVisible: false,
      importJson: undefined,
      widgetModels: {},
      configOption: {},
    }
  },
  mounted () {
    this.handleLoadCss();
    this.handleLoadStorage();
  },
  methods: {
    handleLoadStorage () {
      if (this.storage) {
        const form = localStorage.getItem('avue-form');
        if (form) this.widgetForm = JSON.parse(form)
      } else {
        this.transAvueOptionsToFormDesigner(this.options).then(res => {
          this.widgetForm = { ...this.widgetForm, ...res }
        })
      }
    },

    handleLoadCss () {
      const url = '//at.alicdn.com/t/font_1254447_vwre8s2hjxm.css'
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      window.document.head.appendChild(link)
    },

    handleImportJsonSubmit () {
      try {
        this.transAvueOptionsToFormDesigner(this.importJson).then(res => {
          this.widgetForm = res
          this.importJsonVisible = false
        })
      } catch (e) {
        this.$message.error(e.message)
      }
    },

    handleBeforeClose () {
      this.$refs.form.resetForm();
      this.previewVisible = false
    },

    handlePreview () {
      if (!this.widgetForm.column || this.widgetForm.column.length == 0) this.$message.error("没有需要展示的内容")
      else {
        this.transformToAvueOptions(this.widgetForm).then(data => {
          this.widgetFormPreview = data
          this.previewVisible = true
        })
      }
    },

    handleGenerateJson () {
      this.transformToAvueOptions(this.widgetForm).then(data => {
        this.widgetFormPreview = data
        this.generateJsonVisible = true
      })
    },

    handleGenerate () {
      this.transformToAvueOptions(this.widgetForm).then(data => {
        this.$emit('submit', data)
      })
    },

    handleClear () {
      if (this.widgetForm && this.widgetForm.column && this.widgetForm.column.length > 0) {
        this.$confirm('确定要清空吗？', '警告', {
          type: 'warning'
        }).then(() => {
          this.widgetForm = { column: [] }
          this.widgetFormSelect = {}
        }).catch(() => {
        })
      } else this.$message.error("没有需要清空的内容")
    },

    handlePreviewSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) this.$alert(this.widgetModels).catch(() => {
        })
      })
    },

    handleCopy () {
      this.$Clipboard({
        text: JSON.stringify(this.widgetForm, null, 2)
      }).then(() => {
        this.$message.success('复制成功')
      }).catch(() => {
        this.$message.error('复制失败')
      });
    },

    handleAvueDoc () {
      window.open('https://avuejs.com/doc/form/form-doc', '_blank')
    },

    transformToAvueOptions (obj) {
      return new Promise((resolve, reject) => {
        try {
          const data = this.deepClone(obj)
          for (let i = 0; i < data.column.length; i++) {
            const col = data.column[i]
            if (col.type == 'dynamic' && col.children && col.children.column && col.children.column.length > 0) {
              const c = col.children.column;
              c.forEach(item => {
                delete item.subfield
              })
              this.transformToAvueOptions(col.children).then(res => {
                col.children = res
              })
            } else if (col.type == 'group') {
              if (!data.group) data.group = []

              const group = {
                label: col.label,
                icon: col.icon,
                prop: col.prop,
              }
              this.transformToAvueOptions(col.children).then(res => {
                group.column = res.column
                data.group.push(group)
              })
              data.column.splice(i, 1)
              i--
            } else if (['checkbox', 'radio', 'tree', 'cascader', 'select'].includes(col.type)) {
              if (!col.dicData && col.dicQuery) {
                const query = {}
                col.dicQuery.forEach(q => {
                  if (q.key && q.value) query[q.key] = q.value
                })
                col.dicQuery = query
              }
            }
          }
          resolve(data)
        } catch (e) {
          reject(e)
        }
      })
    },

    transAvueOptionsToFormDesigner (obj) {
      const data = this.deepClone(obj)
      return new Promise((resolve, reject) => {
        try {
          if (data.column && data.column.length > 0) {
            data.column.forEach(col => {
              if (col.type == 'dynamic' && col.children && col.children.column && col.children.column.length > 0) {
                const c = col.children.column;
                c.forEach(item => {
                  item.subfield = true
                })
                this.transAvueOptionsToFormDesigner(col.children).then(res => {
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
                  col.dicQuery = arr
                }
              }
            })
          } else if (data.group && data.group.length > 0) {
            for (let i = 0; i < data.group.length; i++) {
              if (!data.column) data.column = []
              const col = data.group[i]

              const group = {
                type: 'group',
                label: col.label,
                icon: col.icon,
                prop: col.prop,
              }
              this.transAvueOptionsToFormDesigner(col).then(res => {
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
</script>

<style lang="scss">
@import "./styles/index.scss";

.drawer-foot {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  display: flex;

  button {
    width: 50%;
  }
}

.preview-form {
  overflow-y: scroll;
  height: 83vh;
}

.widget-config-container {
  .avue-group__item {
    padding: 0;
  }
}
</style>
