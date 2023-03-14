<template>
  <el-submenu :index="menuItem.path || ''">
    <template slot="title">
      <div style="display: flex; justify-content: space-between;">
        <font-awesome-icon v-if="menuItem.menuIcon" :name="menuItem.menuIcon" />
        <span>{{ menuItem.menuName }}</span>
      </div>
    </template>
    <!-- children -->
    <template v-for="item, index in menuItem.children">
      <template v-if="item.children">
        <SideMenuSubMenu :key="index" :index="item.path" :menu-item="item" />
      </template>
      <template v-else>
        <SideMenuSingleItem :key="index" :index="item.path" :menu-item="item" />
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
