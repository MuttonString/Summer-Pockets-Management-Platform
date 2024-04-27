<template>
    <div class="account">
        <div class="account_left">
            <el-popover placement="right" :title="username" :trigger="layoutSettingStore.fold ? 'hover' : ''">
                <el-button icon="SwitchButton" type="warning">退出登录</el-button>
                <template #reference>
                    <img src="@/assets/images/atri.png" alt="">
                </template>
            </el-popover>
            <span>{{ username }}</span>
        </div>
        <el-button icon="SwitchButton" size="large" text />
    </div>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting';

const layoutSettingStore = useLayoutSettingStore();
let username = 'Administrator';
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