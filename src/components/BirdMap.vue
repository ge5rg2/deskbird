<script setup lang="ts">
// ====================================
//    Page
// ====================================

// ====================================
// imports
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { ref, computed, onMounted } from "vue";
import { getRecntBirdByLocation, getBirdsPicture } from "@/api/birds";
import type { BirdData } from "@/types/common.types.ts";
import { useI18n } from "vue-i18n";

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
const initial_map = ref<any>(null);
const birds = ref<{ id: number; name: string; location: string }[]>([]);
const bird_icon_chrome = L.icon({
  iconUrl: "marker/bird-fly.png", // use chrome: chrome.runtime.getURL("marker/bird-fly.png"),
  iconSize: [50, 50], // 원본 비율 유지하면서 적절한 크기로 조정
  iconAnchor: [25, 50], // 중심이 아이콘 아래쪽에 위치하도록 설정
  popupAnchor: [0, -50], // 팝업이 아이콘 위에 뜨도록 조정
  shadowUrl: "marker/bird-fly.png", // use chrome: chrome.runtime.getURL("marker/bird-fly.png"),
  shadowSize: [55, 55], // 그림자 크기 약간 크게 설정
  shadowAnchor: [25, 50],
});
const { t } = useI18n();
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
    if (!position) {
      alert(t("message.locationFail"));
      console.error(t("message.locationFail"));
      return;
    }
    const { latitude, longitude } = position.coords;
    // 지도 중심을 현재 위치로 이동
    initial_map.value.setView([latitude, longitude], 14);
    L.marker([latitude, longitude], { icon: bird_icon_chrome })
      .bindPopup(
        `
              <strong>${t("main.currentLocation")}</strong>
              <div>${latitude}, ${longitude}</div>
              `
      )
      .addTo(initial_map.value);
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
      console.debug(bird_container);
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
          L.circle([lat, lng], {
            color: "red",
            fillColor: "#f03",
            fillOpacity: 0.5,
            radius: total_voulmn * 50,
          })
            .bindPopup(
              `
              <strong>${t("main.info")}</strong>
              <hr/ >
              <div>${t("main.foundPlace")}: (${lat}, ${lng})</div>
              <div>${t("main.foundSpiec")}: ${Object.keys(comName)} / ${t("main.total")} ${count} ${t("main.spiec")}</div>
              <div>${t("main.foundHowMany")}: ${total_voulmn}</div>
              `
            )
            .addTo(initial_map.value);
        } else {
          L.marker([lat, lng], { icon: bird_icon_chrome })
            .bindPopup(
              `
              <strong>${t("main.info")}</strong>
              <hr/ >
              <div>${t("main.foundPlace")}: (${lat}, ${lng})</div>
              <div>${t("main.foundSpiec")}: ${Object.keys(comName)}</div>
              <div>${t("main.foundHowMany")}: ${Object.values(comName)}</div>
              `
            )
            .addTo(initial_map.value);
        }
      });
    } else {
      alert(t("message.getNearbyFail"));
      console.error(t("message.getNearbyFail"));
    }

    birds.value = [
      { id: 0, name: "현위치", location: `${latitude}, ${longitude}` },
      { id: 1, name: "참새", location: "공원" },
      { id: 2, name: "까치", location: "나무" },
    ];
  } catch (error) {
    alert(t("message.locationFail"));
    console.error(t("message.locationFail"), error);
    return;
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

  L.marker([defaultLat, defaultLng], { icon: bird_icon_chrome }).addTo(
    initial_map.value
  );
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
  width: 600px;
  height: 400px;
}
</style>
