<template>
   <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="素材库" name="articles">
      <div class="imgtabs">
          <el-card v-for="(item,index) in list" :key="index" class="imgtab-card"  :body-style="{ padding: '0px' }">
              <img  @click="passval(item.url)" :src="item.url" alt="" class="imgtab-img">
          </el-card>
      </div>
      <el-row type="flex" justify="center">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change='changepage'
            :page-size="page.pagesize"
            :current-page="page.currentpage"
            :total="page.total">
          </el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="upload">上传图片</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'articles',
      list: [],
      page: {
        currentpage: 1,
        pagesize: 10,
        total: 0
      }
    }
  },
  methods: {
    passval (url) {
      this.$emit('selectoneimg', url)
    },
    changepage (newpage) {
      this.page.currentpage = newpage
      this.getalliamge()
    },
    getalliamge () {
      this.$axios({
        url: '/user/images',
        params: { collect: false, page: this.page.currentpage, per_page: this.page.pagesize }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    }
  },
  created () {
    this.getalliamge()
  }
}
</script>

<style lang="less" scoped>
.imgtabs{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
     .imgtab-card{
          width: 150px;
          height: 150px;
          margin: 20px 10px;
          .imgtab-img{
              width: 100%;
              height: 150px;
          }
     }
}
</style>
