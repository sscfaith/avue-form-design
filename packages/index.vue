<template>
	<div class="avue-form-design">
		<el-container>
			<el-aside :width="leftAsideWidth">
				<!-- 左侧字段区 -->
				<afd-field
					:include-fields="includeFields"
					:custom-fields="customFields"
					@field-click="handleFieldClick"
				></afd-field>
			</el-aside>
			<el-container direction="vertical">
				<!-- 头部工具栏 -->
				<afd-toolbar
					:toolbar="toolbar"
					:undo-redo="undoRedo"
					:show-github-star="showGithubStar"
					:history-steps="historySteps"
					@undo="widget.option = handleUndo()"
					@redo="widget.option = handleRedo()"
					@import="$refs.importDrawer.show()"
					@generate="handleGenerateJson"
					@preview="handlePreview"
					@clear="handleClear"
				>
					<template #toolbar-left><slot name="toolbar-left"></slot> </template>
					<template v-slot:toolbar-right
						><slot name="toolbar-right"></slot
					></template>
				</afd-toolbar>
				<!-- 主设计区 -->
				<afd-widget
					ref="widgetForm"
					:data="widget.option"
					v-model:select="widget.select"
					@change="handleHistoryChange(widget.option)"
				></afd-widget>
			</el-container>
			<el-aside :width="rightAsideWidth">
				<!-- 右侧设计区 -->
				<afd-config
					:form="widget.option"
					:widget-select="widget.select"
					:default-values="defaultValues"
				></afd-config>
			</el-aside>
		</el-container>

		<!-- 导入JSON弹窗 -->
		<afd-import-drawer
			ref="importDrawer"
			@submit="handleImportJson"
		></afd-import-drawer>
		<!-- 生成JSON弹窗 -->
		<afd-generate-drawer ref="generateDrawer"></afd-generate-drawer>
		<!-- 预览弹窗 -->
		<afd-preview-drawer ref="previewDrawer"></afd-preview-drawer>
	</div>
</template>

<script>
import widgetEmptyImg from "./assets/widget-empty.png"; // 空白图片
import AfdField from "./components/field/index.vue"; // 左侧字段区
import AfdToolbar from "./components/toolbar/index.vue"; // 顶部工具栏
import AfdWidget from "./components/widget/index.vue"; // 中间主设计区
import AfdConfig from "./components/config/index.vue"; // 右侧配置区

import AfdImportDrawer from "./components/widget/drawer/import.vue"; // 导入弹窗
import AfdGenerateDrawer from "./components/widget/drawer/generate.vue"; // 生成弹窗
import AfdPreviewDrawer from "./components/widget/drawer/preview.vue"; // 预览弹窗

