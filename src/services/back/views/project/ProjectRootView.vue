<template>
  <div>
    <router-view />
    <slot></slot>
  </div>
</template>
<script>
// 二级路由便于控制统一外部样式
export default {
  name: "ProjectRootView",
};
</script>

<style lang="scss"></style>
