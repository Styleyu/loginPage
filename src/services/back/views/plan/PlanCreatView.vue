<template>
  <el-container class="main-container">
<!--    左侧边栏-->
    <el-aside class="aside-view">
        <h4>注意事项</h4>
        <div class="aside-text">
            <p>这里是提示文本</p>
          <p>正確で、直接的で、的確で、エレガントで、客観的で、完全で、立体的で、全面的で、合理的で、弁証法的で、
            形而上学的で、的を射て、急所を突いて、批判的で、的確で、創造的で、発散的で、独特の意味を持つ</p>

          <p>重要性、紧迫性、自觉性、主动性、坚定性、民族性、时代性、实践性、针对性、全局性、前瞻性、战略性、积极性、</p>
            <p>创造性、长期性、复杂性、艰巨性、可讲性、鼓动性、计划性、敏锐性、有效性；</p>
            <p>责任感、紧迫感、危机感、认同感、 荣誉感、成就感；</p>
            <p>多层次、多方面、多途径、多渠道、多措施、多力量、多元素。</p>
            <p>出发点、切入点、突破点、落脚点、 着眼点、结合点、关键点、着重点、着力点、根本点、支撑点；</p>
            <p>不松劲、不懈怠、不退缩、不畏难、不罢手、不动摇、 不放弃、不改变、不妥协；</p>
            <p>法制化、规范化、制度化、程序化、集约化、正常化、有序化、智能化、优质化、常态化、 科学化、年轻化、知识化、专业化；</p>
            <p>新水平、新境界、新举措、新发展、新突破、新成绩、新成效、新方法、新成果、 新形势、新要求、新期待、新关系、新体制、新机制、新知识、新本领、新进展、新实践、新风貌、新事物、新高度；</p>
            <p>活动力、控制力、影响力、创造力、凝聚力、战斗力、感染力、亲活力；</p>
            <p>热心、耐心、诚心、决心、核心、内心、外心、 中心、甘心、攻心，进取心、责任心、上进心、公仆心；</p>
            <p>政治意识、组织意识、大局意识、忧患意识、责任意识、法律意识、廉洁意识、学习意识、上进意识、管理意识</p>
        </div>
    </el-aside>
<!--    右侧主体-->
    <el-main class="main-view">
      <el-row style="margin-bottom: 2rem"><h2>文件上传区域</h2></el-row>
      <el-upload
          class="upload-demo"
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-error="handleError"
          :file-list="fileList"
          :show-file-list="true"
          :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传服务器</el-button>
        <div slot="tip" class="el-upload__tip">
          <el-icon class="el-icon-edit-outline"></el-icon>
          只能上传pdf/word文件，且不超过5MB
        </div>
        <div slot="tip" class="el-upload__tip">
          <el-icon class="el-icon-warning"></el-icon>
          上传的文件在提交之前可以点击预览
        </div>
      </el-upload>
<!--      历史上传区域-->
      <el-row style="margin: 2rem auto"><h2>最近上传</h2></el-row>
      <el-table
          :data="history"
          border
          stripe
          style="width: 80%">
        <el-table-column
            prop="date"
            label="日期"
            >
        </el-table-column>
        <el-table-column
            prop="fileName"
            label="文件名"
            width="450">
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "PlanCreatView",
  data() {
    return {
      fileList: [
          {name: '软件工程学院2020年培养方案.pdf', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
          {name: '软件工程学院2022年培养方案.docx', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
          ],
      history:[
        {date:'2022-10-12 23:56:12',fileName:'通信工程学院2022年培养方案'},
        {date:'2021-10-12 23:56:12',fileName:'通信工程学院2021年培养方案'},
        {date:'2020-04-14 23:56:12',fileName:'通信工程学院2020年培养方案'},
        {date:'2019-12-12 23:56:12',fileName:'通信工程学院2020年培养方案'},
      ]
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    //删除文件的钩子
    handleRemove(file, fileList) {
      this.$message({
        showClose: true,
        dangerouslyUseHTMLString:true,
        message: '取消上传文件'+file.name+'成功',
        type: 'success'
      });
    },
    //预览的钩子
    handlePreview(file) {
      console.log(file)
      if (file) {
        const addTypeArray = file.name.split(".")
        const addType = addTypeArray[addTypeArray.length - 1]
        console.log(addType)
        if (addType === "pdf") {
          let routeData = this.$router.resolve({
            path: "/insurancePdf",
            query: { url: file.response, showBack: false },
          });
          window.open(routeData.href, "_blank")
        }
        //".rar, .zip, .doc, .docx, .xls, .txt, .pdf, .jpg,  .png, .jpeg,"
        else if (addType === "doc" || addType === "docx" || addType === "xls") {
          window.open(
              "http://view.officeapps.live.com/op/view.aspx?src=" + file.response
          );
        } else if (addType === "txt") {
          window.open(file.response)
        } else if (["png", "jpg", "jpeg"].includes(addType)) {
          window.open(file.response)
        } else if (addType === "rar" || addType === "zip") {
          this.$message({
            message: "该文件类型暂不支持预览",
            type: "warning",
          })
          return false
        }
      }
    },
  //  上传失败的钩子
    handleError(err, file, fileList){
      this.$message({
        showClose: true,
        dangerouslyUseHTMLString:true,
        message: '文件'+file.name+'上传失败！',
        type: 'error'
      });
    }
  }
}
</script>

<style lang="scss" scoped>
//主容器
.main-container{
  width: 100%;
  height: 80vh;
  //侧边栏的css
  .aside-view{
    //边框作划分
    border-right: rgba(128, 128, 128, 0.4) solid 0.1rem;
    //第一个子元素，一定是标题，设置居中和边界
    :first-child{
      margin-top: 1rem;
      margin-bottom: 0.2rem;
      color: #596193;
      text-align: center;//内容始终居中
    }
    //提示栏内容
    .aside-text{
      //文本超出自动换行，如果发生超宽就固定添加滚动条
      text-overflow: inherit;
      word-wrap: break-word;
      //轻文本
      font-weight: lighter;
      //background-color: rgba(59, 144, 35, 0.1);
      height: 75vh;
    }
  }
//  主体区域的css
  .main-view{

  }
}
</style>
