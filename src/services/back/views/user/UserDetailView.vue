<template>
  <div class="container">
    <el-descriptions class="tables" title="用户详情" :column="2" size="medium" border>
      <template slot="extra">
        <span>信息有误?&nbsp;</span>
        <el-button type="primary" size="small" @click="reportWrong">上报错误</el-button>
      </template>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          姓名
        </template>
        {{ name }}
        <el-tag>{{ identify }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-s-custom"></i>
          学号
        </template>
        {{ number }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          手机号
        </template>
        18100000000
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          组
        </template>
        软件工程学院软工2020级1班
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          入学时间
        </template>
        {{ entryDate }}
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions class="security" title="安全" size="medium" border>
      <el-descriptions-item>
        <template slot="label">
          密码
        </template>
        <el-button type="primary" size="small">修改密码</el-button>
      </el-descriptions-item>
    </el-descriptions>
    <!-- 上报有误信息 -->
    <el-dialog title="上报有误信息" :visible.sync="isReportDialogVisible">
      <el-descriptions :column="2" size="medium" border>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            姓名
          </template>
          {{ name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-custom"></i>
            学号
          </template>
          {{ number }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            手机号
          </template>
          18100000000
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            组
          </template>
          软件工程学院软工2020级1班
        </el-descriptions-item>
      </el-descriptions>
      <div style="display: flex; justify-content: center; padding-top: 1rem;">
        <el-button size="small" type="primary">提交修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      isReportDialogVisible: false,
      report: {
        name: '',
        number: '',
        group: '',
        entryDate: ''
      }
    }
  },
  computed: {
    ...mapState('user', ['username', 'name', 'number', 'identify', 'entryDate'])
  },
  methods: {
    reportWrong() {
      this.isReportDialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  width: 100%;
}

.tables {
  flex: 1;
}

.security {
  flex-basis: 12rem;
  margin-left: 1rem;
}
</style>