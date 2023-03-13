<template>
  <el-submenu :index="index">
    <template slot="title">{{ menuItem.name }}</template>
    <!-- children -->
    <template v-for="item in menuItem.children">
      <template v-if="item.children">
        <SideMenuSubMenu :key="item.index" :index="item.index" :menu-item="item" />
      </template>
      <template v-else>
        <SideMenuSingleItem :key="item.index" :index="item.index" :menu-item="item" />
      </template>
    </template>
  </el-submenu>
</template>
<script>
import SideMenuSingleItem from './SideMenuSingleItem.vue'
import SideMenuSubMenu from './SideMenuSubMenu.vue'
export default {
  name: 'SubMenuRecur',
  props: ['menuItem', 'index'],
  components: { SideMenuSubMenu, SideMenuSingleItem }
}
</script>
