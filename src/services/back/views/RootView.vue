<template>
  <!-- <router-view /> -->
  <div>
    <el-container style="height: 100vh; display: flex">
      <el-aside style="width: 16rem">
        <SideMenu />
      </el-aside>
      <div style="height: 100vh; flex: 1;">
        <PageHeader style="z-index: 2;" />
        <el-main class="app-main">
          <transition name="app-router-view-transition">
            <router-view />
          </transition>
        </el-main>
      </div>
    </el-container>
  </div>
</template>

<script>
import SideMenu from '_back/components/layout/SideMenu.vue'
import PageHeader from '_back/components/layout/PageHeader.vue'

export default {
  name: "ROOT",
  components: { SideMenu, PageHeader },
}
</script>

<style lang="scss">
.app-router-view-transition {
  &-enter-active {
    transition: all .3s;
  }

  &-enter {
    transform: translateY(-30%);
    opacity: .3;
  }

}

.app-main {
  box-sizing: border-box;
  width: 100%;
  padding: var(--app-basic-size)!important;
}
</style>
