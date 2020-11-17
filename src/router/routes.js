
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'page/:page?', component: () => import('pages/Index.vue') },
      // { path: 'category/:categoryId/page/:page?', component: () => import('pages/Category.vue') },
      { path: 'article/:id', component: () => import('pages/Article.vue') },
      { path: 'friends', component: () => import('pages/Friends.vue') },
      {
        path: 'category/',
        component: () => import('pages/Category.vue'),
        children: [
          { path: ':categoryId/page/:page?', component: () => import('pages/Articles.vue') }
        ]
      },
      { path: 'labels', component: () => import('pages/Friends.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Error404.vue') }
    ]
  }
]

export default routes
