<template>
  <div>
      <el-row class="top" type="flex" align="middle">
          <el-col :span='12' class="left">
            <i class="el-icon-s-unfold"></i>
            <span>江苏传智播客教育科技股份有限公司</span>
          </el-col>
          <el-col :span='12' class="right">
              <el-row type="flex" justify='end' align='middle'>
                  <img src="../../assets/img/1 (2).jpg" alt="">
                  <el-dropdown>
                  <span class="el-dropdown-link">下拉菜单</span>
                 <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>个人信息</el-dropdown-item>
                  <el-dropdown-item>git地址</el-dropdown-item>
                  <el-dropdown-item>退出</el-dropdown-item>
                 </el-dropdown-menu>
                   </el-dropdown>
              </el-row>
          </el-col>
      </el-row>
  </div>
</template>

<script>
export default {

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
