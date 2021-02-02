<template>
    <div class="post-video">
        <h2>欢迎投稿：</h2>
        <el-form ref="form" :model="form" label-position="left" label-width="150px">
            <el-form-item label="标题 Title">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="视频地址 Address">
                <el-input type="url" v-model="form.url"
                          placeholder="Should be an accessible address ending with .mp4"></el-input>
            </el-form-item>
            <el-form-item label="描述 Description">
                <el-input type="textarea" v-model="form.info"></el-input>
            </el-form-item>
            <el-form-item label="视频封面 Post">
                <el-upload
                    class="avatar-uploader"
                    action=""
                    ref="upload"
                    :show-file-list="false"
                    :before-upload="beforeAvatarUpload"
                    :http-request="myUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <div class="el-upload__tip" slot="tip">只能上传png或jpg文件，且不超过2M</div>
                </el-upload>
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
                avatar: '',
                belong: '',
            },
            imageUrl: '',
            belong_temp: '',
        }
    },
    methods: {
        beforeAvatarUpload(file) {
            const isIMG = (file.type === 'image/png' || file.type === 'image/jpeg');
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isIMG) {
                this.$message.error('上传头像图片只能是图片!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isIMG && isLt2M;
        },
        myUpload(option) {
            API.postUploadToken(option.file.name).then((res) => {
                const oReq = new XMLHttpRequest();
                oReq.open('PUT', res.data.put, true);
                oReq.send(option.file);
                oReq.onload = () => {
                    this.imageUrl = res.data.get;
                    this.form.avatar = res.data.key;
                };
            }).catch((error) => {
                this.$notify.error({
                    title: '网路错误，或者服务器宕机',
                    message: error,
                });
            });
        },
        //下面是曾经在aws部署时，上传到s3的代码
        // myUpload(item) {
        //     var IdentityPoolId = "ap-northeast-1:1283a1de-d48e-4b83-96a9-af64aab7a0c5";
        //
        //     AWS.config.update({
        //         region: "ap-northeast-1",
        //         credentials: new AWS.CognitoIdentityCredentials({
        //             IdentityPoolId: IdentityPoolId
        //         })
        //     });
        //     const file = item.file;
        //     let fileName = file.name;
        //     let albumPhotosKey = encodeURIComponent("avatar") + "/";
        //
        //     this.imageUrl = albumPhotosKey + fileName;
        //
        //     // Use S3 ManagedUpload class as it supports multipart uploads
        //     let upload = new AWS.S3.ManagedUpload({
        //         params: {
        //             Bucket: "xilixilidata",
        //             Key: this.imageUrl,
        //             Body: file,
        //             ACL: "public-read"
        //         }
        //     });
        //     this.imageUrl = "https://xilixilidata.s3-ap-northeast-1.amazonaws.com/" + this.imageUrl;
        //     this.form.avatar = this.imageUrl;
        //     upload.promise();
        //
        //
        //     // promise.then(
        //     //     function (data) {
        //     //         alert("Successfully uploaded photo.");
        //     //         viewAlbum("avatar");
        //     //     },
        //     //     function (err) {
        //     //         return alert("There was an error uploading your photo: ", err.message);
        //     //     }
        //     // );
        //     //
        // },

        onSubmit() {
            this.form.belong = this.belong_temp
            API.postVideo(this.form).then((res) => {
                // this.$notify({
                //     title: '用下面的身份投递了哦',
                //     message: this.form.belong,
                //     duration: 0
                // })
                if (res.code > 0) {
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
            // this.form.belong = belong_temp
        },

        getUser() {
            let belong_temp = '游客'
            API.getCurrentUser().then((res) => {
                if (res.code > 0) {
                    this.$notify({
                        title: '未检测到登录，将用下面的身份投递',
                        message: "游客",
                        duration: 2000
                    })
                } else {
                    belong_temp = res.data.user_name;
                    this.$notify({
                        title: '将用下面的身份投递',
                        message: belong_temp,
                        duration: 2000
                    })
                    this.belong_temp = belong_temp
                }
            })
        },
    },
    beforeMount() {
        this.getUser()
    }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
}

.avatar {
    display: block;
    width: 30%;
}
</style>