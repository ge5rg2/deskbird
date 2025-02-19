<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import BirdMap from "@/components/BirdMap.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

const { locale } = useI18n();
const currentLang = computed(() => locale.value);

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

      <BirdMap />
    </div>
    <Footer />
  </div>
</template>

<style lang="css"></style>
