<template>
    <el-container>
        <el-aside>
            <div class="register">用户注册</div>
            <el-form ref="form1" :model="form1" label-position="left" label-width="150px">
                <el-form-item label="用户名">
                    <el-input v-model="form1.user_name"
                              placeholder="Min=2, Max=30"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form1.password"
                              placeholder="Min=6, Max=40"></el-input>
                </el-form-item>
                <el-form-item label="密码确认">
                    <el-input v-model="form1.password_confirm"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="form1_submit">注册</el-button>
                </el-form-item>
            </el-form>
        </el-aside>
        <el-main>
            <div class="ulogin">用户登录</div>
            <el-form ref="form2" :model="form2" label-position="left" label-width="150px">
                <el-form-item label="用户名">
                    <el-input v-model="form2.user_name"
                              placeholder="注意：Min=2, Max=30"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form2.password"
                              placeholder="注意：Min=6, Max=40"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="form2_submit" round>登录</el-button>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>
</template>

<script>
import * as API from "../api/video/index.js"

export default {
    name: "UserLogin",
    data() {
        return {
            form1: {
                user_name: '',
                password: '',
                password_confirm: '',
            },
            form2: {
                user_name: '',
                password: '',
            },
        }
    },
    methods: {
        form1_submit() {
            API.register(this.form1).then((res) => {
                if (res.code > 0) {
                    this.$notify({
                        title: '注册失败(后端)',
                        message: res.msg,
                        duration: 0
                    })
                }
            }).catch((error) => {
                this.$notify({
                    title: '注册失败',
                    message: error,
                    duration: 0
                })
            })
        },
        form2_submit() {
            API.login(this.form2).then((res) => {
                if (res.code > 0) {
                    this.$notify({
                        title: '登录失败(后端)',
                        message: res.msg,
                        duration: 0
                    })
                }
            }).catch((error) => {
                this.$notify({
                    title: '登录失败',
                    message: error,
                    duration: 0
                })
            })
        }
    }
}
</script>

<style scoped>
.el-aside {
    margin: 20px 100px 20px 20px;
}
.el-main {
    margin: 0 50px 0 0;
}
.register {
    padding: 0 0 30px 0;
}
.ulogin {
    padding: 0 0 30px 0;
    margin: 0px 0 0 0;
}
</style>