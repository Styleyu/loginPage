<template>
  <div class="el-card__body"
       name="examinees">
    <!--    欢迎语-->
    <div class="top">
      <el-select v-model="grade"
                 clearable
                 placeholder="请选择年份">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        >
        </el-option>
      </el-select>

      <div class="search">
        <el-input v-model="search"
                  placeholder="请输入关键字搜索"></el-input>
        <el-button style="display: inline"
                   type="success">搜索
        </el-button>
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
          :row-class-name="tableRowClassName"
          border
          highlight-current-row
          style="width: 100%"
          @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection"
                         width="50"></el-table-column>

        <el-table-column label="序号"
                         type="index"
                         width="50">
        </el-table-column>

        <el-table-column label="项目名称"
                         prop="project_name"
                         width="130">
          <template v-slot:default="scope">
            {{ scope.row.project_name }}
          </template>
        </el-table-column>

        <el-table-column label="所属团队"
                         prop="group"
                         width="130">
          <template v-slot:default="scope">
            {{ scope.row.group }}
          </template>
        </el-table-column>

        <el-table-column label="提交时间"
                         prop="time">
          <template v-slot:default="scope">
            {{ scope.row.time }}
          </template>
        </el-table-column>

        <el-table-column label="证明材料"
                         prop="material">
          <!--          <template v-slot:default="scope">-->
          <!--            <el-popover placement="right" :title="scope.row.material" trigger="hover" width="250">-->
          <!--              <el-image slot="reference" :src="scope.row.material" :alt="scope.row.material"></el-image>-->
          <!--              <el-image :src="scope.row.material"></el-image>-->
          <!--            </el-popover>-->
          <!--          </template>-->
          <template v-slot:default="scope">
            <el-popover placement="right"
                        trigger="hover">
              <el-image
                  slot="reference"
                  :alt="scope.row.material"
                  :src="scope.row.material"
                  fit="contain"
                  style="width: 100px; height: 100px"
              ></el-image>
              <el-image :src="scope.row.material"></el-image>
            </el-popover>
          </template>
        </el-table-column>

        <!--        此处是给领导看的所以只有待审核和已审核两种状态-->
        <!--        已审核状态自动排序到后面或者根据设置直接不显示-->
        <el-table-column label="审核状态"
                         prop="status">
          <template v-slot:default="scope">
            {{ scope.row.status === "1" ? "待审核" : "已审核" }}
          </template>
        </el-table-column>

        <el-table-column label="操作"
                         prop="operate"
                         width="300">
          <el-button
              class="fancy-btn"
              round
              size="small"
              type="success"
          >
            通过
          </el-button>
          <el-button
              class="fancy-btn"
              round
              size="small"
              type="danger"
          >
            退回
          </el-button>
          <el-button
              class="fancy-btn"
              round
              size="small"
              type="primary"
          >
            详情
          </el-button>

        </el-table-column>
      </el-table>
    </div>
    <!--    抄的别人的翻页(划去)-->
    <div class="page-block">
      <el-pagination
          :current-page="currentPage"
          :page-size="100"
          :page-sizes="[5, 10, 20, 30]"
          :total="total"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <!--  获取多选的选中项整列信息-->
    <!--    在控制台里面看-->
    <div style="margin-top: 20px">

        <el-button>全部通过</el-button>
        <el-button>全部打回</el-button>



    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.init();
  },
  methods: {
    tableRowClassName({row}) {
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
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
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

<style lang="scss"
       scoped>
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
