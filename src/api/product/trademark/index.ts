import request from '@/utils/request';
import type { ResponseData, TradeMarkResponseData, TradeMark } from './type';

enum API {
    TRADEMARK_URL = '/admin/product/baseTrademark/',
    ADD_TRADEMARK_URL = '/admin/product/baseTrademark/save',
    UPDATE_TRADEMARK_URL = '/admin/product/baseTrademk/update',
    DELETE_TRADEMARK_URL = '/admin/product/baseTrademark/remove/'
}

export const reqTrademark = (page: number, limit: number) =>
    request.get<string, TradeMarkResponseData>(
        API.TRADEMARK_URL + `${page}/${limit}`
    );

export const reqAddOrUpdateTrademark = (data: TradeMark) => {
    console.log(data)
    if (data.id) {
        return request.put<string, ResponseData, TradeMark>(API.UPDATE_TRADEMARK_URL, data);
    } else {
        return request.post<string, ResponseData, TradeMark>(API.ADD_TRADEMARK_URL, data);
    }
};

export const UPLOAD_PICTURE_URL = '/api/admin/product/fileUpload';

export const reqDeleteTrademark = (id: number) => {
    return request.delete<string, ResponseData>(API.DELETE_TRADEMARK_URL + id);
}
