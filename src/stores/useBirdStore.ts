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
    isLoaded: false,
    isClicked: false,
    isDataLoaded: false,
    openMap: true,
  }),
  getters: {
    getInitialMap: (state) => state.initial_map, // getInitialMap
    getIsLoaded: (state) => state.isLoaded, // getIsLoaded
    getIsClicked: (state) => state.isClicked, // getIsClicked
    getIsDataLoaded: (state) => state.isDataLoaded, // getIsDataLoaded
    getOpenMap: (state) => state.openMap,
  },
  actions: {
    setInitialMap(map: any) {
      this.initial_map = map;
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
    setOpenMap(openMap: boolean) {
      this.openMap = openMap;
    },
  },
});

// Type ========================

// ========================
