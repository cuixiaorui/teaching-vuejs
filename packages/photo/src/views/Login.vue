<template>
  <div class="loginContainer">
    <div class="loginContainer__inner">
      <h1>登录</h1>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { fetchLogin } from "@/api";
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {
            type: "string",
            required: true,
            trigger: "blur",
            message: "请输入正确的账号名"
          }
        ],
        password: [
          {
            type: "string",
            required: true,
            trigger: "blur",
            message: "请输入正确的密码"
          }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate((valid, fields) => {
        if (valid) {
          // 可以进入主页面
          // 登录 -> 成功之后调整到主页
          const { username, password } = this.ruleForm;
          this.$store.dispatch("login", {
            username,
            password
          });
          // fetchLogin({ username, password }).then(() => {
          //   // 调整到 home 页面
          //   this.$router.push({
          //     name: "Home"
          //   });
          // });
        } else {
          // 给一个提示
          this.$message({
            message: "请输入正确的字段",
            type: "error"
          });

          // 清空失败的字段
          for (const key in fields) {
            this.ruleForm[key] = "";
          }
          // 清空失败的字段的校验提示
          this.$refs.ruleForm.clearValidate(fields);
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>

<style scoped>
.loginContainer {
  margin: 0 auto;
  width: 600px;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 50px;
  border: 1px solid;
}

.loginContainer__inner {
  width: 90%;
}

.loginContainer input {
  margin-bottom: 20px;
}
.loginStyle {
  width: 160px;
  height: 40px;
  background: rgb(50, 203, 77);
  color: white;
  font-size: 17px;
}
.inputStyle {
  width: 200px;
  height: 30px;
  padding: 5px;
  outline: none;
}

.inputStyle:focus {
  border: 1px solid rgb(50, 203, 77);
}
form {
  position: relative;
}
.exchange {
  position: absolute;
  top: 8px;
  right: 65px;
  color: red;
}
</style>
