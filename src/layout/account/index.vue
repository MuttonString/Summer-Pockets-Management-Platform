<template>
    <div class="account">
        <div class="account_left">
            <el-popover placement="right" :title="userStore.username" :trigger="layoutSettingStore.fold ? 'hover' : ''">
                <el-button icon="SwitchButton" type="warning" @click="logout()">退出登录</el-button>
                <template #reference>
                    <img :src="userStore.avatar" alt="">
                </template>
            </el-popover>
            <span>{{ userStore.username }}</span>
        </div>
        <el-button icon="SwitchButton" size="large" text @click="logout()" />
    </div>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting';
import useUserStore from '@/store/modules/user';
import { useRouter, useRoute } from 'vue-router';

const layoutSettingStore = useLayoutSettingStore();
const userStore = useUserStore();

const $router = useRouter();
const $route = useRoute();
const logout = async () => {
    await userStore.userLogout();
    $router.push({ path: '/login', query: { redirect: $route.path } });
}
</script>

<style scoped lang="scss">
.account {
    height: $base-tabbar-height;
    align-items: center;
    justify-content: space-between;
    display: flex;

    .account_left {
        display: flex;
        align-items: center;

        img {
            width: calc($base-tabbar-height - 16px);
            height: calc($base-tabbar-height - 16px);
            object-position: center;
            margin: 8px;
            border-radius: 50%;
            background-color: $base-bgcolor-white;
        }

        span {
            font-size: $base-font-size;
            font-weight: bold;
        }
    }
}
</style>