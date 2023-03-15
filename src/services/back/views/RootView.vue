<template>
  <!-- <router-view /> -->
  <div>
    <el-container style="height: 100vh; display: flex">
      <el-aside style="width: 16rem">
        <SideMenu />
      </el-aside>
      <div style="height: 100vh; flex: 1;">
        <PageHeader style="z-index: 2;" />
        <el-main>
          <div class="router-view-container">
            <transition name="app-router-view-transition">
              <router-view />
            </transition>
          </div>
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
.router-view-container {
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
}
</style>
