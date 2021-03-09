<template lang="">
  <div>
    <IconChevronR v-if="!toggleAccordion" />
    <IconChevronD v-else />
  </div>
</template>
<script>
import IconChevronD from '@/components/Icons/IconChevronD';
import IconChevronR from '@/components/Icons/IconChevronR';
export default {
  components: {
    IconChevronD,
    IconChevronR,
  },
  props: {
    toggleAccordion: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang=""></style>
