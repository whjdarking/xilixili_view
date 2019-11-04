<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="4" v-for="video in videos" :key="video.id">
        <el-card class="video-card" @click.native="goVideo(video)" ody-style="{ padding: '0px' }">
          <img class="image" src="../assets/logo.png">
          <div>
            <span class="video-title">{{video.title}}</span>
            <div>
              <span class="video-info">{{video.info}}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
// @ is an alias to /src
import * as API from "../api/video/index.js"

export default {
  name: 'home',
  data() {
    return {
      videos: [],
    }
  },
  methods: {
    load() {
      API.getVideos().then((res) => {
        //data包含id，title，info等 这种东西，其他有什么code，msg之类的
        this.videos = res.data
      })
    },
    goVideo(video) {
      this.$router.push({name:'showVideo', params:{videoID:video.id}})
    }
  },
  components: {
  },
  beforeMount() {
    this.load()
  }
}
</script>

<style>
  .home {
    padding: 5px;
  }
  .image {
    width: 100%
  }
  .video-title {
    margin: 4px 0px 4px 0px;
    text-overflow: ellipsis;
    word-wrap: break-word;
    overflow: hidden;
  }
  .video-info {
    width: 100%;
    overflow: hidden;
    word-wrap: break-word;
    text-overflow: ellipsis;
    display: -webkit-box;  /*元素作为box伸缩盒子*/
    -webkit-line-clamp: 3;  /*设置文本行数限制*/
    -webkit-box-orient: vertical;  /*设置文本排列方式*/
    color: #909399;
  }
  .video-card {
    cursor: pointer;
  }
</style>