<template>
    <div class="post-video">
        <h2>欢迎投稿：</h2>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="标题">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="视频地址">
                <el-input type="url" v-model="form.url"></el-input>
            </el-form-item>
            <el-form-item label="描述">
                <el-input type="textarea" v-model="form.info"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    //上面model = form 即关联下面export处的from
    //写好axios部分在API
    import * as API from "../api/video/index.js"

    export default {
        name: "PostVideo",
        data() {
            return {
                form: {
                    title: '',
                    info: '',
                    url: '',
                }
            }
        },
        methods: {
            onSubmit() {
                API.postVideo(this.form).then((res) => {
                    if(res.status > 0) {
                        this.$notify({
                            title: '投稿失败',
                            message: res.msg,
                            duration: 0
                        })
                    } else {
                        this.$notify({
                            title: '投稿成功',
                            message: `本次投稿的ID是${res.data.id}`,
                            type: 'success',
                            duration: 0
                        })
                    }
                }).catch((error) => {
                    this.$notify({
                        title: '网络不通？服务器关闭？',
                        message: error,
                        duration: 0
                    })
                })
            }
        }
    }
</script>

<style scoped>

</style>