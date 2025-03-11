<script setup lang="ts">
// ====================================
//    Bird List
// ====================================

// ====================================
// imports
import { ref, watch } from "vue";
import { useBirdMap } from "@/hook/useBirdMap";
// ====================================
// components

// ====================================
// stores
import { useBirdStore } from "@/stores/useBirdStore";
// ====================================
// variables
const birdStore = useBirdStore();
const { getNearbyBirds } = useBirdMap();

// ====================================
// functions - events

const getBirds = () => {
  alert("getBirds");
};

watch(
  () => birdStore.getIsDataLoaded,
  () => {
    console.log("birdStore.getBirdContainer", birdStore.getBirdContainer);
  }
);
// ====================================
</script>

<template>
  <div class="bird-list">
    <ul v-if="birdStore.getIsDataLoaded" class="list-none p-0">
      <li
        v-for="(data, location) in birdStore.getBirdContainer"
        :key="location"
        class="text-black border border-gray-200 p-4 bird-card"
      >
        <div class="location">
          <strong>{{ $t("main.foundPlace") }}:</strong> {{ data.locName }}
        </div>
        <div class="location">
          <strong>{{ $t("main.cord") }}:</strong>
          {{ location }}
        </div>
        <div class="observation-date">
          <strong>{{ $t("main.foundDate") }}:</strong> {{ data.obsDt }}
        </div>
        <ul class="species-list">
          <li
            @click="getBirds"
            class="bird-name"
            v-for="(count, species) in data.species"
            :key="species"
          >
            🐦 <strong>{{ species }}</strong
            >: {{ count }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style lang="css">
.bird-list {
  width: 500px;
  height: 400px;
  scroll-behavior: smooth;
  overflow-y: auto;
}
.bird-card {
  width: 100%;
  margin-bottom: 10px;
  border-radius: 5px;
  height: 100%;
}
.bird-name {
  list-style-type: none;
  cursor: pointer;
}
.bird-name:hover {
  background-color: #f9f9f9;
}
</style>
