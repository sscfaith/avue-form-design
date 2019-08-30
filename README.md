## 简介

本项目是一款基于 <a href="https://avuejs.com/" target="_blank">Avue</a> 的表单设计器，拖拽式操作让你快速构建一个表单。

## 依赖

element-ui 2.11.0+

```sh
$ npm i element-ui
```

@smallwei/avue 2.1.0+

```sh
$ npm i @smallwei/avue
```

或自行引入cdn

## 安装

### 组件

```sh
$ npm i avue-form-design
或
$ yarn add avue-form-design
```

### 源码

<a href="https://github.com/sscfaith/avue-form-design" target="_blank">github</a>

```sh
$ yarn
$ yarn serve
```

## 使用

```
import AvueFormDesign from 'avue-form-design'

Vue.prototype.$ELEMENT = { size: 'small' }
Vue.use(AvueFormDesign)
```

```
<avue-form-design :options="options"
                  :aside-left-width="270"
                  :aside-right-width="380"
                  storage
                  @submit="handleSubmit"><avue-from-design>
```

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| options | 字段配置 | Object | { column: [] } |
| storage | 开启本地存储功能，防止浏览器刷新丢失json | Boolean | false |
| asideLeftWidth | 左工具栏宽度 | String/Number | '270px' |
| asideRightWidth | 右工具栏宽度 | String/Number | '380px' |

### options字段配置

<a href="https://avuejs.com/doc/form/form-doc" target="_blank">Avue文档</a>

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| ------| ------ | ------ | ------ | ------ |
| column | Avue字段 | Array | - | [] |
| labelPosition | 字段位置 |  String | 'left'/'center'/'right' | 'left' |
| labelWidth | 字段宽度 | Number | - | 120 |
| gutter | 字段间隔 | Number | - | 0 |
| menuBtn | 表单按钮 | Boolean | true/false | false |
| menuPosition | 表单按钮位置 | String | 'left'/'center'/'right' | 'center'
| submitBtn | 显示提交按钮 | Boolean | true/false | false |
| submitSize | 提交按钮大小 | String | 'medium'/'small'/'mini' | 'medium' |
| submitText | 提交按钮文本 | String | - | '提交' |
| emptyBtn | 显示清空按钮 | Boolean | true/false | false |
| emptySize | 清空按钮大小 | String | 'medium'/'small'/'mini' | 'medium' |
| emptyText | 清空按钮文本 | String | - | '清空' |

### 事件

| 名称 | 说明 | 回调参数 |
| ------ | ------ | ------ |
| submit | 生成json回调 | 当前配置的json |

### Avue插件

#### 富文本

```
import AvueUeditor from 'avue-plugin-ueditor'

Vue.use(AvueUeditor)
```

#### 坐标拾取器

```
import AvueMap from 'avue-plugin-map'

Vue.use(AvueMap)
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
<img src="http://112.74.43.150/images/donate.png">

## License

<a href="https://opensource.org/licenses/MIT" target="_blank">MIT</a>
