import { trademarkCurd } from '@/views/product/trademark/index.vue';
import useLayoutSettingStore from '@/store/modules/setting';

export interface CrudOperations {
    add(): Promise<any>;
    update(): Promise<any>;
    del(): Promise<any>;
}

export const crud: Record<string, CrudOperations | null> = {
    '/acl/user': null,
    '/acl/role': null,
    '/acl/permission': null,
    '/product/trademark': trademarkCurd,
    '/product/attr': null,
    '/product/spu': null,
    '/product/sku': null
};

let crudOperations: CrudOperations | undefined | null;

export const switchOperations = (path: string) => {
    crudOperations = crud[path];
    useLayoutSettingStore().showCrud = crud[path] !== undefined;
};

export const add = () => {
    if (!crudOperations) return;
    crudOperations.add();
};

export const update = () => {
    if (!crudOperations) return;
    crudOperations.update();
};

export const del = () => {
    if (!crudOperations) return;
    crudOperations.update();
};
