<template lang="">
  <div class="container mx-auto">
    <div class="ml-80 list-none" v-for="d in data" :key="d">
      <li class="text-xl font-bold mb-4">{{ d }}</li>
    </div>
    <div class="ml-80 list-none text-red-500 text-xl font-bold mb-4">
      어떠한 영리 목적도 없습니다. 문제 될 시 삭제하겠습니다.
    </div>
  </div>
</template>
<script>
export default {
  setup() {
    const data = [
      '1. Google과 같이 크롤링을 허용하지 않는 사이트의 이미지는 넣을 수 없습니다',
      '2. 검색 버튼 클릭 시, URL을 통해 DB에 저장되어 있는 데이터를 불러옵니다. 데이터가 없으면 불러오지 않습니다',
      '3. 최소한 URL과 TITLE은 작성해야 다운로드 할 수 있습니다',
      '4. 버전 혹은 로직 문제로 에러가 발생할 수 있습니다. 고칠 때까지 기다리세염',
    ]
    return {
      data
    }
  }
}
</script>
<style lang="">
  
</style>