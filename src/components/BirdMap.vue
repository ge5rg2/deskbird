<script setup lang="ts">
// ====================================
//    Page
// ====================================

// ====================================
// imports
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { ref, computed, onMounted } from "vue";
import { getRecntBirdByLocation } from "@/api/ebird";

/**
 * q-google-map: https://q-google-map.netlify.app/docs_examples
 * leafletjs: https://leafletjs.com/examples/quick-start/
 * TODO: Iframe: https://species.nibr.go.kr/bird/home/geo/index.do
 */

// ====================================
// components

// ====================================
// stores

// ====================================
// variables
const initial_map = ref<any>(null);
const birds = ref<{ id: number; name: string; location: string }[]>([]);

// ====================================
// functions - events
const getCurrentPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const getNearbyBirds = async () => {
  try {
    const position = await getCurrentPosition();
    const { latitude, longitude } = position.coords;
    console.log(`현위치: ${latitude}, ${longitude}`);

    const re = await getRecntBirdByLocation(latitude, longitude);
    console.log(re);

    birds.value = [
      { id: 0, name: "현위치", location: `${latitude}, ${longitude}` },
      { id: 1, name: "참새", location: "공원" },
      { id: 2, name: "까치", location: "나무" },
    ];
  } catch (error) {
    console.error("위치 정보를 가져오는 데 실패했습니다.", error);
  }
};

// ====================================
// lifecycles
onMounted(() => {
  // 기본 위치 설정 (위치 정보를 가져오지 못했을 경우)
  const defaultLat = 51.34;
  const defaultLng = -0.09;

  initial_map.value = L.map("map").setView([defaultLat, defaultLng], 14);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(initial_map.value);
});

// ====================================
</script>

<template>
  <div class="flex flex-col items-center">
    <button
      @click="getNearbyBirds"
      class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
    >
      {{ $t("main.findBirds") }}
    </button>
    <div id="map" class="map-container"></div>
    <div v-if="birds.length" class="mt-4">
      <ul class="list-disc text-left mx-auto w-3/4">
        <li v-for="bird in birds" :key="bird.id" class="py-1">
          {{ bird.name }} - {{ bird.location }}
        </li>
      </ul>
    </div>
    <p v-else class="mt-4 text-gray-500">{{ $t("main.loading") }}</p>
  </div>
</template>

<style lang="css">
.map-container {
  width: 500px;
  height: 500px;
}
</style>
