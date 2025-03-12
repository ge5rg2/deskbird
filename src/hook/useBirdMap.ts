import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { nextTick } from "vue";
import { useBirdStore } from "@/stores/useBirdStore";
import { getRecntBirdByLocation, getBirdsPicture } from "@/api/useBirdsApi";
import type { BirdData } from "@/types/common.types.ts";
import { useI18n } from "vue-i18n";

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
  const { t } = useI18n();
  /**
   * Map 초기화 매서드
   */
  const setRefresh = () => {
    birdStore.setIsClicked(false);
    birdStore.setIsLoaded(false);
    birdStore.setIsDataLoaded(false);
    if (!birdStore.getOpenMap) {
      birdStore.setOpenMap();
    }
  };

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
    return map;
  };

  /**
   * 지도 뷰 업데이트
   */
  const updateMapView = async (lat: number, lng: number) => {
    if (!birdStore.initial_map) {
      initializeMap(lat, lng);
      await nextTick(); // 지도 렌더링을 기다린 후 실행
    }

    if (birdStore.initial_map) {
      birdStore.initial_map.setView([lat, lng], 14);
    } else {
      console.error(
        "🚨 Leaflet Map initialization failed: 'null' status after initialization"
      );
    }
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

  /**
   * 책상 근처의 조류 정보 가져오기
   * TODO: obsDt 추가
   * TODO: undefined 처리
   * @returns mapData
   */
  const getNearbyBirds = async () => {
    try {
      birdStore.setIsClicked(true);
      birdStore.setIsLoaded(true);
      birdStore.setIsDataLoaded(false);
      const position = await getCurrentPosition();
      if (!position) {
        alert(t("message.locationFail"));
        console.error(t("message.locationFail"));
        return;
      }
      const { latitude, longitude } = position.coords;

      await nextTick();
      updateMapView(latitude, longitude);

      addMarker(
        latitude,
        longitude,
        `
      <strong>${t("main.currentLocation")}</strong>
      <div>${latitude}, ${longitude}</div>
      `
      );

      //birdStore.setBirdContainer({});
      const bird_container = birdStore.getBirdContainer;
      const birdData = await getRecntBirdByLocation(latitude, longitude);

      if (birdData) {
        //console.debug("🐦 birdData:", birdData);
        birdData.forEach((el: Partial<BirdData>) => {
          if (el.lat && el.lng && el.comName && el.locName && el.obsDt) {
            const locationKey = `${el.lat}&${el.lng}`;

            // 만약 해당 위치가 `bird_container`에 없으면 초기화
            if (!bird_container[locationKey]) {
              bird_container[locationKey] = {
                locName: el.locName,
                obsDt: el.obsDt,
                species: { [el.comName]: el.howMany || 1 },
              };
            } else {
              if (!bird_container[locationKey].species[el.comName]) {
                bird_container[locationKey].species[el.comName] =
                  el.howMany || 1;
              } else {
                bird_container[locationKey].species[el.comName] +=
                  el.howMany || 1;
              }
            }
          }
        });

        console.debug("🐦 bird_container:", bird_container);

        // `bird_container`의 데이터를 기반으로 지도에 마커 및 서클 추가
        Object.entries(bird_container).forEach(([location, data]: any) => {
          const [lat, lng] = location.split("&").map(Number);
          const { locName, species, obsDt } = data;
          const speciesNames = Object.keys(species);
          const speciesCount = speciesNames.length;
          const totalVolume: any = Object.values(species).reduce(
            (acc: any, count: any) => acc + count,
            0
          );

          if (speciesCount > 1) {
            addCircle(
              lat,
              lng,
              totalVolume,
              `
            <strong>${t("main.info")}</strong>
            <hr/>
            <div><strong>${t(
              "main.foundPlace"
            )}</strong>: (${lat}, ${lng}) - ${locName}</div>
            <div><strong>${t("main.foundDate")}</strong>: ${obsDt}</div>
            <div><strong>${t("main.foundSpiec")}</strong>: ${speciesNames.join(
              ", "
            )} / ${t("main.total")} ${speciesCount} ${t("main.spiec")}</div>
            <div><strong>${t(
              "main.foundHowMany"
            )}</strong>: ${totalVolume}</div>
            `
            );
          } else {
            addMarker(
              lat,
              lng,
              `
            <strong>${t("main.info")}</strong>
            <hr/>
            <div><strong>${t(
              "main.foundPlace"
            )}</strong>: (${lat}, ${lng}) - ${locName}</div>
            <div><strong>${t("main.foundDate")}</strong>: ${obsDt}</div>
            <div><strong>${t("main.foundSpiec")}</strong>: ${
              speciesNames[0]
            }</div>
            <div><strong>${t("main.foundHowMany")}</strong>: ${
              species[speciesNames[0]]
            }</div>
            `
            );
          }
        });
        birdStore.setBirdContainer(bird_container);
        birdStore.setIsDataLoaded(true);
        return console.debug("🐤 success to get nearby birds");
      } else {
        alert(t("message.getNearbyFail"));
        console.error(t("message.getNearbyFail"));
        birdStore.setIsClicked(false);
        birdStore.setIsLoaded(false);
        birdStore.setIsDataLoaded(false);
        return;
      }
    } catch (error) {
      alert(t("message.locationFail"));
      console.error(t("message.locationFail"), error);
      birdStore.setIsClicked(false);
      birdStore.setIsLoaded(false);
      birdStore.setIsDataLoaded(false);
    }
  };

  return {
    getNearbyBirds,
    getCurrentPosition,
    initializeMap,
    updateMapView,
    addMarker,
    addCircle,
    setRefresh,
  };
};
