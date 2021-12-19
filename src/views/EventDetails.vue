<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.locatiopn }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<script>
import EventService from '@/services/EventService';
export default {
  props: ['id'],
  name: 'EventDetails',
  data() {
    return {
      event: null
    };
  },
  async created() {
    try {
      const { data } = await EventService.getEvent(this.id);
      this.event = data;
    } catch (err) {
      console.log(err);
    }
    //fetch event by id
  }
};
</script>

<style></style>
