<template>
  <div class="events">
    <img alt="Vue logo" src="../assets/logo.png" />
    <p v-if="isLoading">Loading...</p>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <router-link
        rel="previous page"
        v-if="page != 1"
        :to="{ name: 'EventList', query: { page: +this.page - 1 } }"
      >
        Previous
      </router-link>
      <router-link
        rel="next page"
        v-if="hasNext"
        :to="{ name: 'EventList', query: { page: +this.page + 1 } }"
        >Next</router-link
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue';
import EventService from '@/services/EventService.js';
import { watchEffect } from 'vue';

//
export default {
  name: 'EventList',
  props: ['page'],
  components: {
    EventCard
  },
  data() {
    return {
      isLoading: false,
      events: [],
      totalCount: 0
    };
  },
  methods: {
    async fetchEvents() {
      this.isLoading = true;
      try {
        const res = await EventService.getEvents(this.page);
        this.totalCount = res.headers['x-total-count'];
        this.events = res.data;
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    }
  },
  computed: {
    hasNext() {
      return this.page * 2 < this.totalCount;
    }
  },
  created() {
    watchEffect(() => {
      this.fetchEvents();
    });
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
