<template>
  <el-container>
    <el-aside style="min-height:100vh; background-color:#323745; width:230px">
   <layout-aside></layout-aside>
    </el-aside>
    <el-container>
      <el-header>
     <!-- 右侧顶 -->
     <layout-top></layout-top>
      </el-header>
      <el-main>
        <!-- 右侧内容 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

export default {

}
</script>

<style>

</style>
