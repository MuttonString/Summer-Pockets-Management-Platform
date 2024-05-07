<template>
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

    <el-dialog v-model="dialogVisible" title="新增品牌" width="512">
        <el-form>
            <el-form-item label="品牌名称" label-width="96px">
                <el-input v-model="trademarkParams.tmName" />
            </el-form-item>
            <el-form-item label="品牌LOGO" label-width="96px">
                <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
                    :on-success="handleAvatarSuccess" :on-error="handleAvatarError" :before-upload="beforeAvatarUpload">
                    <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        <template #footer>
            <div>
                <el-button type="primary" @click="dialogVisible = false">确定</el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import '@/styles/main.scss';
import { reqTrademark } from '@/api/product/trademark';
import type { Records, TradeMarkResponseData, TradeMark } from '@/api/product/trademark/type';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { ElMessage, UploadProps } from 'element-plus';

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

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    console.log(rawFile)
    if (['image/png', 'image/jpeg', 'image/gif'].includes(rawFile.type)) {
        if (rawFile.size / 1024 / 1024 <= 4) {
            return true;
        } else {
            ElMessage({
                type: 'error',
                message: '上传图片的大小不得超过4MB'
            });
            return false;
        }
    } else {
        ElMessage({
            type: 'error',
            message: '上传的文件格式必须为PNG|JPG|GIF'
        });
        return false;
    }
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
    trademarkParams.logoUrl = response.data;
}

const handleAvatarError: UploadProps['onError'] = (response) => {
    ElMessage({
        type: 'error',
        message: response.message
    });
}
</script>

<script lang="ts">
import type { CrudOperations } from '@/utils/crud';

const dialogVisible = ref(false);
const trademarkParams = reactive<TradeMark>({
    tmName: '',
    logoUrl: ''
})

export const trademarkCurd: CrudOperations = {
    async add() {
        dialogVisible.value = true;
    },
    async update() {
        dialogVisible.value = true;
    },
    async del() {

    }
}
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 8px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 128px;
    height: 128px;
    text-align: center;
}
</style>