<template>
  <LayoutNav />
  <router-view />
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import Layout from "./components/Layout.vue";
import LayoutNav from "./components/Layout/LayoutNav.vue";
export default defineComponent({
  components: {
    LayoutNav
  },
});
</script>
