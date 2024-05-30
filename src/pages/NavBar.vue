<template>
  <div class="nav-bar flex justify-between p-3 mb-8">
    <router-link to="/admin">
      <div class="logo-wrap">
        <img :src="logo" alt="Notfuond" />
      </div>
    </router-link>
    <div class="flex gap-5">
      <router-link to="/admin" @click="logout"
        class="rounded-lg bg-black text-white p-3"
      >
        Admin
      </router-link>
    </div>
  </div>
</template>

<script>
import logo from "../assets/logo-hexagon.svg";

export default {
  data() {
    return {
      logo,
    };
  },
};
</script>

<style scoped>
.nav-bar {
  border-bottom: 1px solid #ddd;
  height: 75px;
  width: 100%;
}
.logo-wrap {
  width: 120px;
  height: 120px;
}
</style>