import useTransform from "./composables/use-transform"; // json转换
import useHistory from "./composables/use-history"; // 历史记录
import beautifier from "./utils/json-beautifier";
export default {
	name: "avue-form-design",
	components: {
		AfdField,
		AfdToolbar,
		AfdWidget,
		AfdConfig,
		AfdImportDrawer,
		AfdGenerateDrawer,
		AfdPreviewDrawer,
	},
	props: {
		options: {
			type: [Object, String],
			default: () => {
				return {
					column: [],
				};
			},
		},
		storage: {
			type: Boolean,
			default: false,
		},
		asideLeftWidth: {
			type: [String, Number],
			default: "270px",
		},
		asideRightWidth: {
			type: [String, Number],
			default: "380px",
		},
		showGithubStar: {
			type: Boolean,
			default: false,
		},
		toolbar: {
			type: Array,
			default: () => {
				return ["import", "generate", "preview", "clear"];
			},
		},
		undoRedo: {
			type: Boolean,
			default: true,
		},
		includeFields: {
			type: Array,
		},
		customFields: {
			type: Array,
		},
		defaultValues: {
			type: Object,
		},
	},
	watch: {
		options: {
			handler() {
				this.handleLoadStorage();
			},
			deep: true,
			immediate: true,
		},
	},
	setup() {
		const {
			historySteps,
			initHistory,
			handleHistoryChange,
			handleUndo,
			handleRedo,
		} = useHistory();
		const { transformToAvueOptions, transAvueOptionsToFormDesigner } =
			useTransform();
		return {
			historySteps,
			initHistory,
			handleHistoryChange,
			handleUndo,
			handleRedo,
			transformToAvueOptions,
			transAvueOptionsToFormDesigner,
		};
	},
	computed: {
		leftAsideWidth() {
			if (typeof this.asideLeftWidth == "string") {
				return this.asideLeftWidth;
			} else {
				return `${this.asideLeftWidth}px`;
			}
		},
		rightAsideWidth() {
			if (typeof this.asideRightWidth == "string") {
				return this.asideRightWidth;
			} else {
				return `${this.asideRightWidth}px`;
			}
		},
	},
	data() {
		return {
			widgetEmptyImg,
			form: {},
			option: { column: [] },
			widget: {
				option: {
					column: [],
					labelPosition: "left",
					labelSuffix: "：",
					labelWidth: 120,
					gutter: 0,
					menuBtn: true,
					submitBtn: true,
					submitText: "提交",
					emptyBtn: true,
					emptyText: "清空",
					menuPosition: "center",
				},
				select: {},
			},
		};
	},
	methods: {
		// 初始化数据
		handleLoadStorage() {
			let option = this.deepClone(this.options);
			if (typeof option == "string") {
				option = eval("(" + option + ")");
			}
			if (!option.column) option.column = [];
			this.transAvueOptionsToFormDesigner({
				...this.widget.option,
				...option,
			}).then((res) => {
				this.widget.option = this.initHistory({
					index: 0,
					maxStep: 20,
					steps: [res],
					storage: this.storage,
				});
			});
		},
		// 绑定键盘事件
		handleBindKeyBoard() {
			if (this.undoRedo) {
				window.addEventListener(
					"keydown",
					(evt) => {
						// 监听 cmd + z / ctrl + z 撤销
						if (
							(evt.metaKey && !evt.shiftKey && evt.keyCode == 90) ||
							(evt.ctrlKey && !evt.shiftKey && evt.keyCode == 90)
						) {
							this.widget.option = this.handleUndo();
						}

						// 监听 cmd + shift + z / ctrl + shift + z / ctrl + y 重做
						if (
							(evt.metaKey && evt.shiftKey && evt.keyCode == 90) ||
							(evt.ctrlKey && evt.shiftKey && evt.keyCode == 90) ||
							(evt.ctrlKey && evt.keyCode == 89)
						) {
							this.widget.option = this.handleRedo();
						}
					},
					false
				);
			}
		},
		// 左侧字段点击
		handleFieldClick(item) {
			const activeIndex =
				this.widget.option.column.findIndex(
					(c) => c.prop == this.widget.select.prop
				) + 1;
			let newIndex = 0;
			if (activeIndex == -1) {
				this.widget.option.column.push(item);
				newIndex = this.widget.option.column.length - 1;
			} else {
				this.widget.option.column.splice(activeIndex, 0, item);
				newIndex = activeIndex;
			}

			this.$refs.widgetForm.handleWidgetAdd({ newIndex });
		},
		// 导入JSON
		handleImportJson(json, done) {
			if (!json) return;
			try {
				this.transAvueOptionsToFormDesigner(json).then((data) => {
					this.widget.option = data;
					this.handleHistoryChange(data);
					done();
				});
			} catch (e) {
				this.$message.error(e.message);
			}
		},
		// 生成JSON
		handleGenerateJson() {
			this.transformToAvueOptions(this.widget.option).then((data) => {
				this.$refs.generateDrawer.show(data);
			});
		},
		// 预览
		handlePreview() {
			if (!this.widget.option.column || this.widget.option.column.length == 0)
				this.$message.error("没有需要展示的内容");
			else this.$refs.previewDrawer.show(this.widget.option);
		},
		// 清空
		handleClear() {
			if (
				this.widget.option &&
				this.widget.option.column &&
				this.widget.option.column.length > 0
			) {
				this.$confirm("确定要清空吗？", "警告", {
					type: "warning",
				})
					.then(() => {
						this.widget.option.column = [];
						this.form = {};
						this.widget.select = {};
						this.handleHistoryChange(this.widget.option);
					})
					.catch(() => {});
			} else this.$message.error("没有需要清空的内容");
		},
		async getData(type = "json", option = {}) {
			if (type == "string") {
				return beautifier(
					await this.transformToAvueOptions(this.widget.option),
					{
						minify: true,
						...option,
					}
				);
			} else if (type == "app") {
				const option = await this.transformToAvueOptions(this.widget.option);
				this.parseJson(option);
				return option;
			} else return await this.transformToAvueOptions(this.widget.option);
		},
		parseJson(jsonObj) {
			// 循环所有键
			for (var key in jsonObj) {
				//如果对象类型为object类型且数组长度大于0 或者 是对象 ，继续递归解析
				var element = jsonObj[key];
				if (
					(element && element.length > 0 && typeof element == "object") ||
					typeof element == "object"
				) {
					this.parseJson(element);
				} else if (typeof element == "function") {
					jsonObj[key] = element + "";
				}
			}
		},
	},
};
</script>

<style lang="scss">
@import "./styles/index.scss";
</style>
