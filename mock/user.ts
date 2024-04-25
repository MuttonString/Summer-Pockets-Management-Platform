function createUserList() {
    return [
        {
            userId: 1,
            avatar: 'https://key.visualarts.gr.jp/summer_rb/common/image/character_siroha_icon.png',
            username: 'shiroha',
            password: '1234',
            desc: '平台管理员',
            roles: ['平台管理员'],
            buttons: ['cuser.detail'],
            routes: ['home'],
            token: 'Admin Token'
        },
        {
            userId: 2,
            avatar: 'https://key.visualarts.gr.jp/summer_rb/common/image/character_shiki_icon.png',
            username: 'shiki',
            password: '4321',
            desc: '系统管理员',
            roles: ['系统管理员'],
            buttons: ['cuser.detail', 'cuser.user'],
            routes: ['home'],
            token: 'System Token'
        }
    ];
}

export default [
    {
        url: '/api/user/login',
        method: 'POST',
        response: ({ body }) => {
            const { username, password } = body;
            const checkUser = createUserList().find(
                (item) =>
                    item.username === username && item.password === password
            );
            if (!checkUser) {
                return { code: 201, data: { message: '账号或密码不正确' } };
            }
            const { token } = checkUser;
            return { code: 200, data: { token } };
        }
    },
    {
        url: '/api/user/info',
        method: 'GET',
        response: (request) => {
            const token = request.headers.token;
            const checkUser = createUserList().find((item) => item.token);
            if (!checkUser) {
                return { code: 201, data: { message: '获取用户信息失败' } };
            }
            return { code: 200, data: { checkUser } };
        }
    }
];
