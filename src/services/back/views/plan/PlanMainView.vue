<template>
  <div class="main-container">
    <div class="search-box">
      <el-button class="el-button--primary el-button--mini" plain @click="dialogFormVisible=true">
        <el-icon class="el-icon-search"></el-icon>搜索
      </el-button>
    </div>
<!--    表格区域-->
    <el-table
        :data="tableData"
        style="width: 90vw"
        stripe
        :row-class-name="tableRowClassName">
      <el-table-column
          prop="title"
          label="标题"
          width="350%">
      </el-table-column>
      <el-table-column
          prop="date"
          label="日期"
          width="150%">
      </el-table-column>
      <el-table-column
          prop="download"
          label="下载次数"
          width="100%">
      </el-table-column>
      <el-table-column
          prop="name"
          label="发布人"
          width="100%">
      </el-table-column>
      <el-table-column
          prop="size"
          label="文件大小"
          width="100%">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.size<1000" type="info" plain>{{scope.row.size}}KB</el-tag>
          <el-tag v-else type="info" plain>{{(scope.row.size/1024).toFixed(2)}}MB</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="state"
          label="方案状态"
          width="100%">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.state==0" type="success" plain>
            <el-icon class="el-icon-success"></el-icon>生效
          </el-tag>
          <el-tag v-else type="danger" plain>
            <el-icon class="el-icon-document-delete"></el-icon>弃用
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="id"
          label="操作"
          align="center"
          width="200%">
        <template slot-scope="scope">
          <el-link type="warning" href="read" style="margin-right: 1rem">
            <el-button class="el-button--warning el-button--small" plain>
              <el-icon class="el-icon-view"></el-icon>查看
            </el-button>
          </el-link>
          <el-button class="el-button--danger el-button--small" plain @click="alert(scope.row.id)">
            <el-icon class="el-icon-delete-solid"></el-icon>删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
<!--    分页器-->
    <div class="page-block">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 30]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
<!--   筛选表单 -->
    <el-dialog title="培养方案检索" :visible.sync="dialogFormVisible">
      <el-form :model="search" ref="search">
        <el-form-item label="方案标题" :label-width="formLabelWidth">
          <el-input v-model="search.title" autocomplete="off" style="width: 20vw"></el-input>
        </el-form-item>
        <el-form-item label="方案状态" :label-width="formLabelWidth">
          <el-select v-model="search.state" placeholder="请选择方案的发行状态">
            <el-option label="生效中" value="0"></el-option>
            <el-option label="已弃用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期区间" :label-width="formLabelWidth">
            <el-date-picker type="date" placeholder="选择起始日期" v-model="search.startDate"></el-date-picker>
            <label style="margin: auto 1rem">至</label>
            <el-date-picker type="date" placeholder="选择终止日期" v-model="search.endDate"></el-date-picker>
        </el-form-item>
        <el-form-item label="方案作者" :label-width="formLabelWidth">
          <el-input v-model="search.name" autocomplete="off" style="width: 20vw"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="danger" @click="clearSearch" plain>清 除</el-button>
        <el-button type="primary" @click="searchInfo" plain>确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  methods: {
    //搜索
    searchInfo(){
      //关掉搜索框
      this.dialogFormVisible=false
      //调试用，展示所有数据
      let searchData="<br>方案标题:"+this.search.title
                    +"<br>方案作者:"+this.search.name
                    +"<br>起止日期:"+this.search.startDate+"——"+this.search.endDate
                    +"<br>方案状态:"+this.search.state
      //查数据回调
      this.$message({
        showClose: true,
        dangerouslyUseHTMLString:true,
        message: '搜索成功,本次搜索数据为:'+searchData,
        type: 'success'
      });
    },
    //清除选择
    clearSearch(){
      //不生效啊，难蚌
      this.$refs.search.resetFields()
    //  只能手动来了捏
      this.search.title=''
      this.search.startDate=''
      this.search.endDate=''
      this.search.name=''
      this.search.state=''
    },
    //分页器相关
    handleSizeChange(val){
      this.pageSize=val
    },
    handleCurrentChange(val){
      this.currentPage=val
    },
    tableRowClassName({row}) {
      if (row.state === 0) {
        return 'warning-row'
      } else if (row.state === 1) {
        return 'success-row'
      }
      return 'primary-row'
    }
  },
  data() {
    return {
      //搜索栏
      search: {
        title:'',
        startDate:'',
        endDate:'',
        name:'',
        state:'',
      },
      //分页器数据
      currentPage:1,
      pageSize:5,
      total:200,
      //输入框宽度
      formLabelWidth: '5rem',
      //搜索表单
      dialogFormVisible: false,
      //培养方案的详情数据，包括方案编号、用户名、发布日期、下载量、大小、标题、状态
      tableData: [{
        id:1,
        date: '2020-05-02',
        name: '教师1',
        download: 912,
        size: 1203,
        title: '软件工程学院2020年创新培养方案',
        state: 0
      }, {
        id:2,
        date: '2021-05-02',
        name: '教师2',
        download: 1022,
        size: 995,
        title: '软件工程学院2021年创新培养方案',
        state: 0
      }, {
        id:3,
        date: '2022-05-02',
        name: '教师3',
        download: 2344,
        size: 865,
        title: '软件工程学院2022年创新培养方案',
        state: 0
      }, {
        id:4,
        date: '2023-05-02',
        name: '教师4',
        download: 223,
        size: 1945,
        title: '软件工程学院2023年创新培养方案',
        state: 1
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.warning-row {
  background-color: #d2c31b;
}

.success-row {
  background-color: #54e80e;
}

.primary-row {
  background-color: #477bde;
}
.main-container{
  width: 80vw;
  //background-color: #54e80e;
  .search-box{
    display: inline-block;
    width: 80vw;
    //background-color: rgba(157, 152, 152, 0.10);
  }
}
.page-block{
  width: 100%;
  display: inline-block;
  margin-top: 1rem;
  text-align: center;
}
</style>
