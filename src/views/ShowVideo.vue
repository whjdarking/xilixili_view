<template>
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
                <VPlayer class="video-self" :options="videoOptions"></VPlayer>
            </div>
        </el-main>
        <el-footer>
            <div>
                <pre>{{video.info}}</pre>
            </div>
        </el-footer>
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
                videoOptions: {
                    // videojs options
                    controls: true,
                    muted: false,
                    fluid: true,
                    aspectRatio: '16:9',
                    preload: 'auto',

                    playbackRates: [0.5, 1.0, 1.5, 2.0],
                    sources: [{
                        type: "video/mp4",
                        src: "",
                    }],
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        fullscreenToggle: true
                    },
                    errorDisplay: false,
                }
            }
        },
        methods: {
            load() {
                API.getVideo(this.$route.params.videoID).then((res) => {
                    //data包含id，title，info等 这种东西，其他有什么code，msg之类的
                    this.video = res.data;
                    const src = this.video.url;
                    this.$set(this.videoOptions.sources, 0, {
                        type: 'video/mp4',
                        src: src,
                    });
                })
            }
        },
        mounted() {
            this.load()
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
    .el-footer {
        font-size: 16px;
        font-weight: bold;
        color: #3749b6;
    }
    .video-title {
        color: #212121;
        font-weight: 800;
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

</style>