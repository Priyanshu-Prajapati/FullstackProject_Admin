<template>
  <nav-bar></nav-bar>
  <the-products></the-products>
</template>

<script>
import TheProducts from '../components/TheProducts.vue';
import NavBar from "./NavBar.vue";

export default {
  components: {
    NavBar,
    TheProducts
  },
};
</script>