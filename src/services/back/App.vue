<template>
  <div>
    <!-- <p>This is backstage page</p>
    <button @click="exit">登出</button> -->
    <el-container style="height: 100vh">
      <el-aside>
        <SideMenu />
      </el-aside>
      <el-main>
        <font-awesome-icon icon="fa-solid fa-house" />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { goToLoginPage } from '@/api/go'
import SideMenu from './components/layout/SideMenu.vue';

export default {
  name: "ROOT",
  components: { SideMenu },
  methods: {
    exit: () => goToLoginPage()
  },
  beforeCreate(){
    
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
</style>