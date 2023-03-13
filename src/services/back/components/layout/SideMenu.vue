<template>
  <el-menu class="app-menu" :default-openeds="defaultOpen" background-color="#545c64" text-color="#fff"
    active-text-color="#ffd04b">
    <template v-for="item in menuList">
      <template v-if="item.children">
        <SideMenuSubMenu :key="item.index" :index="item.index" :menu-item="item" />
      </template>
      <template v-else>
        <SideMenuSingleItem :key="item.index" :index="item.index" :menu-item="item" />
      </template>
    </template>
  </el-menu>
</template>
<script>
import SideMenuSubMenu from './SideMenuSubMenu.vue'
import SideMenuSingleItem from './SideMenuSingleItem.vue'
import menu from '_back/config/menus'


/**
 * 菜单项
 * 注意：含子菜单才声明children属性
 */
export default {
  name: 'SideMenu',
  data() {
    return {
      menuList: [],
      defaultOpen: ['1-1']
    }
  },
  props: ['open'],
  components: { SideMenuSubMenu, SideMenuSingleItem },
  methods: {
    /**
     * 根据当前权限初始化菜单
     */
    initMenuList() {
      // 预处理，添加index
      const genIndex = (lst, parent) => {
        const len = lst.length
        for (let i = 1; i <= len; ++i) {
          let now = lst[i - 1]
          console.log(now);
          now.index = parent ? `${parent}-${i}` : `${i}`
          if (now.children){
            genIndex(now.children, now.index)
          }
        }
        return lst
      }

      this.menuList = genIndex(menu, null)
    }
  },
  beforeMount() {
    this.initMenuList()
  }
}
</script>

<style>
.app-menu {
  height: 100vh;
}
</style>