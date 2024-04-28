<template>
    <router-view></router-view>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
.el-notification,
.el-popper,
.el-message {
    background-color: $base-bgcolor-white !important;
    color: black !important;
    backdrop-filter: $base-blur;
}

.el-button:focus {
    outline: 0;
}
</style>