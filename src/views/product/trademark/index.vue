+<template>
    <el-card class="main_card">
        <el-table class="main_table" border table-layout="auto" :data="trademarkArr">
            <el-table-column width="48px" align="center" fixed type="selection"></el-table-column>
            <el-table-column label="序号" width="96px" align="center" type="index" />
            <el-table-column label="品牌名称" prop="tmName" />
            <el-table-column label="品牌LOGO">
                <template #="{ row }">
                    <img :src="row.logoUrl" alt="" height="96">
                </template>
            </el-table-column>
        </el-table>
        <template #footer>
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :pager-count="9"
                :page-sizes="[5, 10, 50, 100]" background layout="prev, pager, next, jumper, ->, sizes, total"
                :total="total" @size-change="getTrademark()" @current-change="getTrademark()" />
        </template>
    </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import '@/styles/main.scss';
import { reqTrademark } from '@/api/product/trademark';
import type { Records, TradeMarkResponseData } from '@/api/product/trademark/type';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(0);
const trademarkArr = ref<Records>([]);

const getTrademark = async () => {
    nprogress.start();
    const result: TradeMarkResponseData = await reqTrademark(currentPage.value, pageSize.value);
    if (result.code === 200) {
        total.value = result.data.total;
        trademarkArr.value = result.data.records;
    }
    nprogress.done();
}

onMounted(() => {
    getTrademark();
});
</script>

<style scoped lang="scss"></style>