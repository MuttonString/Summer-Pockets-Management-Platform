<template>
    <el-container class="layout_container">
        <!-- 左侧菜单 -->
        <el-aside class="layout_slider" :class="{ fold: layoutSettingStore.fold }">
            <el-scrollbar>
                <Account />
                <el-menu background-color="transparent" router :default-active="$route.path"
                    :collapse="layoutSettingStore.fold">
                    <Menu :menuList="userStore.menuRoutes" />
                </el-menu>
            </el-scrollbar>
        </el-aside>

        <el-container>
            <!-- 顶部导航 -->
            <el-header class="layout_tabbar">
                <Tabbar />
            </el-header>

            <!-- 内容展示区域 -->
            <el-scrollbar><el-main class="layout_main">
                    <router-view v-if="!refresh"></router-view>
                </el-main></el-scrollbar>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import Menu from './menu/index.vue';
import Account from './account/index.vue';
import Tabbar from './tabbar/index.vue';
import useUserStore from '@/store/modules/user';
import useLayoutSettingStore from '@/store/modules/setting';

const userStore = useUserStore();
const layoutSettingStore = useLayoutSettingStore();
let refresh = ref(false);

watch(() => layoutSettingStore.refresh, () => {
    refresh.value = true;
    nextTick(() => {
        refresh.value = false;
    });
})
</script>

<style scoped lang="scss">
.layout_container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url('@/assets/images/home.png');
    background-size: cover;
    background-position: center;

    .layout_slider {
        width: $base-menu-width;
        background-color: $base-bgcolor-white;
        backdrop-filter: $base-blur;
        transition: 0.3s;

        &.fold {
            width: $base-tabbar-height;
        }
    }

    .layout_tabbar {
        height: $base-tabbar-height;
    }

    .layout_main {
        padding: 16px;
    }
}
</style>