<template>
  <div>
      <el-row class="top" type="flex" align="middle">
          <el-col :span='12' class="left">
            <i @click="collapseoropen" :class="{'el-icon-s-unfold':collapse,'el-icon-s-fold':!collapse}"></i>
            <span>江苏传智播客教育科技股份有限公司</span>
          </el-col>
          <el-col :span='12' class="right">
              <el-row type="flex" justify='end' align='middle'>
                  <img :src="userinfor.photo?userinfor.photo:defaultimg" alt="">
                  <el-dropdown @command='pushclick'>
                  <span class="el-dropdown-link">{{userinfor.name}}</span>

                 <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command='info'>个人信息</el-dropdown-item>
                  <el-dropdown-item command='gittitle'>git地址</el-dropdown-item>
                  <el-dropdown-item command='getout'>退出</el-dropdown-item>
                 </el-dropdown-menu>
                   </el-dropdown>
              </el-row>
          </el-col>
      </el-row>
  </div>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      userinfor: {},
      defaultimg: require('../../assets/img/1 (1).jpeg'),
      collapse: false
    }
  },
  methods: {
    collapseoropen () {
      this.collapse = !this.collapse
      eventBus.$emit('changecollapse')
    },
    pushclick (command) {
      if (command === 'info') {
        this.$router.push('/home/userinfo')
      } else if (command === 'gittitle') {
        window.location.href = 'https://github.com/MartinGjw'
      } else {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      }
    },
    getuserinfo () {
      this.$axios({
        url: '/user/profile'
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
      }).then(res => {
        this.userinfor = res.data
      })
    }
  },
  created () {
    // let token = localStorage.getItem('user-token')
    this.getuserinfo()
    eventBus.$on('updatauserinfo', () => {
      this.getuserinfo()
    })
  }

}
</script>

<style lang='less' scoped>
.top{
    height: 60px;
}
.left{
    font-size: 20px;
    span{
    font-size: 15px;
    margin-left: 5px;
    }
}
.right{

    img{
         height: 40px;
         width: 40px;
         border-radius: 50%;
         margin-right: 8px;
    }
}
</style>
