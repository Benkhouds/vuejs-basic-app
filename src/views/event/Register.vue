<template>
  <p>Register an event</p>
  <button @click="register">Click me</button>
</template>

<script>
export default {
  props: ['event'],
  inject: ['GStore'],
  methods: {
    register() {
      this.GStore.flashMessage = {
        text: 'You have successfully registered for the event',
        status: 'success'
      };
      setTimeout(() => {
        this.GStore.flashMessage = null;
      }, 800);
      this.$router.push({
        name: 'EventDetails',
        //params object could be omitted because vue js would automatically look for the corresponding id
        params: { id: this.$route.params.id }
      });
    }
  }
};
</script>
