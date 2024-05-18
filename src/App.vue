<template>
    <router-view></router-view>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
.el-notification,
.el-popper,
.el-message {
    background-color: $base-bgcolor !important;
    color: $base-color !important;
    backdrop-filter: $base-blur;
}

.el-button:focus {
    outline: 0;
}

.el-overlay {
    backdrop-filter: $base-blur;
}
</style>