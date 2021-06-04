## 2021-06-04

### 新增

- 自定义字段新的配置方式
  ```js
  customFields: [{
    title: '部门',
    list: [
      {
        title: '分割线',
        component: 'el-divider',//ele分割线
        span: 24,
        icon: 'el-icon-eleme',
        tips: '看我：自定义属性怎么用？',
        labelWidth: '0px',
        params: {
          html: '<h3 style="color:red">分割线标题</h3>',
          contentPosition: "left",
        }
      },
    ]
  }],
  ```
- 富文本ueditor新的数据结构配置
- 字段默认值配置，相关逻辑可使用 eval('\`' + value + '\`')处理
  ```html

  // vue
  <avue-form-design style="height: 100vh;"
                    :default-values="defaultValues"></avue-form-design>

  // js
  defaultValues: {
    input: [{
      label: '当前操作人部门',
      value: '${this.$store.getters.userInfo.dept_name}'
    }],
    input: [{
      label: '当前操作人姓名',
      value: '${this.$store.getters.userInfo.nick_name}'
    }],
  }
  ```

### 修复

- 子表单没有必填选项的问题
- time、timerange、checkbox拖拽报错的问题

### 依赖

- avue 2.8.12
- avue-plugin-ueditor 0.2.2

## 2021-02-01

### 新增

