<template>
  <div>
    <p>添加项目</p>

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="auto"
      class="submmit-ruleForm"
    >
      <el-divider></el-divider>
      <el-row>
        <el-col :span="8">
          <el-form-item label="项目名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目负责人学号" prop="stuid">
            <el-input v-model="ruleForm.stuid"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目负责人姓名" prop="stuname">
            <el-input v-model="ruleForm.stuname"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="应加学分">
            <el-cascader
              clearable
              v-model="value"
              :options="options"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="加分数">
            <el-select v-model="ruleForm.score" placeholder="请选择加分数">
              <el-option label="0.5" value="0.5"></el-option>
              <el-option label="1.0" value="1.0"></el-option>
              <el-option label="1.5" value="1.5"></el-option>
              <el-option label="2.0" value="2.0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="上传材料" prop="upload">
        <el-upload
          class="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-form-item>
      <el-divider></el-divider>

      <el-form-item
        v-for="(teacher, index) in dynamicValidateForm.teachers"
        :label="'指导教师' + (index + 1) + '姓名'"
        :key="teacher.key"
        label-width="auto"
        :rules="{
          required: true,
          message: '姓名不能为空',
          trigger: 'blur',
        }"
      >
        <el-input v-model="teacher.value"></el-input>

        <span>&nbsp;联系方式：</span>
        <el-input v-model="teacher.contact"></el-input>

        <el-button @click.prevent="removeDomain(teacher)">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="addDomain" type="primary"
          >点此继续添加教师</el-button
        >
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
      </el-form-item>

      <el-divider></el-divider>
      <el-form-item
        v-for="(student, index) in dynamicValidateForm.students"
        :label="'小组成员' + (index + 1) + '姓名'"
        :key="student.key"
        :rules="{
          required: true,
          message: '姓名不能为空',
          trigger: 'blur',
        }"
      >
        <el-input v-model="student.value"></el-input>

        <span>&nbsp;学号：</span>
        <el-input v-model="student.number"></el-input>
        <p>&nbsp;应加学分：</p>
        <el-select v-model="ruleForm.region" placeholder="请选择加分数">
          <el-option label="0.5" value="0.5"></el-option>
          <el-option label="1.0" value="1.0"></el-option>
          <el-option label="1.5" value="1.5"></el-option>
          <el-option label="2.0" value="2.0"></el-option>
        </el-select>
        <br />

        <el-button @click.prevent="removeDomains(student)">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="addDomains" type="primary"
          >点此继续添加学生</el-button
        >
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
      </el-form-item>

      <el-divider></el-divider>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dynamicValidateForm: {
        teachers: [
          {
            value: "",
          },
        ],
        students: [
          {
            value: "",
          },
        ],
        email: "",
      },
      fileList: [
        {
          name: "材料1.jpeg",
          url: "https://pcsdata.baidu.com/thumbnail/04b1746bakd5738501bfa720df283f97?fid=574190319-16051585-1046918376323226&rt=pr&sign=FDTAER-yUdy3dSFZ0SVxtzShv1zcMqd-76teI%2BFhiypXv9oqNG4E6dSTQzY%3D&expires=48h&chkv=0&chkbd=0&chkpc=&dp-logid=8835102003701024135&dp-callid=0&time=1679644800&bus_no=26&size=c1600_u1600&quality=100&vuk=-&ft=video",
        },
        {
          name: "材料2.jpeg",
          url: "https://pcsdata.baidu.com/thumbnail/a1940fdd4h39a655b468b71391fc583e?fid=574190319-16051585-315441269639667&rt=pr&sign=FDTAER-yUdy3dSFZ0SVxtzShv1zcMqd-IRsOCHjltiWyjWASATEBMls9M3w%3D&expires=48h&chkv=0&chkbd=0&chkpc=&dp-logid=8835102003701024135&dp-callid=0&time=1679644800&bus_no=26&size=c1600_u1600&quality=100&vuk=-&ft=video",
        },
      ],

      value: [],
      options: [
        {
          value: "chaungxinxunlianhuodong",
          label: "创新训练活动",
          children: [
            {
              value: "xueshuhuodong",
              label: "学术活动",
              children: [
                {
                  value: "canjiaxuexiaozuzhidegeleixueshubaogao",
                  label: "参加学校组织的各类学术报告",
                },
                {
                  value: "canjiajiaoshikeyan",
                  label: "参加教师科研",
                },
                {
                  value: "qita",
                  label: "其他",
                },
              ],
            },
            {
              value: "keyanhuodong",
              label: "科研活动",
              children: [],
            },
          ],
        },
        {
          value: "jingsaihuodong",
          label: "竞赛活动",
          children: [],
        },
        {
          value: "chaungyeshijian",
          label: "创业实践",
          children: [],
        },
        {
          value: "shehuishijian",
          label: "社会实践",
        },
        {
          value: "jiuyenneglitishenghuodong",
          label: "就业能力提升活动",
        },
      ],
      ruleForm: {
        name: "",
        stuid: "",
        stuname: "",
        classify: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        score: "",
        upload: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleChange1(file, fileList) {
      this.fileList = fileList.slice(-3);
    },

    handleChange(value) {
      console.log(value);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.teachers.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.teachers.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.teachers.push({
        value: "",
        key: Date.now(),
      });
    },
    removeDomains(item) {
      var index = this.dynamicValidateForm.students.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.students.splice(index, 1);
      }
    },
    addDomains() {
      this.dynamicValidateForm.students.push({
        value: "",
        key: Date.now(),
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
