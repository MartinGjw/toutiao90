<template>
  <div class='login'>

<el-card class="box-card">

    <div class='title'> <img src="../../assets/img/logo_index.png" alt=""></div>
    <el-form :model="form" :rules="rules" ref="ruieform">
      <el-form-item prop='mobile'>
        <el-input v-model="form.mobile" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input class='code' v-model="form.code" placeholder="验证码"></el-input>
        <el-button plain class='btn'>发送验证码</el-button>
      </el-form-item>
      <el-form-item prop="check">
         <el-checkbox v-model="form.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" class="minbtn" @click="clicksubmit">提交</el-button>
      </el-form-item>
    </el-form>

</el-card>

  </div>
</template>

<script>
// import { log } from 'util'
export default {
  data () {
    return {
      form: {
        mobile: '',
        code: '',
        check: false
      },
      // 校验规则
      rules: {
        mobile: [{ required: true, message: '请输入您的手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入合法的手机号' }],
        code: [{ required: true, message: '请输入您的验证码' },
          { pattern: /^\d{6}$/, message: '验证码为6位数字' }],
        check: [{ validator: function (rule, value, callback) {
          if (value) {
            callback()
          } else {
            callback(new Error('您应该无条件同意我们的条款'))
          }
        } }]
      }
    }
  },
  methods: {
    clicksubmit () {
      this.$refs.ruieform.validate((isok) => {
        if (isok) {
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.form
          }).then(res => {
            window.localStorage.setItem = ('user-token', res.data.data.token)
            this.$router.push('/Home')
          }).catch(() => {
            this.$message({
              message: '账号密码错误',
              type: 'warning'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login{
    background-image:url('../../assets/img/1 (1).jpeg');
    height: 100vh;
    // background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .box-card{
        width: 440px;
        height: 350px;
        .title{
         text-align: center;
         margin-bottom: 20px;
         img{
            height: 45px;
           }
        }
        .code{
            width: 65%;
        }
        .btn{
            float: right;

        }
        .minbtn{
            width: 100%;
        }
    }
}
</style>
