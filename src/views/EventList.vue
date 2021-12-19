<template>
  <div class="events">
    <img alt="Vue logo" src="../assets/logo.png" />
    <p v-if="isLoading">Loading...</p>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue';
import EventService from '@/services/EventService.js';
//
export default {
  name: 'EventList',
  components: {
    EventCard
  },
  data() {
    return {
      isLoading: false,
      events: []
    };
  },
  methods: {
    async fetchEvents() {
      try {
        const { data } = await EventService.getEvents();
        this.events = data;
      } catch (err) {
        console.log(err);
      }
    }
  },
  async created() {
    this.isLoading = true;
    await this.fetchEvents();
    this.isLoading = false;
  }
};
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
