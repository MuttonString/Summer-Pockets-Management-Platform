<template>
    <router-view></router-view>
</template>

<script setup lang="ts">
import { reqLogin } from './api/user';
import { onMounted } from 'vue';
onMounted(() => {
    reqLogin({ username: 'shiroha', password: '1234' })
});
</script>

<style>
.el-notification {
    background-color: #ffffff7f;
    backdrop-filter: blur(8px);
}
</style>