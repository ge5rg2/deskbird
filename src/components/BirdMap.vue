<script setup lang="ts">
// ====================================
//    Page - BirdMap
// ====================================

// ====================================
// imports
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { ref, computed, onMounted, nextTick } from "vue";
import { getRecntBirdByLocation, getBirdsPicture } from "@/api/useBirdsApi";
import type { BirdData } from "@/types/common.types.ts";
import { useI18n } from "vue-i18n";
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
const {
  initializeMap,
  addMarker,
  updateMapView,
  getCurrentPosition,
  addCircle,
} = useBirdMap();
const { t } = useI18n();
const isClick = ref<boolean>(false);
const isLoaded = ref<boolean>(false);
//const birdStore = useBirdStore();

// ====================================
// functions - events

const getNearbyBirds = async () => {
  try {
    isLoaded.value = true;
    const position = await getCurrentPosition();
    isClick.value = true;
    if (!position) {
      alert(t("message.locationFail"));
      console.error(t("message.locationFail"));
      return;
    }
    const { latitude, longitude } = position.coords;
    // 지도 중심을 현재 위치로 이동
    // UI 업데이트 후 Leaflet 크기 재조정
    await nextTick();
    updateMapView(latitude, longitude);
    // 현재 위치 마커 추가
    addMarker(
      latitude,
      longitude,
      `
              <strong>${t("main.currentLocation")}</strong>
              <div>${latitude}, ${longitude}</div>
              `
    );
    // 근처 새 정보 가져오기
    const bird_container: any[any] = [];
    const birdData = await getRecntBirdByLocation(latitude, longitude);

    if (birdData) {
      birdData.forEach((el: Partial<BirdData>) => {
        if (el.lat && el.lng && el.comName) {
          const location = `${el.lat}&${el.lng}`;
          if (!bird_container[location]) {
            bird_container[location] = {};
          }
          if (!bird_container[location][el.comName]) {
            bird_container[location][el.comName] = el.howMany;
          }
          bird_container[location][el.comName] =
            bird_container[location][el.comName] + el.howMany;
        }
      });
      //console.debug(bird_container);
      // bird_container 의 지리별 조건문을 걸어주고, 개수가 1개일 시 마커, 이상일 경우 circle
      Object.keys(bird_container).forEach((location: any) => {
        const [lat, lng] = location.split("&");
        const comName = bird_container[location];

        const count = Object.keys(comName).length;
        console.debug(Object.values(comName));
        if (count > 1) {
          const total_voulmn: any = Object.values(comName).reduce(
            (acc: any, cur: any) => cur + acc
          );
          addCircle(
            lat,
            lng,
            total_voulmn,
            `
              <strong>${t("main.info")}</strong>
              <hr/ >
              <div>${t("main.foundPlace")}: (${lat}, ${lng})</div>
              <div>${t("main.foundSpiec")}: ${Object.keys(comName)} / ${t(
              "main.total"
            )} ${count} ${t("main.spiec")}</div>
              <div>${t("main.foundHowMany")}: ${total_voulmn}</div>
              `
          );
        } else {
          addMarker(
            lat,
            lng,
            `
              <strong>${t("main.info")}</strong>
              <hr/ >
              <div>${t("main.foundPlace")}: (${lat}, ${lng})</div>
              <div>${t("main.foundSpiec")}: ${Object.keys(comName)}</div>
              <div>${t("main.foundHowMany")}: ${Object.values(comName)}</div>
              `
          );
        }
      });
      return console.debug("🐤 success to get nearby birds");
    } else {
      alert(t("message.getNearbyFail"));
      console.error(t("message.getNearbyFail"));
      return (isLoaded.value = false);
    }
  } catch (error) {
    alert(t("message.locationFail"));
    console.error(t("message.locationFail"), error);
    isLoaded.value = false;
    return;
  }
};

// ====================================
// lifecycles
onMounted(async () => {});

// ====================================
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="map-container">
      <div v-show="isLoaded" id="map"></div>
      <div
        v-show="!isLoaded"
        class="flex items-center justify-center w-full h-full bg-gray-100"
      >
        <button
          v-show="!isClick"
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
#map {
  width: 100%; /* 부모 요소(.map-container)의 크기를 따라감 */
  height: 100%;
}
</style>
