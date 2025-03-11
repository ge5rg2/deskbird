import axios from "axios";
// TODO: 이미지 쿠키혹은 로컬 스토리지로 데이터 저장 후 로딩 가능한지 테스트

// TODO: 반경범위 조절?
// locName 추가할 것.
/**
 *
 * @param lat 위도
 * @param lng 경도
 * @returns
 */
export const getRecntBirdByLocation = async (lat: number, lng: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL_EBIRD}data/obs/geo/recent/notable?`,
      {
        headers: {
          "x-ebirdapitoken": import.meta.env.VITE_API_URL_EBIRD_KEY,
        },
        params: { lat, lng },
      }
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
};
// TODO: sciName 으로 사용하는 것이 적절할 듯
/**
 *
 * @param name 종 이름
 * @returns
 */
export const getBirdsPicture = async (name: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL_UNSPLASH}search/photos?`,
      {
        params: {
          client_id: import.meta.env.VITE_API_URL_UNSPLASH_ACCESS_KEY,
          query: name,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
};

/**
 *     {
        "speciesCode": "norhar1",
        "comName": "Hen Harrier",
        "sciName": "Circus cyaneus",
        "locId": "L8290295",
        "locName": "서울--마포대교와 밤섬(Seoul--Mapo Bridge&Bamseom)",
        "obsDt": "2025-02-09 11:57",
        "howMany": 1,
        "lat": 37.5319353,
        "lng": 126.9336002,
        "obsValid": false,
        "obsReviewed": false,
        "locationPrivate": false,
        "subId": "S212537021"
    },
bird-container
    {
    "37.3114241&126.9448905": {
        "locName": "278-2 초평동, 의왕시, 경기도, KR (37.311, 126.945)",
        "obsDt": "2025-03-11 17:55",
        "species": {}
    },
    "37.3114241&126.9448905": {
      "locName": "대전--갑천-불무교(Daejeon--Gapcheon(stream)-Bulmugyo(bridge))",
      "obsDt": "2025-03-11 17:00",
      "species": {
          "Meadow Pipit": 7,
          "Water Pipit": 21,
          "Eastern Yellow Wagtail (Eastern)": 1
      }
  }
}
 */
