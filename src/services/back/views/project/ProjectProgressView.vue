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
        material: 'https://proofmart.com/wp-content/uploads/2021/06/541-47-1080x1080.png',
        upload_user: '1',
        status: '-1'
      }, {
        id:'1002',
        project_name: '2',
        group: '7',
        time:'2023-03-01',
        score: '2',
        material: 'https://th.bing.com/th/id/R.89f25654c7caec8ab83fcdc33f551739?rik=cJe5c2D4jZMn7g&riu=http%3a%2f%2fwww.shufaai.com%2fupload%2fzidianimg%2f14%2f2_0312214QA4c.jpg&ehk=StiGh%2b5eNiYCB%2f2fXESTuJ3GXDietyNli4iyx73Tyig%3d&risl=&pid=ImgRaw&r=0',
        upload_user: '2',
        status: '0'
      }, {
        id:'1003',
        project_name: '3',
        group: '8',
        time:'2023-03-01',
        score: '3',
        material: 'https://th.bing.com/th/id/R.f2b9f2346734c80dc3866ce6b9f6ad49?rik=ivcBbPVpHLtPQA&riu=http%3a%2f%2fwww.drodd.com%2fimages15%2f5-7.jpg&ehk=HWWDU0RXCZLHPUwZrWE52i6I7HW4CoS1AgT2oYafAl8%3d&risl=&pid=ImgRaw&r=0',
        upload_user: '3',
        status: '1'
      }, {
        id:'1004',
        project_name: '4',
        group: '9',
        time:'2023-03-01',
        score: '4',
        material: 'https://ak5.picdn.net/shutterstock/videos/1970515/thumb/1.jpg',
        upload_user: '4',
        status: '2'
      }, {
        id:'1005',
        project_name: '5',
        group: '10',
        time:'2023-03-01',
        score: '5',
        material: 'https://th.bing.com/th/id/R.5a881cf39df4c7adae78c99fa403ed9b?rik=cm1nEiDekI0pog&riu=http%3a%2f%2fakcgb51.ru%2fwp-content%2fuploads%2f2018%2f10%2fexclamation_mark_PNG35.png&ehk=qxvk%2fbu4Kd2wbRH%2ffZXhkD7TNXzxyXptoBhDV5lRgRM%3d&risl=&pid=ImgRaw&r=0',
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
