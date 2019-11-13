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
            <el-form-item label="视频封面">
                <el-upload
                     class="avatar-uploader"
                     action=""
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
    import AWS from 'aws-sdk';

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
                },
                imageUrl: '',
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
            myUpload(item) {
                var IdentityPoolId = "ap-northeast-1:1283a1de-d48e-4b83-96a9-af64aab7a0c5";

                AWS.config.update({
                    region: "ap-northeast-1",
                    credentials: new AWS.CognitoIdentityCredentials({
                        IdentityPoolId: IdentityPoolId
                    })
                });
                const file = item.file;
                let fileName = file.name;
                let albumPhotosKey = encodeURIComponent("avatar") + "/";

                this.imageUrl = albumPhotosKey + fileName;

                // Use S3 ManagedUpload class as it supports multipart uploads
                let upload = new AWS.S3.ManagedUpload({
                    params: {
                        Bucket: "xilixilidata",
                        Key: this.imageUrl,
                        Body: file,
                        ACL: "public-read"
                    }
                });
                this.imageUrl = "https://xilixilidata.s3-ap-northeast-1.amazonaws.com/" + this.imageUrl;
                this.form.avatar = this.imageUrl;
                upload.promise();


                // promise.then(
                //     function (data) {
                //         alert("Successfully uploaded photo.");
                //         viewAlbum("avatar");
                //     },
                //     function (err) {
                //         return alert("There was an error uploading your photo: ", err.message);
                //     }
                // );
                //
            },

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
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        display: block;
        width: 30%;
    }
</style>