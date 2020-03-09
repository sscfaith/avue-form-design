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
          <el-popover placement="top" trigger="hover" popper-class="popper-bo" width="250px">
            <el-button size="medium"
                       type="primary"
                       slot="reference"
                       @click="handleCopy">复制</el-button>
            <div>
              <el-form label-width="180px" label-position="left">
                <el-alert :closable="false">
                  在没有开启美化的情况下，当前编辑器内可见的文本，就是复制得到的内容。<br>
                  如有需要，您可以开启美化，然后选取适合自己的美化配置。
                  <a href="https://www.npmjs.com/package/csvjson-json_beautifier" target="_blank">参考资料</a>
                </el-alert>
                <el-form-item label="是否开启美化">
                  <el-switch v-model="beautifierOptions.enabled"/>
                </el-form-item>
                <el-form-item label="缩进长度-空格数量">
                  <el-slider v-model="beautifierOptions.space"
                             show-stops
                             :marks="{ 1: '1', 2: '2', 3: '3', 4: '4' }"
                             :min="1"
                             :max="4"
                             :step="1"></el-slider>
                </el-form-item>
                <el-form-item label="引号类型">
                  <el-switch v-model="beautifierOptions.quoteType"
                             active-value="single"
                             inactive-value="double"
                             active-text="单引号"
                             inactive-text="双引号"></el-switch>
                </el-form-item>
                <el-form-item label="移除key的引号">
                  <el-switch v-model="beautifierOptions.dropQuotesOnKeys"></el-switch>
                </el-form-item>
                <el-form-item label="移除数字字符串的引号">
                  <el-switch v-model="beautifierOptions.dropQuotesOnNumbers"></el-switch>
                </el-form-item>
              </el-form>
            </div>
          </el-popover>
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
                   :option="widgetForm"
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
import beautifier from 'csvjson-json_beautifier'

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
    },
    beautifierOptions: {
      handler (val) {
        if (this.storage) {
          localStorage.setItem('avue-form-beautifier-options', JSON.stringify(val))
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
      // csvjson-json_beautifier设置项。https://www.npmjs.com/package/csvjson-json_beautifier
      beautifierOptions: {
        enabled: false,
        space: 2,
        quoteType: 'single',
        dropQuotesOnKeys: true,
        dropQuotesOnNumbers: false
      }
    }
  },
  mounted () {
    this.handleLoadCss();
    this.handleLoadStorage();
    this.loadBeautifierOptions();
  },
  methods: {
    handleLoadStorage () {
      if (this.storage) {
        const form = localStorage.getItem('avue-form');
        if (form) this.setJSON(JSON.parse(form))
      } else this.setJSON({ ...this.widgetForm, ...this.options })
    },

    loadBeautifierOptions () {
      const bo = localStorage.getItem('avue-form-beautifier-options')
      if (bo) {
        this.beautifierOptions = JSON.parse(bo)
      }
    },

    handleLoadCss () {
      const url = '//at.alicdn.com/t/font_1254447_dpcsvgkhila.css'
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      window.document.head.appendChild(link)
    },

    handleImportJsonSubmit () {
      try {
        this.setJSON(this.importJson)
        this.importJsonVisible = false
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
      else this.previewVisible = true
    },

    handleGenerateJson () {
      this.transformToAvueOptions().then(data => {
        this.widgetFormPreview = data
        this.generateJsonVisible = true
      })
    },

    handleGenerate () {
      this.transformToAvueOptions().then(data => {
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

    /**
     * 获取需要复制的内容
     * @return {String}
     */
    getCopyContent () {
      if (this.beautifierOptions.enabled) {
        return beautifier(this.widgetForm, this.beautifierOptions)
      } else {
        return JSON.stringify(this.widgetForm, null, 2)
      }
    },

    handleCopy () {
      this.$Clipboard({
        text: this.getCopyContent()
      }).then(() => {
        this.$message.success('复制成功')
      }).catch(() => {
        this.$message.error('复制失败')
      });
    },

    handleAvueDoc () {
      window.open('https://avuejs.com/doc/form/form-doc', '_blank')
    },

    transformToAvueOptions () {
      return new Promise((resolve, reject) => {
        try {
          const data = this.deepClone(this.widgetForm)
          data.column.forEach(col => {
            if (col.type == 'dynamic' && col.children && col.children.column && col.children.column.length > 0) {
              const c = col.children.column;
              c.forEach(item => {
                delete item.subfield
              })
            }
          })
          resolve(data)
        } catch (e) {
          reject(e)
        }
      })
    },

    setJSON (json) {
      this.widgetForm = json
      if (json.column && json.column.length > 0) {
        this.widgetFormSelect = json.column[0]

        json.column.forEach(col => {
          if (col.type == 'dynamic' && col.children && col.children.column && col.children.column.length > 0) {
            const c = col.children.column;
            c.forEach(item => {
              item.subfield = true
            })
          }
        })
      }
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

.drawer-foot > span {
  display: inline-block;
  width: 50%;
  button {
    width: 100%;
  }
}

.popper-bo {
  .el-alert {
    margin-bottom: 10px;
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
