# 简介

本项目是一款基于 <a href="https://avuejs.com/" target="_blank">Avue</a> 的表单设计器，拖拽式操作让你快速构建一个表单。

# 安装

## 组件

```sh
$ npm i avue-form-design
或
$ yarn add avue-form-design
```

## 源码

<a href="https://git.avuejs.com/avue/avue-form" target="_blank">下载</a>

```sh
$ yarn
$ yarn serve
```

# 使用

```
import AvueFormDesign from 'avue-form-design'

Vue.use(AvueFormDesign)
```

```
<avue-form-design :options="options"
                  :aside-left-width="270"
                  :aside-right-width="380"
                  storage></avue-from-design>
```

## 属性

| 参数 | 说明 | 类型 | 默认值 |
| ------ | ------ | ------ | ------ |
| options | 字段配置 | Object | { column: [] } |
| storage | 开启本地存储功能，防止浏览器刷新丢失json | Boolean | false |
| asideLeftWidth | 左工具栏宽度 | String/Number | '270px' |
| asideRightWidth | 右工具栏宽度 | String/Number | '380px' |

## options字段配置

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

## 事件

| 名称 | 说明 | 回调参数 |
| ------ | ------ | ------ |
| submit | 生成json回调 | 当前配置的json |

# License

<a href="https://git.avuejs.com/avue/avue-form/src/master/LICENSE" target="_blank">MIT</a>
