import { defineStore } from 'pinia';
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user';
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token';
import type {
    LoginFormData,
    LoginResponseData,
    UserInfoResponseData
} from '@/api/user/type';
import type { UserState } from './types/type';
import { constantRoute } from '@/router/routes';

const useUserStore = defineStore('User', {
    state: (): UserState => {
        return {
            token: GET_TOKEN(),
            menuRoutes: constantRoute,
            username: '',
            avatar: ''
        };
    },
    actions: {
        async userLogin(data: LoginFormData) {
            const result: LoginResponseData = await reqLogin(data);
            if (result.code === 200) {
                this.token = result.data as string;
                SET_TOKEN(result.data as string);
                return 'ok';
            } else {
                return Promise.reject(new Error(result.data));
            }
        },
        async userInfo() {
            const result: UserInfoResponseData = await reqUserInfo();
            if (result.code === 200) {
                this.username = result.data.name;
                this.avatar = result.data.avatar;
            } else {
                return Promise.reject(new Error(result.message));
            }
        },
        async userLogout() {
            const result = await reqLogout();
            if (result.code === 200) {
                this.token = null;
                this.username = '';
                this.avatar = '';
                REMOVE_TOKEN();
                return 'ok';
            } else {
                Promise.reject(new Error(result.message));
            }
        }
    },
    getters: {}
});

export default useUserStore;
