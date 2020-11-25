<template>
  <div>
    <el-form-item label="默认值">
      <el-input v-model="data.value"
                clearable
                placeholder="默认值"></el-input>
    </el-form-item>
    <el-form-item label="最大星数">
      <el-input-number v-model="data.max"
                       controls-position="right"
                       placeholder="最大星数"></el-input-number>
    </el-form-item>
    <el-form-item label="是否显示文本"
                  label-width="110px">
      <el-switch v-model="data.showText"></el-switch>
    </el-form-item>
    <el-form-item label="自定义文本"
                  label-width="110px"
                  v-if="data.showText">
      <el-tag :key="index"
              size="small"
              v-for="(tag,index) in data.texts"
              closable
              @close="handleTextClose(tag)">{{tag}}
      </el-tag>
      <el-input class="input-new-tag"
                v-if="textVisible"
                v-model="textValue"
                size="mini"
                ref="textTag"
                clearable
                @keyup.enter.native="handleTextConfirm"
                @blur="handleTextConfirm">
      </el-input>
      <el-button v-if="!textVisible && data.texts.length < data.max"
                 @click="showTextInput"
                 size="mini"
                 icon="el-icon-plus"
                 circle
                 style="margin-left: 5px;"></el-button>
    </el-form-item>
    <el-form-item label="自定义颜色"
                  label-width="110px">
      <el-tag :key="index"
              v-for="(tag,index) in data.colors"
              closable
              size="small"
              @close="handleColorClose(tag)"
              :style="{color: tag}">{{tag}}
      </el-tag>
      <el-color-picker v-model="colorValue"
                       size="mini"
                       @change="handleColorConfirm"
                       class="color-picker"></el-color-picker>
    </el-form-item>
    <!--    <el-form-item label="自定义图标">-->
    <!--      <el-tag :key="index" v-for="(tag,index) in data.iconClasses" closable @close="handleIconClose(tag)">{{tag}}-->
    <!--      </el-tag>-->
    <!--      <el-input class="input-new-tag"-->
    <!--                v-if="iconVisible"-->
    <!--                v-model="iconValue"-->
    <!--                size="mini"-->
    <!--                ref="iconTag"-->
    <!--                @keyup.enter.native="handleIconConfirm"-->
    <!--                @blur="handleIconConfirm">-->
    <!--      </el-input>-->
    <!--      <el-button v-else @click="showIconInput" size="mini" icon="el-icon-plus" circle-->
    <!--                 style="margin-left: 5px;"></el-button>-->
    <!--    </el-form-item>-->
    <el-form-item label="是否禁用">
      <el-switch v-model="data.disabled"></el-switch>
    </el-form-item>
    <el-form-item label="是否可见">
      <el-switch v-model="data.display"></el-switch>
    </el-form-item>
    <el-form-item label="是否必填">
      <el-switch v-model="data.required"></el-switch>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "config-rate",
  props: ['data'],
  data() {
    return {
      validator: {
        type: null,
        required: null,
        pattern: null,
        length: null
      },
      textVisible: false,
      textValue: '',
      colorVisible: false,
      colorValue: '',
      iconVisible: false,
      iconValue: ''
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
    handleTextClose(tag) {
      this.data.texts.splice(this.data.texts.indexOf(tag), 1);
    },
    showTextInput() {
      this.textVisible = true;
      this.$nextTick(() => {
        this.$refs.textTag.$refs.input.focus();
      });
    },
    handleTextConfirm() {
      if (this.textValue) this.data.texts.push(this.textValue);
      this.textVisible = false;
      this.textValue = '';
    },
    handleColorClose(tag) {
      this.data.colors.splice(this.data.colors.indexOf(tag), 1);
    },
    handleColorConfirm() {
      if (this.colorValue) this.data.colors.push(this.colorValue);
      this.colorValue = '';
    },
    // handleIconClose(tag) {
    //   this.data.iconClasses.splice(this.data.iconClasses.indexOf(tag), 1);
    // },
    // showIconInput() {
    //   this.iconVisible = true;
    //   this.$nextTick(() => {
    //     this.$refs.iconTag.$refs.input.focus();
    //   });
    // },
    // handleIconConfirm() {
    //   if (this.iconValue) this.data.iconClasses.push(this.iconValue);
    //   this.iconVisible = false;
    //   this.iconValue = '';
    // }
  },
  watch: {
    'data.required': function (val) {
      if (val) this.validator.required = { required: true, message: `${this.data.label}必须填写` }
      else this.validator.required = null

      this.generateRule()
    },
  }
}
</script>
<style lang="scss" scoped>
.el-tag {
  vertical-align: top;
}

.el-tag + .el-tag {
  margin-left: 5px;
}

.input-new-tag {
  width: 90px;
  margin-left: 5px;
  vertical-align: bottom;
}

.color-picker {
  left: 10px;
  vertical-align: top;
}
</style>
