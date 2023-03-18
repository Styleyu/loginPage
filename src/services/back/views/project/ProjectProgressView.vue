<template>
  <div>
    <p>flag的值为:{{ this.flag }}</p>
    <el-table ref="progressTable" :data="tableData" style="width: 100%" v-loading="listLoading" border stripe highlight-current-row @current-change="handleCurrentChange">
      <el-table-column prop="index" label="序号" type="index" width="100" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="audit_id" label="项目编号" width="180" show-overflow-tooltip>
        <v-slot slot-scope="scope">{{scope.row.audit_id}}</v-slot>
      </el-table-column>
      <el-table-column prop="project_name" label="项目名称" width="180" show-overflow-tooltip>
        <v-slot slot-scope="scope">{{scope.row.project_name}}</v-slot>
      </el-table-column>
      <el-table-column prop="group" label="所属团队" show-overflow-tooltip>
        <v-slot slot-scope="scope">{{scope.row.group}}</v-slot>
      </el-table-column>
      <el-table-column prop="time" label="提交时间" show-overflow-tooltip>
        <v-slot slot-scope="scope">{{scope.row.time}}</v-slot>
      </el-table-column>
      <el-table-column prop="status" label="状态" show-overflow-tooltip>
        <v-slot slot-scope="scope">{{scope.row.status}}</v-slot>
      </el-table-column>

      <el-table-column label="详情" show-overflow-tooltip>
        <v-slot slot-scope="scope">
          <el-button class="fancy-btn" type="info" round @click="getDetails(scope.row.audit_id)">
            详情
          </el-button>
        </v-slot>
      </el-table-column>
    </el-table>
  </div>


</template>
<script>
export default {
  methods: {

    handleCurrentChange(row) {
      console.log(row);
    },

    getDetails(audit_id) {
      this.flag = audit_id
    },
    init() {

    }
  },
  data() {
    return {
      flag: 0,
      tableData: [{
        audit_id: '512882269587',
        project_name: '218317134553',
        group: '211545360049',
        time: '2023-03-01 09:28:13',
        status: '0',
        details: '',
      }, {
        audit_id: '661806075388',
        project_name: '625877504180',
        group: '628303567548',
        time: '2023-03-09 07:07:16',
        status: '-1',
        details: '',
      }, {
        audit_id: '775191006160',
        project_name: '317972308888',
        group: '249101230772',
        time: '2023-03-12 15:42:54',
        status: '2',
        details: '',
      }, {
        audit_id: '330576288926',
        project_name: '883258724103',
        group: '872687297290',
        time: '2023-03-08 23:27:48',
        status: '3',
        details: '',
      }, {
        audit_id: '878323167051',
        project_name: '898816320458',
        group: '174131202125',
        time: '2023-03-15 16:24:38',
        status: '4',
        details: '',
      },]
    }
  },
  mounted() {
    this.init()

  },
}
// TODO更改数据
</script>
<!-- TODO -->

<style lang="scss">
.el-table .warning-row {
  background: #FFCCCC;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
