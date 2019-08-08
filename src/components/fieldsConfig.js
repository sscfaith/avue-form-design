export default [{
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
  },]
}, {
  title: '选择字段',
  list: [
    {
      type: 'radio',
      label: '单选框组',
      icon: 'icon-radio',
      dicData: [
        { label: '选项一', value: 0 },
        { label: '选项二', value: 1 },
        { label: '选项三', value: 2 },
      ],
      span: 24,
      display: true
    }, {
      type: 'checkbox',
      label: '多选框组',
      icon: 'icon-checkbox',
      dicData: [
        { label: '选项一', value: 0 },
        { label: '选项二', value: 1 },
        { label: '选项三', value: 2 },
      ],
      span: 24,
      display: true,
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
      display: true
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
      separator: "/"
    }, {
      type: 'tree',
      label: '树形选择器',
      icon: 'icon-tree',
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
    },
  ]
}, {
  title: '日期时间字段',
  list: [
    {
      type: 'time',
      label: '时间选择器',
      icon: 'icon-time',
      span: 24,
      display: true
    }, {
      type: 'date',
      label: '日期选择器',
      icon: 'icon-date',
      span: 24,
      display: true
    },
  ]
}, {
  title: '其他字段',
  list: [
    {
      type: 'switch',
      label: '开关',
      icon: 'icon-switch',
      span: 24,
      display: true,
      valueDefault: 0,
      dicData: [{ label: '', value: '0' }, { label: '', value: '1' }]
    }, {
      type: 'rate',
      label: '评价',
      icon: 'icon-star',
      span: 24,
      display: true,
      max: 5,
      valueDefault: 0,
      texts: ['极差', '失望', '一般', '满意', '惊喜'],
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
    }, {
      type: 'silder',
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
    },
  ]
}]
