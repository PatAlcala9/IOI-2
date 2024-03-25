const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'main', component: () => import('pages/MainPage.vue') },
      { path: 'docone', component: () => import('pages/Documentation/DocOnePage.vue') },
      { path: 'doctwo', component: () => import('pages/Documentation/DocTwoPage.vue') },
      { path: 'docthree', component: () => import('pages/Documentation/DocThreePage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
