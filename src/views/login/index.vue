<template>
  <div class='login'>
<el-card class="box-card">
    <div class='title'> <img src="../../assets/img/logo_index.png" alt=""></div>
<el-form>
    <el-form-item>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    </el-form-item>
    <el-form-item>
    <el-input class='code' v-model="input" placeholder="验证码"></el-input>
     <el-button plain class='btn'>发送验证码</el-button>
    </el-form-item>
    <el-form-item>
     <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
    </el-form-item>
    <el-form-item>
          <el-button type="primary" class="minbtn">主要按钮</el-button>
    </el-form-item>
</el-form>

</el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.login{
    background-image:url('../../assets/img/background.jpg');
    height: 100vh;
    background-size: cover;
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
