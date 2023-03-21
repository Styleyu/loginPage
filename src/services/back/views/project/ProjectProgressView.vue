<template>

  <div id="pageBody">
    <div id="header">
      <el-header>
        <el-row type="flex" class="row-bg" justify="space-between" style="width: 100%">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-button type="primary" icon="el-icon-plus" size="small" @click="jumpToNewCommit">添加新项目</el-button>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light" >
              <p>应修学分：{{ earned_credits }} 实际已获得学分：{{ required_credits }}</p>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-button type="primary" icon="el-icon-printer" size="small">打印</el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>




    </div>

    <div id="table">
      <el-table id="progressTable"
                :data="tableData"
                style="width: 100%"
                :row-class-name="tableRowClassName"
                border
                highlight-current-row>

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

        <el-table-column prop="time" label="提交时间" width="130">
          <v-slot slot-scope="scope">
            {{ scope.row.time }}
          </v-slot>
        </el-table-column>

        <el-table-column prop="score" label="本人预估得分">
          <v-slot slot-scope="scope">
            {{ scope.row.score }}
          </v-slot>
        </el-table-column>

        <el-table-column prop="material" label="证明材料">
          <v-slot slot-scope="scope">
            <el-popover placement="right"  trigger="hover" width="20" height="10">
              <el-image slot="reference" :src="scope.row.material" :alt="scope.row.material" style="width: 100px; height: 100px"></el-image>
              <el-image :src="scope.row.material"></el-image>
            </el-popover>
          </v-slot>
        </el-table-column>

        <el-table-column prop="principal" label="项目负责人">
          <v-slot slot-scope="scope">
            {{ scope.row.principal }}
          </v-slot>
        </el-table-column>

        <el-table-column prop="status" label="状态">
          <v-slot slot-scope="scope">
            <span v-if="scope.row.status === '-1'">被退回</span>
            <span v-else-if="scope.row.status === '0'">待审核</span>
            <span v-else-if="scope.row.status === '1'">班级审核通过</span>
            <span v-else-if="scope.row.status === '2'">年级审核通过</span>
            <span v-else-if="scope.row.status === '3'">院级审核通过</span>
          </v-slot>
        </el-table-column>


        <el-table-column label="审核详情">
          <v-slot slot-scope="scope">
            <el-button type="info" @click="jumpToDetails(scope.row)">
              <span>详情</span>
            </el-button>

          </v-slot>
        </el-table-column>
      </el-table>
    </div>

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
  </div>


</template>
<script>
export default {
  methods: {
    tableRowClassName({row}) {
      switch (row.status) {
        case '0':
          return 'success-row';
        case '1':
          return 'success-row';
        case '2':
          return 'success-row';
        case '3':
          return 'success-row';
        case '-1':
          return 'warning-row';
      }
      return '';
    },

    jumpToDetails: function () {
      this.$router.push({path: "progress_details"})

    },
    jumpToNewCommit: function () {
      this.$router.push({path: "commit"})

    },


    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    init() {

    }
  },
  data() {
    return {
      //分页器数据
      currentPage: 1,
      pageSize: 10,
      total: 100,
      // 项目进度节点状态
      process_status: 'error',
      // 学分统计
      earned_credits: '',
      required_credits: '',
      // 表格数据
      tableData: [{
        id: '1001',
        project_name: '1',
        group: '6',
        time: '2023-03-01',
        score: '1',
        material: 'https://c.cidianwang.com/file/shufa/xingshu/2014111109125248.jpg',
        principal: '1',
        status: '-1'
      },
        {
          id: '1002',
          project_name: '2',
          group: '7',
          time: '2023-03-01',
          score: '2',
          material: 'https://th.bing.com/th/id/R.1d28a3c2ce4c02b5d950637372f07798?rik=fWKELOOONa%2foMA&riu=http%3a%2f%2fshufa.supfree.net%2fk%2f117176.gif&ehk=U%2bZTGsKlVclmBE84oTz5yNCOedjYxDZ59JYY9%2bWeG5Y%3d&risl=&pid=ImgRaw&r=0',
          principal: '2',
          status: '0'
        },
        {
          id: '1003',
          project_name: '3',
          group: '8',
          time: '2023-03-01',
          score: '3',
          material: 'https://th.bing.com/th/id/R.64271369879ba395fcf10ed7abb82787?rik=%2bR9WnvHqTNvf0A&riu=http%3a%2f%2fc.cidianwang.com%2ffile%2fshufa%2fkaishu%2fhzy2015816125021596.jpg&ehk=LYJz11jJXhqR6dIfGA%2fVyuqRFda8SzXkLflNC521Iz0%3d&risl=&pid=ImgRaw&r=0',
          principal: '3',
          status: '1'
        },
        {
          id: '1004',
          project_name: '4',
          group: '9',
          time: '2023-03-01',
          score: '4',
          material: 'https://c.cidianwang.com/file/shufa/xingshu/zhaomengfu/201665112133742.jpg',
          principal: '4',
          status: '2'
        },
        {
          id: '1005',
          project_name: '5',
          group: '10',
          time: '2023-03-01',
          score: '5',
          material: 'https://c.cidianwang.com/file/shufa/kaishu/tianyunzhang/201665105111458.jpg',
          principal: '5',
          status: '3'
        },]
    }
  },
  mounted() {
    this.init()

  },
}
// TODO更改数据
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
