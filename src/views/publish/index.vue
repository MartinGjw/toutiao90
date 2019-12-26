<template>
  <el-card>
    <bread-crumb slot="header">
     <template slot="title">
        发表文章
     </template>
    </bread-crumb>
    <el-form :model="formdata" :rules="rules" ref="publishform">
          <el-form-item prop="title" label="标题">
             <el-input v-model="formdata.title" placeholder="文章名称" class="input" style="width:400px"></el-input>
        </el-form-item>
         <el-form-item prop="content" label="内容">

          <quill-editor v-model="formdata.content" style="height:300px;margin-left:50px"></quill-editor>
        </el-form-item>
         <el-form-item prop="cover" label="封面" style="margin-top:70px">
           <el-radio-group v-model="formdata.cover.type" @change="changetype">
                  <el-radio :label="1">单图</el-radio>
                  <el-radio :label="3">三图</el-radio>
                  <el-radio :label="0">无图</el-radio>
                  <el-radio :label="-1">自动</el-radio>
           </el-radio-group>
           <cover-image :list="formdata.cover.images"></cover-image>
        </el-form-item>
         <el-form-item prop="channel_id" label="频道">
            <el-select placeholder="请选择" v-model="formdata.channel_id">
                <el-option
                  v-for="item in channels"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
               </el-select>
        </el-form-item>
        <el-form-item>
            <el-button @click="publishArticle()">发布</el-button>
            <el-button @click="publishArticle(true)">存入草稿</el-button>
        </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],
      formdata: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      rules: {
        title: [{ required: true, message: '请输入标题名称' }, { min: 5, max: 30, message: '长度5到30个字符' }],
        content: [{ required: true, message: '请输入文章内容' }],
        channel_id: [{ required: true, message: '文章频道不能为空' }]
      }
    }
  },
  methods: {
    changetype () {
      if (this.formdata.cover.type === 0 || this.formdata.cover.type === -1) {
        this.formdata.cover.images = [] // 无图或者自动
      } else if (this.formdata.cover.type === 1) {
        this.formdata.cover.images = [''] // 单图
      } else if (this.formdata.cover.type === 3) {
        this.formdata.cover.images = ['', '', ''] // 3图
      }
    },
    getcannel () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    publishArticle (draft) {
      this.$refs.publishform.validate(isok => {
        let{ articleid } = this.$route.params
        if (isok) {
          this.$axios({
            url: articleid ? `/articles/${articleid}` : '/articles',
            method: articleid ? 'put' : 'post',
            params: { draft },
            data: this.formdata
          }).then(res => {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            this.$router.push('/home/articles')
          })
        }
      })
    },
    getarticlebyid (articleid) {
      this.$axios({
        url: `/articles/${articleid}`
      }).then(res => {
        this.formdata = res.data
      })
    }

  },
  created () {
    this.getcannel()
    let{ articleid } = this.$route.params
    articleid && this.getarticlebyid(articleid)
  },
  watch: {
    $route: function (to, from) {
      if (to.params.articleid) {

      } else {
        this.formdata = {
          title: '',
          content: '',
          cover: {
            type: 0,
            images: []
          },
          channel_id: null
        }
      }
    }
  }
}
</script>

<style>

</style>
