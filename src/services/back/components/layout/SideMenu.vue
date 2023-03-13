<template>
  <el-menu class="app-menu" router :default-openeds="defaultOpeneds" :default-active="defaultActive" mode="vertical"
    :collapse="false">
    <template v-for="item in menuList">
      <template v-if="item.children">
        <SideMenuSubMenu :key="item.index" :index="item.path" :menu-item="item" />
      </template>
      <template v-else>
        <SideMenuSingleItem :key="item.index" :index="item.path" :menu-item="item" />
      </template>
    </template>
  </el-menu>
</template>
<script>
import SideMenuSubMenu from './SideMenuSubMenu.vue'
import SideMenuSingleItem from './SideMenuSingleItem.vue'
import menus from '_back/config/menus'


/**
 * 菜单项
 * 注意：含子菜单才声明children属性
 */
export default {
  name: 'SideMenu',
  data() {
    return {
      menuList: [],
      defaultOpeneds: []
    }
  },
  props: ['open'],
  computed: {
    defaultActive() {
      return this.$route.fullPath
    },
  },
  components: { SideMenuSubMenu, SideMenuSingleItem },
  methods: {
    /**
     * 根据当前权限初始化菜单
     */
    initMenuList() {
      let openeds = []
      menus.forEach(i => openeds.push(i.path))

      this.menuList = menus
      this.defaultOpeneds = openeds
    }
  },
  created() {
    this.initMenuList()
  },
  mounted() {

  }
}
</script>

<style>
.app-menu {
  height: 100vh;
}
</style>