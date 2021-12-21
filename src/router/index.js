import { createRouter, createWebHistory } from 'vue-router';
//
import EventList from '@/views/EventList.vue';
import About from '@/views/About.vue';
import NotFound from '@/views/NotFound.vue';
import NetworkError from '@/views/NetworkError.vue';
//event related imports
import EventLayout from '@/views/event/Layout.vue';
import EventDetails from '@/views/event/Details.vue';
import EventRegister from '@/views/event/Register.vue';
import EventEdit from '@/views/event/Edit.vue';
import NProgress from 'nprogress';
import GStore from '@/store';
import EventService from '@/services/EventService';

//routes
const routes = [
  {
    path: '/',
    name: 'EventList',
    props: (route) => ({ page: +route.query.page || 1 }),
    component: EventList
  },
  {
    path: '/about-us',
    name: 'About',
    component: About
  },
  //redirecting old route
  {
    path: '/about',
    redirect: { name: 'About' }
  },
  {
    path: '/events/:id',
    name: 'Event',
    props: true,
    component: EventLayout,
    beforeEnter: async (to) => {
      try {
        const id = to.params.id;
        const { data } = await EventService.getEvent(id);
        GStore.event = data;
      } catch (err) {
        if (err.message === 'Network Error') {
          return { name: 'NetworkError' };
        }
        if (err.response && err.response.status === 404) {
          return {
            name: '404Resource',
            params: { resource: 'event' }
          };
        }
      }
    },
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit
      }
    ]
  },
  {
    //all children of event/:id (everything after event would be captured in id ) would be redirected to the corresponding route
    path: '/event/:afterEvent(.*)',
    redirect: (to) => {
      console.log(to);
      return { path: '/events/' + to.params.afterEvent };
    }
  },
  {
    //catching all other routes
    path: '/:catchAll(.*)',
    name: '404',
    component: NotFound
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(() => {
  NProgress.start();
});
router.afterEach(() => {
  NProgress.done();
});
export default router;
