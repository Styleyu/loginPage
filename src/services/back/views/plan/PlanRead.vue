<template>
  <div id="main-container">
    <el-container>
      <!-- 页头 -->
      <el-header :gutter=20 id="header">
        <el-row>
          <el-col :span="6">
            <el-link href="home" type="primary">
              <el-icon class="el-icon-s-home"></el-icon>总览
            </el-link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <el-link href="" type="primary">
              <el-icon class="el-icon-arrow-left"></el-icon>上一篇
            </el-link>
          </el-col>
          <el-col :span="8" v-text="training.title" class="training-title"></el-col>
          <!--          <el-col :span="8" class="training-bar">-->
          <!--            <el-button href="" class="el-button&#45;&#45;primary el-button&#45;&#45;small" plain>-->
          <!--              <el-icon class="el-icon-menu"></el-icon>控制台-->
          <!--            </el-button>-->
          <!--          </el-col>-->
          <!--          <el-col :span="2" class="training-avatar">-->
          <!--            <el-avatar>-->
          <!--              avatar-->
          <!--            </el-avatar>-->
          <!--          </el-col>-->
        </el-row>
      </el-header>
      <el-container id="detail-container">
        <!--        主题内容-->
        <el-main class="training-main" v-html="training.detail">
        </el-main>
        <!--        边栏-->
        <el-aside width="20vw" class="training-aside">
          <!--          文档的基本信息-->
          <el-card shadow="hover">
            <el-descriptions class="margin-top" title="基础信息" :column="1" size="small" border>
              <template slot="extra">
                <el-button type="danger" size="small" plain>下载方案</el-button>
              </template>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-user"></i>
                  发布人
                </template>
                <div v-text="training.author"></div>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-time"></i>
                  发布时间
                </template>
                <div v-text="training.createTime"></div>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-bank-card"></i>
                  身份
                </template>
                <el-tag v-text="training.character" type="success"></el-tag>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-download"></i>
                  文件大小
                </template>
                <div v-if="training.size<1000" v-text="training.size+'KB'"></div>
                <div v-else v-text="training.size/1024+'MB'"></div>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-sort"></i>
                  下载量
                </template>
                <div v-text="training.download+'次'"></div>
              </el-descriptions-item>
            </el-descriptions>
          </el-card>
          <hr class="aside-split">
          <!--          培养方案对应的指标-->
          <el-card shadow="hover">
            <div class="aside-title">指标概览</div>
            <el-timeline>
              <el-timeline-item
                  v-for="(aim, index) in training.aims"
                  :key="index"
                  icon="el-icon-success"
                  color="green"
                  size="small"
                  :timestamp="aim.explain">
                {{aim.content}}
              </el-timeline-item>
            </el-timeline>
          </el-card>
          <hr class="aside-split">
          <!--培养方案对应的指标-->
          <el-card shadow="hover">
            <div class="aside-title">相关方案</div>
<!--            eslint-disable-next-line-->
            <div class="aside-content-relative" v-for="(relative,index) in relatives">
              {{relative.title}}&nbsp;——&nbsp;{{relative.author}}
            </div>
          </el-card>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  // 数据
  data () {
    return {
      // 培养方案详情数据
      training: {
        author: '小明',
        createTime: '2020-11-23 12:23:59',
        title: '这里是培养方案标题',
        character: '管理员',
        detail: '主要内容',
        download: 120,
        size: 912,
        aims:[
          {
            content:"开始",
            explain:"从这里开始你的项目"
          },
          {
            content:"中期检查",
            explain:"项目的中期审查"
          },
          {
            content:"结束",
            explain:"提交项目以检查最终成果"
          },
        ]
      },
      relatives:[{
        title:"关联的培养方案1",
        author: "教师1"
      },{
        title:"关联的培养方案2",
        author: "教师2"
      },{
        title:"关联的培养方案3",
        author: "教师3"
      },
      ]
    }
  },
  methods: {
    getTraining () {
      return 1
    }
  },
  created: {

  }
}
</script>

<style>
/* 全局背景板 */
#detail-container,#main-container {
  background-color: transparent;
  padding: 0;
  width: 84vw;
  height: 100vh;
}
/*头部*/
#header {
  background-color: rgba(5, 96, 114, 0.064);
  display: inline-block;
  vertical-align: middle;
  text-align: left;
  line-height: 60px;
  align-items: center;
  border-bottom: 0.2rem solid rgba(56, 103, 221, 0.177);
}
/*标题栏*/
.training-title {
  text-align: center;
}
/*控制台*/
.training-bar {
  text-align: right;
}
/*头像*/
.training-avatar {
  text-align: right;
  padding: 8px;
}
/*主体*/
.training-main{
  background-color: rgba(172, 186, 220, 0.1);
  border-right: 0.2rem solid rgba(56, 103, 221, 0.1);
}
/*分割线渐变*/
.aside-split{
  width:80%;
  margin:0.5em auto;
  border: 0;
  height: 0.1em;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0));
}
/*边栏小标题*/
.aside-title {
  width: 100%;
  margin-bottom: 1em;
  font-size: medium;
  font-weight: bold;
  color: black;
}
/*关联方案*/
.aside-content-relative{
  margin: 0.2em auto;
  font-weight: inherit;
  align-content: center;
  /*font-size: small;*/
  color: #060650;
  cursor: pointer;
}
.aside-content-relative:hover{
  color: rgba(12, 132, 255, 0.5);
}
/*隐藏滚动条*/
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;height: 0;
}
.el-card__body, .el-main{
  padding: 0;
}
</style>
