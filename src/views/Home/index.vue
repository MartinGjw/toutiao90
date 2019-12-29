<template>
  <el-container>
    <el-aside :style="{width : collapse ? '60px' : '230px'}" style="transition: all 0.5s; min-height:100vh; background-color:#323745">
   <layout-aside :collapse="collapse"></layout-aside>
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
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      collapse: false
    }
  },
  created () {
    eventBus.$on('changecollapse', () => {
      this.collapse = !this.collapse
    })
  }
}
</script>

<style>

</style>
