<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import BirdMap from "@/components/BirdMap.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import BirdContent from "./components/BirdContent.vue";

import { useBirdStore } from "./stores/useBirdStore";

const { locale } = useI18n();
const currentLang = computed(() => locale.value);
const birdStore = useBirdStore();

const toggleLanguage = () => {
  locale.value = locale.value === "en" ? "kr" : "en";
};
</script>

<template>
  <div class="text-center bg-white shadow-md rounded-lg">
    <!-- 언어 변경 버튼 usei18n 테스트시에만 활성화-->
    <div class="p-5">
      <button
        v-show="false"
        @click="toggleLanguage"
        class="mb-4 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
      >
        {{ currentLang === "en" ? "🇰🇷" : "🇺🇸" }}
      </button>

      <Header />
      <BirdMap v-show="birdStore.getOpenMap" />
      <BirdContent v-show="!birdStore.getOpenMap" />
    </div>
    <Footer />
  </div>
</template>

<style lang="css"></style>
