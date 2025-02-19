<script setup lang="ts">
// ====================================
//    Header
// ====================================

// ====================================
// imports

// ====================================
// components

// ====================================
// stores
import { useBirdStore } from "@/stores/useBirdStore";

// ====================================
// variables
const birdStore = useBirdStore();

// ====================================
// functions - events
const toggleMap = () => {
  birdStore.setOpenMap();
};

// ====================================
</script>

<template>
  <div class="flex justify-between items-center w-full p-4">
    <div class="text-black text-2xl font-bold">{{ $t("header.title") }}</div>
    <div class="flex items-center space-x-4">
      <button
        @click="toggleMap"
        class="px-4 py-2 rounded"
        :class="birdStore.getOpenMap ? 'bg-black-200' : 'bg-black-200'"
      >
        {{
          birdStore.getOpenMap
            ? $t("header.mapButton")
            : $t("header.listButton")
        }}
      </button>

      <div class="cursor-pointer bg-white">
        <font-awesome-icon class="text-black" icon="fa-rotate" />
      </div>
    </div>
  </div>
</template>

<style lang="css"></style>
