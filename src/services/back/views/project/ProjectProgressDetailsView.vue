<template>


  <div id="steps">
    <el-steps :active="activeIndex - 1"
              finish-status="success"
              simple
              :process-status="process_status"
              style="margin-top: 50px">
<!--      process-status官网文档说是string类型,但是webstorm提示是StepStatus类型,也没找到StepStatus类型具体信息-->
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
        <el-tab-pane label="项目提交" v-if="activeIndex >= 1" id="project_commit">
          <el-descriptions class="margin-top"
                           :column="3"
                           border>
            <el-descriptions-item>
              <div slot="label" id="project_name">
                <i class="el-icon-user-solid">
                </i>项目名称
              </div>
              {{ project_commit.project_name }}
            </el-descriptions-item>

            <el-descriptions-item>
              <div slot="label">
                <i class="el-icon-user-solid">
                </i>项目负责人
              </div>
              {{ project_commit.principal }}
            </el-descriptions-item>

            <el-descriptions-item>
              <div slot="label">
                <i class="el-icon-time">
                </i>提交时间
              </div>
              {{ project_commit.time }}
            </el-descriptions-item>
            <el-descriptions-item>
              <div slot="label">
                <i class="el-icon-mobile-phone">
                </i>加分类型
              </div>
              <el-tag size="small">
                {{ project_commit.classification }}
              </el-tag>
              <el-tag size="small">
                {{ project_commit.secondary_classification }}
              </el-tag>
              <el-tag size="small">
                {{ project_commit.three_level_classification }}
              </el-tag>

            </el-descriptions-item>
            <el-descriptions-item>
              <div slot="label">
                <i class="el-icon-s-custom">
                </i>预估得分
              </div>
              {{ project_commit.score }}
            </el-descriptions-item>
            <el-descriptions-item>
              <div slot="label">
                <i class="el-icon-s-comment">
                </i>指导老师
              </div>
              {{ project_commit.score }}
            </el-descriptions-item>
            <el-descriptions-item>
              <div slot="label">
                <i class="el-icon-s-comment">
                </i>所属团队所属成员
              </div>
              <el-popover
                  placement="right"
                  width="400"
                  trigger="hover">
                <el-table :data="project_commit.team_member"
                          border
                          stripe
                          highlight-current-row>
                  <el-table-column label="姓名">
                    <template v-slot:default="scope">
                      {{ scope.row.name }}
                    </template>
                  </el-table-column>
                  <el-table-column label="学号">
                    <template v-slot:default="scope">
                      {{ scope.row.student_id }}
                    </template>
                  </el-table-column>
                  <el-table-column label="预估得分">
                    <template v-slot:default="scope">
                      {{ scope.row.score }}
                    </template>
                  </el-table-column>
                </el-table>
                <el-button slot="reference" size="small">查看成员信息</el-button>
              </el-popover>
            </el-descriptions-item>

            <el-descriptions-item>
              <div slot="label">
                <i class="el-icon-s-release">
                </i>证明材料
              </div>
              <el-popover placement="right"  trigger="hover">
                <el-image slot="reference" :src="project_commit.material" :alt="project_commit.material" style="width: 100px; height: 100px"></el-image>
                <el-image :src="project_commit.material"></el-image>
              </el-popover>
            </el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>

        <el-tab-pane label="班级审核" v-if="activeIndex >= 2" id="class_examine">
          <el-descriptions class="margin-top"
                           :column="3"
                           border>
            <el-descriptions-item>
              <div slot="label">
                <i class="el-icon-user">
                </i>审核人
              </div>
              {{ class_examine.reviewer }}
            </el-descriptions-item>
            <el-descriptions-item>
              <div slot="label">
                <i class="el-icon-s-claim">
                </i>状态
              </div>
              <div>
                <span v-if="class_examine.status === '2'">
                  <el-tag type="danger">不通过</el-tag>
                </span>
                <span v-else-if="class_examine.status === '0'">
                  <el-tag type="warning">待审核</el-tag>
                </span>
                <span v-else-if="class_examine.status === '1'">
                  <el-tag type="success">通过</el-tag>
                </span>
              </div>

            </el-descriptions-item>
            <el-descriptions-item>
              <div slot="label">
                <i class="el-icon-time">
                </i>审核时间
              </div>
              {{ class_examine.examine_time }}
            </el-descriptions-item>
            <el-descriptions-item>
              <div slot="label">
                <i class="el-icon-collection-tag">
                </i>级别
              </div>
              <el-tag size="small">
                班级
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
              <div slot="label">
                <i class="el-icon-message">
                </i>审核意见
              </div>
              {{ class_examine.message }}
            </el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>

        <el-tab-pane label="年级审核" v-if="activeIndex >= 3" id="grade_examine">
          <el-descriptions class="margin-top"
                           :column="3"
                           border>
            <el-descriptions-item>
              <div slot="label">
                <i class="el-icon-user">
                </i>审核人
              </div>
              {{ grade_examine.reviewer }}
            </el-descriptions-item>
            <el-descriptions-item>
              <div slot="label">
                <i class="el-icon-s-claim">
                </i>状态
              </div>
              <div>
                <span v-if="grade_examine.status === '2'">
                  <el-tag type="danger">不通过</el-tag>
                </span>
                <span v-else-if="grade_examine.status === '0'">
                  <el-tag type="warning">待审核</el-tag>
                </span>
                <span v-else-if="grade_examine.status === '1'">
                  <el-tag type="success">通过</el-tag>
                </span>
              </div>
            </el-descriptions-item>
            <el-descriptions-item>
              <div slot="label">
                <i class="el-icon-time">
                </i>审核时间
              </div>
              {{ grade_examine.examine_time }}
            </el-descriptions-item>
            <el-descriptions-item>
              <div slot="label">
                <i class="el-icon-collection-tag">
                </i>级别
              </div>
              <el-tag size="small">
                年级
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
              <div slot="label">
                <i class="el-icon-message">
                </i>审核意见
              </div>
              {{ grade_examine.message }}
            </el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>

        <el-tab-pane label="院级审核" v-if="activeIndex >= 4" id="college_examine">
          <el-descriptions class="margin-top"
                           :column="3"
                           border>
            <el-descriptions-item>
              <div slot="label">
                <i class="el-icon-user">
                </i>审核人
              </div>
              {{ college_examine.reviewer }}
            </el-descriptions-item>
            <el-descriptions-item>
              <div slot="label">
                <i class="el-icon-s-claim">
                </i>状态
              </div>
              <div>
                <span v-if="college_examine.status === '2'">
                  <el-tag type="danger">不通过</el-tag>
                </span>
                <span v-else-if="college_examine.status === '0'">
                  <el-tag type="warning">待审核</el-tag>
                </span>
                <span v-else-if="college_examine.status === '1'">
                  <el-tag type="success">通过</el-tag>
                </span>
              </div>
            </el-descriptions-item>
            <el-descriptions-item>
              <div slot="label">
                <i class="el-icon-time">
                </i>审核时间
              </div>
              {{ college_examine.examine_time }}
            </el-descriptions-item>
            <el-descriptions-item>
              <div slot="label">
                <i class="el-icon-collection-tag">
                </i>级别
              </div>
              <el-tag size="small">
                院级
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
              <div slot="label">
                <i class="el-icon-message">
                </i>审核意见
              </div>
              {{ college_examine.message }}
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
      project_commit: {
        // 项目名称
        project_name: '项目名称',
        // 项目负责人
        principal: '项目负责人',
        // 提交时间
        time: '2023/03/21',
        // 加分类型

        classification: '一级项目分类',
        secondary_classification: '二级项目分类',
        three_level_classification: '三级项目分类',

        // 预估得分
        score: '10',

        group: '',

        material: 'https://c.cidianwang.com/file/shufa/kaishu/renzheng/201883198133e39f.jpg',
        // 小组成员信息
        team_member: [
          {
            name: '张三',
            student_id: '201800000000',
            score: '2.5',
          }],
      },
      class_examine: {
        // 审核人
        reviewer: '班级审核人',
        // 状态 1通过 0待审核 2不通过
        status: '1',
        // 审核时间
        examine_time: '2021',
        // 审核意见
        message: '我的评价是:不寄',
      },
      grade_examine: {
        // 审核人
        reviewer: '年级审核人',
        // 状态 1通过 0待审核 2不通过
        status: '1',
        // 审核时间
        examine_time: '2022',
        // 审核意见
        message: '我的评价是:不寄',
      },
      college_examine: {
        // 审核人
        reviewer: '院级审核人',
        // 状态 1通过 0待审核 2不通过
        status: '2',
        // 审核时间
        examine_time: '2023',
        // 审核意见
        message: '我的评价是:寄喽',
      },


    };
  },
  mounted() {
    this.init()

  },
  methods: {
    init() {




    },


  }
}
</script>
<style lang="scss"></style>
