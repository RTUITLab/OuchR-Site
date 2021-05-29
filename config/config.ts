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
                  component: './form/basic-form',
                },
              ],
            },
            {
              path: '/list',
              icon: 'profile',
              name: 'HR',
              routes: [
                {
                  path: '/list/search',
                  name: 'search-list',
                  component: './list/search',
                  routes: [
                    {
                      path: '/list/search',
                      redirect: '/list/search/articles',
                    },
                    {
                      name: 'articles',
                      icon: 'smile',
                      path: '/list/search/articles',
                      component: './list/search/articles',
                    },
                    {
                      name: 'projects',
                      icon: 'smile',
                      path: '/list/search/projects',
                      component: './list/search/projects',
                    },
                    {
                      name: 'applications',
                      icon: 'smile',
                      path: '/list/search/applications',
                      component: './list/search/applications',
                    },
                  ],
                },
                {
                  path: '/',
                  redirect: '/list/table-list',
                },
                {
                  name: 'table-list',
                  icon: 'smile',
                  path: '/list/table-list',
                  component: './list/table-list',
                },
                {
                  name: 'basic-list',
                  icon: 'smile',
                  path: '/list/basic-list',
                  component: './list/basic-list',
                },
                {
                  name: 'card-list',
                  icon: 'smile',
                  path: '/list/card-list',
                  component: './list/card-list',
                },
              ],
            },
            {
              path: '/profile',
              name: 'Календарь',
              icon: 'table',
              routes: [
                {
                  path: '/',
                  redirect: '/profile/basic',
                },
                {
                  name: 'basic',
                  icon: 'smile',
                  path: '/profile/basic',
                  component: './profile/basic',
                },
                {
                  name: 'advanced',
                  icon: 'smile',
                  path: '/profile/advanced',
                  component: './profile/advanced',
                },
              ],
            },
            {
              name: 'exception',
              icon: 'warning',
              path: '/exception',
              routes: [
                {
                  path: '/',
                  redirect: '/exception/403',
                },
                {
                  name: '403',
                  icon: 'smile',
                  path: '/exception/403',
                  component: './exception/403',
                },
                {
                  name: '404',
                  icon: 'smile',
                  path: '/exception/404',
                  component: './exception/404',
                },
                {
                  name: '500',
                  icon: 'smile',
                  path: '/exception/500',
                  component: './exception/500',
                },
              ],
            },
            {
              name: 'account',
              icon: 'user',
              path: '/account',
              routes: [
                {
                  path: '/',
                  redirect: '/account/center',
                },
                {
                  name: 'center',
                  icon: 'smile',
                  path: '/account/center',
                  component: './account/center',
                },
                {
                  name: 'settings',
                  icon: 'smile',
                  path: '/account/settings',
                  component: './account/settings',
                },
              ],
            },
            {
              name: 'editor',
              icon: 'highlight',
              path: '/editor',
              routes: [
                {
                  path: '/',
                  redirect: '/editor/flow',
                },
                {
                  name: 'flow',
                  icon: 'smile',
                  path: '/editor/flow',
                  component: './editor/flow',
                },
                {
                  name: 'mind',
                  icon: 'smile',
                  path: '/editor/mind',
                  component: './editor/mind',
                },
                {
                  name: 'koni',
                  icon: 'smile',
                  path: '/editor/koni',
                  component: './editor/koni',
                },
              ],
            },
            {
              component: '404',
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
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  esbuild: {},
});
