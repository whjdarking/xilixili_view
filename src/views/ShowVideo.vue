<template>
    <div class="post-video">
        <div class="video-header">
            <h2>{{video.title}}</h2>
            <div class="video-data">
                {{video.created_at | moment("YYYY-MM-DD h:mm:ss") }}创建 ·
                {{video.view}}观赏
            </div>
        </div>
        <div class="player">
            <video-player class="video-player-box"
                          ref="videoPlayer"
                          :playsinline="true"
                          :options="playerOptions">
            </video-player>
        </div>
        <div class="video-info">
            <pre>{{video.info}}</pre>
        </div>
    </div>
</template>

<script>
    import * as API from "../api/video/index.js"
    import 'video.js/dist/video-js.css'
    import { videoPlayer } from 'vue-video-player'

    export default {
        name: "ShowVideo",
        data() {
            return {
                video: {},
                playerOptions: {
                    // videojs options
                    muted: false,
                    fluid: true,
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
                    }
                    // poster: "/static/images/author.jpg",
                }
            }
        },
        methods: {
            load() {
                API.getVideo(this.$route.params.videoID).then((res) => {
                    //data包含id，title，info等 这种东西，其他有什么code，msg之类的
                    this.video = res.data
                    this.playerOptions.sources[0].src = this.video.url
                })
            }
        },
        components: {
            videoPlayer
        },
        beforeMount() {
            this.load()
        },
    }
</script>

<style scoped>
    .video-header {
        margin-bottom: 16px;
    }
    .video-header h2{
        margin-bottom: 0px;
        font-size: 18px;
        font-weight: 500;
        color: #212121;
        line-height: 26px;
        height: 26px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .video-data {
        margin-top: 6px;
        font-size: 12px;
        color: #999;
    }
    .video-info {
        font-weight: bold;
        color: #111;
    }
</style>