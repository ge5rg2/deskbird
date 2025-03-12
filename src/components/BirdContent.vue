<script setup lang="ts">
// ====================================
//    Bird List
// ====================================

// ====================================
// imports
import { ref, watch } from "vue";
import { useBirdMap } from "@/hook/useBirdMap";
import { useBirdImg } from "@/hook/useBirdImg";
import { useI18n } from "vue-i18n";
// ====================================
// components
import BirdCard from "@/components/BirdCard.vue";

// ====================================
// stores
import { useBirdStore } from "@/stores/useBirdStore";
// ====================================
// variables
const { t } = useI18n();
const birdStore = useBirdStore();
const { getBirdImg } = useBirdImg();
const openCard = ref(false);
const birdImg = ref<string>("");
// ====================================
// functions - events

const getBirds = async (species: string) => {
  alert(t("message.tbd"));
  /* const re = await getBirdImg(species);
  console.log(re);
  birdImg.value = re;
  openCard.value = true; */
};

const closeCard = () => {
  openCard.value = false;
};

/* watch(
  () => birdStore.getIsDataLoaded,
  () => {
    console.log("birdStore.getBirdContainer", birdStore.getBirdContainer);
  }
); */
// ====================================
</script>

<template>
  <div class="bird-list">
    <div v-if="openCard">
      <button @click="closeCard">BACK</button>
      <BirdCard :img="birdImg" />
    </div>
    <ul v-if="birdStore.getIsDataLoaded && !openCard" class="list-none p-0">
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
            class="bird-name"
            v-for="(count, species) in data.species"
            @click="getBirds(String(species))"
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
