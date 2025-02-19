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
    openMap: false,
  }),
  getters: {
    getInitialMap: (state) => state.initial_map, // getInitialMap
    getIsLoaded: (state) => state.isLoaded, // getIsLoaded
    getIsClicked: (state) => state.isClicked, // getIsClicked
    getOpenMap: (state) => state.openMap, // getOpenMap
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
    setOpenMap() {
      this.openMap = !this.openMap;
    },
  },
});

// Type ========================

// ========================
