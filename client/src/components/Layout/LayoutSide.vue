<template lang="">
  <aside class="w-64 h-full fixed ">
    <nav class="divide-solid w-full p-4 ml-8 bg-blue-50 rounded-lg justify-center text-center shadow-xl">
      <div class="p-2">
        <router-link 
        class="p-2 py-3 flex items-center focus:outline-none hover:bg-blue-100 rounded-lg" 
        :to="{ name: 'Home' }">
          <IconMusicNote class="w-5 h-5" />
          <span class="ml-4 text-xl font-semibold">DOWNLOADER</span>
          
        </router-link>
        <router-link  
        class="p-2 py-3 flex items-center focus:outline-none hover:bg-blue-100 rounded-lg" 
        :to="{ name: 'Description' }">
          <IconAnnotation class="w-5 h-5" />
          <span class="ml-4 text-xl font-semibold">READ ME</span>
        </router-link>
        <!-- <router-link 
        class="p-2 py-3 flex items-center focus:outline-none hover:bg-blue-100 rounded-lg" 
        :to="{ name: 'Post' }">
          <IconInformation class="w-5 h-5" />
          <span class="ml-4 text-xl font-semibold">POST</span>
        </router-link> -->
      </div>
    </nav>
  </aside>
</template>
<script>
// import LayoutSideMain from '@/components/Layout/LayoutSideMain';
// import LayoutSideWs from '@/components/Layout/LayoutSideWs';
import IconMusicNote from '@/components/Icons/IconMusicNote';
// import IconInformation from '@/components/Icons/IconInformation';
import IconAnnotation from '@/components/Icons/IconAnnotation';
import { useRoute } from 'vue-router';
export default {
  components: {
    IconMusicNote,
    // IconInformation,
    IconAnnotation
  },
  setup() {
    const route = useRoute();
    return {route}
  }
};
</script>
<style lang="scss"></style>
