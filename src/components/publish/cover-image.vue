<template>
  <div class='cover-image'>
      <div @click="opendia(index)" v-for="(item,index) in list" :key="index" class='cover-image-item'>
          <img :src="item ? item : defaultImg" alt="">
      </div>
      <el-dialog
      :visible="dialogVisible"
      title="选择封面图片"
      @close="closedia"
      >
      <select-image @selectoneimg="passval"></select-image>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false,
      selectindex: -1
    }
  },
  methods: {
    passval (url) {
      this.$emit('selecttwoimg', url, this.selectindex)
      this.closedia()
    },
    opendia (index) {
      this.dialogVisible = true
      this.selectindex = index
    },
    closedia () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.cover-image {
      margin: 20px 50px;
     display: flex;
     .cover-image-item {
       border: 1px solid #ccc;
       width: 250px;
       height: 250px;
       padding: 20px;
       img {
         width: 100%;
         height: 100%;
       }
     }
   }
</style>
