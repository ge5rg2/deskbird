import axios from "axios";

export const getRecntBirdByLocation = async (lat: number, lng: number) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL_EBIRD}data/obs/geo/recent/notable?`,
    {
      headers: { "x-ebirdapitoken": import.meta.env.VITE_API_URL_EBIRD_KEY },
      params: { lat, lng },
    }
  );
  return response.data;
};
