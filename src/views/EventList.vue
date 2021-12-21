<template>
  <div class="events">
    <img alt="Vue logo" src="../assets/logo.png" />
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <router-link
        rel="previous page"
        v-show="page != 1"
        :to="{ name: 'EventList', query: { page: this.page - 1 } }"
      >
        Previous
      </router-link>
      <router-link
        rel="next page"
        v-show="hasNext"
        :to="{ name: 'EventList', query: { page: this.page + 1 } }"
        >Next</router-link
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue';
import EventService from '@/services/EventService.js';
//
export default {
  name: 'EventList',
  props: ['page'],
  components: {
    EventCard
  },
  data() {
    return {
      events: [],
      totalCount: 0
    };
  },
  computed: {
    hasNext() {
      return this.page * 2 < this.totalCount;
    }
  },
  async beforeRouteEnter(toRoute, fromRoute, next) {
    try {
      const page = +toRoute.query.page || 1;
      const res = await EventService.getEvents(page);
      next((component) => {
        component.totalCount = res.headers['x-total-count'];
        component.events = res.data;
      });
    } catch (err) {
      if (err.response && err.response.status === 404) {
        next({
          name: '404Resource',
          params: { resource: 'event' }
        });
      } else {
        next({ name: 'NetworkError' });
      }
    }
  },
  async beforeRouteUpdate(toRoute) {
    try {
      const page = +toRoute.query.page || 1;
      const res = await EventService.getEvents(page);
      this.totalCount = res.headers['x-total-count'];
      this.events = res.data;
    } catch (err) {
      if (err.response && err.response.status === 404) {
        return {
          name: '404Resource',
          params: { resource: 'event' }
        };
      } else {
        return { name: 'NetworkError' };
      }
    }
  }
};
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination > a {
  flex: 1;
}
.pagination > a:nth-child(1) {
  text-align: left;
}
.pagination > a:nth-child(2) {
  text-align: right;
}
</style>
