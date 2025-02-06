<template>
  <div class="container">
    <h1>{{ $t("header.title") }}</h1>
    <button @click="getNearbyBirds">{{ $t("main.findBirds") }}</button>
    <div v-if="birds.length">
      <ul>
        <li v-for="bird in birds" :key="bird.id">
          {{ bird.name }} - {{ bird.location }}
        </li>
      </ul>
    </div>
    <p v-else>{{ $t("main.loading") }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      birds: [],
    };
  },
  methods: {
    getNearbyBirds() {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log(`현위치: ${latitude}, ${longitude}`);

        // TODO: eBird API 호출해서 새 정보 가져오기
        this.birds = [
          { id: 0, name: "현위치", location: `${latitude}, ${longitude}` },
          { id: 1, name: "참새", location: "공원" },
          { id: 2, name: "까치", location: "나무" },
        ];
      });
    },
  },
};
</script>

<style>
.container {
  width: 300px;
  padding: 20px;
  text-align: center;
}
button {
  padding: 10px;
  margin: 10px;
}
</style>
