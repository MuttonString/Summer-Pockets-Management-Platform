import { ConfigEnv, defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// https://vitejs.dev/config/
export default defineConfig(({ command }: ConfigEnv) => {
    return {
        plugins: [
            vue(),
            createSvgIconsPlugin({
                iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
                symbolId: 'icon-[dir]-[name]'
            })
        ],
        resolve: {
            alias: {
                '@': path.resolve('./src')
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    javascriptEnabled: true,
                    additionalData: '@import "@/styles/variable.scss";'
                }
            }
        },
        // 代理跨域
        server: {
            proxy: {
                ['/api']: {
                    target: 'http://sph-api.atguigu.cn',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                }
            }
        }
    };
});
