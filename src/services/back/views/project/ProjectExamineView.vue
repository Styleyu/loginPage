<template>
  <div class="el-card__body">
    <!--    欢迎语-->
    <div id="welcome_message">
      <p>
        {{ teacher_name }}老师好!
      </p>
      <p>
        您还有{{ pending_review }}个待审核的项目!
      </p>
    </div>
    <!--    审核项目主题表格-->
    <div id="examineProjects">
      <el-table id="examineTable"
                :data="tableData"
                style="width: 100%"
                :row-class-name="tableRowClassName"
                @selection-change="handleSelectionChange"
                border
                highlight-current-row>

        <el-table-column type="selection" width="50">
        </el-table-column>

        <el-table-column label="序号" type="index" width="50">
        </el-table-column>

        <el-table-column prop="project_name" label="项目名称" width="130">
          <template v-slot:default="scope">
            {{ scope.row.project_name }}
          </template>
        </el-table-column>

        <el-table-column prop="group" label="所属团队" width="130">
          <template v-slot:default="scope">
            {{ scope.row.group }}
          </template>
        </el-table-column>

        <el-table-column prop="time" label="提交时间">
          <template v-slot:default="scope">
            {{ scope.row.time }}
          </template>
        </el-table-column>

        <el-table-column prop="material" label="证明材料">
<!--          <template v-slot:default="scope">-->
<!--            <el-popover placement="right" :title="scope.row.material" trigger="hover" width="250">-->
<!--              <el-image slot="reference" :src="scope.row.material" :alt="scope.row.material"></el-image>-->
<!--              <el-image :src="scope.row.material"></el-image>-->
<!--            </el-popover>-->
<!--          </template>-->
          <template v-slot:default="scope">
            <el-popover placement="right"  trigger="hover">
              <el-image slot="reference" :src="scope.row.material" fit="contain" :alt="scope.row.material" style="width: 100px; height: 100px"></el-image>
              <el-image :src="scope.row.material" ></el-image>
            </el-popover>
          </template>
        </el-table-column>


        <!--        此处是给领导看的所以只有待审核和已审核两种状态-->
        <!--        已审核状态自动排序到后面或者根据设置直接不显示-->
        <el-table-column prop="status" label="审核状态">
          <template v-slot:default="scope">
            {{ scope.row.status === '1' ? '待审核' : '已审核' }}
          </template>
        </el-table-column>


        <el-table-column prop="operate" label="操作" width="300">
          <template>
            <el-button class="fancy-btn"
                       type="info"
                       round
                       size="small">
              通过
            </el-button>
            <el-button class="fancy-btn" type="info" round size="small">
              退回
            </el-button>
            <el-button class="fancy-btn" type="info" round size="small" >
              详情
            </el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <!--    抄的别人的翻页(划去)-->
    <div class="page-block">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 30]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background>
      </el-pagination>
    </div>
    <!--  获取多选的选中项整列信息-->
    <!--    在控制台里面看-->
    <div style="margin-top: 20px">
      <el-button>获取选中项整列信息</el-button>
      <el-button >全部通过</el-button>
      <el-button >全部打回</el-button>
    </div>
  </div>


</template>
<script>
export default {
  mounted() {
    // this.init()
  },
  methods: {
    tableRowClassName(row) {

      // 未审核列和已审核列判断
      if (row.status === '1') {
        return 'success-row';
      } else if (row.status === '0') {
        return 'warning-row';
      }
      return '';
    },
    handleSelectionChange(selection) {
      console.log(selection);
    },

    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    // init() {
    // }
  },
  data() {
    return {
      // 欢迎语相关
      teacher_name: '蔡',
      audit_id:'',
      pending_review: '5',
      //分页器数据
      currentPage: 1,
      pageSize: 10,
      total: 100,
      tableData: [{
        project_name: '1',
        group: '218317134553',
        time: '2023-03-01 09:28:13',
        status: '1',

        material: 'https://th.bing.com/th/id/OIP.yXXeKFi8SkZxv8c06xI7NgHaFL?pid=ImgDet&rs=1',
      }, {
        project_name: '2',
        group: '218317134553',
        time: '2023-03-01 09:28:13',
        status: '1',
        material: 'https://c.cidianwang.com/file/shufa/kaishu/zhaomengfu/2016110141816874.gif',
      }, {
        project_name: '3',
        group: '218317134553',
        time: '2023-03-01 09:28:13',
        status: '0',
        material: 'https://c.cidianwang.com/file/shufa/kaishu/zhaomengfu/2016110141841558.gif',
      }, {
        project_name: '4',
        group: '218317134553',
        time: '2023-03-01 09:28:13',
        status: '0',
        material: 'https://th.bing.com/th/id/R.fbbe7b7d79f840c05b77003c13e5e6c3?rik=Lr38Kf%2fdX0o8Qg&riu=http%3a%2f%2fwww.cidianwang.com%2ffile%2fshufa%2fxingshu%2f2014110812444774.jpg&ehk=pepmaWvBmV0CNt1%2fgPR3ruuSpjnqPzMO%2fv0sGYkpUHs%3d&risl=&pid=ImgRaw&r=0',
      }, {
        project_name: '5',
        group: '218317134553',
        time: '2023-03-01 09:28:13',
        status: '0',
        material: 'https://th.bing.com/th/id/OIP.6sqhD5yA7FTHyDkyiShAhwAAAA?pid=ImgDet&rs=1',
      },]
    }
  },


}
</script>

<style lang="scss">
.page-block {
  width: 100%;
  display: inline-block;
  margin-top: 1rem;
  text-align: center;
}

//未审核列
.el-table .warning-row {
  background: #fbe9e9;
}

//已审核列
.el-table .success-row {
  background: #e8fcec;
}
</style>
