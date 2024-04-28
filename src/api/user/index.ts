import request from '@/utils/request';
import type {
    LoginFormData,
    LoginResponseData,
    UserInfoResponseData
} from './type';

enum API {
    LOGIN_URL = '/admin/acl/index/login',
    USERINFO_URL = '/admin/acl/index/info',
    LOGOUT_URL = '/admin/acl/index/logout'
}

export const reqLogin = (data: LoginFormData) =>
    request.post<string, LoginResponseData>(API.LOGIN_URL, data);
export const reqUserInfo = () =>
    request.get<string, UserInfoResponseData>(API.USERINFO_URL);
export const reqLogout = () => request.post<string, any>(API.LOGOUT_URL);
