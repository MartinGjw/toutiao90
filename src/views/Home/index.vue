<template>
  <el-container>
    <el-aside style="height:100vh; background-color:#323745; width:230px">
   <layout-aside></layout-aside>
    </el-aside>
    <el-container>
      <el-header>
     <!-- 右侧顶 -->
     <layout-top></layout-top>
      </el-header>
      <el-main>
        右侧内容
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import layoutaside from '../../components/home/layout-aside'
// import layouttop from '../../components/home/layout-top'
export default {
  // components: {
  //   'layout-aside': layoutaside,
  //   'layout-top': layouttop
  // }
}
</script>

<style>

</style>
