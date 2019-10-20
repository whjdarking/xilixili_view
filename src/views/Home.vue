<template>
  <div class="home">
    <el-row gutter="20">
      <el-col :span="4" v-for="video in videos" :key="video.id">
        <el-card :body-style="{ padding: '0px' }">
          <img class="image" src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png">
          <div>
            <span>{{video.title}}</span>
            <div>
              <span>{{video.info}}</span>
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
  .image {
    width: 100%
  }

</style>