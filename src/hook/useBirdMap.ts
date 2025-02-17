import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { nextTick } from "vue";
import { useBirdStore } from "@/stores/useBirdStore";

const bird_icon_chrome = L.icon({
  iconUrl: "marker/bird-fly.png", // use chrome: chrome.runtime.getURL("marker/bird-fly.png"),
  iconSize: [50, 50], // 원본 비율 유지하면서 적절한 크기로 조정
  iconAnchor: [25, 50], // 중심이 아이콘 아래쪽에 위치하도록 설정
  popupAnchor: [0, -50], // 팝업이 아이콘 위에 뜨도록 조정
  shadowUrl: "marker/bird-fly.png", // use chrome: chrome.runtime.getURL("marker/bird-fly.png"),
  shadowSize: [55, 55], // 그림자 크기 약간 크게 설정
  shadowAnchor: [25, 50],
});

export const useBirdMap = () => {
  const birdStore = useBirdStore();

  /**
   * 현재 위치 호출
   */
  const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  /**
   * Leaflet 지도 초기화
   */
  const initializeMap = (defaultLat: number, defaultLng: number) => {
    const map = L.map("map").setView([defaultLat, defaultLng], 14);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    birdStore.setInitialMap(map);
  };

  /**
   * 지도 뷰 업데이트
   */
  const updateMapView = async (lat: number, lng: number) => {
    // birdStore.initial_map.invalidateSize();

    if (!birdStore.initial_map) {
      initializeMap(lat, lng);
      return;
    } else {
      await nextTick();
      birdStore.initial_map.setView([lat, lng], 14);
    }

    //birdStore.initial_map.setView([lat, lng], 14);
  };

  /**
   * 지도에 마커 추가
   */
  const addMarker = (lat: number, lng: number, popupText?: string) => {
    if (!birdStore.initial_map) return;
    if (popupText) {
      L.marker([lat, lng], { icon: bird_icon_chrome })
        .bindPopup(popupText)
        .addTo(birdStore.initial_map);
    } else {
      L.marker([lat, lng], { icon: bird_icon_chrome }).addTo(
        birdStore.initial_map
      );
    }
  };

  /**
   * 지도에 원형 마커 추가
   */
  const addCircle = (
    lat: number,
    lng: number,
    total_voulmn: number,
    popupText: string
  ) => {
    const defaultSettings = {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: total_voulmn * 50,
    };
    if (!birdStore.initial_map) return;
    L.circle([lat, lng], defaultSettings)
      .bindPopup(popupText)
      .addTo(birdStore.initial_map);
  };

  return {
    getCurrentPosition,
    initializeMap,
    updateMapView,
    addMarker,
    addCircle,
  };
};
