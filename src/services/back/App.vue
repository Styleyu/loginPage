<template>
  <div>
    <el-container style="height: 100vh; display: flex">
      <el-aside style="width: 16rem">
        <SideMenu />
      </el-aside>
      <div style="height: 100vh; flex: 1;">
        <PageHeader style="z-index: 2;" />
        <el-main>
          <transition name="app-router-view-transition">
            <router-view />
          </transition>
        </el-main>
      </div>
    </el-container>
  </div>
</template>

<script>
import SideMenu from './components/layout/SideMenu.vue'
import PageHeader from './components/layout/PageHeader.vue'

export default {
  name: "ROOT",
  components: { SideMenu, PageHeader },
  methods: {

  },
  beforeCreate() {
    /* 初始化导航 */
    const initNav = async () => {
      await this.$store.dispatch('nav/init')
      this.$store.dispatch('nav/setCurrentLocation', this.$route.fullPath)
      this.$router.beforeEach((to, from, next) => {
        this.$store.dispatch('nav/setCurrentLocation', to.fullPath)
        next()
      })
    }
    this.$router.onReady(initNav)
  },
  mounted() {
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

:root {
  --shadow: 1px 1px 10px rgba(226, 226, 226, 0.5);
  --app-header: 10vh;
  --app-radius: 5px;
  --app-basic-size: 15px;
  font-size: var(--app-basic-size);
  color: rgb(62, 62, 62);
  font-family: sans-serif;
}

.hide {
  opacity: 0;
}

.remove {
  display: none;
}

.app-router-view-transition {
  &-enter-active {
    transition: all .3s;
  }

  &-enter {
    transform: translateY(-30%);
    opacity: .3;
  }

}
</style>