<template>
  <div class="el-card__body" name="examineviwe">
    <!--    欢迎语-->
    <div class="top">
      <el-select v-model="grade" clearable placeholder="请选择年份">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <div class="search">
        <el-input v-model="search" placeholder="请输入关键字搜索"> </el-input>
        <el-button type="success" style="display: inline">搜索</el-button>
      </div>

      <div id="welcome_message">
        <p>
          {{ teacher_name }}老师好! 您还有{{ pending_review }}个待审核的项目!
        </p>
      </div>

      <div class="tips">
        <span>当前您的审核级别：</span>
        <el-radio-group v-model="radio">
          <el-radio :label="3">院级</el-radio>
          <el-radio :label="6">校级</el-radio>
        </el-radio-group>
      </div>
    </div>

    <!-- 表头部分 -->

    <!--    审核项目主题表格-->
    <div id="examineProjects">
      <el-table
        id="examineTable"
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        @selection-change="handleSelectionChange"
        border
        highlight-current-row
      >
        <el-table-column type="selection" width="50"> </el-table-column>

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
          <!--          <v-slot slot-scope="scope">-->
          <!--            <el-popover placement="right" :title="scope.row.material" trigger="hover" width="250">-->
          <!--              <el-image slot="reference" :src="scope.row.material" :alt="scope.row.material"></el-image>-->
          <!--              <el-image :src="scope.row.material"></el-image>-->
          <!--            </el-popover>-->
          <!--          </v-slot>-->
          <v-slot slot-scope="scope">
            <el-popover placement="right" trigger="hover">
              <el-image
                slot="reference"
                :src="scope.row.material"
                fit="contain"
                :alt="scope.row.material"
                style="width: 100px; height: 100px"
              ></el-image>
              <el-image :src="scope.row.material"></el-image>
            </el-popover>
          </v-slot>
        </el-table-column>

        <!--        此处是给领导看的所以只有待审核和已审核两种状态-->
        <!--        已审核状态自动排序到后面或者根据设置直接不显示-->
        <el-table-column prop="status" label="审核状态">
          <v-slot slot-scope="scope">
            {{ scope.row.status === "1" ? "待审核" : "已审核" }}
          </v-slot>
        </el-table-column>

        <el-table-column prop="operate" label="操作" width="300">
          <v-slot slot-scope="scope">
            <el-button
              class="fancy-btn"
              type="success"
              round
              size="small"
              @click="getDetails(scope.row.audit_id)"
            >
              通过
            </el-button>
            <el-button
              class="fancy-btn"
              type="danger"
              round
              size="small"
              @click="getDetails(scope.row.audit_id)"
            >
              退回
            </el-button>
            <el-button
              class="fancy-btn"
              type="primary"
              round
              size="small"
              @click="getDetails(scope.row.audit_id)"
            >
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
        :total="total"
        background
      >
      </el-pagination>
    </div>
    <!--  获取多选的选中项整列信息-->
    <!--    在控制台里面看-->
    <div style="margin-top: 20px">
      <el-button @click="btnGetSelection()">获取选中项整列信息</el-button>
      <el-button @click="btnGetSelection()">全部通过</el-button>
      <el-button @click="btnGetSelection()">全部打回</el-button>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.init();
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      console.log(row.status === "1");
      console.log(rowIndex);
      // 未审核列和已审核列判断
      if (row.status === "1") {
        return "success-row";
      } else {
        return "warning-row";
      }
    },
    handleSelectionChange(selection) {
      console.log(selection);
    },
    getDetails(audit_id) {
      this.flag = audit_id;
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    btnGetSelection() {
      let selection = this.$refs.multipleTable.selection;
      console.log(selection);
    },
    init() {
      // this.tableRowClassName(1, 3);
      this.teacher_name = "蔡";
      this.pending_review = 5;
    },
  },
  data() {
    return {
      grade: "",
      search: "",
      radio: 3,
      options: [
        {
          value: "2020",
          label: "2020年",
        },
      ],
      // 欢迎语相关
      teacher_name: "蔡",

      pending_review: "2",
      //分页器数据
      currentPage: 1,
      pageSize: 10,
      total: 100,
      tableData: [
        {
          project_name: "1",
          group: "218317134553",
          time: "2023-03-01 09:28:13",
          status: "1",

          material:
            "https://th.bing.com/th/id/OIP.yXXeKFi8SkZxv8c06xI7NgHaFL?pid=ImgDet&rs=1",
        },
        {
          project_name: "2",
          group: "218317134553",
          time: "2023-03-01 09:28:13",
          status: "1",
          material:
            "https://c.cidianwang.com/file/shufa/kaishu/zhaomengfu/2016110141816874.gif",
        },
        {
          project_name: "3",
          group: "218317134553",
          time: "2023-03-01 09:28:13",
          status: "0",
          material:
            "https://c.cidianwang.com/file/shufa/kaishu/zhaomengfu/2016110141841558.gif",
        },
        {
          project_name: "4",
          group: "218317134553",
          time: "2023-03-01 09:28:13",
          status: "0",
          material:
            "https://th.bing.com/th/id/R.fbbe7b7d79f840c05b77003c13e5e6c3?rik=Lr38Kf%2fdX0o8Qg&riu=http%3a%2f%2fwww.cidianwang.com%2ffile%2fshufa%2fxingshu%2f2014110812444774.jpg&ehk=pepmaWvBmV0CNt1%2fgPR3ruuSpjnqPzMO%2fv0sGYkpUHs%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          project_name: "5",
          group: "218317134553",
          time: "2023-03-01 09:28:13",
          status: "0",
          material:
            "https://th.bing.com/th/id/OIP.6sqhD5yA7FTHyDkyiShAhwAAAA?pid=ImgDet&rs=1",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.page-block {
  width: 100%;
  display: inline-block;
  margin-top: 1rem;
  text-align: center;
}

//未审核列
.el-table .warning-row {
  background: #f0b9b9;
}

//已审核列
.el-table .success-row {
  background: #dcf5e1;
}

.top {
  display: flex;
  flex-direction: row;
  margin: 1rem;
  justify-content: space-between;
  .search {
    display: flex;
    flex-direction: row;
  }
}

.tips {
  color: red;
}
</style>