* 增加标题提示配置 ([913c9f9](https://github.com/sscfaith/avue-form-design/commit/913c9f900858034d20c70fd79ed017534cdb6d83))
* avue 2.7.8 ([7b26c40](https://github.com/sscfaith/avue-form-design/commit/7b26c40cf0bf90b244ca25047348abf868574717))
* select增加选项描述配置 ([363fbde](https://github.com/sscfaith/avue-form-design/commit/363fbde6a07095f4e95d1bcbc35ec7e08658bb3c))


# 2020-11-25

### 修复

* select配置多选报错的问题 ([c355409](https://github.com/sscfaith/avue-form-design/commit/c355409f9c84b611025ab02d1bf733cfacc4281b))
* 静态字典value类型不匹配的问题 ([88620c9](https://github.com/sscfaith/avue-form-design/commit/88620c9b8bbe027cbfc4c468fd9084883f8773b9))

### 新增

* avue 2.7.1 ([e7ed3d0](https://github.com/sscfaith/avue-form-design/commit/e7ed3d0ec811b8607cfd3782d0537ad14ffebe63))
* 增加字段提示配置 ([8795b81](https://github.com/sscfaith/avue-form-design/commit/8795b8170992eb6b19e2ca92eb51209d4d48613b))
* 增加远程字典的dicFlag配置 ([1a13b6d](https://github.com/sscfaith/avue-form-design/commit/1a13b6db5c3fb7ee32bd24a445d5c95e6b36fd68))
* 多个组件的数据类型配置 ([d08513f](https://github.com/sscfaith/avue-form-design/commit/d08513f5e0cbc6ce81c48b2658b1e1b7ee439f2a))

### 优化

* 优化右侧配置展示方式 ([700f468](https://github.com/sscfaith/avue-form-design/commit/700f468e9d60dc6ebfe5f87ab0bb2d1f0633a406))

## 2020-10-29

### 新增

* getData方法增加type参数，可选值'json'/'string'，默认json。 由于json格式的值无法是function，当type为string时返回格式化好的字符串，可直接用于后端保存无需再次处理。并且options属性支持String类型，从后端请求来数据后可直接赋值设计器，也无需再次处理。([95eda5a](https://github.com/sscfaith/avue-form-design/commit/95eda5afc940412757963c566ac6eaead461c7c2))
```js
this.$refs.form.getData('string').then(data => {
  this.$message.success("查看控制台")
  console.log(data) // type为string时获取到的data是字符串，可直接传给后端用于数据库保存。
})
```

## 2020-10-19

### 修复

* 分组中的复制问题 ([09a0de0](https://github.com/sscfaith/avue-form-design/commit/09a0de03e601273e7db24cc77b47fde9dfbd6375))
* 超链接/图片绑定类型错误 ([1334847](https://github.com/sscfaith/avue-form-design/commit/13348476eb2a4b8ad0819bcfb692c19bcf9b6ecc))
* 配置 图标 时错误 ([2197557](https://github.com/sscfaith/avue-form-design/commit/2197557454eaf3b49cb2b721ae3e803ce7e63abd))

## 2020-10-18

#### 更新 [avue 2.6.18 版本](https://avuejs.com/doc/changelog)

#### 新增
- 新增toolbar属性，可控制顶部操作栏显隐。
- 新增toolbar/toolbar-left两个插槽，可自定义顶部操作栏按钮。
- options属性支持Object/String类型。由于function无法使用JSON.parse转化成json，现在可以后台请求来字符串数据后直接赋值。
- 新增getData方法。
```html
<template>
  <avue-form-design ref="form"
                    style="height: 100vh;"
                    :options="options"
                    :toolbar="['import', 'preview', 'clear']">
    <template slot="toolbar-left">
      <el-button type="text"
                  icon="el-icon-download"
                  @click="handleGetData">获取JSON</el-button>
    </template>
  </avue-form-design>
</template>

<script>
export default {
  data() {
    return {
      options: `{ column: [{ type: 'input', label: '输入框', prop: 'input', span: 24, display: true, event: { change: () => { console.log('111') } } }] }`
    }
  },
  methods: {
    handleGetData() {
      this.$refs.form.getData().then(data => {
        this.$message.success("查看控制台")
        console.log(data)
      })
    }
  }
}
</script>

```

#### 修复
- 修复了自定义组件中的js编辑器无法输入的问题。

#### 废弃属性
- showAvueDoc，请使用toolbar属性。

## 2020-09-22

#### 更新 [avue 2.6.16 版本](https://avuejs.com/doc/changelog)

#### 新增

- 🎉🎉🎉 新增customFields属性，支持左侧自定义组件（理论上支持任何已注册的组件的属性和事件配置）。其中自定义组件的事件需要avue 2.6.16的支持。
```html
<template>
    <avue-form-design style="height: 100vh;"
                      :options="options"
                      storage
                      :custom-fields="customFields"></avue-form-design>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      customFields: [
        {
          component: 'el-alert',
          label: '警告',
          span: 24,
          icon: 'el-icon-search',
          params: { // 组件的属性
            title: '标题标题标题标题标题标题标题',
            type: 'success'
          },
          event: { // 组件的事件
            close: () => {
              console.log('111')
            }
          }
        }
      ],
      options: {}
    }
  },
}
</script>

```

## 2020-09-12

#### 新增

- 组件增加includeFields属性，可配置左侧字段显示。如只需展示input组件：
```html
<avue-form-design style="height: 100vh;"
                  :include-fields="['input']"></avue-form-design>
```

## 2020-08-25

#### 修复

- 修复了cascader/checkbox/radio/select/tree配置的属性类型问题。
- 增加了cascader/checkbox/radio/select/tree的字典key配置。

## 2020-08-24

#### 更新 [avue 2.6.15 版本](https://avuejs.com/doc/changelog)

- dynamic组件添加type为form表单模式和index序号控制属性。
- 新增 title/标题 组件。
- 新增左侧字段点击基础功能。

#### 修复

- asideRightWidth不生效的问题 [#27](https://github.com/sscfaith/avue-form-design/issues/27)

## 2020-08-01

#### 新增

- 添加 撤销/重做 功能，并支持键盘快捷键。

## 2020-07-27

#### 更新 [avue 2.6.14 版本](https://avuejs.com/doc/changelog)

#### 新增

- number组件添加controls属性，控制器是否显示。

## 2020-07-23

#### 更新 [avue 2.6.13 版本](https://avuejs.com/doc/changelog)

#### 添加了打包好的js在普通html上使用的例子。详见examples。

## 2020-07-15

#### 更新 [avue 2.6.11 版本](https://avuejs.com/doc/changelog)

#### 新增

- select组件支持联动，[感谢pr](https://github.com/sscfaith/avue-form-design/pull/21)

## 2020-07-14

#### 修复

- 修复number配置校验未生效的问题。
- 修复upload配置文件大小未生效的问题。

#### 新增

- 除dynamic、group外增加字段的change、focus、blur、click事件属性配置。
使用方法如下:
```js
({value, column}) => {
  // TODO
}
```
- 由于json的value值无法是函数，所以生成JSON时<font color=red>无法显示</font>配置的事件属性，通过复制按钮可正常获取。
- <font color=red>！！！导入json时无法导入事件属性，如果有好的提议，欢迎pr！！！</font>

## 2020-07-07

#### Bug 修复

- 修复使用源码时，upload无法使用的问题。
- 修复水印字体颜色未绑定的问题。
- 修复分组配置中，avue-icon-select -> avue-input-icon。
- 修复使用npm组件时，预览时的遮罩层挡住了内容。

## 2020-07-06

#### 更新 [avue 2.6.10 版本](https://avuejs.com/doc/changelog) 

- color组件 -> input-color。
- icon-select组件 -> input-icon。
- 删除avue-plugin-map依赖，使用input-map。

## 2020-06-29

#### 更新 [avue 2.6.8 版本](https://avuejs.com/doc/changelog) 

- 子表单字段支持验证。