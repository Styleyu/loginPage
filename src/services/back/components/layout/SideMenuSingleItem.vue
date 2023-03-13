<template>
  <el-menu-item :key="menuItem.index" :index="menuItem.index">
    {{ menuItem.name }}
  </el-menu-item>
</template>
<script>
export default {
  name: 'SingleMenuItemRecur',
  props: ['menuItem', 'index']
}
</script>