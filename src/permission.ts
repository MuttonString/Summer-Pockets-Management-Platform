import router from './router';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import useUserStore from './store/modules/user';
import pinia from './store';

router.beforeEach(async (to, _from, next) => {
    const userStore = useUserStore(pinia);
    nprogress.start();
    if (userStore.token) {
        if (to.path === '/login') {
            next({ path: '/' });
        } else {
            if (userStore.username) {
                next();
            } else {
                try {
                    await userStore.userInfo();
                    next();
                } catch (error) {
                    userStore.userLogout();
                    next({ path: '/login', query: { redirect: to.path } });
                }
            }
        }
    } else {
        if (to.path === '/login') next();
        else next({ path: '/login' });
    }
});

router.afterEach(() => {
    nprogress.done();
});
