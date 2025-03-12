<script setup lang="ts">
//import { ref, computed, onMounted } from "vue";
import BirdMap from "@/components/BirdMap.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import BirdContent from "./components/BirdContent.vue";

import { useBirdStore } from "./stores/useBirdStore";

const birdStore = useBirdStore();
</script>

<template>
  <div class="text-center bg-white shadow-md rounded-lg">
    <div class="p-5">
      <Header />
      <BirdMap v-show="birdStore.getOpenMap" />
      <BirdContent v-show="!birdStore.getOpenMap" />
    </div>
    <Footer />
  </div>
</template>

<style lang="css"></style>
