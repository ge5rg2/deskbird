<script setup lang="ts">
// ====================================
//    Page - BirdMap
// ====================================

// ====================================
// imports
import "leaflet/dist/leaflet.css";
import { useBirdStore } from "@/stores/useBirdStore";
import { useBirdMap } from "@/hook/useBirdMap";
// import bird-icon from "public/marker/bird-icon.png"

/**
 * q-google-map: https://q-google-map.netlify.app/docs_examples
 * leafletjs: https://leafletjs.com/examples/quick-start/
 * TODO: Iframe: https://species.nibr.go.kr/bird/home/geo/index.do
 * TODO: 조류 상세 정보는 en일경우 위키, kr의 경우 네이버백과
 * Localstoage O, cookie ?
 */

// ====================================
// components

// ====================================
// stores

// ====================================
// variables
const { getNearbyBirds } = useBirdMap();
const birdStore = useBirdStore();

// ====================================
// functions - events

// ====================================
// lifecycles

// ====================================
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="map-container relative">
      <div
        v-show="!birdStore.getIsDataLoaded && birdStore.getIsClicked"
        class="loading-overlay"
      >
        <font-awesome-icon class="spinner text-blue-500" icon="fa-spinner" />
        <p>{{ $t("main.loading") }}</p>
      </div>
      <div v-show="birdStore.getIsLoaded" id="map"></div>
      <div
        v-show="!birdStore.getIsLoaded"
        class="flex items-center justify-center w-full h-full bg-gray-100"
      >
        <button
          v-show="!birdStore.getIsClicked"
          @click="getNearbyBirds"
          class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          {{ $t("main.findBirds") }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="css">
.map-container {
  width: 500px; /* 너비를 높이와 동일시 지도 상 줌이 안됨 */
  height: 400px;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 18px;
  font-weight: bold;
  z-index: 999;
}
#map {
  width: 100%; /* 부모 요소(.map-container)의 크기를 따라감 */
  height: 100%;
}
.spinner {
  animation: spin 1s linear infinite;
  position: relative;
  color: blue;
  width: 40px;
  height: 40px;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
