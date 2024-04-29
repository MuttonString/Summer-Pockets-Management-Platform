import request from '@/utils/request';
import type { TradeMarkResponseData } from './type';

enum API {
    TRADEMARK_URL = '/admin/product/baseTrademark/'
}

export const reqTrademark = (page: number, limit: number) =>
    request.get<string, TradeMarkResponseData>(
        API.TRADEMARK_URL + `${page}/${limit}`
    );
