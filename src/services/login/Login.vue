<template>
  <div class="login-register">   
    <div class="contain">
      <div class="big-box" :class="{active:isLogin}">
        <div class="big-contain" key="bigContainLogin" v-if="isLogin">
          <div class="sub-title">账户登录</div>
          <div class="login-register-form">
            <input type="email" placeholder="邮箱" v-model="form.userEmail">
            <span class="errTips" v-if="emailError">* 邮箱填写错误 *</span>
            <input type="password" placeholder="密码" v-model="form.userPwd">
            <span class="errTips" v-if="passwordError">* 密码填写错误 *</span>
            <input type="text" placeholder="验证码 " v-model="form.coach">
            <span class="errTips" v-if="coachError">* 验证码写错误 *</span>
          </div>
          <button class="commit-button" @click="login">登录</button>
          <div class="orBox">
            <div class="qq">
              <p>
                <a href="">
                  <img src="../../assets/qq.png" alt="">
                  <span>&nbsp;QQ登录</span>
                </a>
              </p>
            </div>
            <div class="wx">
              <p>
                <a href="">
                  <img src="../../assets/weixin.png" alt="">
                  <span>&nbsp;微信登录</span>
                </a>
              </p>
            </div>
          </div>
        </div>

        <div class="big-contain" key="bingContainLogin" v-else>
          <div class="sub-title">创建账户</div>
          <div class="login-register-form">
            <input type="text" placeholder="用户名" v-model="form.username" >
            <span class="errTips" v-if="existed">*用户名已经存在！*</span>
            <input type="email" placeholder="邮箱" v-model="form.userEmail">
            <input type="password" placeholder="密码" v-model="form.userPwd" >
          </div>
          <button class="commit-button" @click="register">注册</button>
          <div class="orBox">
            <div class="qq">
              <p>
                <a href="">
                  <img src="../../assets/qq.png" alt="">
                  <span>&nbsp;QQ登录</span>
                </a>
              </p>
            </div>
            <div class="wx">
              <p>
                <a href="">
                  <img src="../../assets/weixin.png" alt="">
                  <span>&nbsp;微信登录</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="small-box" :class="{active:isLogin}">
        <div class="small-contain" key="smallContainRegister" v-if="isLogin">
          <div class="notice-title">在此开始</div>
          <p class="notice-content">注册以使用创新学分管理系统，开启科创之旅</p>
          <button class="change-button" @click="changeType">注册</button>
        </div>
        <div class="small-contain" key="smallContainLogin" v-else>
          <div class="notice-title">欢迎回来</div>
          <p class="notice-content">登录创新学分管理系统以获取更多消息</p>
          <button class="change-button" @click="changeType">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {goToBackPage} from "@/api/jump";

export default{
  // eslint-disable-next-line vue/multi-word-component-names
  name:'Login',
  data() {
    return {
      isLogin:false,
      emailError:false,
      passwordError:false,
      coachError:false,
      existed:false,
      form:{
        username:'',
        userEmail:'',
        userPwd:'',
        coach:''
      }
    }
  },
  methods:{
    changeType(){
      this.isLogin = !this.isLogin
      this.form.username = ''
      this.form.userEmail = ''
      this.form.userPwd = ''
      this.form.coach = ''
    },
    login(){
      const self = this;
      if(self.form.userEmail !== "" && self.form.userPwd !== ""){
        // 预留的登录接口
        // self.axios({
        //   method:'post',
        //   url:'http://127.0.0.1:10520/api/user/login',
        //   data:{
        //     email:self.form.userEmail,
        //     password:self.form.userPwd,
        //     coach:self.form.coach
        //   }
        // }).then(res=>{
        //   switch(res.data){
        //     case 0:
        //       alert("登录成功！");
        //       break;
        //     case -1:
        //       this.emailError = true;
        //       break;
        //     case 1:
        //       this.passwordError = true;
        //       break;
        //     case 2:
        //       this.coachError = true;
        //       break;
        //   }
        // }).catch(err =>{
        //    console.log(err);
        // })

        goToBackPage()
      }else{
        alert('填写不能为空！')
      }
    },
    register(){
      const self = this;
      if(self.form.username !=="" &&self.form.userEmail !== "" && self.form.userPwd !== ""){
        self.axios({
          method:'post',
          url:'http://127.0.0.1:10520/api/user/login',
          data:{
            email:self.form.userEmail,
            password:self.form.userPwd,
            coach:self.form.coach
          }
        }).then(res=>{
          switch(res.data){
            case 0:
              alert("注册成功！");
              break;
            case -1:
              this.existed = true;
              break;
          }
        }).catch( err=>{
           console.log(err)
        })

      }else{
        alert('填空不能为空！')
      }
    }
  }
}
</script>

