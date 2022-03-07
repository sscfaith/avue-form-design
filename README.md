## 简介

[Vue3版本](https://github.com/sscfaith/avue-form-design/tree/3.x)，因Avue还存在部分bug，请慎重使用。

本项目是一款基于 <a href="https://avuejs.com/" target="_blank">Avue</a> 的表单设计器，拖拽式操作让你快速构建一个表单。

:tada: 基于Bladex的工作流插件已上市。[授权地址](https://bladex.vip/#/market/flow)<br/>
[表单设计器预览地址](https://form.nutflow.vip)<br>
[流程设计器预览地址](https://bpmn.nutflow.vip)<br>
[工作流插件预览地址](https://demo1.nutflow.vip)

## 文档及demo项目
[Wiki](../../wikis)

## 依赖

element-ui 2.13.2+

```sh
$ npm i element-ui
```

@smallwei/avue 2.6.16+

```sh
$ npm i @smallwei/avue
```

或自行引入cdn

## 安装

### 组件

```sh
$ npm i @sscfaith/avue-form-design
或
$ yarn add @sscfaith/avue-form-design
```

### 源码

<a href="https://github.com/sscfaith/avue-form-design" target="_blank">github</a> or
<a href="https://gitee.com/sscgh/avue-from-design" target="_blank">gitee</a>

```sh
$ yarn
$ yarn serve
```

### html

详见examples

## 使用

```
import AvueFormDesign from '@sscfaith/avue-form-design'

Vue.use(AvueFormDesign)
```

```
<avue-form-design style="height: 86vh;"
                  :options="options"
                  storage
                  @submit="handleSubmit"></avue-form-design>
```

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| options | 字段配置 | Object/String | { column: [] } |
| storage | 开启本地存储功能，防止浏览器刷新丢失json | Boolean | false |
| asideLeftWidth | 左工具栏宽度 | String/Number | '270px' |
| asideRightWidth | 右工具栏宽度 | String/Number | '380px' |
| showAvueDoc（已废弃，请使用toolbar） | 是否显示Avue文档 | Boolean | false |
| showGithubStar | 是否显示GitHub Star | Boolean | true |
| toolbar | 顶部工具栏 | Array | ['avue-doc', 'import', 'generate', 'preview', 'clear'] |
| undoRedo | 是否开启撤销重做功能 | Boolean | true |
| includeFields | 左侧展示字段 | Array | fieldsConfig.js中配置的字段 |
| customFields | 自定义组件 | Array | [使用方法](https://github.com/sscfaith/avue-form-design/blob/master/CHANGELOG.md#2020-09-22) |

### options字段配置

<a href="https://avuejs.com/form/form.html" target="_blank">Avue文档</a>

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| ------| ------ | ------ | ------ | ------ |
| column | Avue字段 | Array | - | [] |
| labelPosition | 字段位置 |  String | 'left'/'center'/'right' | - |
| labelWidth | 字段宽度 | Number | - | - |
| gutter | 字段间隔 | Number | - | 0 |
| menuBtn | 表单按钮 | Boolean | true/false | true |
| submitBtn | 显示提交按钮 | Boolean | true/false | true |
| submitText | 提交按钮文本 | String | - | '提交' |
| emptyBtn | 显示清空按钮 | Boolean | true/false | true |
| emptyText | 清空按钮文本 | String | - | '清空' |
| tabs | 多分组转标签 | Boolean | true/false | false |
| detail | 详情模式 | Boolean | true/false | false |
| readonly | 全局只读 | Boolean | true/false | false |
| disabled | 全局禁用 | Boolean | true/false | false |

### 事件

| 名称 | 说明 | 回调参数 |
| ------ | ------ | ------ |
| submit | 生成json回调 | 当前配置的json |

### 方法

| 名称 | 说明 | 参数 | 返回 |
| ------ | ------ | ------ | ------ |
| getData | 获取当前编辑器的JSON | type: 'string'/'json' | Promise |

### 插槽
| 名称 | 说明 |
| ------ | ------ | 
| toolbar | 顶部工具栏右侧插槽 | 
| toolbar-left | 顶部工具栏左侧插槽 | 

### Avue插件

#### 富文本

```
import AvueUeditor from 'avue-plugin-ueditor'

Vue.use(AvueUeditor)
```

## 打包

### 组件

```sh
$ yarn lib
```

### 源码

```sh
$ yarn build
```

## 捐赠
如果你觉得本项目帮助到你的话，可以给作者买杯咖啡。
<img src="https://form.beta.kim/donate.png">

## License

<a href="https://opensource.org/licenses/MIT" target="_blank">MIT</a>
