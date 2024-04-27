<template>
    <div class="tabbar">
        <!-- 左侧按钮和导航 -->
        <div class="tabbar_left">
            <el-button class="tabbar_button" size="large" :icon="layoutSettingStore.fold ? 'Expand' : 'Fold'"
                @click="changeIcon()" />
            <el-breadcrumb class="tabbar_nav" separator-icon="CaretRight">
                <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" :to="item.path"
                    v-show="item.meta.title">
                    <el-icon>
                        <component :is="item.meta.icon" />
                    </el-icon>
                    <span>{{ item.meta.title }}</span>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!-- 右侧按钮 -->
        <div class="tabbar_right">
            <el-switch class="tabbar_switch" v-model="darkMode" inline-prompt active-icon="Moon" inactive-icon="Sunny"
                size="large" />
            <el-button class="tabbar_button" :class="{ rotate: refreshRotate }" size="large" icon="Refresh" circle
                @click="refresh()" />
            <el-button class="tabbar_button" size="large" :icon="isFullScreen ? 'FullScreen' : 'BottomLeft'" circle
                @click="fullScreen()" />
            <el-button class="tabbar_button" :class="{ rotate: settingRotate }" size="large" icon="Setting" circle
                @click="openSetting()" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useLayoutSettingStore from '@/store/modules/setting';

const layoutSettingStore = useLayoutSettingStore();
let darkMode = ref(false);

const changeIcon = () => {
    layoutSettingStore.fold = !layoutSettingStore.fold;
}

let refreshInterval: NodeJS.Timeout;
let refreshRotate = ref(false);
const refresh = () => {
    clearInterval(refreshInterval);
    refreshRotate.value = true;
    refreshInterval = setInterval(() => {
        refreshRotate.value = false;
    }, 1000);
    layoutSettingStore.refresh = !layoutSettingStore.refresh;
}

let isFullScreen = ref(document.fullscreenElement === null);
const fullScreen = () => {
    isFullScreen.value = document.fullscreenElement !== null;
    if (isFullScreen.value) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
}

let settingInterval: NodeJS.Timeout;
let settingRotate = ref(false);
const openSetting = () => {
    clearInterval(settingInterval);
    settingRotate.value = true;
    settingInterval = setInterval(() => {
        settingRotate.value = false;
    }, 1000);
}
</script>

<style scoped lang="scss">
.tabbar {
    border-radius: 32px;
    padding: 8px 24px;
    margin: 8px;
    height: calc(100% - 24px);
    display: flex;
    justify-content: space-between;
    background-color: $base-bgcolor-white;
    backdrop-filter: $base-blur;

    .tabbar_button {
        background-color: $base-bgcolor-white;
    }

    .tabbar_switch {
        margin-right: 16px;
    }

    .tabbar_left {
        display: flex;
        align-items: center;

        .tabbar_nav {
            margin-left: 16px;
            font-size: $base-font-size;

            span {
                margin-left: 4px;
            }
        }
    }

    .tabbar_right {
        align-items: center;
    }
}

.rotate {
    animation: rotate 1s ease infinite;
}
</style>