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
          <v-slot slot-scope="scope">
            {{ scope.row.project_name }}
          </v-slot>
        </el-table-column>

        <el-table-column prop="group" label="所属团队" width="130">
          <v-slot slot-scope="scope">
            {{ scope.row.group }}
          </v-slot>
        </el-table-column>

        <el-table-column prop="time" label="提交时间">
          <v-slot slot-scope="scope">
            {{ scope.row.time }}
          </v-slot>
        </el-table-column>

        <el-table-column prop="material" label="证明材料">
          <v-slot slot-scope="scope">
            <el-popover placement="right" :title="scope.row.material" trigger="hover" width="250">
              <el-image slot="reference" :src="scope.row.material" :alt="scope.row.material"></el-image>
              <el-image :src="scope.row.material"></el-image>
            </el-popover>
          </v-slot>
        </el-table-column>


        <!--        此处是给领导看的所以只有待审核和已审核两种状态-->
        <!--        已审核状态自动排序到后面或者根据设置直接不显示-->
        <el-table-column prop="status" label="审核状态">
          <v-slot slot-scope="scope">
            {{ scope.row.status === '1' ? '待审核' : '已审核' }}
          </v-slot>
        </el-table-column>


        <!--        TODO 按钮太难看了换一个-->
        <el-table-column prop="operate" label="操作" width="300">
          <v-slot slot-scope="scope">
            <el-button class="fancy-btn" type="info" round @click="getDetails(scope.row.audit_id)">
              通过
            </el-button>
            <el-button class="fancy-btn" type="info" round @click="getDetails(scope.row.audit_id)">
              退回
            </el-button>
            <el-button class="fancy-btn" type="info" round @click="getDetails(scope.row.audit_id)">
              详情
            </el-button>
          </v-slot>
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
          :total="total">
      </el-pagination>
    </div>
    <!--  获取多选的选中项整列信息-->
    <!--    在控制台里面看-->
    <div style="margin-top: 20px">
      <el-button @click="btnGetSelection()">获取选中项整列信息</el-button>
    </div>
  </div>


</template>
<script>
export default {
  mounted() {
    this.init()
  },
  methods: {
    tableRowClassName({row}) {

      // 未审核列和已审核列判断
      if (row.status === '1') {
        return 'success-row';
      } else if (row.status === '0') {
        return 'warning-row';
      }


      // if (rowIndex === 1) {
      //   return 'warning-row';
      // } else if (rowIndex === 3) {
      //   return 'success-row';
      // }
      return '';
    },
    handleSelectionChange(selection) {
      console.log(selection);
    },
    getDetails(audit_id) {
      this.flag = audit_id
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    btnGetSelection() {
      let selection = this.$refs.multipleTable.selection;
      console.log(selection);
    },
    init() {
      this.tableRowClassName(1, 3);
      this.teacher_name = '蔡';
      this.pending_review = 5;

    }
  },
  data() {
    return {
      // 欢迎语相关
      teacher_name: '',

      pending_review: '',
      //分页器数据
      currentPage: 1,
      pageSize: 10,
      total: 100,
      tableData: [{
        project_name: '1',
        group: '218317134553',
        time: '2023-03-01 09:28:13',
        status: '1',

        material: 'https://proofmart.com/wp-content/uploads/2021/06/541-47-1080x1080.png',
      }, {
        project_name: '2',
        group: '218317134553',
        time: '2023-03-01 09:28:13',
        status: '1',
        material: 'https://th.bing.com/th/id/R.89f25654c7caec8ab83fcdc33f551739?rik=cJe5c2D4jZMn7g&riu=http%3a%2f%2fwww.shufaai.com%2fupload%2fzidianimg%2f14%2f2_0312214QA4c.jpg&ehk=StiGh%2b5eNiYCB%2f2fXESTuJ3GXDietyNli4iyx73Tyig%3d&risl=&pid=ImgRaw&r=0',
      }, {
        project_name: '3',
        group: '218317134553',
        time: '2023-03-01 09:28:13',
        status: '0',
        material: 'https://th.bing.com/th/id/R.f2b9f2346734c80dc3866ce6b9f6ad49?rik=ivcBbPVpHLtPQA&riu=http%3a%2f%2fwww.drodd.com%2fimages15%2f5-7.jpg&ehk=HWWDU0RXCZLHPUwZrWE52i6I7HW4CoS1AgT2oYafAl8%3d&risl=&pid=ImgRaw&r=0',
      }, {
        project_name: '4',
        group: '218317134553',
        time: '2023-03-01 09:28:13',
        status: '0',
        material: 'https://ak5.picdn.net/shutterstock/videos/1970515/thumb/1.jpg',
      }, {
        project_name: '5',
        group: '218317134553',
        time: '2023-03-01 09:28:13',
        status: '0',
        material: 'https://th.bing.com/th/id/R.5a881cf39df4c7adae78c99fa403ed9b?rik=cm1nEiDekI0pog&riu=http%3a%2f%2fakcgb51.ru%2fwp-content%2fuploads%2f2018%2f10%2fexclamation_mark_PNG35.png&ehk=qxvk%2fbu4Kd2wbRH%2ffZXhkD7TNXzxyXptoBhDV5lRgRM%3d&risl=&pid=ImgRaw&r=0',
      },]
    }
  },


}
</script>
<!-- TODO -->

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
