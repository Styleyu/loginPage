<template>
  <div id="pageBody">
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

      <el-table-column prop="score" label="预估得分">
        <v-slot slot-scope="scope">
          {{ scope.row.score }}
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

      <el-table-column prop="upload_user" label="上传者">
        <v-slot slot-scope="scope">
          {{ scope.row.upload_user }}
        </v-slot>
      </el-table-column>

      <el-table-column prop="status" label="状态">
        <v-slot slot-scope="scope">
          {{ scope.row.status }}
        </v-slot>
      </el-table-column>

      <el-table-column label="审核详情">
        <v-slot slot-scope="scope">
          <el-button type="info" @click="alarmsHandle(scope.row)">
            <span  >详情</span>
          </el-button>

        </v-slot>
      </el-table-column>
    </el-table>
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
  </div>


</template>
<script>
export default {
  methods: {
    tableRowClassName({ row }) {
      // 未审核列和已审核列判断
      if(row.status === '0'){
        row.status='待审核';
        return 'success-row';
      }else if(row.status === '1'){
        row.status='班级审核通过';
        return 'success-row';
      }else if(row.status === '2'){
        row.status='年级审核通过';
        return 'success-row';
      }else if(row.status === '3'){
        row.status='院级审核通过';
        return 'success-row';
      }else if(row.status === '-1'){
        row.status='被退回';
        return 'warning-row';
      }
      return '';
    },
    alarmsHandle:function(row){
      let progress_id = row.id;
      this.$router.push({path: "progress_details"})

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
    init() {

    }
  },
  data() {
    return {
      flag: 0,
      //分页器数据
      currentPage: 1,
      pageSize: 10,
      total: 100,
      // 项目进度节点状态
      process_status:'error',
      tableData: [{
        id:'1001',
        project_name: '1',
        group: '6',
        time:'2023-03-01',
        score: '1',
        material: 'https://c.cidianwang.com/file/shufa/xingshu/2014111109125248.jpg',
        upload_user: '1',
        status: '-1'
      }, {
        id:'1002',
        project_name: '2',
        group: '7',
        time:'2023-03-01',
        score: '2',
        material: 'https://th.bing.com/th/id/R.1d28a3c2ce4c02b5d950637372f07798?rik=fWKELOOONa%2foMA&riu=http%3a%2f%2fshufa.supfree.net%2fk%2f117176.gif&ehk=U%2bZTGsKlVclmBE84oTz5yNCOedjYxDZ59JYY9%2bWeG5Y%3d&risl=&pid=ImgRaw&r=0',
        upload_user: '2',
        status: '0'
      }, {
        id:'1003',
        project_name: '3',
        group: '8',
        time:'2023-03-01',
        score: '3',
        material: 'https://th.bing.com/th/id/R.64271369879ba395fcf10ed7abb82787?rik=%2bR9WnvHqTNvf0A&riu=http%3a%2f%2fc.cidianwang.com%2ffile%2fshufa%2fkaishu%2fhzy2015816125021596.jpg&ehk=LYJz11jJXhqR6dIfGA%2fVyuqRFda8SzXkLflNC521Iz0%3d&risl=&pid=ImgRaw&r=0',
        upload_user: '3',
        status: '1'
      }, {
        id:'1004',
        project_name: '4',
        group: '9',
        time:'2023-03-01',
        score: '4',
        material: 'https://c.cidianwang.com/file/shufa/xingshu/zhaomengfu/201665112133742.jpg',
        upload_user: '4',
        status: '2'
      }, {
        id:'1005',
        project_name: '5',
        group: '10',
        time:'2023-03-01',
        score: '5',
        material: 'https://c.cidianwang.com/file/shufa/kaishu/tianyunzhang/201665105111458.jpg',
        upload_user: '5',
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
