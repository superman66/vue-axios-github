[![Travis](https://img.shields.io/travis/superman66/vue-axios-github.svg)](https://travis-ci.org/superman66/vue-axios-github)
# 一个项目学会前端实现登录拦截

> 一个项目学会vue全家桶+axios实现登录、拦截、登出功能，以及利用axios的http拦截器拦截请求和响应。

## 前言
该项目是利用了Github 提供的personal token作为登录token，通过token访问你的Repository List。通过这个项目学习如何实现一个前端项目中所需要的
登录及拦截、登出、token失效的拦截及对应 axios 拦截器的使用。

**准备**

你需要先生成自己的 Github Personal Token（[生成Token](https://github.com/settings/tokens/new)）。
Token 生成后 访问 [Demo](http://chenhuichao.com/vue-axios-github/)，即可查看你的Repository List。

## 项目结构

```
.
├── README.md
├── dist  // 打包构建后的文件夹
│   ├── build.js
│   └── build.js.map
├── index.html
├── package.json
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── css.css
│   │   ├── icon.css
│   │   └── logo.png
│   ├── constant
│   │   └── api.js  // 配置api接口文件
│   ├── http.js // 封装fetch、post请求及http 拦截器配置文件
│   ├── index.vue
│   ├── login.vue
│   ├── main.js
│   ├── repository.vue
│   ├── router.js // 路由配置文件
│   └── store
│       ├── store.js  
│       └── types.js  // vuex types
└── webpack.config.js
```

### 技术栈
* Vue 2.0
* vue-router
* vuex
* axios
* vue-material

### 登录拦截逻辑

#### 第一步：路由拦截
首先在定义路由的时候就需要多添加一个自定义字段`requireAuth`，用于判断该路由的访问是否需要登录。如果用户已经登录，则顺利进入路由，
否则就进入登录页面。
```javascript
const routes = [
    {
        path: '/',
        name: '/',
        component: Index
    },
    {
        path: '/repository',
        name: 'repository',
        meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
        component: Repository
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
];
```
定义完路由后，我们主要是利用`vue-router`提供的钩子函数`beforeEach()`对路由进行判断。

```javascript
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (store.state.token) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})
```
每个钩子方法接收三个参数：

* to: Route: 即将要进入的目标 路由对象
* from: Route: 当前导航正要离开的路由
* next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  * next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。
  * next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。
  * next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。

**确保要调用 next 方法，否则钩子就不会被 resolved。**
> 完整的方法见`/src/router.js`

其中，`to.meta`中是我们自定义的数据，其中就包括我们刚刚定义的`requireAuth`字段。通过这个字段来判断该路由是否需要登录权限。需要的话，同时当前应用不存在token，则跳转到登录页面，进行登录。登录成功后跳转到目标路由。

登录拦截到这里就结束了吗？并没有。这种方式只是简单的前端路由控制，并不能真正阻止用户访问需要登录权限的路由。还有一种情况便是：当前token失效了，但是token依然保存在本地。这时候你去访问需要登录权限的路由时，实际上应该让用户重新登录。
这时候就需要结合 http 拦截器 + 后端接口返回的http 状态码来判断。

#### 第二步：拦截器
要想统一处理所有http请求和响应，就得用上 axios 的拦截器。通过配置`http response inteceptor`，当后端接口返回`401 Unauthorized（未授权）`，让用户重新登录。

```javascript
// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `token ${store.state.token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT);
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });
```
>完整的方法见`/src/http.js`.

通过上面这两步，就可以在前端实现登录拦截了。`登出`功能也就很简单，只需要把当前token清除，再跳转到首页即可。

## 关于axios
对于axios，很多刚开始学习vue的人都觉得文档比较难以看懂。我刚开始也是这么觉得的。但通过这么一个项目下来后，发现axios并不难理解。建议在学习axios的时带着下面的目的去看文档会更高效。因为掌握了下面这些内容，基本上就可以无障碍得在项目中使用axios了。

* 发起http请求的方法
* http 请求成功时返回的数据及其类型
* http请求失败的处理
* 拦截器的使用
* http的配置

> [axios文档](https://github.com/mzabriskie/axios)

## 运行及构建
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## 如果你对 React 感兴趣
欢迎 start 我们团队的 React 组件库 [RSuite](https://github.com/rsuite/rsuite).

RSuite 官网：[RSuite|一套 React 的 UI 组件库](https://www.rsuitejs.com)
