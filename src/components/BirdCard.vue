<script setup lang="ts">
// ====================================
//    Bird Card
// ====================================

// ====================================
// imports

// ====================================
// components

// ====================================
// stores

// ====================================
// variables

// ====================================
// functions - events
const props = defineProps<{
  img: string;
}>();

// ====================================
</script>

<template>
  <div class="w-full h-full">
    <div>
      <img :src="props.img" alt="logo" />
    </div>
  </div>
</template>

<style lang="css"></style>
