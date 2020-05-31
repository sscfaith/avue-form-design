export default [
  {
    title: '布局字段',
    list: [{
      type: 'group',
      label: '分组',
      icon: 'icon-group',
      display: true,
      arrow: false,
      collapse: true,
      children: {
        column: []
      }
    }, {
      type: 'dynamic',
      label: '子表单',
      icon: 'icon-table',
      span: 24,
      display: true,
      children: {
        align: 'center',
        headerAlign: 'center',
        addBtn: true,
        delBtn: true,
        column: []
      }
    }]
  },
  {
    title: '输入字段',
    list: [{
      type: 'input',
      label: '单行文本',
      icon: 'icon-input',
      span: 24,
      display: true
    }, {
      type: 'password',
      label: '密码',
      icon: 'icon-password',
      span: 24,
      display: true
    }, {
      type: 'textarea',
      label: '多行文本',
      icon: 'icon-textarea',
      span: 24,
      display: true
    }, {
      type: 'number',
      label: '计数器',
      icon: 'icon-number',
      span: 24,
      display: true
    }, {
      type: 'url',
      label: '超链接',
      icon: 'icon-url',
      span: 24,
      display: true
    }, {
      type: 'array',
      label: '数组',
      icon: 'icon-array',
      span: 24,
      display: true,
    }, {
      type: 'img',
      label: '图片',
      icon: 'icon-img',
      span: 24,
      display: true,
    }]
  },
  {
    title: '选择字段',
    list: [{
      type: 'radio',
      label: '单选框组',
      icon: 'icon-radio',
      dicData: [
        { label: '选项一', value: '0' },
        { label: '选项二', value: '1' },
        { label: '选项三', value: '2' },
      ],
      span: 24,
      display: true,
      dicOption: 'static'
    }, {
      type: 'checkbox',
      label: '多选框组',
      icon: 'icon-checkbox',
      dicData: [
        { label: '选项一', value: '0' },
        { label: '选项二', value: '1' },
        { label: '选项三', value: '2' },
      ],
      span: 24,
      display: true,
      dicOption: 'static'
    }, {
      type: 'select',
      label: '下拉选择器',
      icon: 'icon-select',
      dicData: [
        { label: '选项一', value: 0 },
        { label: '选项二', value: 1 },
        { label: '选项三', value: 2 },
      ],
      span: 24,
      display: true,
      dicOption: 'static'
    }, {
      type: 'cascader',
      label: '级联选择器',
      icon: 'icon-link',
      span: 24,
      display: true,
      dicData: [
        {
          label: '选项一',
          value: 0,
          children: [{
            label: '选项1-1',
            value: 11,
          }, {
            label: '选项1-2',
            value: 12,
          }]
        },
        { label: '选项二', value: 1 },
        { label: '选项三', value: 2 },
      ],
      showAllLevels: true,
      dicOption: 'static',
      separator: "/"
    }, {
      type: 'tree',
      label: '树形选择器',
      icon: 'icon-tree',
      span: 24,
      display: true,
      dicOption: 'static',
      dicData: [
        {
          label: '选项一',
          value: 0,
          children: [{
            label: '选项1-1',
            value: 11,
          }, {
            label: '选项1-2',
            value: 12,
          }]
        },
        { label: '选项二', value: 1 },
        { label: '选项三', value: 2 },
      ],
      parent: true
    }]
  },
  {
    title: '上传字段',
    list: [{
      type: 'upload',
      label: '上传',
      icon: 'icon-upload',
      span: 24,
      display: true,
      showFileList: true,
      multiple: true,
      limit: 10,
      props: {},
      propsHttp: {},
      canvasOption: {},
      headers: [],
      data: []
    }],
  },
  {
    title: '日期时间字段',
    list: [{
      type: 'year',
      label: '年',
      icon: 'icon-year',
      span: 24,
      display: true,
      format: 'yyyy',
      valueFormat: 'yyyy'
    }, {
      type: 'month',
      label: '月',
      icon: 'icon-month',
      span: 24,
      display: true,
      format: 'MM',
      valueFormat: 'MM'
    }, {
      type: 'week',
      label: '周',
      icon: 'icon-week',
      span: 24,
      display: true,
      format: 'yyyy 第 WW 周',
    }, {
      type: 'date',
      label: '日期',
      icon: 'icon-date',
      span: 24,
      display: true,
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd'
    }, {
      type: 'time',
      label: '时间',
      icon: 'icon-time',
      span: 24,
      display: true,
      format: 'HH:mm:ss',
      valueFormat: 'HH:mm:ss'
    }, {
      type: 'datetime',
      label: '日期时间',
      icon: 'icon-datetime',
      span: 24,
      display: true,
      format: 'yyyy-MM-dd HH:mm:ss',
      valueFormat: 'yyyy-MM-dd HH:mm:ss'
    }, {
      type: 'daterange',
      label: '日期范围',
      icon: 'icon-date-range',
      span: 24,
      display: true,
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd'
    }, {
      type: 'timerange',
      label: '时间范围',
      icon: 'icon-time-range',
      span: 24,
      display: true,
      format: 'HH:mm:ss',
      valueFormat: 'HH:mm:ss'
    }, {
      type: 'datetimerange',
      label: '日期时间范围',
      icon: 'icon-datetime-range',
      span: 24,
      display: true,
      format: 'yyyy-MM-dd HH:mm:ss',
      valueFormat: 'yyyy-MM-dd HH:mm:ss'
    }],
  },
  {
    title: '插件字段（富文本和坐标拾取器需要单独引入）',
    list: [{
      title: '分割线',
      labelWidth: 40,
      prop: 'divider',
      component: 'elDivider',//ele分割线
      span: 24,
      icon: 'icon-map',
      params: {
        html: '<h3 style="color:red">分割线标题</h3>',
        contentPosition: "left",
      }
    }, {
      title: '日历',
      labelWidth: 40,
      prop: 'calendar',
      icon: 'icon-map',
      component: 'elCalendar',//ele日期
      span: 24,
      params: {

      }
    }, {
      type: 'ueditor',
      component: 'avue-ueditor',
      label: '富文本',
      icon: 'icon-richtext',
      span: 24,
      display: true,
      options: {
        action: '',
        oss: '',
        props: {},
        ali: {},
        qiniu: {}
      }
    }, {
      type: 'map',
      component: 'avue-map',
      label: '坐标拾取器',
      icon: 'icon-map',
      span: 24,
      display: true,
    }],
  },
  {
    title: '其他字段',
    list: [{
      type: 'switch',
      label: '开关',
      icon: 'icon-switch',
      span: 24,
      display: true,
      value: 0,
      dicData: [{ label: '', value: '0' }, { label: '', value: '1' }]
    }, {
      type: 'rate',
      label: '评价',
      icon: 'icon-star',
      span: 24,
      display: true,
      max: 5,
      value: 0,
      texts: ['极差', '失望', '一般', '满意', '惊喜'],
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
    }, {
      type: 'slider',
      label: '滑块',
      icon: 'icon-slider',
      span: 24,
      display: true,
      min: 0,
      max: 10
    }, {
      type: 'color',
      label: '颜色选择器',
      icon: 'icon-color',
      span: 24,
      display: true
    }]
  }
]
