<template>
  <el-menu-item :index="menuItem.path">
    <div style="display: flex; justify-content: space-between;">
      <font-awesome-icon v-if="menuItem.menuIcon" :name="menuItem.menuIcon"/>
      <span>{{ menuItem.menuName }}</span>
    </div>
  </el-menu-item>
</template>
<script>
export default {
  name: 'SingleMenuItemRecur',
  props: ['menuItem', 'index'],
  methods: {
    goTo(){
      this.menuItem.path && this.$router.push(this.menuItem.path)
    }
  }
}
</script>