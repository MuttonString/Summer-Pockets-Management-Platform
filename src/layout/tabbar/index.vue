<template>
    <div class="tabbar">
        <!-- 左侧按钮和导航 -->
        <div class="tabbar_left">
            <el-tooltip :content="layoutSettingStore.fold ? '打开导航' : '关闭导航'" placement="bottom-start">
                <el-button class="tabbar_button" size="large" :icon="layoutSettingStore.fold ? 'Expand' : 'Fold'"
                    @click="changeIcon()" />
            </el-tooltip>

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
            <el-button-group v-show="layoutSettingStore.showCrud">
                <el-tooltip content="新增" placement="bottom">
                    <el-button class="tabbar_button" size="large" icon="Plus" @click="add()" />
                </el-tooltip>

                <el-tooltip content="修改" placement="bottom">
                    <el-button class="tabbar_button" size="large" icon="Edit" @click="update()"
                        :disabled="layoutSettingStore.changeDisabled" />
                </el-tooltip>

                <el-tooltip content="删除" placement="bottom">
                    <el-button class="tabbar_button" size="large" icon="Delete" @click="showConfirm()"
                        :disabled="layoutSettingStore.selectedRowsCnt === 0" />
                </el-tooltip>
            </el-button-group>

            <el-tooltip content="黑暗模式" placement="bottom">
                <el-switch class="tabbar_switch" v-model="darkMode" inline-prompt active-icon="Moon"
                    inactive-icon="Sunny" size="large" @change="changeDarkMode()" />
            </el-tooltip>

            <el-tooltip content="刷新" placement="bottom">
                <el-button class="tabbar_button" :class="{ rotate: refreshRotate }" size="large" icon="Refresh" circle
                    @click="refresh()" />
            </el-tooltip>

            <el-tooltip :content="isFullScreen ? '全屏' : '退出全屏'" placement="bottom">
                <el-button class="tabbar_button" size="large" :icon="isFullScreen ? 'FullScreen' : 'BottomLeft'" circle
                    @click="fullScreen()" />
            </el-tooltip>

            <el-tooltip content="设置" placement="bottom">
                <el-button class="tabbar_button" :class="{ rotate: settingRotate }" size="large" icon="Setting" circle
                    @click="openSetting()" />
            </el-tooltip>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import useLayoutSettingStore from '@/store/modules/setting';
import { add, update, del } from '@/utils/crud';
import { ElMessageBox } from "element-plus";

const showConfirm = () => {
    ElMessageBox.confirm(`确定删除选中的${layoutSettingStore.selectedRowsCnt}项吗？`, '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => del()).catch(() => { });
}

const layoutSettingStore = useLayoutSettingStore();
const darkMode = ref(false);

const changeIcon = () => {
    layoutSettingStore.fold = !layoutSettingStore.fold;
}

let refreshInterval: NodeJS.Timeout;
const refreshRotate = ref(false);
const refresh = () => {
    clearInterval(refreshInterval);
    refreshRotate.value = true;
    refreshInterval = setInterval(() => {
        refreshRotate.value = false;
    }, 1000);
    layoutSettingStore.refresh = !layoutSettingStore.refresh;
}

const isFullScreen = ref(document.fullscreenElement === null);
const fullScreen = () => {
    isFullScreen.value = document.fullscreenElement !== null;
    if (isFullScreen.value) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
}

let settingInterval: NodeJS.Timeout;
const settingRotate = ref(false);
const openSetting = () => {
    clearInterval(settingInterval);
    settingRotate.value = true;
    settingInterval = setInterval(() => {
        settingRotate.value = false;
    }, 1000);
}

const html = document.querySelector('html');
const body = html?.querySelector('body');
const changeDarkMode = () => {
    if (darkMode.value) {
        html?.classList.add('dark');
        body?.style.setProperty('--base-bgcolor', '#00000080');
        body?.style.setProperty('--base-color', 'white');
        body?.style.setProperty('--sub-bgcolor', '#000000e0');
        body?.style.setProperty('--container-bgcolor', '#00000060');
    }
    else {
        html?.classList.remove('dark');
        body?.style.setProperty('--base-bgcolor', '#ffffff80');
        body?.style.setProperty('--base-color', 'black');
        body?.style.setProperty('--sub-bgcolor', '#ffffffe0');
        body?.style.setProperty('--container-bgcolor', 'transparent');
    }
}

onMounted(() => {
    const modeChange = (media: MediaQueryListEvent | MediaQueryList) => {
        darkMode.value = media.matches;
        changeDarkMode();
    }
    modeChange(window.matchMedia('(prefers-color-scheme: dark)'));
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', modeChange);
});
</script>

<style scoped lang="scss">
.tabbar {
    border-radius: 32px;
    padding: 8px 24px;
    margin: 8px;
    height: calc(100% - 24px);
    display: flex;
    justify-content: space-between;
    background-color: $base-bgcolor;
    backdrop-filter: $base-blur;

    .tabbar_button {
        background-color: $base-bgcolor;
    }

    .tabbar_switch {
        margin-left: 32px;
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