<template>
 <el-card  v-loading="zhuangtai">
<bread-crumb slot="header">
<span slot="title">评论列表</span>
</bread-crumb>
 <el-table :data='list'>
        <!-- 放置列组件 -->
        <el-table-column prop="title" width="600" label="标题"></el-table-column>
        <el-table-column :formatter="formaterbool" prop="comment_status" label="评论状态"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
         <el-table-column label="操作">
           <template slot-scope="obj">
          <el-button type="text">修改</el-button>
          <el-button @click="commentsta(obj.row)" type="text">{{obj.row.comment_status?'关闭':'打开'}}评论</el-button>
          </template>
         </el-table-column>
        <el-table-column></el-table-column>

    </el-table>
    <el-row type="flex" justify="center" align="middle" style="height:80px">
      <el-pagination
        background
        :page-size="page.pageSize"
        :current-page="page.currentpage"
        layout="prev, pager, next"
        :total="page.total"
        @current-change="currentchange">
    </el-pagination>
    </el-row>

 </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        total: 0,
        pageSize: 10,
        currentpage: 1
      },
      zhuangtai: false
    }
  },
  methods: {
    getcommot () {
      this.zhuangtai = true
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment',
          page: this.page.currentpage,
          per_page: this.page.pageSize }
      }).then(res => {
        this.zhuangtai = false
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    },
    // 监听分页点击事件
    currentchange (newpage) {
      this.page.currentpage = newpage
      this.getcommot()
    },
    formaterbool (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    commentsta (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您是否确定要${mess}评论吗`, '提示').then(() => {
        this.$axios({
          url: '/comments/status',
          method: 'put',
          params: { article_id: row.id.toString() },
          data: {
            allow_comment: !row.comment_status
          }
        }).then(res => {
          this.getcommot()
        }).catch(() => {

        })
      })
    }
  },

  created () {
    this.getcommot()
  }
}
</script>

<style>

</style>
