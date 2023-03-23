<template>
	<el-drawer
		v-model="visible"
		title="表单预览"
		size="50%"
		class="afd-drawer"
		append-to-body
		destroy-on-close
	>
		<avue-form
			v-if="option.column && option.column.length > 0"
			ref="form"
			v-model="form"
			:option="option"
			@submit="handleSubmit"
		></avue-form>
		<span class="afd-drawer__footer">
			<el-button @click="handleSubmit" type="primary">确定</el-button>
			<el-button @click="hide">取消</el-button>
		</span>
	</el-drawer>
</template>

<script>
import useTransform from "../../../composables/use-transform";

export default {
	setup() {
		const { transformToAvueOptions } = useTransform();
		return {
			transformToAvueOptions,
		};
	},
	data() {
		return {
			option: { column: [] },
			form: {},
			visible: false,
		};
	},
	methods: {
		show(data) {
			this.transformToAvueOptions(data, true).then((res) => {
				this.option = res;
				this.visible = true;
			});
		},
		hide() {
			this.visible = false;
		},
		handleSubmit(form, done) {
			if (done) {
				this.$alert(form)
					.then(() => {
						done();
					})
					.catch(() => {
						done();
					});
			} else {
				this.$refs.form.validate((valid, done) => {
					if (valid)
						this.$alert(this.form)
							.then(() => {
								done();
							})
							.catch(() => {
								done();
							});
				});
			}
		},
	},
};
</script>
