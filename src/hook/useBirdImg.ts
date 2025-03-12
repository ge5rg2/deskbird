import { useBirdStore } from "@/stores/useBirdStore";
import { getBirdsPicture } from "@/api/useBirdsApi";
import type { BirdData } from "@/types/common.types.ts";

export const useBirdImg = () => {
  const birdStore = useBirdStore();

  /**
   * 조류 이미지 호출
   */
  const getBirdImg = async (speciesCode: string) => {
    try {
      const response = await getBirdsPicture(speciesCode);
      //console.log(response.results[0].urls.small);
      return response.results[0].urls.small;
    } catch (error: any) {
      return error;
    }
  };
  return { getBirdImg };
};
