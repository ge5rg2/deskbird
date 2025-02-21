<script setup lang="ts">
// ====================================
//    Bird List
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

// ====================================
</script>

<template>
  <div class="bird-list">
    <ul>
      <li
        v-for="(data, location) in birdStore.getBirdContainer"
        :key="location"
        class="text-black border border-gray-200 p-4"
      >
        <div class="location">
          <strong>위치:</strong> {{ data.locName }} ({{ location }})
        </div>
        <div class="observation-date">
          <strong>관찰 날짜:</strong> {{ data.obsDt }}
        </div>
        <ul class="species-list">
          <li v-for="(count, species) in data.species" :key="species">
            🐦 <strong>{{ species }}</strong> - {{ count }} 마리
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style lang="css"></style>
