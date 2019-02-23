<template>
  <div class="login-container">
    <el-row>
      <el-col :span="14">
        <img src="../../common/images/login-back.png" class="m-login-back" alt="">
      </el-col>
      <el-col :span="10" class="m-input-content">
        <div style="text-align: right;">
          <img src="../../common/images/login-logo.png" class="m-login-logo" alt="">
        </div>


        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form"
                 label-position="left">
          <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
            <el-input v-model.trim="loginForm.admin_idno" name="username" type="text" placeholder="用户名"/>
          </el-form-item>
          <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
            <el-input
              :type="pwdType" v-model="loginForm.admin_password" name="password" placeholder="密码"
              @keyup.enter.native="handleLogin"/>
            <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye"/>
        </span>
          </el-form-item>
          <el-form-item class="m-form-item">
            <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
              登录
            </el-button>
          </el-form-item>
          <div class="tips">
          </div>
        </el-form>
        <!--<div style="text-align: right;color: #889AA4;">-->
          <!--<span>忘记密码？</span>-->
        <!--</div>-->
      </el-col>
    </el-row>


  </div>
</template>

<script>
  import Cookie from 'js-cookie'
  import axios from 'axios';
  import api from '../../api/api'

  export default {
    name: 'Login',
    data() {
      return {
        loginForm: {
          admin_idno: Cookie.get('user_name'),
          admin_password: ''
        },
        loginRules: {
          admin_idno: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
          admin_password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
        },
        loading: false,
        pwdType: 'password',
        redirect: undefined
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true

            Cookie.set('user_name', this.loginForm.admin_idno);
            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.loading = false
              this.$router.push({ path:  '/profile/profile' })
            }).catch(() => {
              this.loading = false
            })
            // axios.post(api.login,{
            //   user_name:this.loginForm.username,
            //   user_password: this.loginForm.password
            // }).then(res => {
            //   if(res.data.status == 200){
            //     this.loading = false
            //     this.$router.push({ path: this.redirect || '/' })
            //   }else{
            //     this.loading = false
            //   }
            // })

          } else {
            this.$message.warning('请填写用户名和密码');
            return false
          }
        })
      }
    },

    created(){
      // console.log(this.$http, this.$api);
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg: #2d3a4b;
  $light_gray: #eee;

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: #283443;
      color: #454545;
      &.m-form-item{
        background-color: #fff;
      }
    }
  }

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;
    .m-login-back{
      display: inline-block;
      width: 100%;
      height: 100vh;
    }
    .m-login-logo{
      display: inline-block;
      width: 240px;
      height: 64px;
      margin: 68px 0 127px 0;
    }
    .m-input-content {
      background-color: #fff;
      height: 100vh;
      padding: 0 56px;
      .el-button{
        border-radius: none;
      }

    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
