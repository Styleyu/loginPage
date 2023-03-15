<template>
  <!-- <el-steps :active="2" align-center>
  <el-step title="步骤1" description="这是一段很长很长很长的描述性文字"></el-step>
  <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
  <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
  <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
</el-steps> -->


  <div>
    <el-steps :active="activeIndex" finish-status="success" simple style="margin-top: 20px">
    <el-step title="步骤 1" @click.native="setActiveIndex(1)"></el-step>
    <el-step title="步骤 2" @click.native="setActiveIndex(2)"></el-step>
    <el-step title="步骤 3" @click.native="setActiveIndex(3)"></el-step>
    <el-step title="步骤 4" @click.native="setActiveIndex(4)"></el-step>
  </el-steps>
    <el-divider></el-divider>
    <div>flag 值为：{{ flag }}</div>
  </div>
</template>
  <script>
  export default{
    data() {
    return {
      activeIndex: 1, // 默认为第1步
      flag: null // 标记，用户选中的步骤序号
    };
  },
    mounted(){

    },
    methods: {
      setActiveIndex(index) {
      this.activeIndex = index;
      this.flag = index;
    }

  },



    
  }
  </script>
  <!-- TODO -->

  <style  lang="scss">

  </style>