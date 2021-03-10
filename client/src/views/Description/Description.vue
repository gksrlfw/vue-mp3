<template lang="">
  <div class="container mx-auto ml-80 ">
    <div class="list-none" v-for="d in data" :key="d">
      <li class="text-xl font-bold mb-4">{{ d }}</li>
    </div>
    <div class="list-none text-red-500 text-xl font-bold mb-4">
      영리를 목적으로 운영하지 않습니다. 문제 시, 삭제하겠습니다.
    </div>
  </div>
</template>
<script>
export default {
  setup() {
    const data = [
      "1. URL 부분에 원하는 YOUTUBE 영상의 URL을 작성합니다.",
      "2. 최소 URL과 TITLE은 작성해야 다운로드 할 수 있습니다.",
      "3. 특정 사이트의 이미지는 사용할 수 없습니다. 네이버 이미지 URL을 추천합니다.",
      "4. SEARCH 버튼 클릭 시, URL을 통해 DB에 저장되어 있는 데이터를 불러옵니다. 데이터가 없으면 불러오지 않습니다.",
    ];
    return {
      data
    };
  }
};
</script>
<style lang=""></style>
