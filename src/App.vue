<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import BirdMap from "@/components/BirdMap.vue";
// 다국어 설정
const { locale } = useI18n();

// 새 목록 상태
const birds = ref<{ id: number; name: string; location: string }[]>([]);

// 현재 언어 계산
const currentLang = computed(() => locale.value);

// 언어 토글 함수
const toggleLanguage = () => {
  locale.value = locale.value === "en" ? "kr" : "en";
};
</script>

<template>
  <div
    class="max-w-sm mx-auto p-6 text-center bg-white shadow-md rounded-lg container"
  >
    <!-- 언어 변경 버튼 -->
    <button
      @click="toggleLanguage"
      class="mb-4 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
    >
      {{ currentLang === "en" ? "🇰🇷" : "🇺🇸" }}
    </button>

    <h1 class="text-2xl font-bold mb-4">{{ $t("header.title") }}</h1>

    <BirdMap />
  </div>
</template>

<style lang="css">
.container {
  width: 600px;
}
</style>
