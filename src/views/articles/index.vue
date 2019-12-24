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
              <el-radio-group v-model="searchform.status">
                <el-radio :label="5">全部</el-radio>
                <el-radio :label="0">草稿</el-radio>
                <el-radio :label="1">待审核</el-radio>
                <el-radio :label="2">审核通过</el-radio>
                <el-radio :label="3">审核失败</el-radio>
              </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表:">
               <el-select placeholder="请选择" v-model="searchform.channel_id">
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

</el-card>
</div>
</template>

<script>
export default {
  data () {
    return {
      searchform: {
        status: 5,
        channel_id: null, // ????
        daterange: []
      },
      channels: []
    }
  },
  methods: {
    getcannel () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    }
  },
  created () {
    this.getcannel()
  }
}
</script>

<style>

</style>
