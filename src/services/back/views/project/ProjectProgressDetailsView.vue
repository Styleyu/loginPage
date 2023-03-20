<template>
  <!-- <el-steps :active="2" align-center>
  <el-step title="步骤1" description="这是一段很长很长很长的描述性文字"></el-step>
  <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
  <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
  <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
  </el-steps> -->
  <div>
    <el-steps :active="activeIndex - 1"
              finish-status="success"
              simple
              :process-status="process_status"
              style="margin-top: 50px">
      <el-step title="项目提交">
      </el-step>
      <el-step title="班级审核">
      </el-step>
      <el-step title="年级审核">
      </el-step>
      <el-step title="院级审核">
      </el-step>
    </el-steps>
    <el-divider/>
    <div id="">
      <el-tabs type="border-card" stretch>
        <!-- TODO 重构一下,把数据放data里面 -->
        <el-tab-pane label="项目提交" v-if="activeIndex >= 1">
          <el-descriptions class="margin-top"
                           :column="2"
                           border>
            <el-descriptions-item >
              <template slot="label">
                <i class="el-icon-user-solid">
                </i>上传者
              </template>

              {{project_commit.upload_user}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-time">
                </i>提交时间
              </template>
              {{project_commit.time}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-mobile-phone">
                </i>项目名称
              </template>
              {{project_commit.project_name}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-s-custom">
                </i>所属团队
              </template>
              {{project_commit.group}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-s-comment">
                </i>预估得分
              </template>
              {{project_commit.score}}
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-s-release">
                </i>证明材料
              </template>
              {{project_commit.material}}
            </el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>
        <el-tab-pane label="班级审核" v-if="activeIndex >= 2">
          <el-descriptions class="margin-top"
                           :column="3"
                           border>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-user">
                </i>审核人
              </template>

              {{class_exanine.reviewer}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-s-claim">
                </i>状态
              </template>
              {{class_exanine.status}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-time">
                </i>通过时间
              </template>
              {{class_exanine.pass_time}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-collection-tag">
                </i>级别
              </template>
              <el-tag size="small">
                班级
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-message">
                </i>审核意见
              </template>
              {{class_exanine.message}}
            </el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>
        <el-tab-pane label="年级审核" v-if="activeIndex >= 3">
          <el-descriptions class="margin-top"
                           :column="2"
                           border>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-user">
                </i>审核人
              </template>

              {{}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-mobile-phone">
                </i>状态
              </template>
              18100000000
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-location-outline">
                </i>通过时间
              </template>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-tickets">
                </i>备注
              </template>
              <el-tag size="small">

              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-office-building">
                </i>审核意见
              </template>
            </el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>
        <el-tab-pane label="院级审核" v-if="activeIndex >= 4">
          <el-descriptions class="margin-top"
                           :column="2"
                           border>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-user">
                </i>审核人
              </template>

              {{}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-mobile-phone">
                </i>状态
              </template>
              18100000000
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-location-outline">
                </i>通过时间
              </template>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-tickets">
                </i>备注
              </template>
              <el-tag size="small">

              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-office-building">
                </i>审核意见
              </template>
            </el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 当前节点位置
      activeIndex: 4,

      // 当前节点状态wait / process / finish / error / success
      process_status: 'error',
      project_commit:{
        upload_user:'',
        time:'',
        project_name:'',
        group:'',
        score:'',
        material:'',
      },
      class_exanine:{
        reviewer:'',
        status:'',
        pass_time:'',

        message:'',
      },
      grade_examine:{
        upload_user:'',
        time:'',
        project_name:'',
        group:'',
        score:'',
        material:'',
      },
      college_examine:{
        upload_user:'',
        time:'',
        project_name:'',
        group:'',
        score:'',
        material:'',
      },



    };
  },
  mounted() {
    this.init()

  },
  methods: {
    setChosenIndex(index) {
      // this.activeIndex = index;
      if (index <= this.activeIndex) {
        this.chosenIndex = index;

      }

    },
    init() {
      this.chosenIndex = this.activeIndex;
    },

  }
}
</script>
<!-- TODO -->
<style lang="scss"></style>
