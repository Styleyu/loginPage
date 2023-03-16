<template>
  <!-- <el-steps :active="2" align-center>
  <el-step title="步骤1" description="这是一段很长很长很长的描述性文字"></el-step>
  <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
  <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
  <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
  </el-steps> -->
  <div>
    <el-steps :active="activeIndex-1" finish-status="success" simple style="margin-top: 50px">
      <el-step title="项目提交" @click.native="setChosenIndex(1)">
      </el-step>
      <el-step title="班级审核" @click.native="setChosenIndex(2)">
      </el-step>
      <el-step title="年级审核" @click.native="setChosenIndex(3)">
      </el-step>
      <el-step title="学院审核" @click.native="setChosenIndex(4)">
      </el-step>
    </el-steps>
    <el-divider>
    </el-divider>
    <div>chosenIndex 值为：{{ chosenIndex }}</div>
    <!-- <div>activeIndex 值为：{{ activeIndex }}</div> -->
    <!-- TODO 点击以上节点可以查看相应节点的审核状态-->
	  <!-- TODO 节点做成按钮状-->
    <div>
      <el-descriptions class="margin-top"  :column="3" :size="size" border>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        用户名
      </template>
      kooriookami
    </el-descriptions-item>

    <div v-show="chosenIndex===2">
      <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-mobile-phone"></i>
        手机号
      </template>
      18100000000
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-location-outline"></i>
        居住地
      </template>
      苏州市
    </el-descriptions-item>
    </div>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-tickets"></i>
        备注
      </template>
      <el-tag size="small">学校</el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-office-building"></i>
        联系地址
      </template>
      江苏省苏州市吴中区吴中大道 1188 号
    </el-descriptions-item>
  </el-descriptions>
    </div>

  </div>
</template>
<script>export
default {
    data() {
      return {
        activeIndex:3,// 默认为第3步s
        chosenIndex: 0 // 标记，用户选中的步骤序号
      };
    },
    mounted() {
      this.init()

    },
    methods: {
      setChosenIndex(index) {
        // this.activeIndex = index;
        if(index<=this.activeIndex){
          this.chosenIndex = index;

        }
        
      },
      init() {
        this.chosenIndex = this.activeIndex;
      },

    }
  }
  </script>
<!-- TODO -->

  <style  lang="scss">


  </style>