import { useRoute } from 'vue-router';

const hasCrud = ['/acl/user', '/acl/role', '']

const getRoute = () => {
    const $route = useRoute();
    return $route.path;
}

export const add = () => {
    getRoute();
};

export const update = () => {};
