<template>
  <div>
    <Login />
  </div>
</template>

<script>
import { api } from '@/api/axios'
import Login from "_login/Login";

// import { goToBackPage } from '@/api/go'

export default {
  name: 'ROOT',
  components: {Login},
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
