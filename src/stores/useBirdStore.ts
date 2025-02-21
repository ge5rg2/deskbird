// ====================================
//    Birds Store
// ====================================
// Description: Birds store
import { defineStore } from "pinia";

// ========================
// ========================

export const useBirdStore = defineStore("birdStore", {
  state: () => ({
    initial_map: null as L.Map | null,
    bird_container: {} as Record<
      string,
      { locName: string; obsDt: string; species: Record<string, number> }
    >,
    isLoaded: false,
    isClicked: false,
    isDataLoaded: false,
    openMap: true,
  }),
  getters: {
    getInitialMap: (state) => state.initial_map, // getInitialMap
    getBirdContainer: (state) => state.bird_container, // getBirdContainer
    getIsLoaded: (state) => state.isLoaded, // getIsLoaded
    getIsClicked: (state) => state.isClicked, // getIsClicked
    getIsDataLoaded: (state) => state.isDataLoaded, // getIsDataLoaded
    getOpenMap: (state) => state.openMap, // getOpenMap
  },
  actions: {
    setInitialMap(map: any) {
      this.initial_map = map;
    },
    setBirdContainer(bird_container: any) {
      this.bird_container = bird_container;
    },
    setIsLoaded(isLoaded: boolean) {
      this.isLoaded = isLoaded;
    },
    setIsClicked(isClicked: boolean) {
      this.isClicked = isClicked;
    },
    setIsDataLoaded(isDataLoaded: boolean) {
      this.isDataLoaded = isDataLoaded;
    },
    setOpenMap() {
      this.openMap = !this.openMap;
    },
  },
});

// Type ========================

// ========================
