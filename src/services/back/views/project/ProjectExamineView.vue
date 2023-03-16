<template>
  <div id="reviewedProjects">
    <p>亲爱的**领导,您好!您还有{{ reviewedProjects }}个项目待审核</p>
  </div>
</template>
<script>
export default {
  mounted() {
    this.init()
  },
  methods: {
    init(){
      this.reviewedProjects=3
    }
  },
  data() {
    return {
      reviewedProjects: 0,
      chosenIndex: 0 // 标记，用户选中的步骤序号
    };
  },


}
</script>
    <!-- TODO -->
  
<style lang="scss"></style>