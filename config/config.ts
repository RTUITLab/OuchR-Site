import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  history: {
    type: 'browser',
  },
  locale: {
    default: 'en-US',
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/activity/main',
            },
            {
              name: 'Моя активность',
              icon: 'user',
              path: '/activity',
              routes: [
                {
                  path: '/',
                  redirect: '/activity/main',
                },
                {
                  name: 'Главная',
                  icon: 'smile',
                  path: '/activity/main',
                  component: './my-activity/main',
                },
                {
                  name: 'Мои кандидаты',
                  icon: 'smile',
                  path: '/activity/candidates',
                  component: './my-activity/candidates',
                },
              ],
            },
            {
              path: '/smm',
              icon: 'form',
              name: 'SMM',
              routes: [
                {
                  path: '/',
                  redirect: '/smm/metrics',
                },
                {
                  name: 'Метрики',
                  icon: 'smile',
                  path: '/smm/metrics',
                  component: './smm/metrics',
                },
              ],
            },
            {
              path: '/hr',
              icon: 'profile',
              name: 'HR',
              routes: [
                {
                  path: '/',
                  redirect: '/hr/metrics',
                },
                {
                  name: 'Метрики',
                  icon: 'smile',
                  path: '/hr/metrics',
                  component: './hr/metrics',
                },
              ],
            },
            {
              path: '/calendar',
              name: 'Календарь',
              icon: 'table',
              routes: [
                {
                  path: '/',
                  redirect: '/calendar/interviews',
                },
                {
                  name: 'Собеседования',
                  icon: 'smile',
                  path: '/calendar/interviews',
                  component: './calendar/interviews',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  theme: {
    'primary-color': defaultSettings.primaryColor,
    'layout-sider-background': '#00396e',
    'menu-dark-inline-submenu-bg': '#00213a',
    'menu-inline-submenu-bg': '#00000000',
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  esbuild: {},
});
