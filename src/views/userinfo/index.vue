<template>
  <el-card>
     <bread-crumb slot="header">
     <template slot="title">
        账户信息
     </template>
    </bread-crumb>
    <el-form style="margin-left:100px" :model="formdata" :rules="rules" ref="myform" label-width="100px">
        <el-form-item prop="name" label="用户名">
            <el-input v-model="formdata.name" style="width:40%"></el-input>
        </el-form-item>
        <el-form-item prop="intro" label="简介">
            <el-input v-model="formdata.intro" style="width:40%"></el-input>
        </el-form-item>
         <el-form-item prop="email" label="邮箱">
            <el-input v-model="formdata.email" style="width:40%"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="手机号">
            <el-input v-model="formdata.mobile" disabled style="width:40%"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="saveuserinfo" type="primary">保存信息</el-button>
        </el-form-item>
    </el-form>
    <el-upload class="head-upload" :show-file-list="false" action="">
            <img :src="formdata.photo?formdata.photo:defaultimg" alt="">
    </el-upload>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formdata: {
        name: '', // 用户名
        intro: '', // 简介
        photo: '', // 头像
        email: '', // 邮箱
        mobile: ''
      },
      defaultimg: require('../../assets/img/1111.jpg'),
      rules: {
        name: [{ required: true, message: '用户名不能为空' }, {
          min: 1, max: 7, message: '用户名长度在1到7个字符' }],
        email: [{ required: true, message: '邮箱不能为空' },
          { pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
            message: '邮箱格式不正确'
          }]
      }
    }
  },
  methods: {
    getuserinfo () {
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        this.formdata = res.data
      })
    },
    saveuserinfo () {
      this.$refs.myform.validate().then(res => {
        this.$axios({
          url: '/user/profile',
          method: 'patch',
          data: this.formdata
        }).then(res => {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
        })
      })
    }
  },
  created () {
    this.getuserinfo()
  }
}
</script>

<style lang="less" scoped>
   .head-upload {
      position: absolute;
      right: 300px;
      top:200px;
       img {
          width: 200px;
          height: 200px;
           border-radius: 50%;
       }
   }
</style>
