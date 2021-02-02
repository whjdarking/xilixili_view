<template>
    <div class="home">
        <el-row :gutter="10">
            <el-col :span="4" v-for="video in videos" :key="video.id">
                <el-card class="video-card" @click.native="goVideo(video)" :body-style="{ padding: '5px' }"
                         shadow="hover">
                    <img class="image" :src="video.avatar">
                    <div>
                        <div class="video-title" style="font-weight:bolder">{{ video.title }}</div>
                        <div>
                            <span class="video-info">{{ video.info }}</span>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[6, 12]"
                :page-size="6"
                layout="total, sizes, prev, pager, next, jumper"
                :total=total>
            </el-pagination>
        </div>
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
            start: 0,
            limit: 6,
            total: 0,
        }
    },
    methods: {
        handleSizeChange(val) {
            this.limit = val // val 一页的视频数量
            this.load()
        },
        handleCurrentChange(val) {
            this.start = this.limit * (val - 1); // val 当前页面
            this.load();
        },

        load() {
            API.getVideos(this.start, this.limit).then((res) => {
                //data包含id，title，info等 这种东西，其他有什么code，msg之类的
                this.videos = res.data.items
                this.total = res.data.total
                //如果没有封面则使用默认封面
                for (let item of this.videos) {
                    if (item.avatar.length <= 1) {
                        item.avatar = "/default.jpg"
                    }
                }
            })
        },
        goVideo(video) {
            this.$router.push({name: 'showVideo', params: {videoID: video.id}})
        }
    },
    components: {},
    beforeMount() {
        this.load()
    }
}
</script>

<style>
.home {
    padding: 5px 0 20px 0;
}

.image {
    width: 100%;
    display: block;
}

.block {
    text-align: center;
}

.video-title {
    margin: 4px 0 4px 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.video-info {
    width: 100%;
    overflow: hidden;
    word-wrap: break-word;
    text-overflow: ellipsis;
    display: -webkit-box; /*元素作为box伸缩盒子*/
    -webkit-line-clamp: 2; /*设置文本行数限制*/
    -webkit-box-orient: vertical; /*设置文本排列方式*/
    color: #909399;
}

.video-card {
    cursor: pointer;
    margin-bottom: 10px;
}
</style>