<template>
  <el-card class="el-card">
      <bread-crumb slot="header">
      <span slot="title">素材管理</span>
      </bread-crumb>
      <el-upload class="upload-demo" action="" :http-request="upload" :show-file-list="false" >
          <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
            <el-tabs tab-position="" v-model="activeNmae" @tab-click="changgetab">
              <el-tab-pane label="全部图片" name="all">

                  <div class="img-list">
                  <el-card v-for="item in list" :key="item.id" class="img-card" :body-style="{ padding: '0px' }">
                     <img :src="item.url" alt="">
                     <el-row class="img-row" type="flex" align="middle">
                    <i @click="collor(item)" :style="{color:item.is_collected ? 'red':'#000'}" class="el-icon-ice-tea"></i>
                    <i @click="delmeral(item.id)" class="el-icon-delete"></i>
                  </el-row>
                  </el-card>
                </div>

              </el-tab-pane>

              <el-tab-pane label="收藏图片" name="collect">
                     <div class="img-list">
                  <el-card v-for="item in list" :key="item.id" class="img-card" :body-style="{ padding: '0px' }">
                     <img :src="item.url" alt="">
                     <el-row class="img-row" type="flex" align="middle">
                    <!-- <i class="el-icon-ice-tea"></i>
                    <i class="el-icon-delete"></i> -->
                     <i @click="collor(item)" :style="{color:item.is_collected ? 'red':'#000'}" class="el-icon-ice-tea"></i>
                    <i @click="delmeral(item.id)" class="el-icon-delete"></i>
                  </el-row>
                  </el-card>
                </div>
              </el-tab-pane>

            </el-tabs>
              <el-row type="flex" justify="center" align="middle" style="height:80px">
                 <el-pagination
                   background
                   layout="prev, pager, next"
                   :page-size="page.pageSize"
                   :current-page="page.currentpage"
                   @current-change="pagechange"
                   :total="page.total">
                 </el-pagination>
               </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeNmae: 'all',
      list: [],
      page: {
        total: 0,
        pageSize: 10,
        currentpage: 1
      }
    }
  },
  methods: {
    delmeral (id) {
      this.$confirm('你确定要删除吗').then(() => {
        this.$axios({
          url: `/user/images/${id}`,
          method: 'delete'
        }).then(() => {
          this.getmaterial()
        })
      })
    },
    collor (item) {
      this.$axios({
        url: `/user/images/${item.id}`,
        method: 'put',
        data: { collect: !item.is_collected }
      }).then(result => {
        this.getmaterial()
      })
    },
    upload (params) {
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(() => {
        this.getmaterial()
      })
    },
    changgetab () {
      this.page.currentpage = 1
      this.getmaterial()
    },
    pagechange (newpage) {
      this.page.currentpage = newpage
      this.getmaterial()
    },
    getmaterial () {
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeNmae === 'collect',
          page: this.page.currentpage,
          per_page: this.page.pageSize }
      }).then((res) => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    }
  },
  created () {
    this.getmaterial()
  }
}
</script>

<style lang='less' scoped>
.el-card{
    position: relative;
  .upload-demo{
    position: absolute;
    z-index: 1;
    right: 20px;
}
}

.img-list{
    display: flex;
    flex-wrap: wrap;
    .img-card{
         width: 200px;
         height: 220px;
         margin: 20px 50px;
         position: relative;

         img{
             width: 100%;
             height: 220px;
         }
          .img-row{
              position: absolute;
              bottom: 0;
              left: 0;
              font-size: 20px;
              width: 100%;
            display: flex;
            justify-content: space-around;
            height: 35px;

            background-color: #f4f5f6;
         }
    }
}
</style>
