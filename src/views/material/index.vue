<template>
  <el-card>
      <bread-crumb slot="header">
      <span slot="title">素材管理</span>
      </bread-crumb>
            <el-tabs :tab-position="tabPosition" v-model="activeNmae" @tab-click="changgetab">
              <el-tab-pane label="全部图片" name="all">

                  <div class="img-list">
                  <el-card v-for="item in list" :key="item.id" class="img-card" :body-style="{ padding: '0px' }">
                     <img :src="item.url" alt="">
                     <el-row class="img-row" type="flex" align="middle">
                    <i class="el-icon-ice-tea"></i>
                    <i class="el-icon-delete"></i>
                  </el-row>
                  </el-card>
                </div>
              </el-tab-pane>

              <el-tab-pane label="收藏图片" name="collect">
                     <div class="img-list">
                  <el-card v-for="item in list" :key="item.id" class="img-card" :body-style="{ padding: '0px' }">
                     <img :src="item.url" alt="">
                     <el-row class="img-row" type="flex" align="middle">
                    <i class="el-icon-ice-tea"></i>
                    <i class="el-icon-delete"></i>
                  </el-row>
                  </el-card>
                </div>
              </el-tab-pane>

            </el-tabs>

  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeNmae: 'all',
      list: []
    }
  },
  methods: {
    changgetab () {
      this.getmaterial()
    },
    getmaterial () {
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeNmae === 'collect' }
      }).then((res) => {
        this.list = res.data.results
      })
    }
  },
  created () {
    this.getmaterial()
  }
}
</script>

<style lang='less' scoped>
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
