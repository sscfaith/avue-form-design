<template>
  <div>
    <el-form-item label="字段配置">
      <el-button type="primary" size="small" @click="$refs.column.visible = true">字段配置</el-button>
    </el-form-item>
    <el-form-item label="边框">
      <el-switch v-model="data.children.border"></el-switch>
    </el-form-item>
    <el-form-item label="label">
      <el-input v-model="data.props.label" placeholder="label" clearable></el-input>
    </el-form-item>
    <el-form-item label="value">
      <el-input v-model="data.props.value" placeholder="value" clearable></el-input>
    </el-form-item>
    <el-form-item label="请求地址">
      <el-input v-model="data.children.props.url" type="textarea" placeholder="请求地址" autosize></el-input>
    </el-form-item>
    <el-form-item label="请求方法">
      <el-select v-model="data.children.props.method" placeholder="请求方法" clearable>
        <el-option label="GET" value="get"></el-option>
        <el-option label="POST" value="post"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="分页">
      <el-switch v-model="data.children.props.needPage"></el-switch>
    </el-form-item>
    <el-form-item label="当前页" v-if="data.children.props.needPage">
      <el-input v-model="data.children.props.currentPageKey" placeholder="当前页" clearable></el-input>
    </el-form-item>
    <el-form-item label="每页条数" v-if="data.children.props.needPage">
      <el-input v-model="data.children.props.pageSizeKey" placeholder="每页条数" clearable></el-input>
    </el-form-item>
    <el-form-item label="总条数" v-if="data.children.props.needPage">
      <el-input v-model="data.children.props.totalKey" placeholder="总条数" clearable></el-input>
    </el-form-item>
    <el-form-item label="列表" v-if="data.children.props.needPage">
      <el-input v-model="data.children.props.recordsKey" placeholder="列表" clearable></el-input>
    </el-form-item>
    <el-form-item label="返回层级">
      <el-input v-model="data.children.props.resKey" placeholder="返回层级" clearable></el-input>
    </el-form-item>
    <el-form-item label="自动生成">
      <el-switch v-model="data.children.props.auto"></el-switch>
    </el-form-item>
    <div class="el-form--label-top">
      <div class="el-form-item">
        <label class="el-form-item__label" style="padding: 0;">
          <el-popover
            placement="top-start"
            :width="200"
            trigger="hover"
            content="填写以上配置后会自动生成，若觉得生成的不对请自行修改或关闭自动生成"
          >
            <template #reference>
              <el-link
                href="https://avuejs.com/form/form-input-table.html"
                :underline="false"
                target="_blank"
              >
                onLoad：
                <i class="el-icon-question"></i>
              </el-link>
            </template>
          </el-popover>
        </label>
        <div class="el-form-item__content">
          <monaco-editor
            v-model="onLoad"
            height="200"
            :keyIndex="`table-onload-${data.prop}`"
            :options="options"
          ></monaco-editor>
        </div>
      </div>
      <div class="el-form-item">
        <label class="el-form-item__label" style="padding: 0;">formatter：</label>
        <div class="el-form-item__content">
          <monaco-editor
            v-model="formatter"
            height="200"
            :keyIndex="`table-formatter-${data.prop}`"
            :options="options"
          ></monaco-editor>
        </div>
      </div>
    </div>

    <afd-column ref="column" :column="data.children.column" @submit="handleColumn"></afd-column>
  </div>
</template>
<script>
import MonacoEditor from '../../utils/monaco-editor'
import AfdColumn from './column.vue'

export default {
  name: 'config-table',
  components: { MonacoEditor, AfdColumn },
  props: ['data'],
  watch: {
    'data.prop': {
      handler() {
        const { onLoad, formatter } = this.data
        this.onLoad = onLoad ? onLoad + '' : ''
        this.formatter = formatter ? formatter + '' : ''
      },
      immediate: true
    },
    'data.children.props': {
      handler(val) {
        this.handleOnLoad(val)
      },
      deep: true
    },
    onLoad: {
      handler(val) {
        try {
          this.data.onLoad = eval(val)
        } catch (e) {
          console.error(e)
        }
      }
    }
  },
  data() {
    return {
      options: {
        fullScreen: true,
        minimap: {
          enabled: false,
        },
      },
      onLoad: '',
      formatter: ''
    }
  },
  methods: {
    handleColumn(column) {
      this.data.children.column = column
    },
    handleOnLoad(obj) {
      const { url, method, needPage, currentPageKey, pageSizeKey, totalKey, recordsKey, resKey, auto } = obj
      if (!auto) return
      if (!url) {
        this.onLoad = `(res, cb) => { }`
        return
      }
      let { props } = this.data
      if (!props) props = { label: 'label', value: 'value' }
      const { value } = props
      const onLoad = `(res, cb) => {
        let { page, value, data } = res
        if (!page) page = { currentPage: 1, pageSize: 10 }
        const { currentPage, pageSize } = page
        let params = { ...data, ${currentPageKey || 'current'}: currentPage, ${pageSizeKey || 'page'}: pageSize }
        
        if (value) params['${value}'] = value

        if ('${method || 'get'}' == 'get') params = { params: { ...params } }

        this.$axios['${method}']('${url}', params).then(res => {
          const response = this.getAsVal(res, '${resKey || 'data.data'}')
          if (!response) this.$message.error('未查询到数据或者返回层级配置错误')

          let result = {}
          if (${needPage}) {
            const total = this.getAsVal(response, '${totalKey || 'total'}')
            if (total || total == 0) {
              result.total = total
            } else {
              this.$message.error('总条数配置错误')
              return
            }
            const records = this.getAsVal(response, '${recordsKey || 'records'}')
            if (records) {
              result.data = records
            } else {
              this.$message.error('列表配置错误')
              return
            }
          } else result = { total: response.length, data: response }

          if (value) {
            const records = result.data
            if (records && records.length > 0) cb(records[0])
            else this.$message.error('根据${value}: ' + value + ' 查询不到结果')
          } else cb(result)
        })
      }`
      this.onLoad = onLoad
    },
  }
}
</script>