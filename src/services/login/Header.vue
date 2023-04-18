<template>
   <header>
      <div class="center">
        <div class="logo_box">
          <img src="../../assets/logocuitv2.jpg" alt="">
        </div>
      </div>
    </header>
</template>

<script>
export default {
    name:'Header',
    data() {
        return {
            
        }
    },
}
</script>

<style scoped>
header{
  width: 100%;

}

.center{
  width: 1200px;
  margin: 0 auto;
}

.logo_box{
  margin: 16px 0px;
  float: left;
}
</style>