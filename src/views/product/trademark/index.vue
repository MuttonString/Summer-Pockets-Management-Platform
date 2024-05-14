<template>
    <el-card class="main_card">
        <el-table class="main_table" ref="tableRef" border table-layout="auto" :data="trademarkArr"
            highlight-current-row @current-change="handleCurrentChange" @selection-change="handleSelecttionChange">
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

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="512" :show-close="false">
        <el-form :model="trademarkParams" :rules="rules" ref="formRef">
            <el-form-item label="品牌名称" prop="tmName" label-width="96px">
                <el-input v-model="trademarkParams.tmName" />
            </el-form-item>
            <el-form-item label="品牌LOGO" prop="logoUrl" label-width="96px">
                <el-upload class="avatar-uploader" :action="UPLOAD_PICTURE_URL" :show-file-list="false"
                    :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-error="handleAvatarError">
                    <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
                <el-input v-model="trademarkParams.logoUrl" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div>
                <el-button type="primary" @click="confirm()">确定</el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import '@/styles/main.scss';
import { reqAddOrUpdateTrademark, reqTrademark, UPLOAD_PICTURE_URL, reqDeleteTrademark } from '@/api/product/trademark';
import type { Records, TradeMarkResponseData, TradeMark } from '@/api/product/trademark/type';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { ElMessage, FormRules, UploadProps } from 'element-plus';
import useLayoutSettingStore from '@/store/modules/setting';

onMounted(() => {
    getTrademark();
    layoutSettingStore.selectedRowsCnt = 0;
    layoutSettingStore.changeDisabled = true;
});

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
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

const handleAvatarError: UploadProps['onError'] = (error) => {
    console.error(error.message);
    ElMessage({
        type: 'error',
        message: '上传图片失败'
    });
}

const confirm = async () => {
    try {
        await formRef.value.validate();
    } catch (e) {
        return;
    }
    const result = await reqAddOrUpdateTrademark(trademarkParams);
    if (result.code === 200) {
        dialogVisible.value = false;
        ElMessage({
            type: 'success',
            message: `${dialogTitle.value}成功`
        });
        getTrademark();
    } else {
        console.error(result);
        ElMessage({
            type: 'error',
            message: `${dialogTitle.value}失败`
        });
    }
}

const layoutSettingStore = useLayoutSettingStore();

const handleCurrentChange = (currentRow: TradeMark) => {
    if (currentRow) {
        layoutSettingStore.changeDisabled = false;
        trademarkParams.id = currentRow.id;
        trademarkParams.tmName = currentRow.tmName;
        trademarkParams.logoUrl = currentRow.logoUrl;
    } else {
        layoutSettingStore.changeDisabled = true;
    }
}

const handleSelecttionChange = (newSelection: TradeMark[]) => {
    layoutSettingStore.selectedRowsCnt = newSelection.length;
}

const rules: FormRules = {
    tmName: [{
        required: true,
        trigger: 'blur',
        validator: (_rule, value: string, callback) => {
            if (value.trim().length < 2) {
                callback(new Error('品牌名称不得小于2位'));
            } else callback();
        }
    }],
    logoUrl: [{
        required: true,
        trigger: 'blur',
        validator: (_rule, value: string, callback) => {
            if (value) {
                callback();
            } else callback(new Error('请上传品牌LOGO'));
        }
    }]
}
</script>

<script lang="ts">
import { nextTick } from 'vue';
import type { CrudOperations } from '@/utils/crud';

const dialogVisible = ref(false);
const dialogTitle = ref('');
const tableRef = ref();
const formRef = ref();
const trademarkParams = reactive<TradeMark>({
    tmName: '',
    logoUrl: ''
})

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

export const trademarkCurd: CrudOperations = {
    add() {
        tableRef.value.setCurrentRow();
        trademarkParams.id = undefined;
        trademarkParams.tmName = trademarkParams.logoUrl = '';
        dialogTitle.value = '新增品牌';
        dialogVisible.value = true;
        nextTick(() => {
            formRef.value.clearValidate();
        });
    },
    update() {
        dialogTitle.value = '修改品牌';
        dialogVisible.value = true;
    },
    async del() {
        let errorMessage = '';
        let cnt = 0;
        const rows: TradeMark[] = tableRef.value.getSelectionRows();
        for (const row of rows) {
            const result = await reqDeleteTrademark(row.id as number);
            if (result.code === 200) {
                cnt++;
            } else {
                errorMessage += `删除${row.tmName}失败，错误信息：${result.data}<br/>`;
            }
        }
        if (cnt === rows.length) {
            ElMessage({
                type: 'success',
                message: `成功删除了${cnt}项`
            });
        } else {
            ElMessage({
                type: 'error',
                dangerouslyUseHTMLString: true,
                message: `${errorMessage}<br/>成功删除了${cnt}项`
            });
        }
        getTrademark();
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

.avatar {
    max-width: 384px;
}
</style>