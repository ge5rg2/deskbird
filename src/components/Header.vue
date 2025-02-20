<script setup lang="ts">
// ====================================
//    Header
// ====================================

// ====================================
// imports
import { useBirdMap } from "../hook/useBirdMap";

// ====================================
// components

// ====================================
// stores
import { useBirdStore } from "@/stores/useBirdStore";

// ====================================
// variables
const birdStore = useBirdStore();
const { getNearbyBirds, setRefresh } = useBirdMap();
// ====================================
// functions - events
const toggleMap = async () => {
  birdStore.setOpenMap();
};

const handleRefresh = async () => {
  return await setRefresh();
};

// ====================================
</script>

<template>
  <div class="flex justify-between items-center w-full p-4">
    <div class="text-black text-2xl font-bold">{{ $t("header.title") }}</div>
    <div class="flex items-center space-x-4">
      <button
        @click="toggleMap"
        class="px-4 py-2 rounded toggle-button"
        :class="birdStore.getOpenMap ? 'bg-black-200' : 'bg-black-200'"
      >
        {{
          birdStore.getOpenMap
            ? $t("header.mapButton")
            : $t("header.listButton")
        }}
      </button>

      <div class="cursor-pointer bg-white">
        <font-awesome-icon
          class="text-black refresh"
          @click="handleRefresh"
          icon="fa-rotate"
        />
      </div>
    </div>
  </div>
</template>

<style lang="css">
.toggle-button:hover {
  opacity: 0.7;
}
.refresh:hover {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
