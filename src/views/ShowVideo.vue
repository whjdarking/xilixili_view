<template>
    <el-container>
        <el-aside width="200px">
            <div class="rankTitle">
                Weekly Ranking
            </div>
            <div v-for="video in videoRank" :key="video.id">
                <el-card class="video-card" @click.native="goVideo(video)" :body-style="{ padding: '5px' }" shadow="hover">
                    <img class="image" :src="video.avatar">
                    <div>
                        <div class="rank-title" >{{video.title}}</div>
                    </div>
                </el-card>
            </div>
        </el-aside>
        <el-container>
            <el-header>
                <div class="video-title">{{video.title}}</div>
                <div class="video-data">
                    {{video.created_at}}创建 ·
                    {{video.view}}观赏
                </div>
            </el-header>
            <el-main>
                <div>
                    <VPlayer class="" :options="videoOptions"></VPlayer>
                </div>
                <el-divider>Video Describe</el-divider>
                <div>
                    <pre>{{video.info}}</pre>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import * as API from "../api/video/index.js"
    import 'video.js/dist/video-js.css'
    import VPlayer from "../components/vplayer";

    export default {
        name: "ShowVideo",
        components: {
            VPlayer
        },
        data() {
            return {
                video: {},
                videoRank: {},
                videoOptions: {
                    // videojs options
                    controls: true,
                    muted: false,
                    fluid: true,
                    aspectRatio: '16:9',
                    preload: 'auto',

                    sources: [{
                        type: "video/mp4",
                        src: "",
                    }],
                    children: [
                        'bigPlayButton',
                        'controlBar'
                    ],
                    // controlBar: {
                    //     children: [
                    //         "playToggle",
                    //         "volumePanel",
                    //         "currentTimeDisplay",
                    //         "timeDivider",
                    //         "durationDisplay",
                    //         "progressControl",
                    //         "playbackRateMenuButton",
                    //         "fullscreenToggle"
                    //     ]
                    // },
                    errorDisplay: true,
                }
            }
        },
        methods: {
            load() {
                API.getVideo(this.$route.params.videoID).then((res) => {
                    //data包含id，title，info等 这种东西，其他有什么code，msg之类的
                    this.video = res.data;
                    let src = this.video.url;
                    this.$set(this.videoOptions.sources, 0, {
                        type: 'video/mp4',
                        src: src,
                    });
                })

                // eslint-disable-next-line no-console
                console.log(this.videoOptions.sources[0])
            },
            loadRank() {
                API.getWeeklyRank().then((res) => {
                    this.videoRank = res.data;
                    for (let item of this.videoRank) {
                        if (item.avatar.length <= 1) {
                            item.avatar = "/default.jpg"
                        }
                    }
                })
            },
            goVideo(video) {
                this.$router.push({name:'showVideo', params:{videoID:video.id}}).catch(() => {})
            },
        },
        mounted() {
            this.load()
            this.loadRank()
        },
    }
</script>

<style scoped>
    .el-header {
        font-size: 28px;
        font-weight: 500;
        line-height: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .el-main {
        font-size: 16px;
        font-weight: bold;
        color: #3749b6;
    }
    .video-title {
        color: #212121;
        font-weight: 800;
    }
    .rank-title {
        font-weight: 500;
    }
    .video-data {
        font-weight: 500;
        font-size: 14px;
        color: #9c9c9f;
    }
    .video-self {
        width: 960px;
        height: 540px;
    }
    .rankTitle {
        margin: 10px 0px 20px 0px;
        font-weight: 700;
        font-style: italic;
        text-align:center;
    }

</style>