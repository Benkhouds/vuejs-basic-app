<template>
  <div
    id="flash-message"
    :class="GStore.flashMessage.status"
    v-if="GStore.flashMessage"
  >
    {{ GStore.flashMessage.text }}
  </div>
  <div id="nav">
    <router-link :to="{ name: 'EventList' }">Events</router-link> |
    <router-link :to="{ name: 'About' }">About</router-link>
  </div>
  <router-view />
</template>

<script>
export default {
  inject: ['GStore']
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
#flash-message {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 8px;
  padding: 1rem;
  color: white;
}
#flash-message.success {
  background: green;
}
#flash-message.fail {
  background: red;
}
</style>