<style scoped>


img {
    border: 0;
    /*为了照顾部分浏览器图片外面包含链接会有边框的问题*/
    vertical-align: middle
        /*防止图片底侧有空白缝隙*/
}

.login-register{
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background-image: url('https://sso.cuit.edu.cn/5aac9ddf85bc479ba60358cee900e5ec.jpg');
  background-size: cover;
}
.contain{
  width: 60%;
  height: 70%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: rgba(255, 255, 255, 0.8);
  /*background-color: #fff;*/
  border-radius: 20px;
  box-shadow: 0 0 3px #f0f0f0,
  0 0 6px #f0f0f0;
}
.big-box{
  width: 70%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 30%;
  transform: translateX(0%);
  transition: all 1s;
}
.big-contain{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.sub-title{
  font-size: 1.5em;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.70);
}
.login-register-form{
  width: 100%;
  height: 40%;
  padding: 2em 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.login-register-form .errTips{
  display: block;
  width: 50%;
  text-align: left;
  color: red;
  font-size: 0.7em;
  margin-left: 1em;
}
.login-register-form input{
  width: 50%;
  height: 2.5rem;
  border: none;
  outline: none;
  border-radius: 10px;
  padding-left: 2em;
  background-color: rgba(133, 129, 129, 0.5);
}
.commit-button{
  /* width: 20%;
  height: 3rem;
  border-radius: 2.3rem;
  border: none;
  outline: none;
  background-color: rgb(57, 134, 176, 0.7);
  color: #fff;
  font-size: 0.9em;
  cursor: pointer; */

  border: 0px;
  outline: none;
  width: 55%;
  height: 40px;
  line-height: 40px;
  background: #46A0E8;
  font-size: 18px;
  color: #fff;
  cursor: pointer;

}
.small-box{
  width: 30%;
  height: 100%;
  background: linear-gradient(135deg, rgb(57, 154, 176), rgb(56, 100, 183));
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(0%);
  transition: all 1s;
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
}
.small-contain{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.notice-title{
  font-size: 1.5em;
  font-weight: bold;
  color: #fff;
}
.notice-content{
  font-size: 0.8em;
  color: #fff;
  text-align: center;
  padding: 2em 4em;
  line-height: 1.7em;
}
.change-button{
  width: 60%;
  height: 3rem;
  border-radius: 2.3rem;
  border: 0.1rem solid #fff;
  outline: none;
  background-color: transparent;
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}

.big-box.active{
  left: 0;
  transition: all 0.5s;
}
.small-box.active{
  left: 100%;
  border-bottom-left-radius: 0;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
  transform: translateX(-100%);
  transition: all 1s;
}

.small-box.active{
  border-top-left-radius: 0;
}

input{
  height: 5vh;
}

.orBox{
  width: 55%;
  display: flex;
  justify-content:space-around;
  margin-top: 10px;
}

.orBox p{
  text-align: center;
  color: #333;
  font-size: 13px;
}
.orBox a {
    color: #666;
    text-decoration: none
}

</style>
