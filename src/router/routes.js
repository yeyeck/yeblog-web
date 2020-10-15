
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/article/page/:page?', component: () => import('pages/Index.vue') },
      { path: '/article/category/:categoryId/page/:page?', component: () => import('pages/Index.vue') },
      { path: 'article/:id', component: () => import('pages/Article.vue') }
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
