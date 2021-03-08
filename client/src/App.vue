<template>
  <Layout />
  <router-view />
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import Layout from "./components/Layout.vue";
export default defineComponent({
  components: {
    Layout
  },
  setup() {
    const data = reactive({
      url: "",
      title: "",
      artist: ""
    });
    return {
      data
    };
  }
});
</script>
