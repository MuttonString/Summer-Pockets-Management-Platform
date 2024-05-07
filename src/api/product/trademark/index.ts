import request from '@/utils/request';
import type { TradeMarkResponseData, TradeMark } from './type';

enum API {
    TRADEMARK_URL = '/admin/product/baseTrademark/',
    ADD_TRADEMARK_URL = '/admin/product/baseTrademark/save',
    UPDATE_TRADEMARK_URL = '/admin/product/baseTrademk/update'
}

export const reqTrademark = (page: number, limit: number) =>
    request.get<string, TradeMarkResponseData>(
        API.TRADEMARK_URL + `${page}/${limit}`
    );

export const reqAddOrUpdateTrademark = (data: TradeMark) => {
    if (data.id) {
        return request.put<string, TradeMark>(API.UPDATE_TRADEMARK_URL, data);
    } else {
        return request.post<string, TradeMark>(API.ADD_TRADEMARK_URL, data);
    }
};
