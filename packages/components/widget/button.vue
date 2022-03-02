<template>
  <div class="widget-button">
    <el-button
      v-if="['group'].includes(type)"
      class="clear"
      title="清空"
      circle
      plain
      size="small"
      type="warning"
      :icon="Brush"
      @click.stop="$emit('clear')"
    ></el-button>
    <el-button
      class="delete"
      title="删除"
      circle
      plain
      size="small"
      type="danger"
      :icon="Delete"
      @click.stop="$emit('delete')"
    ></el-button>
    <el-button
      class="copy"
      title="复制"
      circle
      plain
      size="small"
      type="primary"
      :icon="CopyDocument"
      @click.stop="$emit('copy')"
    ></el-button>
  </div>
</template>

<script setup>
import { Brush, CopyDocument, Delete } from '@element-plus/icons-vue'
import { computed, toRefs } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: 'item'
  }
})
defineEmits(['copy', 'delete', 'clear'])

const { type } = toRefs(props)
const style = computed(() => {
  let right = 0;
  let bottom = 0;
  switch (type.value) {
    case 'group-item':
      right = 0;
      bottom = -22;
      break;
    case 'table-item':
      right = 0;
      bottom = 0;
      break;
    case 'group':
      right = 15;
      bottom = -10;
      break;
    default:
      right = 0;
      bottom = -30;
      break;
  }
  return {
    right: `${right}px`,
    bottom: `${bottom}px`
  }
})

</script>
<style lang="scss" scoped>
.widget-button {
  .el-button {
    position: absolute;
    z-index: 1002;
    min-height: 24px;
    padding: 5px;
  }
  .delete {
    right: v-bind("style.right");
    bottom: v-bind("style.bottom");
  }

  .copy {
    right: calc(v-bind("style.right") + 30px);
    bottom: v-bind("style.bottom");
  }

  .clear {
    right: calc(v-bind("style.right") + 60px);
    bottom: v-bind("style.bottom");
  }
}
</style>