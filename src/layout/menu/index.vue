<template>
    <template v-for="(item) in menuList" :key="item.path">
        <!-- 无子路由 -->
        <el-menu-item v-if="!item.meta.hidden && !item.children" :index="item.path">
            <el-icon>
                <component :is="item.meta.icon"></component>
            </el-icon>
            <template #title>
                <span>{{ item.meta.title }}</span>
            </template>
        </el-menu-item>

        <!-- 有一个子路由 -->
        <el-menu-item v-if="item.children && item.children.length === 1 && !item.children[0].meta.hidden"
            :index="item.children[0].path">
            <el-icon>
                <component :is="item.children[0].meta.icon"></component>
            </el-icon>
            <template #title>
                <span>{{ item.children[0].meta.title }}</span>
            </template>
        </el-menu-item>

        <!-- 有多个子路由 -->
        <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <Menu :menuList="item.children" />
        </el-sub-menu>
    </template>
</template>

<script setup lang="ts">
defineProps(['menuList']);
</script>
<script lang="ts">
export default { name: 'Menu' }
</script>

<style scoped lang="scss">
* {
    font-size: $base-font-size;
}
</style>