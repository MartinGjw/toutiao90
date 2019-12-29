<template>
<div>
<el-card>
    <bread-crumb slot="header">
     <template slot="title">
        内容列表
     </template>
    </bread-crumb>

    <el-form style="margin-left:20px">
        <el-form-item label="文章状态:">
              <el-radio-group v-model="searchform.status" @change="changecolidin">
                <el-radio :label="5">全部</el-radio>
                <el-radio :label="0">草稿</el-radio>
                <el-radio :label="1">待审核</el-radio>
                <el-radio :label="2">审核通过</el-radio>
                <el-radio :label="3">审核失败</el-radio>
              </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表:" >
               <el-select placeholder="请选择" v-model="searchform.channel_id" @change="changecolidin">
                <el-option
                  v-for="item in channels"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
               </el-select>
        </el-form-item>
        <el-form-item label="时间选择:">
                <el-date-picker
                value-format="yyyy-MM-dd"
                 @change="changecolidin"
                  v-model="searchform.daterange"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
        </el-form-item>
    </el-form>
</el-card>
<el-card style="margin-top:10px">
      <template slot="header">共找到{{page.total}}条符合条件的内容</template>
      <div class="active" v-for="item in list" :key="item.id.toString()">
      <div class="left">
          <img :src="item.cover.images.length ? item.cover.images[0] : defaulimg" alt="">
          <div class="forms">
              <span>{{item.title}}</span>
              <el-tag class='biaoqian' :type="item.status | filtertype">{{item.status | filterstatus}}</el-tag>
              <span class="time">{{item.pubdate}}</span>
          </div>
      </div>
      <div class="right">
          <span @click="mondif(item.id)"><i class="el-icon-edit"></i>修改</span>
          <span @click="delarticle(item.id)"><i class="el-icon-delete"></i>删除</span>
      </div>
      </div>
      <el-row class="fenye">
          <el-pagination
             background
             @current-change='currentchange'
             layout="prev, pager, next"
             :total="page.total"
             :current-page="page.currentpage"
             :page-size="page.pagesize">
           </el-pagination>
      </el-row>
</el-card>
</div>
</template>

<script>
import { getarticle, getcannel } from '../../actions/article'
export default {
  data () {
    return {
      searchform: {
        status: 5,
        channel_id: null, // ????
        daterange: []
      },
      channels: [],
      list: [],
      defaulimg: require('../../assets/img/1 (1).jpeg'),
      page: {
        total: 0,
        currentpage: 1,
        pagesize: 10
      }
    }
  },
  methods: {
    mondif (id) {
      this.$router.push(`/home/publish/${id.toString()}`)
    },
    async delarticle (id) {
      await this.$confirm('是否要删除文章')
      await getarticle(null, id, 'delete')
      // this.$axios({
      //   method: 'delete',
      //   url: `/articles/${id}`
      // })
      this.$message({
        type: 'success',
        message: '删除成功'
      })
      this.articalchange()
    },
    currentchange (newpage) {
      this.page.currentpage = newpage
      this.articalchange()
    },
    changecolidin () {
      this.page.currentpage = 1
      this.articalchange()
    },
    articalchange () {
      let params = {
        page: this.page.currentpage,
        per_page: this.page.pagesize,
        status: this.searchform.status === 5 ? null : this.searchform.status,
        channel_id: this.searchform.channel_id,
        begin_pubdate: this.searchform.daterange.length ? this.searchform.daterange[0] : null,
        end_pubdate: this.searchform.daterange.length > 1 ? this.searchform.daterange[1] : null
      }
      this.getarticle(params)
    },
    async getcannel () {
      let res = await getcannel()
      this.channels = res.data.channels
    },
    async  getarticle (params) {
      let res = await getarticle(params, null, null)
      this.list = res.data.results
      this.page.total = res.data.total_count
    }
  },
  filters: {
    filtertype (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
        default:
          break
      }
    },
    filterstatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '审核通过'
        case 3:
          return '审核失败'
        default:
          break
      }
    }
  },
  created () {
    this.getcannel()
    this.getarticle({ page: 1, per_page: 10 })
  }
}
</script>

<style lang="less" scoped>
.active{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    // border-bottom: 1px solid #999;
    .left{
        display: flex;
       img{
           width: 180px;
           height: 120px;
           border-radius: 5px;
       }
       .forms{
           height: 120px;
            margin-left: 40px;
            display: flex;
            flex-direction: column;
             justify-content: space-around;
             .time{
                color: #999;
                font-size: 12px;
             }
             .biaoqian{
                 width: 80px;
                 text-align: center;
             }
       }
    }
    .right{
      font-size: 14px;
      span{
          margin-right: 10px;
          cursor: pointer;
      }
    }

}
.fenye{
        text-align: center;
    }
</style>
