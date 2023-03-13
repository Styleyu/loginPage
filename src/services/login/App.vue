<template>
  <div>
    <!-- <p>This is a login page</p>
    <button @click="login">登录</button> -->
  </div>
</template>

<script>
import { api } from '@/api/axios'

// import { goToBackPage } from '@/api/go'

export default {
  name: 'ROOT',
  data() {
    return {
      
    }
  },
  methods: {
    login(){
      api('ok').then(data => {
        console.log(data);
      }).catch(err => {
        console.error(err);
      })
      // goToBackPage()
    }
  }  
}
</script>

<style lang="scss">
*{
  padding: 0;
  margin: 0;
}
</style>