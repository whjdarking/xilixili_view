<template>
    <div>
        <video ref="vPlayer" class="video-js vjs-big-play-centered"></video>
    </div>
</template>

<script>
    import videojs from 'video.js'
    const SeekBar = videojs.getComponent('SeekBar')

    SeekBar.prototype.getPercent = function getPercent() {
        // Allows for smooth scrubbing, when player can't keep up.
        // const time = (this.player_.scrubbing()) ?
        //   this.player_.getCache().currentTime :
        //   this.player_.currentTime()
        const time = this.player_.currentTime()
        const percent = time / this.player_.duration()
        return percent >= 1 ? 1 : percent
    }

    SeekBar.prototype.handleMouseMove = function handleMouseMove(event) {
        let newTime = this.calculateDistance(event) * this.player_.duration()
        if (newTime === this.player_.duration()) {
            newTime = newTime - 0.1
        }
        this.player_.currentTime(newTime)
        this.update()
    }
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