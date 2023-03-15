<template>
  <router-view />
</template>

<script>
export default {
  name: "ROOT",
  beforeCreate() {
    /* 初始化导航 */
    const initNav = async () => {
      await this.$store.dispatch('nav/init')
      this.$store.dispatch('nav/setCurrentMenuNames', this.$route.fullPath)
      this.$router.beforeEach((to, from, next) => {
        this.$store.dispatch('nav/setCurrentMenuNames', to.fullPath)
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

  // &::-webkit-scrollbar {
  //   width: 5px;
  // }
}

.hide {
  opacity: 0;
}

.remove {
  display: none;
}
</style>