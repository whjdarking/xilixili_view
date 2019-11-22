<template>
    <div>
        <video ref="vPlayer" class="video-js vjs-big-play-centered"></video>
    </div>
</template>

<script>
    import videojs from 'video.js'
    export default {
        name: "VPlayer",
        props: {
            options: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        data() {
            return {
                player: null
            }
        },
        watch: {
            src() {
                this.player.src(this.src);
            }
        },
        computed: {
            src() {
                return this.options.sources[0].src;
            },
        },
        mounted() {
            this.player = videojs(this.$refs.vPlayer, this.options, function onPlayerReady() {
                // eslint-disable-next-line no-console
                // console.log('onPlayerReady', this);
            })
        },
        beforeDestroy() {
            if (this.player) {
                this.player.dispose()
            }
        }
    }
</script>

<style scoped>

</style>