<template lang="">
  <div class="h-32 py-10 px-20">
    <div class="text-3xl font-extrabold ml-10"></div>
    <div class="text-center text-3xl mb-16 font-extrabold mt-10">
      EASY MP3 DOWNLOADER
    </div>
    <!-- <div class="flex ml-80 items-center text-bolder text-3xl">asd</div> -->
  </div>
</template>
<script>
import { useRoute } from 'vue-router';
export default {
  setup() {
    const route = useRoute();
    return {
      route,
    };
  },
};
</script>
<style lang=""></style>
