<template>
  <div class="main-container">
    <el-container>
      <!-- 页头 -->
      <el-header :gutter=20 class="header">
        <el-row>
          <el-col :span="6">
            <el-button class="el-button--mini el-button--info" plain>
              <el-link href="OverView" type="info">
                <el-icon class="el-icon-s-home"></el-icon>总览
              </el-link>
            </el-button>&nbsp;&nbsp;&nbsp;&nbsp;
<!--            <el-link href="" type="primary">-->
<!--              <el-icon class="el-icon-arrow-left"></el-icon>上一篇-->
<!--            </el-link>-->
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
      <el-container class="detail-container">
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
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-view"></i>
                  培养方案
                </template>
<!--                培养方案查看-->
                <div><el-button class="el-button--mini el-button--warning" @click="viewTrainingTable" plain>查看</el-button></div>
              </el-descriptions-item>
            </el-descriptions>
          </el-card>
          <hr class="aside-split">
          <!--          培养方案对应的指标-->
<!--          <el-card shadow="hover">-->
<!--            <div class="aside-title">指标概览</div>-->
<!--            <el-timeline>-->
<!--              <el-timeline-item-->
<!--                  v-for="(aim, index) in training.aims"-->
<!--                  :key="index"-->
<!--                  icon="el-icon-success"-->
<!--                  color="green"-->
<!--                  size="small"-->
<!--                  :timestamp="aim.explain">-->
<!--                {{aim.content}}-->
<!--              </el-timeline-item>-->
<!--            </el-timeline>-->
<!--          </el-card>-->
<!--          <hr class="aside-split">-->
          <!--培养方案对应的指标-->
          <el-card shadow="hover">
            <div class="aside-title">相关方案</div>
<!--            eslint-disable-next-line-->
            <div class="aside-content-relative" v-for="(relative,index) in relatives">
              {{relative.title}}&nbsp;——&nbsp;{{relative.author}}
            </div>
          </el-card>

<!--          隐藏层：这里弹出的是培养方案详情的抽屉-->
          <el-drawer
              :title=training.title
              :visible.sync="drawerVis"
              direction="rtl"
              size="70%">
<!--            隐藏层内的数据表格-->
            <el-table
                :data="drawerData"
                :span-method="arraySpanMethod"
                border
                stripe
                style="width: 100%">
              <el-table-column
                  prop="programName"
                  label="项目名称"
                  width="200%">
              </el-table-column>
              <el-table-column
                  prop="spliceName"
                  label="分项名称"
                  width="200%"
              >
              </el-table-column>
              <el-table-column
                  prop="rule"
                  width="200%"
                  label="细则">
              </el-table-column>
              <el-table-column
                  prop="score"
                  width="50%"
                  label="学分">
              </el-table-column>
              <el-table-column
                  prop="material"
                  width="200%"
                  label="提交材料">
              </el-table-column>
              <el-table-column
                  prop="remark"
                  width="200%"
                  label="备注">
              </el-table-column>
            </el-table>
          </el-drawer>
<!--          抽屉结束-->
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {TableArrayRegister} from "@/utils/TableArrayRegister";

export default {
  // 数据
  data () {
    return {
      //计划的ID
      planId:1,
      //抽屉标题
      drawerTitle: '',
      //抽屉里的数据是否加载过了
      drawerIsLoaded: false,
      //抽屉内的数据行列数
      drawerDataRows:-1,
      drawerDataCols:-1,
      //数据的行列阵列解析结果表格
      drawerDataArray: [[]],
      //抽屉内数据加载动画控制
      drawerTableLoading:true,
      //抽屉控制
      drawerVis:false,
      //抽屉数据
      /*在备注内通过@@区分划分关键字，通过划分关键字来划分数据。
        需要注意的是，我选择以行为基准.
        @@之后始终以r开头，其后紧跟一个数字n，表示在第n列出现复杂化
        其后紧跟一个r或c，表示要侵占的行或者列，其后紧跟一个数，代表从n列开始，这一列会侵占多少行或者列
        行内有多个数据需要合并时，单个?直接往后增量添加就行，如@@r0r2?r1c3*/
      drawerData:[{
        programName: '竞赛活动',
        spliceName: '学校认定的一档竞赛',
        rule: '国家级奖项',
        score: 4,
        material: '证书原件以及复印件',
        remark: '竞赛级别以官方认定为准@@r0r4?r0c2?r4c2?r3r4'
      },{
        programName: '竞赛活动',
        spliceName: '学校认定的一档竞赛',
        rule: '国家级奖项',
        score: 4,
        material: '证书原件以及复印件',
        remark: '竞赛级别以官方认定为准@@992c'
      },
        {
          programName: '竞赛活动',
          spliceName: '学校认定的一档竞赛',
          rule: '国家级奖项',
          score: 4,
          material: '证书原件以及复印件',
          remark: '竞赛级别以官方认定为准'
        },
        {
          programName: '竞赛活动',
          spliceName: '学校认定的一档竞赛',
          rule: '国家级奖项',
          score: 4,
          material: '证书原件以及复印件',
          remark: '竞赛级别以官方认定为准'
        }],
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
      //相关数据
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
    getPlanDetail(){
    //  在这里获取详情数据，记得带上路由里边的ID
    },
    routeChange(){
      let that = this;
      that.planId = that.$route.query.planId===undefined?1:parseInt(that.$route.query.planId);//获取传参的aid
      //判断用户是否存在
      if(localStorage.getItem('userInfo')){
        that.haslogin = true;
        that.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        that.userId = that.userInfo.userId;
      }else{
        that.haslogin = false;
      }
      //获取详情接口
      this.getPlanDetail()
    },
    //表格划分返回
    arraySpanMethod({rowIndex,columnIndex}){
      return this.drawerDataArray[rowIndex][columnIndex]
      // console.log("["+rowIndex+","+columnIndex+"]")
      // return [1,1]
      // console.log(this.drawerDataArray[rowIndex][columnIndex])
    },
    //抽屉打开动作
    viewTrainingTable(){
      //抽屉可视
      this.drawerVis=true;
      /**
       * 在这里加载抽屉内的培养方案数据
       */
      //培养方案数据是否已经被加载过一次，没有就在这里边加载数据
      if (!this.drawerIsLoaded){

        //将上述操作封装之后，上述操作执行成功，再更改状态位和数据行数、列数
        this.drawerDataRows=this.drawerData.length
        this.drawerDataCols=Object.keys(this.drawerData[0]).length
        // console.log(this.drawerDataCols)
        this.drawerIsLoaded=true;
        // console.log(this.drawerDataRows)
      //  此时我们加载数据显示阵列
        this.drawerDataArray=TableArrayRegister(this.drawerData)
        // console.log(this.drawerDataArray)
      }
    },
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route':'routeChange'
  },
  components: { //定义组件

  },
  created() { //初始化生命周期函数，监听路由改变
    this.routeChange();
  },
}
</script>

<style lang="scss" scoped>
/* 全局背景板 */
.main-container {
  background-color: transparent;
  padding: 0;
  width: 100%;
}

.detail-container {
  .training {

    &-main {


    }

    &-aside {
      ::-webkit-scrollbar {
        width: 0 !important;
      }
    }
  }
}

/*头部*/
.header {
  background-color: transparent;
  font-size: large;
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

.el-card__body, .el-main{
  padding: 0;
}
</style>
