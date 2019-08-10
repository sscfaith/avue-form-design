<template>
  <div class="widget-form-container">
    <el-form :label-position="data.labelPosition || 'left'"
             :label-width="data.labelWidth ? data.labelWidth + 'px' : '100px' "
             :label-suffix="data.labelSuffix"
             :model="form"
             ref="widgetForm">
      <el-row :gutter="data.gutter">
        <draggable class="widget-form-list"
                   :list="data.column"
                   :group="{ name: 'form' }"
                   ghost-class="ghost"
                   @add="handleWidgetAdd">
          <template v-for="(column, index) in data.column">
            <transition name="el-fade-in" :key="index">
              <el-col :md="column.span || 12"
                      :xs="24"
                      :offset="column.offset || 0">
                <el-form-item class="widget-form-item"
                              :label="column.label"
                              :prop="column.prop"
                              :class="{ active: selectWidget.prop == column.prop, 'required': column.required }"
                              @click.native="handleSelectWidget(index)">
                  <component :is="getComponent(column.type, column.component)"
                             :action="column.action"
                             :append="column.append"
                             :accordion="column.accordion"
                             :typeslot="column.typeslot"
                             :appendClick="column.appendClick"
                             :border="column.border"
                             :change="column.change"
                             :changeoOnSelect="column.changeoOnSelect"
                             :checked="column.checked"
                             :clearable="column.clearable"
                             :changeOnSelect="column.changeOnSelect"
                             :click="column.click"
                             :onRemove="column.onRemove"
                             :showWordLimit="column.showWordLimit"
                             :column="column"
                             :colors="column.colors"
                             :canvasOption="column.canvasOption"
                             :controls-position="column.controlsPosition"
                             :dataType="column.dataType"
                             :defaultExpandAll="column.defaultExpandAll"
                             :defaultTime="column.defaultTime"
                             :dic="column.dicData"
                             :dicUrl="column.dicUrl"
                             :dicMethod="column.dicMethod"
                             :dicQuery="column.dicQuery"
                             :disabled="column.disabled"
                             :drag="column.drag"
                             :endPlaceholder="column.endPlaceholder"
                             :expand-trigger="column.expandTrigger"
                             :filter="column.filter"
                             :blur="column.blur"
                             :focus="column.focus"
                             :tpyeformat="column.tpyeformat"
                             :filesize="column.filesize"
                             :filterable="column.filterable"
                             :format="column.format"
                             :formatTooltip="column.formatTooltip"
                             :iconClasses="column.iconClasses"
                             :label="column.label"
                             :limit="column.limit"
                             :listType="column.listType"
                             :loadText="column.loadText"
                             :min="column.min"
                             :max="column.max"
                             :minlength="column.minlength"
                             :maxlength="column.maxlength"
                             :minRows="column.minRows"
                             :maxRows="column.maxRows"
                             :multiple="column.multiple"
                             :nodeClick="column.nodeClick"
                             :options="column.options"
                             :oss="column.oss"
                             :parent="column.parent"
                             :pickerOptions="column.pickerOptions"
                             :placeholder="getPlaceholder(column)"
                             :precision="column.precision"
                             :prefixIcon="column.prefixIcon"
                             :prepend="column.prepend"
                             :prependClick="column.prependClick"
                             :prop="column.prop"
                             :props="column.props"
                             :propsHttp="column.propsHttp"
                             :range="column.range"
                             :iconList="column.iconList"
                             :readonly="column.readonly"
                             :checkStrictly="column.checkStrictly"
                             :separator="column.separator"
                             :showFileList="column.showFileList"
                             :showInput="column.showInput"
                             :showStops="column.showStops"
                             :showAllLevels="column.showAllLevels"
                             :showText="column.showText"
                             :size="column.size || 'small'"
                             :startPlaceholder="column.startPlaceholder"
                             :step="column.step"
                             :suffixIcon="column.suffixIcon"
                             :texts="column.texts"
                             :tip="column.tip"
                             :type="column.type"
                             :accept="column.accept"
                             :tags="column.tags"
                             :value-format="column.valueFormat"
                             :voidIconClass="column.voidIconClass"
                             :remote="column.remote"
                             :autocomplete="column.autocomplete"
                             v-model="form[column.prop]"
                             :allow-create="column.allowCreate"
                             :default-first-option="column.defaultFirstOption"></component>
                  <el-button title="删除" @click.stop="handleWidgetDelete(index)" class="widget-action-delete"
                             v-if="selectWidget.prop == column.prop" circle plain type="danger">
                    <i class="iconfont icon-delete"></i>
                  </el-button>
                  <el-button title="复制" @click.stop="handleWidgetClone(index)" class="widget-action-clone"
                             v-if="selectWidget.prop == column.prop" circle plain type="primary">
                    <i class="iconfont icon-copy"></i>
                  </el-button>
                </el-form-item>
              </el-col>
            </transition>
          </template>
        </draggable>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import Draggable from 'vuedraggable'
  import { getComponent, getPlaceholder } from "@/utils/dataformat";
  import { deepClone } from "@/utils/util";

  export default {
    name: 'widget-form',
    components: { Draggable },
    props: ['data', 'select'],
    data() {
      return {
        selectWidget: this.select,
        form: {}
      }
    },
    methods: {
      getComponent,
      getPlaceholder,
      handleSelectWidget(index) {
        this.selectWidget = this.data.column[index]
      },
      handleWidgetAdd(evt) {
        const newIndex = evt.newIndex;
        const data = deepClone(this.data.column[newIndex]);
        data.prop = Date.now() + '_' + Math.ceil(Math.random() * 99999)
        delete data.icon
        this.$set(this.data.column, newIndex, { ...data })
        this.handleSelectWidget(newIndex)
      },
      handleWidgetDelete(index) {
        if (this.data.column.length - 1 === index) {
          if (index === 0) this.selectWidget = {}
          else this.handleSelectWidget(index - 1)
        } else this.handleSelectWidget(index + 1)

        this.$nextTick(() => {
          this.data.column.splice(index, 1)
        })
      },
      handleWidgetClone(index) {
        let cloneData = deepClone(this.data.column[index])
        cloneData.prop = Date.now() + '_' + Math.ceil(Math.random() * 99999)
        this.data.column.splice(index, 0, cloneData)
        this.$nextTick(() => {
          this.handleSelectWidget(index + 1)
        })
      }
    },
    watch: {
      select(val) {
        this.selectWidget = val
      },
      selectWidget: {
        handler(val) {
          this.$emit('update:select', val)
        },
        deep: true
      }
    }
  }
</script>
