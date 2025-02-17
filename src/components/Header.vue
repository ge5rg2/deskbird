<script setup lang="ts">
// ====================================
//    Page
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

// ====================================
</script>

<template>
  <div class="flex justify-between items-center w-full p-4">
    <!-- 타이틀 -->

    <div class="text-black text-2xl font-bold">{{ $t("header.title") }}</div>
    <!-- 버튼 및 아이콘 그룹 -->
    <div class="flex items-center space-x-4">
      <button class="px-4 py-2 bg-blue-200 rounded">목록으로 보기</button>
      <button class="px-4 py-2 bg-gray-200 rounded">지도로 보기</button>
      <button class="cursor-pointer">refresh</button>
    </div>
  </div>
</template>

<style lang="css"></style>
