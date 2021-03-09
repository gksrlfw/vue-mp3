<template lang="">
  <LayoutHeader />
  <AccodionButton 
    class="w-5 h-5 mt-2 ml-8 mb-2 cursor-pointer font-extrabold rounded-md hover:bg-gray-100 focus:bg-gray-300 focus:outline-none focus:shadow-outline"
    :toggle-accordion="toggleAccordion"
    @click="toggleAccordion = !toggleAccordion" 
  />
  <LayoutSide v-if="toggleAccordion" />
</template>
<script>
import LayoutSide from '@/components/Layout/LayoutSide';
import LayoutHeader from '@/components/Layout/LayoutHeader';
import AccodionButton from '@/components/Button/AccodionButton';
import { defineComponent, reactive, ref } from "vue";

export default {
  components: {
    LayoutSide,
    LayoutHeader,
    AccodionButton
  },
  setup() {
    const toggleAccordion = ref(true);
    return {
      toggleAccordion
    };
  }
};
</script>
<style lang=""></style>
