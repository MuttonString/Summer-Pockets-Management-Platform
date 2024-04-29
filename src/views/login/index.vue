<template>
    <div class="login_container">
        <el-row>
            <!-- 占位 -->
            <el-col :span="7" :xs="1"></el-col>

            <!-- 表单 -->
            <el-col class="login_form" :span="10" :xs="22">
                <h1>夏兜运营平台</h1>
                <el-form :model="loginForm" :rules="rules" ref="loginForms">
                    <!-- 用户名 -->
                    <el-form-item prop="username">
                        <el-input size="large" prefix-icon="User" v-model="loginForm.username"
                            @keydown.enter="login()"></el-input>
                    </el-form-item>

                    <!-- 密码 -->
                    <el-form-item prop="password">
                        <el-input type="password" size="large" prefix-icon="Key" show-password
                            v-model="loginForm.password" @keydown.enter="login()"></el-input>
                    </el-form-item>

                    <!-- 登录 -->
                    <el-form-item>
                        <el-button class="login_btn" type="primary" size="large" @click="login()"
                            :loading="loading">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import type { LocationQueryValue } from 'vue-router';
import { ElNotification } from 'element-plus';
import useUserStore from '@/store/modules/user';
import { getTime } from '@/utils/time';

const loginForm = reactive({ username: '', password: '' })
const useStore = useUserStore();
const $router = useRouter();
const $route = useRoute();
const loginForms = ref();
const loading = ref(false);

const login = async () => {
    await loginForms.value.validate();
    loading.value = true;
    try {
        await useStore.userLogin(loginForm);
        const redirect = $route.query.redirect;
        $router.push({ path: (redirect as LocationQueryValue) || '/' });
        ElNotification({
            type: 'success',
            position: 'bottom-right',
            duration: 3000,
            message: '欢迎回来',
            title: `${getTime()}好`
        })
    } catch (error) {
        ElNotification({
            type: 'error',
            position: 'bottom-right',
            duration: 3000,
            message: (error as Error).message
        })
    }
    loading.value = false;
}

const rules = {
    username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
}
</script>

<style lang="scss" scoped>
.login_container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url('@/assets/images/login.png');
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
    background-color: $base-bgcolor-white;
    backdrop-filter: $base-blur;
    border-radius: 16px;
    padding: 2vh;

    .login_btn {
        width: 100%;
    }
}
</style>