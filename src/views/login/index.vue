<template>
    <div class="login_container">
        <el-row>
            <!-- 占位 -->
            <el-col :span="2" :xs="1"></el-col>

            <!-- 表单 -->
            <el-col class="login_form" :span="10" :xs="22">
                <h1>欢迎来到夏兜运营平台</h1>
                <el-form>
                    <el-form-item>
                        <el-input size="large" :prefix-icon="User" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input type="password" size="large" :prefix-icon="Lock" show-password
                            v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="login_btn" type="primary" size="large" @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
// @ts-ignore
import { User, Lock } from '@element-plus/icons-vue';
import { reactive } from 'vue';

const loginForm = reactive({ username: '', password: '' })
const login = () => {

}
</script>

<style lang="scss" scoped>
.login_container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url('@/assets/images/background.jpg');
    background-size: cover;
    background-position: center;
    vertical-align: middle;
}

.login_form {
    h1 {
        font-size: 32px;
        color: black;
    }

    position: relative;
    top: 25vh;
    background-color: #ffffff7f;
    backdrop-filter: blur(4px);
    border-radius: 16px;
    padding: 2vh;

    .login_btn {
        width: 100%;
    }
}
</style>